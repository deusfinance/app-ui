import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import useWeb3 from "./useWeb3"
import ERC20Abi from '../config/abi/ERC20Abi.json'
import { getFullDisplayBalance } from './formatBalance';
import multicall from './multicall'
import { concat } from 'lodash'
import { formatBalance3 } from '../utils/utils';
import useRefresh from './useRefresh';

const useAssetBalances = (conducted, validChainId) => {
    const [balances, setBalances] = useState(null)
    const { account, chainId } = useWeb3React()
    const web3 = useWeb3()
    const { slowRefresh } = useRefresh()

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
                let balanceMap = {}
                const result = await multicall(web3, ERC20Abi, concatCalls, chainId)
                for (let i = 0; i < result.length; i++) {
                    const balance = getFullDisplayBalance(result[i], 18)
                    balanceMap[web3.utils.toChecksumAddress(concatCalls[i].address)] = formatBalance3(balance)
                }
                setBalances(balanceMap)
            }
        }

        if (account && validChainId === chainId) {
            fetchBalances()
        }
    }, [account, conducted, chainId, validChainId, web3, slowRefresh])

    return balances
}


export default useAssetBalances