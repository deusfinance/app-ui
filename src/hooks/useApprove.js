import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { approve } from '../helper/swapHelper'
import { useERC20 } from './useContract'
import useWeb3 from './useWeb3'
import { getGasData } from './useDei'

export const useApprove = (currency, contractAddress, validChainId) => {
    const { account, chainId } = useWeb3React()
    const { address: tokenAddress } = currency
    const contract = useERC20(tokenAddress)
    const web3 = useWeb3()
    const handleApprove = useCallback(async () => {
        try {
            if (validChainId && chainId !== validChainId) return null
            const payload = await getGasData(web3, null, validChainId, account)
            // console.log(payload);
            const tx = await approve(
                contract,
                contractAddress,
                account,
                { chainId, currency, ...payload }
            )
            return tx
        } catch (e) {
            return false
        }
    }, [account, chainId, validChainId, currency, contract, contractAddress, web3])

    return { onApprove: handleApprove }
}