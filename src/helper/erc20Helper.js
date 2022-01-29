import { ethers } from "ethers"
import { TransactionState } from "../constant/web3"
import { ApproveTransaction } from "../utils/explorers"


export const approve = async (contract, contractAddress, account, payload) => {
    let hash = null
    return contract.methods
        .approve(contractAddress, ethers.constants.MaxUint256.toString())
        .send({ from: account, ...payload })
        .once('transactionHash', (tx) => {
            hash = tx
            ApproveTransaction(TransactionState.LOADING, {
                hash,
                from: payload.currency,
                chainId: payload.chainId,
            })
        })
        .once('receipt', () => ApproveTransaction(TransactionState.SUCCESS, {
            hash,
            from: payload.currency,
            chainId: payload.chainId,
        }))
        .once('error', () => ApproveTransaction(TransactionState.FAILED, {
            hash,
            from: payload.currency,
            chainId: payload.chainId,
        }))
}
