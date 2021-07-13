import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { sync } from './syncHelper'
import useWeb3 from './useWeb3'
import { isZero } from '../constant/number'
import BigNumber from 'bignumber.js'
import { getToWei } from './formatBalance'
export const useSync = (fromCurrency, toCurrency, amountIn, amountOut, getSignatures, type, validChainId) => {
    const { account, chainId } = useWeb3React()

    const web3 = useWeb3()
    const handleSync = useCallback(async () => {
        try {
            if (validChainId && chainId !== validChainId) return false
            const chooseCurrency = type === "sell" ? fromCurrency : toCurrency
            const signitures = await getSignatures()
            const oracles = signitures.map(signiture => signiture[chooseCurrency.address])
            const requiredSignitures = 2
            const tx = await sync(
                fromCurrency,
                toCurrency,
                amountIn,
                amountOut,
                oracles,
                type,
                requiredSignitures,
                account,
                chainId,
                web3,
            )
            return tx
        } catch (e) {
            console.log(e);
            return false
        }
    }, [account, chainId, validChainId, fromCurrency, toCurrency, amountIn, type, amountOut, getSignatures, web3])
    return { onSync: handleSync }
}

export const useAmountsOut = (from, to, debouncedAmountIn, assetInfo) => {
    const { fromPrice, toPrice, fee } = assetInfo
    const getAmountsOut = useCallback(() => {
        if (!fromPrice || isZero(toPrice)) return ""
        return getToWei(new BigNumber(fromPrice).times(debouncedAmountIn).times(1 - fee).div(toPrice), to.decimals)
    }, [to, from, debouncedAmountIn, assetInfo])
    return { getAmountsOut }
}

export const useAmountsIn = (from, to, debouncedAmountOut, assetInfo) => {
    const { fromPrice, toPrice, fee } = assetInfo
    const getAmountsIn = useCallback(async () => {
        if (!fromPrice || isZero(toPrice)) return ""
        return getToWei(new BigNumber(toPrice).times(debouncedAmountOut).div(fromPrice).times(1 + fee), to.decimals)
    }, [to, from, debouncedAmountOut, assetInfo])
    return { getAmountsIn }
}