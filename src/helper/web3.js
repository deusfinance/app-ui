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


export function doSignTypedData(time, dataToSign, account, web3) {
    return new Promise(resolve => {
        web3.currentProvider.sendAsync({
            from: account,
            id: time,
            jsonrpc: "2.0",
            method: 'eth_signTypedData_v4',
            params: [account, dataToSign]
        }, (error, result) => {
            if (error) {
                console.error(error);
                resolve(false);
            } else if (result.error) {
                console.error(result.error.message);
                resolve(false);
            } else {
                console.log("Signature: " + result.result);
                resolve(result.result);
            }
        });
    });
}