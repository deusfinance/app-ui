import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import useWeb3 from "./useWeb3"
import ERC20Abi from '../config/abi/ERC20Abi.json'
import { getBalanceNumber } from './formatBalance';
import multicall from './multicall'
import { concat } from 'lodash'

const useAssetBalances = (conducted, validChainId) => {
    const [balances, setBalances] = useState(null)
    const { account, chainId } = useWeb3React()
    const web3 = useWeb3()
    // const { slowRefresh } = useRefresh()

    useEffect(() => {

        const fetchBalances = async () => {
            const calls = conducted?.tokens && conducted.tokens.map((token) => {
                return [
                    {
                        address: token.long,
                        name: 'balanceOf',
                        params: [account],
                    },
                    {
                        address: token.short,
                        name: 'balanceOf',
                        params: [account],
                    }]
            })
            if (calls) {
                const concatCalls = concat(...calls)
                console.log(concatCalls);
                let balanceMap = {}
                const result = await multicall(web3, ERC20Abi, concatCalls, chainId)
                for (let i = 0; i < result.length; i++) {
                    const balance = getBalanceNumber(result[i], 18)
                    balanceMap[concatCalls[i].address] = balance
                }
                setBalances(balanceMap)
            }
        }

        if (account && validChainId === chainId) {
            fetchBalances()
            console.log("useTokenBalances");
        }
    }, [account, conducted, chainId, validChainId, web3])

    return balances
}


export default useAssetBalances