import BigNumber from "bignumber.js";

export const ZERO = new BigNumber(0)
export const TEN = new BigNumber(10)

export const isZero = (number) => {
    return isEqual(number, ZERO)
}

export const isEqual = (number, number2) => {
    return new BigNumber(number).eq(number2)
}

export const isGt = (number, number2) => {
    return new BigNumber(number).gt(number2)
}

