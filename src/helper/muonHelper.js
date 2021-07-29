import axios from "axios"
import { TransactionState } from "../utils/constant"
import { SwapTransaction, ToastTransaction } from "../utils/explorers"
import { getMuonContract } from "./contractHelpers"
import { fromWei, getToWei } from "./formatBalance"

export const deposit = async (fromCurrency, toCurrency, amountIn, amountOut, result, cid, signs, account, chainId, web3) => {
    const muonContract = getMuonContract(web3, chainId)
    let sendArgs = { from: account }
    if (fromCurrency.address === "0x") sendArgs["value"] = result.amount
    console.log(result.token,
        result.tokenPrice,
        result.amount,
        result.time,
        result.forAddress,
        result.addressMaxCap,
        `0x${cid.substr(1)}`,
        signs.map(s => s.signature));
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
            signs.map(s => s.signature))
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

function doSignTypedData(time, dataToSign, account, web3) {
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

export const signMsg = async (time, account, web3) => {

    let eip712TypedData = {
        types: {
            EIP712Domain: [{ name: "name", type: "string" }],
            Message: [{ type: 'uint256', name: 'time' }, { type: 'address', name: 'forAddress' }]
        },
        domain: { name: "MUON Presale" },
        primaryType: "Message",
        message: { time: time, forAddress: account }
    }
    let dataToSign = JSON.stringify(eip712TypedData)
    return doSignTypedData(time, dataToSign, account, web3)
}

export const buyMuon = async (fromCurrency, toCurrency, amountIn, amountOut, fromSymbol, amount, time, account, chainId, validChainId = 1, web3, callback) => {

    const signature = await signMsg(time, account, web3)

    if (!signature)
        ToastTransaction("warn", "Failed to sign", "", { autoClose: true })

    const BASE_URL = 'https://node1.muon.net/v1/'
    let data = {
        app: 'presale',
        method: 'deposit',
        params: {
            token: fromSymbol,
            amount: getToWei(amount, fromCurrency.decimals),
            forAddress: account,
            time,
            sign: signature,
            chainId: chainId
        }
    }
    try {
        const output = await axios.post(BASE_URL, data)
        const muonOutput = output.data
        console.log(output);
        console.log(muonOutput);

        if (!muonOutput.success) {
            const errorMessage = muonOutput.error.message ? muonOutput.error.message : muonOutput.error ? muonOutput.error : ""
            ToastTransaction("warn", "MUONIZE FAILED", errorMessage, { autoClose: true })
            return
        }

        const { result } = muonOutput
        console.log(result);

        const tx = await deposit(
            fromCurrency,
            toCurrency,
            amountIn,
            amountOut,
            result.data.result,
            result.cid,
            result.signatures,
            account,
            validChainId,
            web3
        )
        callback(tx)
    } catch (error) {
        callback({ status: false })

        console.log(error)
    }
}


