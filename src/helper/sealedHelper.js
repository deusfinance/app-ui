// just for testing
// You can write getSealedSwapperContract funtion in contractHelpers, like other contracts
// import { getSealedSwapperContract} from "./contractHelpers"
import { TransactionState } from "../utils/constant"
import { SwapTranaction } from "../utils/explorers"
import { getToWei } from "./formatBalance"
import { isZero } from "../constant/number"
import {
	// getSealedSwapperContract,
	getUniswapV2Contract,
	getUniswapRouterContract,
	getBalancerPoolTokenContract,
	getDeusAutomaticMarketMakerContract,
} from "./contractHelpers"

import addresses from '../constant/addresses.json';

let getSealedSwapperContract = () => { }

export const getSealedAmountsOut = async (fromCurrency, amountIn, account, chainId, web3) => {
	const amountInWei = getToWei(amountIn, fromCurrency.decimals).toFixed(0)

	if (fromCurrency.symbol === "BPT") {
	}
	else if (fromCurrency.symbol === "sUniDD") {
		return sUniDDOutGivenIn(amountInWei, web3, chainId)
	}
	else if (fromCurrency.symbol === "sUniDE") {
		return sUniDEOutGivenIn(amountInWei, web3, chainId)
	}
	else if (fromCurrency.symbol === "sUniDU") {
		return sUniDUOutGivenIn(amountInWei, web3, chainId)
	}
}



