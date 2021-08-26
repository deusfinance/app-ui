import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useCrossWeb3 } from "./useWeb3"
import { isAddress } from "@ethersproject/address"
import BigNumber from "bignumber.js";
import { useCrossERC20 } from './useContract'
import useRefresh from './useRefresh';

const useCrossTokenBalance = (tokenAddress, chainId, fastUpdate = null) => {
    const [balance, setBalance] = useState(new BigNumber(0))
    const { account } = useWeb3React()
    // console.log(tokenAddress, chainId);
    const web3 = useCrossWeb3(chainId)
    // console.log("web3 ", web3.currentProvider);
    const contract = useCrossERC20(tokenAddress, web3)
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

        if (account && tokenAddress) {
            fetchBalance()
        } else {
            setBalance("")
        }
    }, [account, tokenAddress, web3, contract, fastRefresh, fastUpdate])

    return balance
}


export default useCrossTokenBalance