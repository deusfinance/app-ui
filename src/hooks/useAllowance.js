import { useWeb3React } from "@web3-react/core"
import { useEffect, useState } from "react"
import BigNumber from "bignumber.js";
import useRefresh from "./useRefresh";
import { useERC20 } from './useContract'
import { ethers } from "ethers";
import { ZERO } from "../constant/number";


export const useAllowance = (currency, contractAddress, validChainId) => {
    const [allowance, setAllowance] = useState(new BigNumber(-1))
    const { account, chainId } = useWeb3React()
    const { fastRefresh } = useRefresh()
    const { address: tokenAddress } = currency
    const contract = useERC20(tokenAddress)

    useEffect(() => {
        const fetchAllowance = async () => {
            if (!tokenAddress) return setAllowance(ZERO)
            if (validChainId && chainId !== validChainId && validChainId !== currency.chainId) setAllowance(ZERO)
            if (contract === null) setAllowance(ethers.constants.MaxUint256)
            else if (currency.allowance) { setAllowance(currency.allowance) }
            else {
                try {
                    const res = await contract.methods.allowance(account, contractAddress).call()
                    setAllowance(new BigNumber(res))
                } catch (error) {
                    console.log("error useAllowance",error);
                }
            }
        }
        if (account && tokenAddress) {
            setAllowance(new BigNumber(-1))
            fetchAllowance()
        }
    }, [account, contract, chainId, contractAddress, tokenAddress, validChainId, currency, fastRefresh])

    return allowance
}

