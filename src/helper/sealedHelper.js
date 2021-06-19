// just for testing
// You can write getSealedSwapperContract funtion in contractHelpers, like other contracts
let getSealedSwapperContract = () => {}

// import {
// 	getSealedSwapperContract
// } from "./contractHelpers"


export const bpt2eth = async (tokenOut, poolAmountIn, minAmountsOut, path, web3, chainId) => {
	try {
		await getSealedSwapperContract(web3, chainId)
			.methods
			.bpt2eth(tokenOut, poolAmountIn, minAmountsOut, path)
			.call()
	} catch (error) {
		console.log(error);
	}
}

export const bpt2uni = async (tokenOut, poolAmountIn, minAmountsOut, path, web3, chainId) => {
	try {
		await getSealedSwapperContract(web3, chainId)
			.methods
			.bpt2Uni(tokenOut, poolAmountIn, minAmountsOut, path)
			.call()
	} catch (error) {
		console.log(error);
	}
}

export const bpt2sdea = async (tokenOut, poolAmountIn, minAmountOut, web3, chainId) => {
	try {
		await getSealedSwapperContract(web3, chainId)
			.methods
			.bpt2sdea(tokenOut, poolAmountIn, minAmountOut)
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

export const withdraw = async (token, amount, to, web3, chainId) => {
	try {
		await getSealedSwapperContract(web3, chainId)
			.methods
			.withdraw(token, amount, to)
			.call()
	} catch (error) {
		console.log(error);
	}
}