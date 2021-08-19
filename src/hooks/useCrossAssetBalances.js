import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import useWeb3, { useCrossWeb3 } from "./useWeb3"
import ERC20Abi from '../config/abi/ERC20Abi.json'
import { getFullDisplayBalance } from '../helper/formatBalance';
import multicall from '../helper/multicall'
import { concat } from 'lodash'
import { formatBalance3 } from '../utils/utils';
import useRefresh from './useRefresh';

const useCrossAssetBalances = (conducted, validChainId) => {
    const [balances, setBalances] = useState(null)
    const { account } = useWeb3React()
    const web3 = useCrossWeb3(validChainId)
    const { slowRefresh } = useRefresh()

    useEffect(() => {
        const fetchBalances = async () => {
            const calls = conducted?.tokens && conducted.chainId === validChainId && conducted.tokens.map((token) => {
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
                try {

                    const result = await multicall(web3, ERC20Abi, concatCalls, validChainId)
                    for (let i = 0; i < result.length; i++) {
                        const balance = getFullDisplayBalance(result[i], 18)
                        balanceMap[web3.utils.toChecksumAddress(concatCalls[i].address)] = formatBalance3(balance)
                    }
                    setBalances(balanceMap)
                } catch (error) {
                    console.log("useCrossAssetBalances ", error);
                }
            }
        }

        if (account && web3) {
            fetchBalances()
        }
    }, [account, conducted, validChainId, web3, slowRefresh])

    return balances
}


export default useCrossAssetBalances