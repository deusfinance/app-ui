import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import useWeb3 from "./useWeb3"
import { isAddress } from "@ethersproject/address"
import ERC20Abi from '../config/abi/ERC20Abi.json'

import { getFullDisplayBalance } from '../helper/formatBalance';
import multicall from '../helper/multicall'
import useRefresh from './useRefresh'

const useTokenBalances = (tokensMap, validChainId) => {
    const [balances, setBalances] = useState(tokensMap)
    const { account, chainId } = useWeb3React()
    const web3 = useWeb3()
    const { slowRefresh } = useRefresh()

    useEffect(() => {

        const fetchBalances = async () => {

            if (validChainId !== chainId) return

            const calls = Object.keys(tokensMap).filter((address) => isAddress(address)).map((address) => {
                return {
                    address: address,
                    name: 'balanceOf',
                    params: [account],
                }
            })

            const result = await multicall(web3, ERC20Abi, calls, validChainId)
            for (let i = 0; i < result.length; i++) {
                const balance = result[i];
                const address = web3.utils.toChecksumAddress(calls[i].address)
                if (tokensMap[address]){
                    tokensMap[address].balance = getFullDisplayBalance(balance, tokensMap[address]?.decimals)
                }
            }

            if (tokensMap["0x"]) {
                const ethBalance = await web3.eth.getBalance(account)
                tokensMap["0x"].balance = getFullDisplayBalance(ethBalance, tokensMap["0x"]?.decimals)
            }
            setBalances(tokensMap)
        }

        if (account) {
            fetchBalances()
        }
    }, [account, tokensMap, validChainId, chainId, slowRefresh, web3])

    return balances
}



export default useTokenBalances