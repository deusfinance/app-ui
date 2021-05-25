import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import useWeb3 from "./useWeb3"
import { isAddress } from "@ethersproject/address"
import ERC20Abi from '../config/abi/ERC20Abi.json'

import { getBalanceNumber } from './formatBalance';
import multicall from './multicall'

const useTokenBalances = (tokensMap, validChainId) => {
    const [balances, setBalances] = useState(tokensMap)
    const { account, chainId } = useWeb3React()
    const web3 = useWeb3()
    // const { slowRefresh } = useRefresh()

    useEffect(() => {

        const fetchBalances = async () => {
            const calls = Object.keys(tokensMap).filter((address) => isAddress(address)).map((address) => {
                return {
                    address: address,
                    name: 'balanceOf',
                    params: [account],
                }
            })
            console.log(calls);
            const result = await multicall(web3, ERC20Abi, calls)
            console.log(result);
            for (let i = 0; i < result.length; i++) {
                const balance = result[i];
                const address = calls[i].address
                tokensMap[address].balance = getBalanceNumber(balance, tokensMap[address]?.decimals)

            }
            const ethBalance = await web3.eth.getBalance(account)
            tokensMap["0x"].balance = getBalanceNumber(ethBalance, tokensMap["0x"]?.decimals)
            setBalances(tokensMap)
            // Object.keys(tokensMap).map(async (address) => {
            //     let walletBalance = null
            //     if ((validChainId && chainId !== validChainId))
            //         walletBalance = 0
            //     else if (!isAddress(address)) {
            //         walletBalance = await web3.eth.getBalance(account)
            //     } else {
            //         const contract = getERC20Contract(address, web3)
            //         walletBalance = await contract.methods.balanceOf(account).call()
            //     }
            //     tokensMap[address].balance = getBalanceNumber(walletBalance, tokensMap[address]?.decimals)
            //     setBalances(tokensMap)
            // })
        }

        if (account) {
            fetchBalances()
            console.log("useTokenBalances");
        }
    }, [account, tokensMap, chainId, validChainId, web3])

    return balances
}


export default useTokenBalances