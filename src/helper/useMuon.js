import { useEffect, useState, useCallback } from "react"
import { useWeb3React } from '@web3-react/core'
import { ethers } from "ethers";
import { swap } from './sealedHelper'
import useWeb3 from './useWeb3'
import BigNumber from 'bignumber.js'
import useRefresh from "./useRefresh";
import { useERC20 } from './useContract'
import { getToWei } from "./formatBalance";

export const useSwap = (fromCurrency, toCurrency, amountIn, amountOut, slipage, validChainId = 1) => {
    const { account, chainId } = useWeb3React()
    const { fastRefresh } = useRefresh()
    const web3 = useWeb3()
    const minAmountOut = new BigNumber(amountOut).multipliedBy((100 - Number(slipage)) / 100).toFixed(toCurrency.decimals, 1)
    let payload = []
    const handleSwap = useCallback(async () => {
        try {
            if (validChainId && chainId !== validChainId) return false
            return false
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
    }, [account, chainId, validChainId, fromCurrency, toCurrency, amountIn, amountOut, minAmountOut, payload, web3])

    return { onSwap: handleSwap }
}

export const useAllocation = (fromCurrency, toCurrency, amountIn, amountOut, slipage, validChainId = 1) => {
    const { account, chainId } = useWeb3React()
    const web3 = useWeb3()
    const { fastRefresh } = useRefresh()

    const getAllocation = useCallback(async () => {
        try {
            if (validChainId && chainId !== validChainId) return false
            const tx = await swap(
                fromCurrency,
                toCurrency,
                amountIn,
                amountOut,
                account,
                chainId,
                web3,
            )
            return tx
        } catch (e) {
            console.log(e);
            return false
        }
    }, [account, chainId, validChainId, fromCurrency, toCurrency, amountIn, amountOut, web3, fastRefresh])

    return { getAllocation: getAllocation }
}


export const useAmountsOut = (from, debouncedAmountIn, type, chainId, price = 20) => {
    const getAmountsOut = useCallback(() => {
        return new BigNumber(price).times(debouncedAmountIn).div(0.95).times(1e18)
    }, [from, debouncedAmountIn, chainId, price, type])
    return { getAmountsOut }
}

export const useAmountsIn = (from, debouncedAmountOut, type, chainId, price = 20) => {
    const getAmountsIn = useCallback(async () => {
        return getToWei(new BigNumber(0.95).times(debouncedAmountOut).div(price), from.decimals)
    }, [from, debouncedAmountOut, chainId, price])
    return { getAmountsIn }
}