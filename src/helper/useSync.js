import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { sync } from './syncHelper'
import useWeb3 from './useWeb3'
import { isZero } from '../constant/number'

export const useSync = (fromCurrency, toCurrency, amountIn, amountOut, oracles, validChainId) => {
    const { account, chainId } = useWeb3React()

    const web3 = useWeb3()
    const handleSync = useCallback(async () => {
        try {
            if (validChainId && chainId !== validChainId) return false
            const tx = await sync(
                fromCurrency,
                toCurrency,
                amountIn,
                amountOut,
                oracles,
                account,
                chainId,
                web3,
            )
            return tx
        } catch (e) {
            console.log(e);
            return false
        }
    }, [account, chainId, validChainId, fromCurrency, toCurrency, amountIn, amountOut, web3])
    return { onSync: handleSync }
}

export const useAmountsOut = (from, to, debouncedAmountIn, assetInfo, stablePrice = 1) => {
    const { fee, price: assetPrice } = assetInfo
    const getAmountsOut = useCallback(() => {
        if (isZero(price)) return ""
        return getToWei(new BigNumber(price).times(debouncedAmountIn).div(assetPrice).times(1 + fee), to.decimals)
    }, [to, from, debouncedAmountIn, assetInfo])
    return { getAmountsOut }
}

export const useAmountsIn = (from, to, debouncedAmountOut, assetInfo, stablePrice = 1) => {
    const { fee, price: assetPrice } = assetInfo
    const getAmountsIn = useCallback(async () => {
        return getToWei(new BigNumber(stablePrice).times(debouncedAmountOut).times(1 - fee).div(assetPrice), to.decimals)
    }, [to, from, debouncedAmountOut, assetInfo])
    return { getAmountsIn }
}