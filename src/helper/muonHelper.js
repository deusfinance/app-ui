export const deposit = async () => {

}

export const allocation = async () => {
    return "100"
}


export const getAmoutsOut = () => {

}

export const getAmoutsIn = () => {

}

export const deposit = async (fromCurrency, toCurrency, amountIn, amountOut, minAmountOut, bptPayload, account, chainId, web3) => {
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
}
export const swapFuncMaker = (fromCurrency, amountInWei, minAmountOutWei, sealedContract, balancerMinAmountsOut) => {
    return () => 1
}
