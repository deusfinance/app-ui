import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { getSwapAmountsOut } from './callHelper'
import useWeb3 from './useWeb3'
import useRefresh from './useRefresh'
import { isZero } from '../constant/number'

export const useGetAmountsOut = (fromCurrency, toCurrency, amountIn, validChainId) => {
    const { chainId } = useWeb3React()
    const web3 = useWeb3()
    const { fastRefresh } = useRefresh()
    const getAmountsOut = useCallback(async () => {

        try {
            if (amountIn === "" || isZero(amountIn) || (chainId && validChainId && validChainId !== chainId)) return ""
            const amount = await getSwapAmountsOut(
                fromCurrency,
                toCurrency,
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
    }, [chainId, fromCurrency, toCurrency, amountIn, web3, validChainId, fastRefresh])//React Hook useCallback has an unnecessary dependency: 'fastRefresh'

    return { getAmountsOut }
}

