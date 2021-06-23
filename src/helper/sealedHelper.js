// just for testing
// You can write getSealedSwapperContract funtion in contractHelpers, like other contracts
// import { getSealedSwapperContract} from "./contractHelpers"
import { TransactionState } from "../utils/constant"
import { SwapTranaction } from "../utils/explorers"
import { fromWei, getToWei } from "./formatBalance"
import { isZero } from "../constant/number"
import {
	getSealedSwapperContract,
	getUniswapV2Contract,
	getUniswapRouterContract,
	getDeusAutomaticMarketMakerContract,
} from "./contractHelpers"
import BalancerPoolTokenAbi from '../config/abi/BalancerPoolTokenAbi.json'

import addresses from '../constant/addresses.json';
import BigNumber from "bignumber.js"
import multicall from "./multicall"


const sealedAddress = "0x09aa2eb99b93579c0467a402bc4b8b3c1fb85f69"


export const getSealedAmountsOut = async (fromCurrency, amountIn, chainId, web3) => {
	const amountInWei = getToWei(amountIn, fromCurrency.decimals).toFixed(0)

	if (fromCurrency.symbol === "BPT") {
		const sdeaAmount = await bptOutGivenIn(amountInWei, web3, chainId)
		return sdeaAmount[sdeaAmount.length - 1]
	}
	else if (fromCurrency.symbol === "sUniDD") {
		return await sUniDDOutGivenIn(amountInWei, web3, chainId)
	}
	else if (fromCurrency.symbol === "sUniDE") {
		return sUniDEOutGivenIn(amountInWei, web3, chainId)
	}
	else if (fromCurrency.symbol === "sUniDU") {
		return sUniDUOutGivenIn(amountInWei, web3, chainId)
	}
}



