import { MIGRATOR_ADDRESS } from "../constant/contracts"
import { NameChainId } from "../constant/web3"
import { ToastTransaction } from "../utils/explorers"
import { doSignTypedData } from "./web3"
import axios from "axios"
import { isZero, ZERO } from "../constant/number"
import BigNumber from "bignumber.js"


const BASE_URL = 'https://oracle5.deus.finance/migrator' //Main


export const signMsg = async (requestId, migrateOption, time, account, chainId, web3) => {
    let eip712TypedData = {
        types: {
            EIP712Domain: [
                { name: "name", type: "string" },
                { name: "chainId", type: "uint256" },
                // { name: "migratorContract", type: "address" },
                { "name": 'version', "type": 'string' },
                { "name": "verifyingContract", "type": "address" }
            ],
            Message: [
                { name: "from", type: "address" },
                { name: "requestId", type: "string" },
                { name: "migrateOption", type: "string" },
                { name: "contents", type: "string" },
                { name: "timeStamp", type: "uint256" }
            ]
        },
        primaryType: "Message",
        domain: {
            name: "Deus Migrate",
            chainId: chainId,
            version: 1,
            verifyingContract: MIGRATOR_ADDRESS[chainId],
        },
        message: {
            from: account,
            requestId: requestId,
            migrateOption: migrateOption,
            timeStamp: time,
            contents: `I'm a user with Wallet address ${account} intending to migrate to ${NameChainId[chainId]} network.`,
        },
    }

    console.log(eip712TypedData);
    let dataToSign = JSON.stringify(eip712TypedData)
    return doSignTypedData(time, dataToSign, account, web3)
}

export const getMigrationOption = (migratedList) => {
    let option = ""
    for (let i = 0; i < 6; i++) {
        option += migratedList[i] ? migratedList[i].index : "0"
    }
    return option
}


export const getRandomNumber = async (account) => {
    const data = { address: account }
    try {
        const output = await axios.post(BASE_URL + "/getRandom", data)
        return output
    } catch (error) {
        console.log("getRandom failed ", error.response.data);
    }
}

export const doMigration = async (requestId, migrateOption, timeStamp, account, chainId, validChainId = 1, web3, callback) => {

    if (validChainId !== chainId) return

    const signature = await signMsg(requestId, migrateOption, timeStamp, account, chainId, web3)

    if (!signature) {
        ToastTransaction("warn", "Failed to sign", "", { autoClose: true })
        return
    } else {
        console.log("signature is ", signature);
    }

    let data = {
        address: account,
        // signature: signature.slice(2),
        signature,
        chainId: `${chainId}`,
        migrateOption,
        timeStamp
    }

    try {
        console.log(data);
        const output = await axios.post(BASE_URL + "/migrate", data)
        const oracleResult = output.data
        console.log(output);
        console.log(oracleResult);

        if (!oracleResult.success) {
            const errorMessage = oracleResult.error.message ? oracleResult.error.message : oracleResult.error ? oracleResult.error : ""
            ToastTransaction("warn", "MIGRATION FAILED", errorMessage, { autoClose: true })
            return
        }

        const { result } = oracleResult
        console.log(result);

        // const tx = await deposit(
        //     fromCurrency,
        //     toCurrency,
        //     amountIn,
        //     amountOut,
        //     result.data.result,
        //     result.cid,
        //     result.signatures,
        //     account,
        //     validChainId,
        //     web3
        // )
        // callback(tx)
    } catch (error) {
        // callback({ status: false })
        console.log("getTx failed ", error.response.data);
    }
}


export const convertRate = (tokens) => {
    let { from, to } = tokens

    const V1_PER_DEUS_RATE = {
        "DEA": 1,
        "sDEA": 1,
        "DEUS": 0.05,
        "sDEUS": 0.05,
        "sUNI-DD": 0.5,
        "sUNI-DE": 4.8,
        "sUNI-DU": 2.7,
        "BPT": 0,
        "Uni-DEUS/DEA": 0.5,
        "Uni-DEA/USDC": 2.7,
        "Uni-DEUS/ETH": 4.8,
    }

    const V2_PER_DEUS_RATE = {
        "DEUS": 1,
        "DEUS/DEI LP": 1.5,
    }

    let totalBalanceInDEA = ZERO

    for (let i = 0; i < from.length; i++) {
        const adder = new BigNumber(from[i].balance).times(V1_PER_DEUS_RATE[from[i].symbol])
        totalBalanceInDEA = totalBalanceInDEA.plus(adder)
    }

    if (from.length === 4 && !isZero(from[3].balance)) {
        const DEA_balance_from_BPT_to_DEA = new BigNumber(from[3].DEA_balance_from_BPT).times(V1_PER_DEUS_RATE["DEA"])
        const DEA_balance_from_BPT_to_SDEA = new BigNumber(from[3].SDEA_balance_from_BPT).times(V1_PER_DEUS_RATE["sDEA"])
        const sUniDD_balance_from_BPT_to_DEA = new BigNumber(from[3].sUniDD_balance_from_BPT).times(V1_PER_DEUS_RATE["sUNI-DD"])
        const sUniDE_balance_from_BPT_to_DEA = new BigNumber(from[3].sUniDE_balance_from_BPT).times(V1_PER_DEUS_RATE["sUNI-DE"])
        const sUniDU_balance_from_BPT_to_DEA = new BigNumber(from[3].sUniDU_balance_from_BPT).times(V1_PER_DEUS_RATE["sUNI-DU"])
        const SDEUS_balance_from_BPT_to_DEA = new BigNumber(from[3].SDEUS_balance_from_BPT).times(V1_PER_DEUS_RATE["sDEUS"])

        totalBalanceInDEA = totalBalanceInDEA
            .plus(DEA_balance_from_BPT_to_DEA)
            .plus(DEA_balance_from_BPT_to_SDEA)
            .plus(sUniDD_balance_from_BPT_to_DEA)
            .plus(sUniDE_balance_from_BPT_to_DEA)
            .plus(sUniDU_balance_from_BPT_to_DEA)
            .plus(SDEUS_balance_from_BPT_to_DEA)
    }

    for (let i = 0; i < to.length; i++) {
        to[i].amount = totalBalanceInDEA.div(V2_PER_DEUS_RATE[to[i].symbol]).toFixed()
    }

    return { from, to }
}