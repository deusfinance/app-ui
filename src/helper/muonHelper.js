import { TransactionState } from "../utils/constant"
import { SwapTranaction } from "../utils/explorers"
import { getMuonContract } from "./contractHelpers"
import { fromWei } from "./formatBalance"

export const deposit = async (fromCurrency, toCurrency, amountIn, amountOut, result, cid, sigs, account, chainId, web3) => {

    const muonContract = getMuonContract(web3)//TODO chainId
    let sendArgs = { from: account }
    if (fromCurrency.symbol === "ETH") sendArgs["value"] = result.amount
    let hash = null
    return muonContract
        .methods
        .deposit(
            result.token,
            result.tokenPrice,
            result.amount,
            result.time,
            result.forAddress,
            result.addressMaxCap,
            `0x${cid.substr(1)}`,
            sigs.map(s => s.signature))
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



export const getUsedAmount = async (account, chainId, web3) => {
    const muonContract = getMuonContract(web3, chainId)//TODO chainId

    const amount = await muonContract.methods.balances(account).call()

    return fromWei(amount, 18)
}

export const getSign = async (tokenName, amount, forAddress) => {
    const baseUrl = "https://node1.muon.net/v1"
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
    return fetcher("https://app.deus.finance/muon-presale.json", { cache: "no-cache" })
}

export const getPrices = () => {
    return fetcher("https://app.deus.finance/prices.json", { cache: "no-cache" })
}


export const fetcher = async function (url, init) {
    try {
        const resp = await fetch(url, init)
        return await resp.json()
    } catch (error) {
        console.log("fetch " + url + " had some error", error);
    }
}


