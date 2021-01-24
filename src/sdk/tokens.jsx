import { ChainId, TEN } from "./constant"
import JSBI from 'jsbi'

export class Token {
    constructor(chainId, address, decimals, symbol, name, logo) {
        this.chainId = chainId
        this.address = address
        this.decimals = decimals
        this.symbol = symbol
        this.name = name
        this.logo = logo
    }

    equals(withToken) {
        if (this === withToken) {
            return true
        }
        return this.chainId === withToken.chainId && this.address === withToken.address
    }
}

export class TokenAmount extends Token {
    constructor(token, amount) {
        this.chainId = token.chainId
        this.address = token.address
        this.decimals = token.decimals
        this.symbol = token.symbol
        this.name = token.name
        this.logo = token.logo
        this.amount = String(JSBI.multiply(JSBI.BigInt(amount), JSBI.exponentiate(TEN, JSBI.BigInt(currency.decimals))))
    }

    equals(withToken) {
        if (this === withToken) {
            return true
        }
        return this.chainId === withToken.chainId && this.address === withToken.address
    }
}



export const WETH = {
    [ChainId.MAINNET]: new Token(
        ChainId.MAINNET,
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        18,
        'WETH',
        'Wrapped Ether'
    ),
    [ChainId.RINKEBY]: new Token(
        ChainId.RINKEBY,
        '0xc778417E063141139Fce010982780140Aa0cD5Ab',
        18,
        'WETH',
        'Wrapped Ether'
    ),
}