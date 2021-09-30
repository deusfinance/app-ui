import React from 'react';
import { MIGRATOR_ADDRESS } from "../constant/contracts"
import { ToastTransaction } from "../utils/explorers"
import { doSignTypedData, SendWithToast } from "./web3"
import axios from "axios"
import BigNumber from "bignumber.js"
import { getMigrationContract } from "./contractHelpers"
import { ChainId } from "../constant/web3"
import { TransactionState } from "../utils/constant"

const NameChainId = {
    1: 'ETH Mainnet',
    4: 'Rinkeby',
    137: 'Polygon Mainnet'
}

export const BASE_URL = 'https://oracle5.deus.finance/migrator' //Main
export const BASE_URL2 = 'https://oracle5.deus.finance/migrator2' //Main

export const migrateTX = async (results, migrationOption, account, chainId, web3) => {
    const migrationContract = getMigrationContract(web3, chainId)
    const amounts = results[0].amount
    const expireBlocks = results.map(result => result.expireBlock)
    const signatures = results.map(result => result.signature)
    let migrationStatus = ""
    for (var i = 0; i < migrationOption.length; i++) {
        migrationStatus += migrationOption.charAt(i) === "0" ? "0" : "1"
    }
    migrationStatus = parseInt(migrationStatus, 2).toString()
    console.log(amounts);
    console.log(amounts.map(amount => new BigNumber(amount).toFixed(0)),
        expireBlocks,
        migrationStatus,
        signatures);

    const fn = migrationContract
        .methods
        .migrate(
            amounts.map(amount => new BigNumber(amount).toFixed()),
            expireBlocks,
            migrationStatus,
            signatures
        )

    return SendWithToast(fn, { from: account }, chainId, "Migrate to " + NameChainId[chainId])
}

export const signMsg = async (requestIds, migrateOption, time, account, chainId, web3) => {
    let eip712TypedData = {
        types: {
            EIP712Domain: [
                { name: "name", type: "string" },
                { name: "chainId", type: "uint256" },
                { "name": 'version', "type": 'string' },
                { "name": "verifyingContract", "type": "address" }
            ],
            Message: [
                { name: "from", type: "address" },
                { name: "requestIds", type: "string" },
                { name: "migrateOption", type: "string" },
                { name: "contents", type: "string" },
                { name: "timeStamp", type: "uint256" }
            ]
        },
        primaryType: "Message",
        domain: {
            name: "Deus Migrate",
            chainId: chainId,
            version: "1",
            verifyingContract: MIGRATOR_ADDRESS[chainId],
        },
        message: {
            from: account,
            requestIds: requestIds,
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


export const getRandomNumber = async (account, url) => {
    const data = { address: account }
    try {
        const output = await axios.post(url + "/getRandom", data)
        return output.data.randomNumber
    } catch (error) {
        console.log("getRandom failed ", error.response.data);
    }
}



export const doMigration = async (requestIds, migrateOption, timeStamp, account, chainId, validChainId = 1, web3, callback) => {

    if (validChainId !== chainId) return

    const signature = await signMsg(requestIds, migrateOption, timeStamp, account, validChainId, web3)
    let status = {}
    if (!signature) {
        ToastTransaction("warn", "Failed to sign", "", { autoClose: true })
        return
    } else {
        console.log("signature is ", signature);
    }

    let data = {
        requestIds,
        address: account,
        signature,
        chainId: `${validChainId}`,
        migrateOption,
        timeStamp
    }

    try {
        console.log(data);
        const output = await axios.post(BASE_URL + "/migrate", data)
        const oracleResult = output.data
        console.log(oracleResult);

        if (oracleResult.message) {
            ToastTransaction("warn", "Migration Failed", oracleResult.message, { autoClose: true })
            return { message: oracleResult.message, success: false }
        }

        const output2 = await axios.post(BASE_URL2 + "/migrate", data)
        const oracleResult2 = output2.data
        console.log(oracleResult2);

        if (oracleResult2.message) {
            ToastTransaction("warn", "Migration Failed", oracleResult.message, { autoClose: true })
            return { message: oracleResult2.message, success: false }
        }

        //<ExternalLink href={getTransactionLink(ChainId.MATIC, oracleResult2, "transaction")}> View on explorer</ExternalLink> 
        if (validChainId === ChainId.MATIC) {
            ToastTransaction(TransactionState.SUCCESS, "Migration started", <div>Please allow a few minutes for your new tokens to reflect on the destination chain </div>, { autoClose: true })
            return
        }
        const tx = await migrateTX([oracleResult, oracleResult2], migrateOption, account, chainId, web3)
        console.log(tx);

    } catch (error) {
        console.log(error);
        if (error.response.data.message) {
            ToastTransaction("warn", "Migration Failed", error.response.data.message, { autoClose: true })
            status = { message: error.response.data.message, success: false }
        }
        console.log("getTx failed ", error.response.data);
    }
    return status
}

