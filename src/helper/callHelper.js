import { ethers } from "ethers"
import { TransactionState } from "../utils/constant"
import { ApproveTranaction, SwapTranaction } from "../utils/explorers"
import { getDeusAutomaticMarketMakerContract, getMultiSwapContract, getUniswapRouterContract } from "./contractHelpers"
import { getToWei } from "./formatBalance"
import graph from '../constant/path.json'
import graphTest from '../constant/pathTest.json'
import addrs from '../constant/addresses.json'
import { getTokenAddr } from "../utils/contracts"


export const approve = async (contract, contractAddress, account, payload) => {
    let hash = null
    return contract.methods
        .approve(contractAddress, ethers.constants.MaxUint256)
        .send({ from: account })
        .once('transactionHash', (tx) => {
            hash = tx
            ApproveTranaction(TransactionState.LOADING, {
                hash,
                from: payload.currency,
                chainId: payload.chainId,
            })
        })
        .once('receipt', () => ApproveTranaction(TransactionState.SUCCESS, {
            hash,
            from: payload.currency,
            chainId: payload.chainId,
        }))
        .once('error', () => ApproveTranaction(TransactionState.FAILED, {
            hash,
            from: payload.currency,
            chainId: payload.chainId,
        }))
}

export const swap = async (fromCurrency, toCurrency, amountIn, amountOut, minAmountOut, account, chainId, web3) => {
    let hash = null
    const amountInWei = getToWei(amountIn, fromCurrency.decimals)
    const minAmountOutWei = getToWei(minAmountOut, toCurrency.decimals)
    console.log(minAmountOutWei.toNumber(), chainId);

    if (amountIn === "" || amountInWei.isZero() || amountOut === "" || minAmountOutWei.isZero()) return { status: false }

    const swapFunc = swapFuncMaker(fromCurrency, toCurrency, amountInWei, minAmountOutWei, account, chainId, web3)
    let sendArgs = sendAgrsMaker(fromCurrency, toCurrency, amountInWei, account, chainId)
    return swapFunc
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

const swapFuncMaker = (fromCurrency, toCurrency, amountIn, minAmountOut, account, chainId, web3) => {

    const getTokenAddr = (tokenName) => addrs["token"][tokenName][chainId.toString()]
    const deusAddress = getTokenAddr("deus")
    const wethAddress = getTokenAddr("weth")
    const currGrapth = chainId === 4 ? graphTest : graph

    let path = currGrapth[fromCurrency.symbol.toLowerCase()][toCurrency.symbol.toLowerCase()]
    var deusIndex = path.indexOf(deusAddress);

    console.log(amountIn.toString(), minAmountOut.toString());
    console.log(path);
    console.log(deusIndex);

    if (fromCurrency.symbol === "ETH" && toCurrency.symbol === "DEUS")
        return getDeusAutomaticMarketMakerContract(web3, chainId)
            .methods
            .buy(minAmountOut)

    if (fromCurrency.symbol === "DEUS" && toCurrency.symbol === "ETH") {
        return getMultiSwapContract(web3, chainId)
            .methods
            .uniDeusEth(amountIn, [], minAmountOut)
    }

    if (deusIndex === -1) {
        if (path[0] === wethAddress) {
            const deadline = Math.floor(Date.now() / 1000) + 60 * 5000;
            return getUniswapRouterContract(web3, chainId)
                .methods
                .swapExactETHForTokens(minAmountOut, path, account, deadline)
        }
        else if (path[path.length - 1] === wethAddress) {
            return getMultiSwapContract(web3, chainId)
                .methods
                .tokensToEthOnUni(amountIn, path, minAmountOut)
        } else {
            return getMultiSwapContract(web3, chainId)
                .methods
                .tokensToTokensOnUni(amountIn, path, minAmountOut)
        }
    }
    if (deusIndex === path.length - 1) {
        if (path[path.length - 2] === wethAddress) {
            let newPath = path.slice(0, deusIndex)
            console.log(amountIn.toString(), newPath, [], minAmountOut.toString());
            return getMultiSwapContract(web3, chainId)
                .methods
                .uniEthDeusUni(amountIn, newPath, [], minAmountOut)
        } else {
            return getMultiSwapContract(web3, chainId)
                .methods
                .tokensToTokensOnUni(amountIn, path, minAmountOut)
        }
    }
    if (deusIndex === 0) {
        if (path[1] === wethAddress) {
            let newPath = path.slice(1)
            return getMultiSwapContract(web3, chainId)
                .methods
                .deusEthUni(amountIn, newPath, minAmountOut)
        } else {
            return getMultiSwapContract(web3, chainId)
                .methods
                .tokensToTokensOnUni(amountIn, path, minAmountOut)
        }
    }
    if (path[deusIndex - 1] === wethAddress) {
        let path1 = path.slice(0, deusIndex)
        let path2 = path.slice(deusIndex)
        if (path1.length > 1) {
            return getMultiSwapContract(web3, chainId)
                .methods
                .uniEthDeusUni(amountIn, path1, path2, minAmountOut)
        } else {
            let newPath = path.slice(deusIndex)
            return getMultiSwapContract(web3, chainId)
                .methods
                .ethDeusUni(newPath, minAmountOut)
        }
    }
    if (path[deusIndex + 1] === wethAddress) {
        let path1 = path.slice(0, deusIndex + 1)
        let path2 = path.slice(deusIndex + 1)

        if (path1.length >= 2 && path2.length <= 1) {
            return getMultiSwapContract(web3, chainId)
                .methods
                .uniDeusEth(amountIn, path1, minAmountOut)
        }
        if (path1.length >= 2 && path2.length >= 2) {
            return getMultiSwapContract(web3, chainId)
                .methods
                .uniDeusEthUni(amountIn, path1, path2, minAmountOut)
        }
    }
}

const sendAgrsMaker = (fromCurrency, toCurrency, amountIn, account, chainId) => {
    const getTokenAddr = (tokenName) => addrs["token"][tokenName][chainId.toString()]
    const wethAddress = getTokenAddr("weth")
    const currGrapth = chainId === 4 ? graphTest : graph

    let path = currGrapth[fromCurrency.symbol.toLowerCase()][toCurrency.symbol.toLowerCase()]
    if (path[0] === wethAddress) {
        return { from: account, value: amountIn }
    }
    return { from: account }
}

export const getSwapAmountsOut = async (fromCurrency, toCurrency, amountIn, chainId, web3) => {

    const currGrapth = chainId === 4 ? graphTest : graph
    const path = currGrapth[fromCurrency.symbol.toLowerCase()][toCurrency.symbol.toLowerCase()]

    const wethAddress = getTokenAddr("weth", chainId)
    const deusAddress = getTokenAddr("deus", chainId)
    const deusIndex = path.indexOf(deusAddress);


    const calculatePurchaseReturn = async (amountIn) => {
        try {
            return getDeusAutomaticMarketMakerContract(web3, chainId)
                .methods
                .calculatePurchaseReturn(amountIn)
                .call()
        } catch (error) {
            console.log(error);
        }
    }

    const calculateSaleReturn = async (amountIn) => {
        try {
            return getDeusAutomaticMarketMakerContract(web3, chainId)
                .methods
                .calculateSaleReturn(amountIn)
                .call()
        } catch (error) {
            console.log(error);
        }
    }

    const uniGetAmountsOut = async (amountIn, path = []) => {
        console.log(path);
        try {
            const amountsOut = await getUniswapRouterContract(web3, chainId)
                .methods.getAmountsOut(amountIn, path)
                .call()
            return amountsOut[amountsOut.length - 1]
        } catch (error) {
            console.log(error);
        }
    }

    const amountInWeid = getToWei(amountIn, fromCurrency.decimals)
    try {
        if (fromCurrency.symbol === "ETH" && toCurrency.symbol === "DEUS")
            return calculatePurchaseReturn(amountInWeid)
        if (fromCurrency.symbol === "DEUS" && toCurrency.symbol === "ETH") {
            return calculateSaleReturn(amountInWeid)
        }

        if (deusIndex === -1) {
            return uniGetAmountsOut(amountInWeid, path)
        }

        if (deusIndex === path.length - 1) {
            if (wethAddress === path[path.length - 2]) {
                const newPath = path.slice(0, path.length - 1);
                const amountsOutUni = await uniGetAmountsOut(amountInWeid, newPath)
                return calculatePurchaseReturn(amountsOutUni)
            } else {
                return uniGetAmountsOut(amountInWeid, path)
            }
        }
        if (deusIndex === 0) {
            if (path[1] === wethAddress) {
                const newPath = path.slice(1);
                const amountsOutAMM = await calculateSaleReturn(amountInWeid)
                return uniGetAmountsOut(amountsOutAMM, newPath)
            } else {
                return uniGetAmountsOut(amountInWeid, path)
            }
        }
        if (path[deusIndex - 1] === wethAddress) {
            let path1 = path.slice(0, deusIndex)
            let path2 = path.slice(deusIndex)
            if (path1.length > 1) {
                const amountsOutUni = await uniGetAmountsOut(amountInWeid, path1)
                const amountsOutAMM = await calculatePurchaseReturn(amountsOutUni)
                if (path2.length > 1) {
                    return uniGetAmountsOut(amountsOutAMM, path2)
                } else {
                    return amountsOutAMM
                }
            } else {
                const amountsOutAMM = await calculatePurchaseReturn(amountInWeid)
                if (path2.length > 1) {
                    return uniGetAmountsOut(amountsOutAMM, path2)
                } else {
                    return amountsOutAMM
                }
            }
        }
        if (path[deusIndex + 1] === wethAddress) {
            let path1 = path.slice(0, deusIndex + 1)
            let path2 = path.slice(deusIndex + 1)
            if (path1.length > 1) {
                const amountsOutUni = await uniGetAmountsOut(amountInWeid, path1)
                const amountsOutAMM = await calculateSaleReturn(amountsOutUni)
                if (path2.length > 1) {
                    return uniGetAmountsOut(amountsOutAMM, path2)
                } else {
                    return amountsOutAMM
                }
            } else {
                const amountsOutAMM = await calculateSaleReturn(amountInWeid)
                if (path2.length > 1) {
                    return uniGetAmountsOut(amountsOutAMM, path2)
                } else {
                    return amountsOutAMM
                }
            }
        }


    } catch (error) {
        console.log(error);
    }

}






