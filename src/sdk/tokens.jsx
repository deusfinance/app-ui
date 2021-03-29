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

export class TokenAmount extends Token {
    constructor(token, amount) {
        super(token.chainId, token.address, token.decimals, token.symbol, token.name, token.logo)
        this.amount = formatUnits(amount, token.decimals)
    }

    equals(withToken) {
        if (this === withToken) {
            return true
        }
        return this.chainId === withToken.chainId && this.address === withToken.address
    }
}

export class WrapToken {
    constructor(name, symbol, sector, logo, chainId = 1, decimals, long_name, long_symbol, long_address, short_symbol, short_name, short_address) {
        this.name = name
        this.symbol = symbol
        this.sector = sector
        this.logo = logo
        this.chainId = chainId
        this.decimals = decimals
        this.long = new Token(chainId, long_address, decimals, long_symbol, long_name, logo)
        this.short = new Token(chainId, short_address, decimals, short_symbol, short_name, logo)
    }


    setBalance(balance, addressOrType) {
        if (addressOrType.substr(0, 2) === "0x") {
            if (this.long.address === addressOrType) {
                this.long.balance = formatUnits(balance, this.decimals)
            } else {
                this.short.balance = formatUnits(balance, this.decimals)
            }
        } else {
            this.setBalance(balance, addressOrType)
        }
    }

    setBalanceType(balance, type) {
        if (type === "long") {
            this.long.balance = formatUnits(balance, this.decimals)
        } else {
            this.short.balance = formatUnits(balance, this.decimals)
        }
    }

}