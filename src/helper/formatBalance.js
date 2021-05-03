import BigNumber from "bignumber.js";

export const getBalanceNumber = (balance, decimals = 18) => {
    const displayBalance = new BigNumber(balance).dividedBy(new BigNumber(10).pow(decimals))
    return displayBalance.toNumber()
}


export const fromWei = (amount, decimals = 18) => {
    const displayBalance = new BigNumber(amount).dividedBy(new BigNumber(10).pow(decimals))
    return displayBalance.toFixed(decimals, 1)
}


export const getToWei = (amount, decimals = 18) => {
    const bn = new BigNumber(amount).multipliedBy(new BigNumber(10).pow(decimals)).toFixed(decimals, 1)
    return new BigNumber(bn)
}

export const getFullDisplayBalance = (balance, decimals = 18) => {
    return balance.dividedBy(new BigNumber(10).pow(decimals)).toFixed()
}

export const formatNumber = (number, minPrecision = 2, maxPrecision = 2) => {
    const options = {
        minimumFractionDigits: minPrecision,
        maximumFractionDigits: maxPrecision,
    }
    return number.toLocaleString(undefined, options)
}