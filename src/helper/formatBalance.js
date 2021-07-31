import BigNumber from "bignumber.js";
import { isZero } from "../constant/number";

export const getBalanceNumber = (balance, decimals = 18) => {
    const displayBalance = new BigNumber(balance).dividedBy(new BigNumber(10).pow(decimals))
    return displayBalance.toNumber()
}


export const fromWei = (amount, decimals = 18) => {
    const displayBalance = new BigNumber(amount).dividedBy(new BigNumber(10).pow(decimals))
    return displayBalance.toFixed(decimals, BigNumber.ROUND_DOWN)
}


export const getToWei = (amount, decimals = 18) => {
    const bn = new BigNumber(amount).multipliedBy(new BigNumber(10).pow(decimals)).toFixed(decimals, 1)
    return new BigNumber(bn)
}

export const getFullDisplayBalance = (balance, decimals = 18) => {
    return new BigNumber(balance).dividedBy(new BigNumber(10).pow(decimals)).toFixed()
}

export const RemoveTrailingZero = (number = null, fixed = 5) => {
    if (!number) return '0'
    if (isZero(number)) return 0
    return BigNumber(number).toFixed(fixed, BigNumber.ROUND_DOWN).replace(/\.?0+$/, "")
}

export const formatNumber = (number, minPrecision = 2, maxPrecision = 2) => {
    const options = {
        minimumFractionDigits: minPrecision,
        maximumFractionDigits: maxPrecision,
    }
    return number.toLocaleString(undefined, options)
}