import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import useWeb3 from "./useWeb3"
import { isAddress } from "@ethersproject/address"
import BigNumber from "bignumber.js";
import { useERC20 } from './useContract'
import useRefresh from './useRefresh';

const useTokenBalance = (tokenAddress, fastUpdate = null) => {
    const [balance, setBalance] = useState(new BigNumber(0))
    const { account } = useWeb3React()
    const web3 = useWeb3()
    const contract = useERC20(tokenAddress)
    const { fastRefresh } = useRefresh()
    useEffect(() => {
        const fetchBalance = async () => {
            let walletBalance = null
            if (!isAddress(tokenAddress)) {
                walletBalance = await web3.eth.getBalance(account)
            } else {
                walletBalance = await contract.methods.balanceOf(account).call()
            }
            setBalance(new BigNumber(walletBalance))
        }

        if (account) {
            fetchBalance()
        } else {
            setBalance("")
        }
    }, [account, tokenAddress, web3, contract, fastRefresh, fastUpdate])

    return balance
}


export default useTokenBalance