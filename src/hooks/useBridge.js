import useWeb3, { useCrossWeb3 } from './useWeb3'
import { useCallback } from "react"
import { useWeb3React } from '@web3-react/core'
import useRefresh from './useRefresh'
import { deposit, getClaimTokens } from '../helper/bridgeHelper'
import { SendWithToast } from '../helper/deiHelper'


export const useClaim = () => {
    const { account } = useWeb3React()
    const { fastRefresh } = useRefresh()
    const networks = [1, 137]
    //idn why but it tried to use the same state twice
    // const web3s = {
    //     4: useCrossWeb3(4),
    //     97: useCrossWeb3(97)
    // }
    const rinkWeb3 = useCrossWeb3(1)
    const bscWeb3 = useCrossWeb3(137)

    const onClaim = useCallback(async () => {
        if (account && rinkWeb3 && bscWeb3) {
            const res = await getClaimTokens(networks, account, { 1: rinkWeb3, 137: bscWeb3 })
            return res
        }
    }, [account, rinkWeb3, bscWeb3])
    return { onClaim }
}

export const useDeposit = (amount, swapState) => {
    const { account, chainId } = useWeb3React()
    const web3 = useWeb3()
    const onDeposit = useCallback(async () => {
        console.log(amount, swapState);
        if (chainId !== swapState.from.chainId || !swapState.to.chainId || !account || amount === '0' || amount === '') return

        try {
            const fn = deposit(amount, swapState.from, swapState.to, web3, account)
            return await SendWithToast(fn, account, chainId, `Deposit ${amount} ${swapState.from.symbol}`)
        } catch (error) {
            console.log("error happened at useDeposit");
        }
    }, [amount, swapState, web3, account, chainId])
    return { onDeposit }
}
