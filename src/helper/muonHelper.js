// export const deposit = async () => {

// }


export const getAmoutsOut = () => {

}

export const getAmoutsIn = () => {

}

/* export const deposit = async (fromCurrency, toCurrency, amountIn, amountOut, minAmountOut, bptPayload, account, chainId, web3) => {
    let hash = null
    const amountInWei = getToWei(amountIn, fromCurrency.decimals).toFixed(0)
    const minAmountOutWei = getToWei(minAmountOut, toCurrency.decimals).toFixed(0)

    if (amountIn === "" || isZero(amountInWei) || amountOut === "" || isZero(minAmountOutWei)) return { status: false }
    let sealedContract = getSealedSwapperContract(SEALED_ADDRESS, web3)
    const swapFunc = swapFuncMaker(fromCurrency, amountInWei, minAmountOutWei, sealedContract, bptPayload)
    let sendArgs = { from: account }
    if (fromCurrency.symbol === "ETH") sendArgs["value"] = amountInWei
    return swapFunc
        .send(sendArgs)
        .once('transactionHash', (tx) => {
            hash = tx
            SwapTranaction(TransactionState.LOADING, {
                hash,
                from: { ...fromCurrency, amount: amountIn },
                to: { ...toCurrency, amount: amountOut },
                chainId: chainId,
            })
        })
        .once('receipt', () => SwapTranaction(TransactionState.SUCCESS, {
            hash,
            from: { ...fromCurrency, amount: amountIn },
            to: { ...toCurrency, amount: amountOut },
            chainId: chainId,
        }))
        .once('error', () => SwapTranaction(TransactionState.FAILED, {
            hash,
            from: { ...fromCurrency, amount: amountIn },
            to: { ...toCurrency, amount: amountOut },
            chainId: chainId,
        }))
} */
export const swapFuncMaker = (fromCurrency, amountInWei, minAmountOutWei, sealedContract, balancerMinAmountsOut) => {
    return () => 1
}

//https://app.deus.finance/prices.json


export const getSign = async (tokenName, amount, forAddress) => {
    const baseUrl = "http://104.131.177.195:8080/v1"
    const payload = `?app=presale&method=deposit&params[token]=${tokenName}&params[amount]=${amount}&params[forAddress]=${forAddress}`
    return fetcher(baseUrl + payload)
    // const data = {
    //     "app": "presale",
    //     "method": "deposit",
    //     "params": {
    //         "token": tokenName,
    //         "amount": amount,
    //         "forAddress": forAddress
    //     }
    // }

    // return fetcher(baseUrl, {
    //     method: 'POST',
    //     body: JSON.stringify(data)
    // })
}

export const getAllocation = async () => {
    return fetcher("https://app.deus.finance/muon-presale.json")
}

export const getPrices = () => {
    return fetcher("https://app.deus.finance/prices.json")
}


export const fetcher = async function (url, init) {
    try {
        const resp = await fetch(url, init)
        return await resp.json()
    } catch (error) {
        console.log("fetch " + url + " had some error", error);
    }
}


