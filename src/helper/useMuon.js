import { useEffect, useState, useCallback } from "react"
import { useWeb3React } from '@web3-react/core'
import useWeb3 from './useWeb3'
import BigNumber from 'bignumber.js'
import useRefresh from "./useRefresh";
import { getToWei } from "./formatBalance";
import { deposit, getPrices, getSign, getUsedAmount } from "./muonHelper";
import { ToastTransaction } from "../utils/explorers";


export const useUsedAmount = (validChainId = 1) => {
    const { account } = useWeb3React()
    const web3 = useWeb3()
    const { fastRefresh } = useRefresh()

    const [used, setUsed] = useState(null)
    useEffect(() => {
        const get = async () => {
            const res = await getUsedAmount(account, validChainId, web3)
            console.log(res);
            setUsed(res)
        }
        if (account)
            get()
    }, [web3, account, validChainId, fastRefresh])

    return used
}

export const useSwap = (fromCurrency, toCurrency, amountIn, amountOut, fromSymbol, amount, validChainId = 1) => {
    const { account, chainId } = useWeb3React()
    const web3 = useWeb3()
    const handleSwap = useCallback(async () => {
        try {
            if (validChainId && chainId !== validChainId) return false
            console.log(amount);
            console.log(getToWei(amount, fromCurrency.decimals).toFixed(0));
            const muonOutput = await getSign(fromSymbol, getToWei(amount, fromCurrency.decimals), account)
            if (!muonOutput.success) {
                ToastTransaction("warn", "MUONIZE FAILED", muonOutput.error, { autoClose: true })
                return
            }
            const { result } = muonOutput
            console.log(result);
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
    }, [fromCurrency, toCurrency, amountIn, amountOut, fromSymbol, amount, account, chainId, validChainId, web3])

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
        return new BigNumber(price).times(debouncedAmountIn).div(0.095).times(1e18)
    }, [debouncedAmountIn, price])
    return { getAmountsOut }
}

export const useAmountsIn = (from, debouncedAmountOut, type, chainId, price = 20) => {
    const getAmountsIn = useCallback(async () => {
        return getToWei(new BigNumber(0.095).times(debouncedAmountOut).div(price), from.decimals)
    }, [from, debouncedAmountOut, price])
    return { getAmountsIn }
}