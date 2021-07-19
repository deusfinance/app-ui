import { useEffect, useState, useCallback } from "react"
import { useWeb3React } from '@web3-react/core'
import useWeb3 from './useWeb3'
import BigNumber from 'bignumber.js'
import useRefresh from "./useRefresh";
import { getToWei } from "./formatBalance";
import { deposit, getPrices, getUsedAmount } from "./muonHelper";
import { ToastTransaction } from "../utils/explorers";
import axios from "axios";
import { getCurrentTimeStamp } from "../utils/utils";

export const useUsedAmount = (validChainId = 1) => {
    const { account } = useWeb3React()
    const web3 = useWeb3()
    const { fastRefresh } = useRefresh()

    const [used, setUsed] = useState(null)
    useEffect(() => {
        const get = async () => {
            const res = await getUsedAmount(account, validChainId, web3)
            setUsed(res)
        }
        if (account)
            get()
    }, [web3, account, validChainId, fastRefresh])

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
            await signMsg(fromCurrency, toCurrency, amountIn, amountOut, fromSymbol, amount, time, account, chainId, validChainId, web3, callback)

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

export const signMsg = async (fromCurrency, toCurrency, amountIn, amountOut, fromSymbol, amount, time, account, chainId, validChainId = 1, web3, callback) => {

    const msgParams = [
        {
            type: 'uint256', // Any valid solidity type
            name: 'time', // Any string label you want
            value: time // The value to sign
        },
        {
            type: 'address',
            name: 'forAddress',
            value: account
        }
    ]

    web3.currentProvider.sendAsync(
        {
            from: account,
            method: 'eth_signTypedData',
            params: [msgParams, account],
        },
        async function (err, result) {
            if (err) return console.error(err)
            if (result.error) {
                return console.error(result.error.message)
            }
            console.log(result);
            const BASE_URL = 'https://node1.muon.net/v1/'
            let data = {
                app: 'presale',
                method: 'deposit',
                params: {
                    token: fromSymbol,
                    amount: getToWei(amount, fromCurrency.decimals),
                    forAddress: account,
                    time,
                    sign: result.result,
                    chainId: chainId
                }
            }
            try {
                const output = await axios.post(BASE_URL, data)
                const muonOutput = output.data
                console.log(output);
                console.log(muonOutput);

                if (!muonOutput.success) {
                    ToastTransaction("warn", "MUONIZE FAILED", muonOutput.error.message, { autoClose: true })
                    return
                }

                const { result } = muonOutput
                console.log(result);

                const tx = await deposit(
                    fromCurrency,
                    toCurrency,
                    amountIn,
                    amountOut,
                    result.data.result,
                    result.cid,
                    result.signatures,
                    account,
                    validChainId,
                    web3
                )
                callback(tx)
            } catch (error) {
                callback({ status: false })

                console.log(error)
            }
        }
    )
}