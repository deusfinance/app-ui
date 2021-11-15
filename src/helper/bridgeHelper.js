import { BRIDGE_ADDRESS } from "../constant/contracts"
import { getBridgeContract, } from "./contractHelpers"
import { getToWei } from "./formatBalance"
import multicall from "./multicall"
import BridgeABI from '../config/abi/BridgeABI.json'
import { blockTimes } from "../components/Bridge/data"
import { forEach } from "lodash"


export const deposit = (amount, fromCurrency, toCurrency, web3, account) => {
    const amountWie = getToWei(amount, fromCurrency.decimals).toFixed(0)
    console.log("deposit", amount, amountWie, toCurrency.chainId, fromCurrency.id)
    return getBridgeContract(web3, fromCurrency.chainId)
        .methods
        .deposit(amountWie, toCurrency.chainId, fromCurrency.id)
}


export const getClaimTokens = async (networks, account, web3s) => {

    let claims = []

    for (let index = 0; index < networks.length; index++) {
        const chainId = networks[index]
        let dest = networks.filter((network) => network !== chainId)

        let userTxs = []
        let userTxsResponse = []
        let pendingClaimTxs = []
        let currentBlockNo = await web3s[chainId].eth.getBlockNumber()

        for (let i = 0; i < dest.length; i++) {
            const destChainId = dest[i]
            const userTx = {
                address: BRIDGE_ADDRESS[chainId],
                name: "getUserTxs",
                params: [account, destChainId]
            }
            userTxs.push(userTx)
        }

        try {
            const mul = await multicall(web3s[chainId], BridgeABI, userTxs, chainId)
            userTxsResponse = mul
            // console.log("userTxsResponse", userTxsResponse);
        } catch (error) {
            console.log("getUserTxs failed", error)
        }

        for (let i = 0; i < dest.length; i++) {
            const destChainId = dest[i]
            try {
                const pendingTx = await getBridgeContract(web3s[destChainId], destChainId)
                    .methods
                    .pendingTxs(chainId, userTxsResponse[i][0].map(resp => resp.toString()))
                    .call()

                const pendingTxs = pendingTx.reduce((out, bool, index) => (bool ? out : out.concat(userTxsResponse[i][0][index])), [])

                pendingClaimTxs = [...pendingClaimTxs, ...pendingTxs]

            } catch (error) {
                console.log("pendingTxs failed", error)
            }
        }

        const Txs = []
        for (let k = 0; k < pendingClaimTxs.length; k++) {
            const tx = {
                address: BRIDGE_ADDRESS[chainId],
                name: "txs",
                params: [pendingClaimTxs[k]]
            }
            Txs.push(tx)
        }

        try {
            const mul = await multicall(web3s[chainId], BridgeABI, Txs, chainId)
            let mulWithClaimBlock = []
            forEach(mul, (res, index) => {
                mulWithClaimBlock.push({ ...res, remainingBlock: Number(res.txBlockNo) + blockTimes[chainId] - Number(currentBlockNo) })
            })

            // console.log("Txs = ", mul);
            claims = [...claims, ...mulWithClaimBlock]
        } catch (error) {
            console.log("Txs failed", error)
        }
    }
    return claims
}
