import { useEffect, useState, useCallback } from "react"
import { useWeb3React } from '@web3-react/core'
import useWeb3 from './useWeb3'
import BigNumber from 'bignumber.js'
import useRefresh from "./useRefresh";
import { getToWei } from "./formatBalance";
import { deposit, getPrices, getSign, getUsedAmount } from "./muonHelper";


export const useUsedAmount = () => {
    const { account } = useWeb3React()
    const web3 = useWeb3()
    const { fastRefresh } = useRefresh()

    const [used, setUsed] = useState(null)
    useEffect(() => {
        const get = async () => {
            const res = await getUsedAmount(account, web3)
            setUsed(res)
        }
        if (account)
            get()
    }, [web3, account, fastRefresh])

    return used
}

export const useSwap = (fromCurrency, toCurrency, amountIn, amountOut, fromSymbol, amount, validChainId = 1) => {
    const { account, chainId } = useWeb3React()
    const web3 = useWeb3()
    const handleSwap = useCallback(async () => {
        try {
            if (validChainId && chainId !== validChainId) return false
            const muonOutput = await getSign(fromSymbol, getToWei(amount, fromCurrency.decimals), account)
            const { result } = muonOutput

            const tx = await deposit(
                fromCurrency, toCurrency, amountIn, amountOut,
                result.data.result,
                result.cid,
                result.signatures,
                account,
                validChainId,
                web3
            )
            return tx
        } catch (e) {
            console.log(e);
            return false
        }
    }, [fromCurrency, toCurrency, amountIn, amountOut, fromSymbol, amount, web3])

    return { onSwap: handleSwap }
}

export const usePrices = () => {
    const { slowRefresh } = useRefresh()
    const [prices, setPrices] = useState(null)

    useEffect(() => {
        const get = async () => {
            const p = await getPrices()
            setPrices(p)
        }
        get()
    }, [slowRefresh])

    return prices
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