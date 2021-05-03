import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { swap } from './callHelper'
import useWeb3 from './useWeb3'
import BigNumber from 'bignumber.js'

export const useSwap = (fromCurrency, toCurrency, amountIn, amountOut, slipage, validChainId) => {
    const { account, chainId } = useWeb3React()

    const web3 = useWeb3()
    const minAmountOut = new BigNumber(amountOut).multipliedBy((100 - Number(slipage)) / 100).toFixed(toCurrency.decimals, 1)
    const handleSwap = useCallback(async () => {
        try {
            if (validChainId && chainId !== validChainId) return false
            const tx = await swap(
                fromCurrency,
                toCurrency,
                amountIn,
                amountOut,
                minAmountOut,
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