export const swap = async (fromCurrency, toCurrency, amountIn, amountOut, minAmountOut, account, chainId, web3) => {
	let hash = null
	const amountInWei = getToWei(amountIn, fromCurrency.decimals).toFixed(0)
	const minAmountOutWei = getToWei(minAmountOut, toCurrency.decimals).toFixed(0)

	if (amountIn === "" || isZero(amountInWei) || amountOut === "" || isZero(minAmountOutWei)) return { status: false }
	let sealedContract = getSealedSwapperContract(sealedAddress, web3)
	const swapFunc = swapFuncMaker(fromCurrency, amountInWei, minAmountOutWei, sealedContract, 0)
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

export const bpt2sdea = async (poolAmountIn, balancerMinAmountsOut, minAmountOut, sealedContract) => {
	try {
		await sealedContract
			.methods
			.bpt2sdea(
				poolAmountIn,
				balancerMinAmountsOut,
				minAmountOut
			)
	} catch (error) {
		console.log(error);
	}
}

export const sUniDD2sdea = (sUniDDAmount, minAmountOut, sealedContract) => {
	return sealedContract
		.methods
		.sUniDD2sdea(sUniDDAmount, minAmountOut)
}

export const sUniDU2sdea = (sUniDUAmount, minAmountOut, sealedContract) => {
	console.log(sUniDUAmount.toString(), minAmountOut.toString());
	return sealedContract
		.methods
		.sUniDU2sdea(sUniDUAmount, minAmountOut)
}

export const sUniDE2sdea = (sUniDEAmount, minAmountOut, sealedContract) => {
	return sealedContract
		.methods
		.sUniDE2sdea(sUniDEAmount, minAmountOut)
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
	return [(new BigNumber(univ2Amount).div(totalSupply).times(reserve1).toFixed(0)), (new BigNumber(univ2Amount).div(totalSupply).times(reserve2).toFixed(0))];
}

const deus2deaPath = ["0x3b62F3820e0B035cc4aD602dECe6d796BC325325", "0x80aB141F324C3d6F2b18b030f1C4E95d4d658778"];

export const sUniDDOutGivenIn = async (sUniDDAmount, web3, chainId) => {
	const contract = getUniswapV2Contract(addresses.token.deus_dea["1"], web3);
	let totalSupply = await contract.methods.totalSupply().call();

	let ratio = await getSealedSwapperContract(sealedAddress, web3).methods.DDRatio().call()
	ratio = fromWei(ratio, 18)

	const { "0": deusReserve, "1": deaReserve } = await contract.methods.getReserves().call();
	const [deusMinAmountOut, deaMinAmountOut] = minAmountsCalculator(new BigNumber(sUniDDAmount).times(ratio).toFixed(0), totalSupply, deusReserve, deaReserve)
	let deaAmount = await getUniswapRouterContract(web3, chainId).methods.getAmountsOut(deusMinAmountOut, deus2deaPath).call()

	return new BigNumber(deaMinAmountOut).plus(deaAmount[1]).toFixed(0)
}


export const sUniDUOutGivenIn = async (sUniDUAmount, web3, chainId) => {
	const contract = getUniswapV2Contract(addresses.token.dea_usdc["1"], web3);
	let totalSupply = await contract.methods.totalSupply().call();

	let ratio = await getSealedSwapperContract(sealedAddress, web3).methods.DURatio().call()
	ratio = fromWei(ratio, 18)

	const { "0": deaReserve, "1": usdcReserve } = await contract.methods.getReserves().call();

	const [deaMinAmountOut, usdcMinAmountOut] = minAmountsCalculator(new BigNumber(sUniDUAmount).div(100000).times(ratio), totalSupply, deaReserve, usdcReserve)

	const usdc2wethPath = ["0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"];
	const ethAmount = await getUniswapRouterContract(web3, chainId).methods.getAmountsOut(usdcMinAmountOut, usdc2wethPath).call()

	const deusAmount = await calculatePurchaseReturn(ethAmount[1], web3, chainId);

	const deaAmount = await getUniswapRouterContract(web3, chainId).methods.getAmountsOut(deusAmount, deus2deaPath).call()

	return new BigNumber(deaMinAmountOut).plus(deaAmount[1]).toFixed(0)

}

export const sUniDEOutGivenIn = async (sUniDEAmount, web3, chainId) => {
	const contract = getUniswapV2Contract(addresses.token.deus_eth["1"], web3);
	let totalSupply = await contract.methods.totalSupply().call();
	// let ratio = getSealedSwapperContract(web3, chainId).methods.DERatio().call() / 1e18;

	let ratio = await getSealedSwapperContract(sealedAddress, web3).methods.DERatio().call()
	ratio = fromWei(ratio, 18)

	const { "0": deusReserve, "1": wethReserve } = await contract.methods.getReserves().call();

	const [deusMinAmountOut, wethMinAmountOut] = minAmountsCalculator(new BigNumber(sUniDEAmount).times(ratio), totalSupply, deusReserve, wethReserve)

	const deusAmount = await calculatePurchaseReturn(wethMinAmountOut, web3, chainId)

	const deaAmount = await getUniswapRouterContract(web3, chainId).methods.getAmountsOut(new BigNumber(deusAmount).plus(deusMinAmountOut).toFixed(0), deus2deaPath).call();

	return deaAmount[1]
}


export const bptOutGivenIn = async (bptAmount, web3, chainId) => {
	const bptAddress = "0x1Dc2948B6dB34E38291090B825518C1E8346938B"
	const calls = [
		{
			address: bptAddress,
			name: 'totalSupply',
		},
		{
			address: bptAddress,
			name: 'getBalance',
			params: [addresses.token.sand_deus_dea["1"]]
		},
		{
			address: bptAddress,
			name: 'getBalance',
			params: [addresses.token.sand_dea_usdc["1"]]
		},
		{
			address: bptAddress,
			name: 'getBalance',
			params: [addresses.token.sand_deus_eth["1"]]
		},
		{
			address: bptAddress,
			name: 'getBalance',
			params: [addresses.token.sand_deus["1"]]
		},
		{
			address: bptAddress,
			name: 'getBalance',
			params: [addresses.token.sand_dea["1"]]
		},
		{
			address: bptAddress,
			name: 'getBalance',
			params: [addresses.token.dea["1"]]
		},
	]

	const [
		totalSupply,
		...rest
	] = await multicall(web3, BalancerPoolTokenAbi, calls, chainId)

	// let deusRatio = getSealedSwapperContract(web3, chainId).methods.deusRatio().call() / 1e18;
	const deusRatio = 0.9

	const bptPerTotalSupply = new BigNumber(bptAmount).div(totalSupply)
	const sUniDDAmount = new BigNumber(bptPerTotalSupply).times(rest[0]).toFixed(0)
	const sUniDUAmount = new BigNumber(bptPerTotalSupply).times(rest[1]).toFixed(0)
	const sUniDEAmount = new BigNumber(bptPerTotalSupply).times(rest[2]).toFixed(0)
	const sDeusAmount = new BigNumber(bptPerTotalSupply).times(rest[3]).toFixed(0)
	const sDeaAmount = new BigNumber(bptPerTotalSupply).times(rest[4]).toFixed(0)
	const balancerDeaAmount = new BigNumber(bptPerTotalSupply).times(rest[5]).toFixed(0)


	let deaAmount = balancerDeaAmount
	deaAmount = new BigNumber(sDeusAmount).plus(deaAmount)
	deaAmount = new BigNumber(await sUniDDOutGivenIn(sUniDDAmount)).plus(deaAmount)
	deaAmount = new BigNumber(await sUniDUOutGivenIn(sUniDUAmount)).plus(deaAmount)
	deaAmount = new BigNumber(await sUniDEOutGivenIn(sUniDEAmount)).plus(deaAmount)
	const uniAmount = await getUniswapRouterContract(web3, chainId).methods.getAmountsOut(
		new BigNumber(sDeusAmount).times(deusRatio).toFixed(0), deus2deaPath
	).call()
	deaAmount = new BigNumber(uniAmount[1]).plus(deaAmount).toFixed(0)


	return [sUniDDAmount, sUniDUAmount, sUniDEAmount, sDeusAmount, sDeaAmount, balancerDeaAmount, deaAmount];
}