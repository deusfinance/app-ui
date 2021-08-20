import { isZero } from "../constant/number"
import { ChainMap } from "../constant/web3"
import { getSynchronizerContract } from "./contractHelpers"
import { getToWei } from "./formatBalance"
import { SwapWithToast } from "./web3"

export const sync = async (fromCurrency, toCurrency, amountIn, amountOut, oracles, type = "buy", requiredSignature, account, chainId, web3) => {
    const amountInWei = getToWei(amountIn, fromCurrency.decimals).toFixed(0)
    const amountOutWei = getToWei(amountOut, toCurrency.decimals).toFixed(0)

    if (amountIn === "" || isZero(amountInWei) || amountOut === "" || isZero(amountOutWei)) return { status: false }

    const syncFunc = syncDefaultFuncMaker(fromCurrency, toCurrency, amountInWei, amountOutWei, oracles, type, requiredSignature, account, chainId, web3)

    let params = { from: account }
    if (fromCurrency.address === "0x") {
        try {
            const maxOracle = maxObj(oracles, "price")
            params["value"] = await getMaxPrice(maxOracle.price, maxOracle.fee, amountInWei, web3, chainId)
            params["gasPrice"] = getToWei(1, 9) //currently its only for xdai 
        } catch (error) {
            console.log(error);
        }
    }

    return SwapWithToast(
        syncFunc,
        {
            chainId,
            params,
            from: { ...fromCurrency, amount: amountIn },
            to: { ...toCurrency, amount: amountOut }
        }
    )
}

const syncDefaultFuncMaker = (fromCurrency, toCurrency, amountInWei, amountOutWei, oracles, type = "buy", requiredSignature = 2, account, chainId, web3) => {
    const currCurrency = type === "buy" ? toCurrency : fromCurrency
    const amount = type === "buy" ? amountOutWei : amountInWei
    const data = oracles.slice(0, requiredSignature)

    const salt = chainId !== ChainMap.XDAI ? "For" : ""
    let params = chainId !== ChainMap.XDAI ? [account] : []

    params = [
        ...params,
        oracles[0].multiplier,
        currCurrency.address,
        amount,
        oracles[0].fee,
        data.map(oracle => oracle.block_number),
        data.map(oracle => oracle.price),
        data.map(oracle => oracle["signature"].v),
        data.map(oracle => oracle["signature"].r),
        data.map(oracle => oracle["signature"].s)
    ]

    return getSynchronizerContract(web3, chainId)
        .methods[type + salt](...params)
}


export let createPriceUrls = (prices, symbol, network) => {
    let params = {
        "symbol": symbol.toUpperCase(),
        "network": network.toLowerCase(),
    }
    let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    return prices.map(api => api + '?' + queryString)
}

export let createSignaturesUrls = (urls, symbol, network, position_type, side) => {
    let params = {
        "symbol": symbol.toUpperCase(),
        "network": network.toLowerCase(),
        "position_type": position_type.toLowerCase(),
        "side": side.toLowerCase(),
    }
    let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    return urls.map(api => api + '?' + queryString)
}

export const getMaxPrice = async (maxPrice, fee, amountInWei, web3, chainId) => {
    console.log(maxPrice, fee, amountInWei);
    return getSynchronizerContract(web3, chainId)
        .methods
        .calculateXdaiAmount(maxPrice, fee, amountInWei)
        .call()
}

const maxObj = (arr, key) => arr.reduce((a, b) => a[key] >= b[key] ? a : b, {});

// const compareObj = (key) => (a, b) => {
//     const A = a[key];
//     const B = b[key];
//     let comparison = 0;
//     if (A > B) {
//         comparison = 1;
//     } else if (A < B) {
//         comparison = -1;
//     }
//     return comparison;
// }