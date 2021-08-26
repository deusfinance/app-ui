import { TransactionState } from "../utils/constant"
import { CustomTransaction, SwapTransaction } from "../utils/explorers"

export const SendWithToast = (fn, payload = {}, chainId, message) => {
    if (!fn) return
    let hash = null
    return fn
        .send({ ...payload })
        .once('transactionHash', (tx) => {
            hash = tx
            CustomTransaction(TransactionState.LOADING, {
                hash,
                chainId: chainId,
                message: message,
            })
        })
        .once('receipt', () => CustomTransaction(TransactionState.SUCCESS, {
            hash,
            chainId: chainId,
            message: message,
        }))
        .once('error', () => CustomTransaction(TransactionState.FAILED, {
            hash,
            chainId: chainId,
            message: message,
        }))
}

//WRITE FUNCTIONS
export const SwapWithToast = (fn, payload = {}) => {
    if (!fn) return
    const { params, from, to, chainId } = payload
    let hash = null
    return fn
        .send({ ...params })
        .once('transactionHash', (tx) => {
            hash = tx
            SwapTransaction(TransactionState.LOADING, { hash, chainId, from, to })
        })
        .once('receipt', () => SwapTransaction(TransactionState.SUCCESS, { hash, chainId, from, to }))
        .once('error', () => SwapTransaction(TransactionState.FAILED, { hash, chainId, from, to }))
}
