import { TransactionState } from "../utils/constant"
import { SwapTransaction } from "../utils/explorers"
import { getMuonContract } from "./contractHelpers"
import { fromWei } from "./formatBalance"

export const deposit = async (fromCurrency, toCurrency, amountIn, amountOut, result, cid, signs, account, chainId, web3) => {
    // console.log(result);
    const muonContract = getMuonContract(web3, chainId)//TODO chainId
    let sendArgs = { from: account }
    if (fromCurrency.address === "0x") sendArgs["value"] = result.amount
    console.log(result.token,
        result.tokenPrice,
        result.amount,
        result.time,
        result.forAddress,
        result.addressMaxCap,
        `0x${cid.substr(1)}`,
        signs.map(s => signs[0].signature));
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
            signs.map(s => signs[0].signature))
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

export const SymbolMap = {
    "DEA": "dea",
    "DEUS": "deus",
    "ETH": "eth",
    "USDC": "usdc",
    "DAI": "dai",
    "wBTC": "wbtc",
    "sDEA": "sdea",
    "sDEUS": "sdeus",
    "sUniDE": "sUniDE",
    "sUniDD": "sUniDD",
    "sUniDU": "sUniDU",
    "BPT": "bpt",
    "BNB": "bnb",
    "BUSD": "busd",
    "xDAI": "xdai",
    "TEST": "test",
    "ERT": "ert",
}


export const getUsedAmount = async (account, chainId, web3) => {
    const muonContract = getMuonContract(web3, chainId)

    const amount = await muonContract.methods.balances(account).call()

    return fromWei(amount, 18)
}

export const getSign = async (tokenName, amount, forAddress) => {
    const baseUrl = "https://node1.muon.net/v1"
    const payload = `?app=presale&method=deposit&params[token]=${tokenName}&params[amount]=${amount}&params[forAddress]=${forAddress}`
    return fetcher(baseUrl + payload)
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



// const time = getTimestamp()
// signMsg(msgParams, '0x5629227C1E2542DbC5ACA0cECb7Cd3E02C82AD0a')

