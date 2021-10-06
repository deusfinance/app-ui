import { useEffect, useState, useCallback } from "react"
import { useWeb3React } from '@web3-react/core'
import useWeb3, { useCrossWeb3 } from './useWeb3'
import BigNumber from 'bignumber.js'
import useRefresh from "./useRefresh";
import { getToWei } from "../helper/formatBalance";
import { buyMuon, getPrices, getUsedAmount } from "../helper/muonHelper";
import { getCurrentTimeStamp } from "../utils/utils";
import { ChainId } from "../constant/web3";

export const useUsedAmount = (validChainId = 1) => {
    const { account } = useWeb3React()
    const bscWeb3 = useCrossWeb3(ChainId.BSC)
    const xdaiWeb3 = useCrossWeb3(ChainId.XDAI)
    const ethWeb3 = useCrossWeb3(ChainId.ETH)
    const { fastRefresh } = useRefresh()

    const [used, setUsed] = useState(null)
    useEffect(() => {
        const get = async () => {
            const resEth = await getUsedAmount(account, ChainId.ETH, ethWeb3)
            const resBsc = await getUsedAmount(account, ChainId.BSC, bscWeb3)
            const resXdai = await getUsedAmount(account, ChainId.XDAI, xdaiWeb3)
            const sumUsed = new BigNumber(resEth).plus(resBsc).plus(resXdai).toFixed(2)
            setUsed(sumUsed)
        }
        if (account)
            get()
    }, [ethWeb3, bscWeb3, xdaiWeb3, account, validChainId, fastRefresh])

    return used
}

export const useSwap = (fromCurrency, toCurrency, amountIn, amountOut, fromSymbol, amount, validChainId = 1, callback) => {
    const { account, chainId } = useWeb3React()
    const web3 = useWeb3()

    const handleSwap = useCallback(async () => {
        try {
            if (validChainId && chainId !== validChainId) return false
            // console.log(amount);
            // console.log(getToWei(amount, fromCurrency.decimals).toFixed(0));
            // const muonOutput = await getSign(fromSymbol, getToWei(amount, fromCurrency.decimals), account)
            const time = getCurrentTimeStamp()
            await buyMuon(fromCurrency, toCurrency, amountIn, amountOut, fromSymbol, amount, time, account, chainId, validChainId, web3, callback)

        } catch (e) {
            console.log(e);
            return false
        }
    }, [fromCurrency, toCurrency, amountIn, amountOut, amount, account, chainId, fromSymbol, validChainId, callback, web3])

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


export const useAmountsOut = (debouncedAmountIn, price = 0) => {
    const getAmountsOut = useCallback(() => {
        return new BigNumber(price).times(debouncedAmountIn).div(0.095).times(1e18)
    }, [debouncedAmountIn, price])
    return { getAmountsOut }
}

export const useAmountsIn = (from, debouncedAmountOut, price = 100000000) => {
    const getAmountsIn = useCallback(async () => {
        return getToWei(new BigNumber(0.095).times(debouncedAmountOut).div(price), from.decimals)
    }, [from, debouncedAmountOut, price])
    return { getAmountsIn }
}
