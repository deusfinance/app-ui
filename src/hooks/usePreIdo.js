import { useWeb3React } from "@web3-react/core"
import { useCallback } from "react"
import { getPreIdoContract } from "../helper/contractHelpers"
import { getToWei } from "../helper/formatBalance"
import { SendWithToast } from "../helper/web3"
import useWeb3 from "./useWeb3"
import { DEUS_ADDRESS } from '../constant/contracts';
import { ChainId } from '../constant/web3';
import useRefresh from "./useRefresh"
import { isZero } from '../constant/number';

export const useSwap = (amountIn, amountOut, toCurrency, fromCurrency, validChainId = 137) => {
    const { account, chainId } = useWeb3React()
    const web3 = useWeb3()

    const handleSwap = useCallback(async () => {
        try {
            if (validChainId && chainId !== validChainId) return false

            let method = "buyFor"
            if (toCurrency.address === DEUS_ADDRESS[ChainId.MATIC]) {
                method = "sellFor"
            }

            const amounts = method === "buyFor" ? [amountOut, amountIn] : [amountIn, amountOut]

            const fn = getPreIdoContract(web3).methods[method](account, getToWei(amounts[0]).toFixed(), getToWei(amounts[1]).toFixed())

            return await SendWithToast(fn, { from: account }, chainId, `Swap ${amountIn} ${fromCurrency.symbol} to ${amountOut} ${toCurrency.symbol}`)
        } catch (e) {
            console.log(e);
            return false
        }
    }, [account, amountOut, amountIn, chainId, validChainId, web3, toCurrency, fromCurrency])

    return { onSwap: handleSwap }
}

export const useGetAmount = (amountIn, amountOut, toCurrency, validChainId = 137) => {
    const web3 = useWeb3()
    const { chainId } = useWeb3React()
    const { fastRefresh } = useRefresh()

    const getAmountIn = useCallback(async () => {
        try {
            if (validChainId && chainId !== validChainId) return false
            if (amountOut === "" || isZero(amountOut)) return

            let method = "calculatePurchaseAmountIn"
            if (toCurrency.address === DEUS_ADDRESS[ChainId.MATIC]) {
                method = "calculateSaleAmountIn"
            }
            return getPreIdoContract(web3, validChainId).methods[method](getToWei(amountOut).toFixed()).call()
        } catch (e) {
            console.log(e);
            return false
        }
    }, [amountOut, chainId, validChainId, web3, toCurrency, fastRefresh])

    const getAmountOut = useCallback(async () => {
        try {
            if (validChainId && chainId !== validChainId) return false
            if (amountIn === "" || isZero(amountIn)) return
            let method = "calculatePurchaseReturn"
            if (toCurrency.address === DEUS_ADDRESS[ChainId.MATIC]) {
                method = "calculateSaleReturn"
            }
            return getPreIdoContract(web3, validChainId).methods[method](getToWei(amountIn).toFixed()).call()
        } catch (e) {
            console.log(e);
            return false
        }
    }, [amountIn, chainId, validChainId, web3, toCurrency, fastRefresh])

    return { getAmountIn, getAmountOut }
}
