import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { sync } from './syncHelper'
import useWeb3 from './useWeb3'

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

