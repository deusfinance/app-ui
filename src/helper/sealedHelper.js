import { TransactionState } from "../utils/constant"
import { SwapTranaction } from "../utils/explorers"
import { getToWei } from "./formatBalance"
import { isZero } from "../constant/number"
import { getSealedSwapperContract } from "./contractHelpers"
import { SEALED_ADDRESS } from "../constant/contracts"

export const getSealedAmountsOut = async (fromCurrency, amountIn, chainId, web3) => {

	const amountInWei = getToWei(amountIn, fromCurrency.decimals).toFixed(0)
	const { symbol } = fromCurrency

	let method = ""
	switch (symbol) {
		case "BPT":
			method = "getBpt2SDeaAmount"
			break;
		case "sUniDU":
			method = "getSUniDU2SDeaAmount"
			break;
		case "sUniDE":
			method = "getSUniDE2SDeaAmount"
			break;
		default:
			method = "getSUniDD2SDeaAmount"
	}

	const result = await getSealedSwapperContract(SEALED_ADDRESS, web3)
		.methods[method](amountInWei).call()

	if (result.length > 1)
		return { amountOut: result[1], payload: result[0] }
	return { amountOut: result }
}

export const swap = async (fromCurrency, toCurrency, amountIn, amountOut, minAmountOut, bptPayload, account, chainId, web3) => {
	let hash = null
	const amountInWei = getToWei(amountIn, fromCurrency.decimals).toFixed(0)
	const minAmountOutWei = getToWei(minAmountOut, toCurrency.decimals).toFixed(0)

	if (amountIn === "" || isZero(amountInWei) || amountOut === "" || isZero(minAmountOutWei)) return { status: false }
	let sealedContract = getSealedSwapperContract(SEALED_ADDRESS, web3)
	const swapFunc = swapFuncMaker(fromCurrency, amountInWei, minAmountOutWei, sealedContract, bptPayload)
	let sendArgs = { from: account }

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


export const swapFuncMaker = (fromCurrency, amountInWei, minAmountOutWei, sealedContract, balancerMinAmountsOut) => {

	if (fromCurrency.symbol === "BPT") {
		console.log(amountInWei, balancerMinAmountsOut, minAmountOutWei);
		return bpt2sdea(amountInWei, balancerMinAmountsOut, minAmountOutWei, sealedContract)
	}
	else if (fromCurrency.symbol === "sUniDD") {
		return sUniDD2sdea(amountInWei, minAmountOutWei, sealedContract)
	}
	else if (fromCurrency.symbol === "sUniDE") {
		return sUniDE2sdea(amountInWei, minAmountOutWei, sealedContract)
	}
	else if (fromCurrency.symbol === "sUniDU") {
		return sUniDU2sdea(amountInWei, minAmountOutWei, sealedContract)
	}
}

export const bpt2sdea = (poolAmountIn, balancerMinAmountsOut, minAmountOut, sealedContract) => {
	return sealedContract
		.methods
		.bpt2sdea(poolAmountIn, balancerMinAmountsOut, minAmountOut)
}

export const sUniDD2sdea = (sUniDDAmount, minAmountOut, sealedContract) => {
	return sealedContract
		.methods
		.sUniDD2sdea(sUniDDAmount, minAmountOut)
}

export const sUniDU2sdea = (sUniDUAmount, minAmountOut, sealedContract) => {
	return sealedContract
		.methods
		.sUniDU2sdea(sUniDUAmount, minAmountOut)
}

export const sUniDE2sdea = (sUniDEAmount, minAmountOut, sealedContract) => {
	return sealedContract
		.methods
		.sUniDE2sdea(sUniDEAmount, minAmountOut)
}