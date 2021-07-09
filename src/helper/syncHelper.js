import { isZero } from "../constant/number"
import { getSynchronizerContract } from "./contractHelpers"
import { getToWei } from "./formatBalance"
import { TransactionState } from "../utils/constant"
import { ApproveTranaction, SwapTranaction } from "../utils/explorers"
import { ethers } from "ethers"


export const sync = async (fromCurrency, toCurrency, amountIn, amountOut, oracles, type, account, chainId, web3) => {
    let hash = null
    const amountInWei = getToWei(amountIn, fromCurrency.decimals).toFixed(0)
    const amountOutWei = getToWei(amountOut, toCurrency.decimals).toFixed(0)

    if (amountIn === "" || isZero(amountInWei) || amountOut === "" || isZero(amountOutWei)) return { status: false }

    const syncFunc = syncFuncMaker(fromCurrency, toCurrency, amountInWei, amountOutWei, oracles, type = "buy", account, chainId, web3)
    let sendArgs = { from: account }
    return syncFunc
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


const syncFuncMaker = (fromCurrency, toCurrency, amountInWei, amountOutWei, oracles, type = "buy", requiredSignitures = 2, account, chainId, web3) => {
    const currCurrency = type === "buy" ? toCurrency : fromCurrency
    const amount = type === "buy" ? amountOutWei : amountInWei
    const data = oracles.slice(0, requiredSignitures)
    return getSynchronizerContract(web3, chainId)
        .methods[type + "For"](
            account, oracles[0].multiplier,
            currCurrency.address,
            amount, oracles[0].fee.toString(),
            data.map(oracle => oracle.blockNo.toString()),
            data.map(oracle => oracle.price),
            data.map(oracle => oracle["signs"][type].v.toString()),
            data.map(oracle => oracle["signs"][type].r.toString()),
            data.map(oracle => oracle["signs"][type].s.toString())
        )
}

const syncFuncMakerOld = (fromCurrency, toCurrency, amountInWei, amountOutWei, oracles, type = "buy", account, chainId, web3) => {
    const currCurrency = type === "buy" ? toCurrency : fromCurrency
    const amount = type === "buy" ? amountOutWei : amountInWei
    return getSynchronizerContract(web3, chainId)
        .methods[type + "For"](
            account, oracles[0].multiplier,
            currCurrency.address,
            amount, oracles[0].fee.toString(),
            [oracles[0].blockNo.toString(), oracles[1].blockNo.toString()],
            [oracles[0].price, oracles[1].price],
            [oracles[0]["signs"][type].v.toString(), oracles[1]["signs"][type].v.toString()],
            [oracles[0]["signs"][type].r.toString(), oracles[1]["signs"][type].r.toString()],
            [oracles[0]["signs"][type].s.toString(), oracles[1]["signs"][type].s.toString()])
}
