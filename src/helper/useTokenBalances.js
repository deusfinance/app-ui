import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import useWeb3 from "./useWeb3"
import { isAddress } from "@ethersproject/address"
import { getERC20Contract } from './contractHelpers';
import { getBalanceNumber } from './formatBalance';

const useTokenBalances = (tokensMap, validChainId) => {
    const [balances, setBalances] = useState(tokensMap)
    const { account, chainId } = useWeb3React()
    const web3 = useWeb3()
    // const { slowRefresh } = useRefresh()

    useEffect(() => {

        const fetchBalances = async () => {
            Object.keys(tokensMap).map(async (address) => {
                let walletBalance = null
                if ((validChainId && chainId !== validChainId))
                    walletBalance = 0
                else if (!isAddress(address)) {
                    walletBalance = await web3.eth.getBalance(account)
                } else {
                    const contract = getERC20Contract(address, web3)
                    walletBalance = await contract.methods.balanceOf(account).call()
                }
                tokensMap[address].balance = getBalanceNumber(walletBalance, tokensMap[address]?.decimals)
                setBalances(tokensMap)
            })
        }

        if (account) {
            fetchBalances()
            console.log("useTokenBalances");
        }
    }, [account, tokensMap, chainId, validChainId, web3])

    return balances
}


export default useTokenBalances