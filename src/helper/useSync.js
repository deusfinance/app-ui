import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { sync } from './syncHelper'
import useWeb3 from './useWeb3'
import { isZero } from '../constant/number'
import BigNumber from 'bignumber.js'
import { getToWei } from './formatBalance'
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
    const assetPrice = assetInfo?.price
    const fee = assetInfo?.fee
    const getAmountsOut = useCallback(() => {
        if (!assetInfo || isZero(assetPrice)) return ""
        return getToWei(new BigNumber(stablePrice).times(debouncedAmountIn).times(1 - fee).div(assetPrice), to.decimals)
    }, [to, from, debouncedAmountIn, assetInfo])
    return { getAmountsOut }
}

export const useAmountsIn = (from, to, debouncedAmountOut, assetInfo, stablePrice = 1) => {
    const assetPrice = assetInfo?.price
    const fee = assetInfo?.fee
    const getAmountsIn = useCallback(async () => {
        if (!assetInfo || isZero(assetPrice)) return ""
        return getToWei(new BigNumber(assetPrice).times(debouncedAmountOut).div(stablePrice).times(1 + fee), to.decimals)

    }, [to, from, debouncedAmountOut, assetInfo])
    return { getAmountsIn }
}