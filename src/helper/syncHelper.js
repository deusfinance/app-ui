import { isZero } from "../constant/number"
import { getSynchronizerContract } from "./contractHelpers"
import { getToWei } from "./formatBalance"
import { TransactionState } from "../utils/constant"
import { SwapTransaction } from "../utils/explorers"

export const sync = async (fromCurrency, toCurrency, amountIn, amountOut, oracles, type = "buy", requiredSignature, account, chainId, web3) => {
    let hash = null
    const amountInWei = getToWei(amountIn, fromCurrency.decimals).toFixed(0)
    const amountOutWei = getToWei(amountOut, toCurrency.decimals).toFixed(0)
    console.log(oracles);
    if (amountIn === "" || isZero(amountInWei) || amountOut === "" || isZero(amountOutWei)) return { status: false }

    const syncFunc = syncFuncMaker(fromCurrency, toCurrency, amountInWei, amountOutWei, oracles, type, requiredSignature, account, chainId, web3)
    let sendArgs = { from: account }
    if (fromCurrency.address === "0x") sendArgs["value"] = amountInWei

    return syncFunc
        .send(sendArgs)
        .once('transactionHash', (tx) => {
            hash = tx
            SwapTransaction(TransactionState.LOADING, {
                hash,
                from: { ...fromCurrency, amount: amountIn },
                to: { ...toCurrency, amount: amountOut },
                chainId: chainId,
            })
        })
        .once('receipt', () => SwapTransaction(TransactionState.SUCCESS, {
            hash,
            from: { ...fromCurrency, amount: amountIn },
            to: { ...toCurrency, amount: amountOut },
            chainId: chainId,
        }))
        .once('error', () => SwapTransaction(TransactionState.FAILED, {
            hash,
            from: { ...fromCurrency, amount: amountIn },
            to: { ...toCurrency, amount: amountOut },
            chainId: chainId,
        }))
}

const syncFuncMaker = (fromCurrency, toCurrency, amountInWei, amountOutWei, oracles, type = "buy", requiredSignature = 2, account, chainId, web3) => {
    const currCurrency = type === "buy" ? toCurrency : fromCurrency
    const amount = type === "buy" ? amountOutWei : amountInWei
    const data = oracles.slice(0, requiredSignature)
    return getSynchronizerContract(web3, chainId)
        .methods[type + "For"](
            account, oracles[0].multiplier,
            currCurrency.address,
            amount, oracles[0].fee.toString(),
            data.map(oracle => oracle.block_number.toString()),
            data.map(oracle => oracle.price),
            data.map(oracle => oracle["signature"].v.toString()),
            data.map(oracle => oracle["signature"].r.toString()),
            data.map(oracle => oracle["signature"].s.toString())
        )
}

export let createPriceUrls = (prices, symbol, network) => {
    let params = {
        "symbol": symbol.toUpperCase(),
        "network": network.toLowerCase(),
    }
    let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    return prices.map(api => api + '?' + queryString)
}

export let createSignaturesUrls = (prices, symbol, network, position_type, side) => {
    let params = {
        "symbol": symbol.toUpperCase(),
        "network": network.toLowerCase(),
        "position_type": position_type.toLowerCase(),
        "side": side.toLowerCase(),
    }
    let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    return prices.map(api => api + '?' + queryString)
}