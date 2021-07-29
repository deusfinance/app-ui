import { formatUnits } from '@ethersproject/units';

export class Token {
    constructor(chainId, address, decimals, symbol, name, logo, balance = null) {
        this.chainId = chainId
        this.address = address
        this.decimals = decimals
        this.symbol = symbol
        this.name = name
        this.logo = logo
        this.balance = balance
    }

    setBalance(balance) {
        this.balance = formatUnits(balance, this.decimals)
    }

    equals(withToken) {
        if (this === withToken) {
            return true
        }
        return this.chainId === withToken.chainId && this.address === withToken.address
    }
}