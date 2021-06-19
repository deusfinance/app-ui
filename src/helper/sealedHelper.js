// just for testing
// You can write getSealedSwapperContract funtion in contractHelpers, like other contracts
let getSealedSwapperContract = () => {}

import {
	// getSealedSwapperContract,
	getUniswapV2Contract,
	getERC20Contract,
	getUniswapRouterContract
} from "./contractHelpers"

import addresses from '../constant/addresses.json';


export const bpt2sdea = async (
	poolAmountIn,
	balancerMinAmountsOut,
	DDMinAmountsOut,
	sUniDDMinAmountsOut,
	sUniDEMinAmountsOut,
	sUniDUMinAmountsOut, web3, chainId
) => {
	try {
		await getSealedSwapperContract(web3, chainId)
			.methods
			.bpt2sdea(
				poolAmountIn,
				balancerMinAmountsOut,
				DDMinAmountsOut,
				sUniDDMinAmountsOut,
				sUniDEMinAmountsOut,
				sUniDUMinAmountsOut
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

function sUniDDOutGivenIn(sUniDDAmount, web3, chainId) {
	const contract = getUniswapV2Contract(addresses.token.deus_dea, web3);;
	let totalSupply = contract.methods.totalSupply().call();

	let deusReserve, deaReserve, deusMinAmountOut, deaMinAmountOut;

	[deusReserve, deaReserve] = contract.methods.getReserves().all();

	[deusMinAmountOut, deaMinAmountOut] = minAmountsCalculator(sUniDDAmount, totalSupply, deusReserve, deaReserve)

	const deus2deaPath = [0x3b62F3820e0B035cc4aD602dECe6d796BC325325, 0x80aB141F324C3d6F2b18b030f1C4E95d4d658778];
	let deaAmount = getUniswapRouterContract(web3, chainId).methods.getAmountsOut(deusMinAmountOut, deus2deaPath).call()

	return deaMinAmountOut + deaAmount
}