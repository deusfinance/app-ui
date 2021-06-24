import { useEffect, useState, useCallback } from "react"
import { useWeb3React } from '@web3-react/core'
import { ethers } from "ethers";
import { swap } from './sealedHelper'
import useWeb3 from './useWeb3'
import BigNumber from 'bignumber.js'
import useRefresh from "./useRefresh";
import { useERC20 } from './useContract'
import { getSealedAmountsOut } from './sealedHelper'
import { isZero, ZERO } from '../constant/number'


export const useSwap = (fromCurrency, toCurrency, amountIn, amountOut, slipage, validChainId, bptPayload) => {
    const { account, chainId } = useWeb3React()

    const web3 = useWeb3()
    const minAmountOut = new BigNumber(amountOut).multipliedBy((100 - Number(slipage)) / 100).toFixed(toCurrency.decimals, 1)
    let payload = []
    for (let i = 0; i < bptPayload.length; i++) {
        payload[i] = new BigNumber(bptPayload[i]).multipliedBy((100 - Number(slipage)) / 100).toFixed(toCurrency.decimals, 1)
    }
    const handleSwap = useCallback(async () => {
        try {
            if (validChainId && chainId !== validChainId) return false
            const tx = await swap(
                fromCurrency,
                toCurrency,
                amountIn,
                amountOut,
                minAmountOut,
                payload,
                account,
                chainId,
                web3,
            )
            return tx
        } catch (e) {
            console.log(e);
            return false
        }
    }, [account, chainId, validChainId, fromCurrency, toCurrency, amountIn, amountOut, minAmountOut, web3])

    return { onSwap: handleSwap }
}

export const useSealedAllowance = (currency, contractAddress, validChainId) => {
    const [allowance, setAllowance] = useState(new BigNumber(-1))
    const { account, chainId } = useWeb3React()
    const { fastRefresh } = useRefresh()
    const { address: tokenAddress } = currency
    const contract = useERC20(tokenAddress)

    useEffect(() => {
        const fetchAllowance = async () => {
            console.log();
            if (validChainId && chainId !== validChainId) setAllowance(ZERO)
            if (contract === null || currency.symbol !== "BPT") setAllowance(ethers.constants.MaxUint256)
            else {
                const res = await contract.methods.allowance(account, contractAddress).call()
                setAllowance(new BigNumber(res))
            }
        }
        if (account && tokenAddress) {
            fetchAllowance()
        }
    }, [account, contract, chainId, contractAddress, tokenAddress, validChainId, currency, fastRefresh])

    return allowance
}

export const useSealedGetAmountsOut = (fromCurrency, amountIn, validChainId) => {
    const { chainId } = useWeb3React()
    const web3 = useWeb3()
    const { fastRefresh } = useRefresh()
    const getAmountsOut = useCallback(async () => {
        try {
            if (amountIn === "" || isZero(amountIn) || (chainId && validChainId && validChainId !== chainId)) return ""
            const amount = await getSealedAmountsOut(
                fromCurrency,
                amountIn,
                validChainId,
                web3,
            )
            return amount
        } catch (e) {
            console.log(e);
            return false
        }
        // eslint-disable-next-line
    }, [chainId, fromCurrency, amountIn, web3, validChainId, fastRefresh])//React Hook useCallback has an unnecessary dependency: 'fastRefresh'

    return { getAmountsOut }
}