export const sealedSwap = async (fromCurrency, toCurrency, amountIn, amountOut, minAmountOut, account, chainId, web3) => {
	let hash = null
	const amountInWei = getToWei(amountIn, fromCurrency.decimals).toFixed(0)
	const minAmountOutWei = getToWei(minAmountOut, toCurrency.decimals).toFixed(0)

	if (amountIn === "" || isZero(amountInWei) || amountOut === "" || isZero(minAmountOutWei)) return { status: false }

	const swapFunc = swapFuncMaker(fromCurrency, amountInWei, minAmountOutWei, chainId, web3)
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


export const swapFuncMaker = async (fromCurrency, amountInWei, minAmountOutWei, chainId, web3) => {

	if (fromCurrency.symbol === "BPT") {
		//return bpt2sdea(poolAmountIn, balancerMinAmountsOut, minAmountOut, web3, chainId)
	}
	else if (fromCurrency.symbol === "sUniDD") {
		return sUniDD2sdea(amountInWei, minAmountOutWei, web3, chainId)
	}
	else if (fromCurrency.symbol === "sUniDE") {
		return sUniDE2sdea(amountInWei, minAmountOutWei, web3, chainId)
	}
	else if (fromCurrency.symbol === "sUniDU") {
		return sUniDU2sdea(amountInWei, minAmountOutWei, web3, chainId)
	}
}


export const bpt2sdea = async (
	poolAmountIn,
	balancerMinAmountsOut,
	minAmountOut,
	web3, chainId
) => {
	try {
		await getSealedSwapperContract(web3, chainId)
			.methods
			.bpt2sdea(
				poolAmountIn,
				balancerMinAmountsOut,
				minAmountOut
			)
			.call()
	} catch (error) {
		console.log(error);
	}
}

export const sUniDD2sdea = async (sUniDDAmount, minAmountOut, web3, chainId) => {
	try {
		await getSealedSwapperContract(web3, chainId)
			.methods
			.sUniDD2sdea(sUniDDAmount, minAmountOut)
			.call()
	} catch (error) {
		console.log(error);
	}
}

export const sUniDU2sdea = async (sUniDUAmount, minAmountsOut, web3, chainId) => {
	try {
		await getSealedSwapperContract(web3, chainId)
			.methods
			.sUniDU2sdea(sUniDUAmount, minAmountsOut)
			.call()
	} catch (error) {
		console.log(error);
	}
}

export const sUniDE2sdea = async (sUniDEAmount, minAmountOut, web3, chainId) => {
	try {
		await getSealedSwapperContract(web3, chainId)
			.methods
			.sUniDE2sdea(sUniDEAmount, minAmountOut)
			.call()
	} catch (error) {
		console.log(error);
	}
}


const calculatePurchaseReturn = async (amountIn, web3, chainId) => {
	try {
		return getDeusAutomaticMarketMakerContract(web3, chainId)
			.methods
			.calculatePurchaseReturn(amountIn)
			.call()
	} catch (error) {
		console.log(error);
	}
}

const minAmountsCalculator = (univ2Amount, totalSupply, reserve1, reserve2) => {
	return [((univ2Amount) / totalSupply * reserve1), ((univ2Amount) / totalSupply * reserve2)];
}

const deus2deaPath = [0x3b62F3820e0B035cc4aD602dECe6d796BC325325, 0x80aB141F324C3d6F2b18b030f1C4E95d4d658778];

export const sUniDDOutGivenIn = (sUniDDAmount, web3, chainId) => {
	const contract = getUniswapV2Contract(addresses.token.deus_dea, web3);;
	let totalSupply = contract.methods.totalSupply().call();

	let deusReserve, deaReserve, deusMinAmountOut, deaMinAmountOut;

	[deusReserve, deaReserve] = contract.methods.getReserves().all();

	[deusMinAmountOut, deaMinAmountOut] = minAmountsCalculator(sUniDDAmount, totalSupply, deusReserve, deaReserve)

	let deaAmount = getUniswapRouterContract(web3, chainId).methods.getAmountsOut(deusMinAmountOut, deus2deaPath).call()

	return deaMinAmountOut + deaAmount
}


export const sUniDUOutGivenIn = (sUniDUAmount, web3, chainId) => {
	const contract = getUniswapV2Contract(addresses.token.dea_usdc, web3);;
	let totalSupply = contract.methods.totalSupply().call();

	let deaReserve, usdcReserve, deaMinAmountOut, usdcMinAmountOut;

	[deaReserve, usdcReserve] = contract.methods.getReserves().all();

	[deaMinAmountOut, usdcMinAmountOut] = minAmountsCalculator(sUniDUAmount, totalSupply, deaReserve, usdcReserve)

	const usdc2wethPath = [0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48, 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2];
	const ethAmount = getUniswapRouterContract(web3, chainId).methods.getAmountsOut(usdcMinAmountOut, usdc2wethPath).call()

	const deaAmount = calculatePurchaseReturn(ethAmount, web3, chainId);

	return deaMinAmountOut + deaAmount
}

export const sUniDEOutGivenIn = (sUniDEAmount, web3, chainId) => {
	const contract = getUniswapV2Contract(addresses.token.deus_eth, web3);;
	let totalSupply = contract.methods.totalSupply().call();

	let deusReserve, wethReserve, deusMinAmountOut, wethMinAmountOut;

	[deusReserve, wethReserve] = contract.methods.getReserves().call();

	[deusMinAmountOut, wethMinAmountOut] = minAmountsCalculator(sUniDEAmount, totalSupply, deusReserve, wethReserve)

	const deaAmount1 = getUniswapRouterContract(web3, chainId).methods.getAmountsOut(deusMinAmountOut, deus2deaPath).call()

	const deaAmount2 = calculatePurchaseReturn(wethMinAmountOut, web3, chainId)

	return deaAmount1 + deaAmount2
}


export const bptOutGivenIn = (bptAmount, web3, chainId) => {
	let deaAmount = 0

	const contract = getBalancerPoolTokenContract('0x1Dc2948B6dB34E38291090B825518C1E8346938B', web3)
	const totalSupply = contract.methods.totalSupply().call();

	deaAmount = (bptAmount / totalSupply) * contract.methods.getBalance(addresses.token.dea).call()
	deaAmount += (bptAmount / totalSupply) * contract.methods.getBalance(addresses.token.sand_dea[1]).call()
	deaAmount += sUniDDOutGivenIn(
		(bptAmount / totalSupply) * contract.methods.getBalance(addresses.token.sand_deus_dea).call()
	);
	deaAmount += sUniDUOutGivenIn(
		(bptAmount / totalSupply) * contract.methods.getBalance(addresses.token.sand_dea_usdc).call()
	);
	deaAmount += sUniDEOutGivenIn(
		(bptAmount / totalSupply) * contract.methods.getBalance(addresses.token.sand_deus_eth).call()
	);
	deaAmount += getUniswapRouterContract(web3, chainId).methods.getAmountsOut(
		(bptAmount / totalSupply) * contract.methods.getBalance(addresses.token.sand_deus).call(), deus2deaPath
	).call()

	return deaAmount
}