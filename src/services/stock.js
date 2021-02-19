import { Token } from '../sdk/tokens';
import { getStayledNumber } from '../utils/utils';
import { TokenType } from '../config';

export const emptyToken = new Token(1, "0x0", 18, "", "", "/tokens/empty.svg");
export const deaToken = new Token(1, "0x80ab141f324c3d6f2b18b030f1c4e95d4d658778", 18, "DEA", "DEA Finance", "tokens/dea.svg");

export const daiTokenRinbkeby = new Token(4, "0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735", 18, "DAI", "DAI", "/tokens/dai.png");
export const daiToken = new Token(1, "0x6B175474E89094C44Da98b954EedeAC495271d0F", 18, "DAI", "DAI", "/tokens/dai.png");
export const xdaiToken = new Token(1, "0x80ab141f324c3d6f2b18b030f1c4e95d4d658778", 18, "xDAI", "xDAI", "/tokens/xdai.svg");

export const fetcher = async function (url) {
    try {
        const resp = await fetch(url)
        return await resp.json()
    } catch (error) {
        console.log("fetch " + url + " had some error", error);
    }
}


export const handleGetAmountsOut = (from, to, amount, isLong, priceStocks, setLongPrice) => {
    if (to.type !== TokenType.Main) {
        const p = isLong ? priceStocks[to.id].Long : priceStocks[to.id].Short
        const sum = (parseFloat(amount) / p.price)
        setLongPrice(parseFloat((priceStocks[to.id].Long.price)) * (1 + priceStocks[to.id].Long.fee))
        return sum * (1 - p.fee)
    } else {
        const p = isLong ? priceStocks[from.id].Long : priceStocks[from.id].Short
        const sum = (parseFloat(amount) * p.price)
        setLongPrice(parseFloat(priceStocks[from.id].Long.price) * (1 - priceStocks[from.id].Long.fee))
        return sum * (1 - p.fee)
    }
}

export const handleGetAmountsIn = (from, to, amount, isLong, priceStocks, setLongPrice) => {
    if (from.type !== TokenType.Main) {
        const p = isLong ? priceStocks[from.id].Long : priceStocks[from.id].Short
        const sum = (parseFloat(amount) / p.price)
        setLongPrice(priceStocks[from.id].Long.price * (1 + priceStocks[from.id].Long.fee))
        return sum * (1 + p.fee)
    } else {
        const p = isLong ? priceStocks[to.id].Long : priceStocks[to.id].Short
        const sum = (parseFloat(amount) * p.price)
        setLongPrice(priceStocks[to.id].Long.price * (1 + priceStocks[to.id].Long.fee))
        return sum * (1 + p.fee)
    }
}


export const isApproved = (swap) => {
    return swap.from.allowances > 0
}

export const handleSwap = async (swap) => {

    const { from, to } = swap

    try {
        this.setState({ typeTransaction: "swap" })
        if (from.type !== TokenType.Wrapped && !parseInt(swap.from.allowances) > 0) {
            this.handleApprove(swap)
        } else {

            if (from.type === TokenType.Wrapped) {
                await this.handleSell(from, from.amount)
            } else {
                await this.handleBuy(to, to.amount)
            }
        }
    } catch (error) { }
}


export const handleCalcPairPrice = async (swap, searchBoxType, amount, isLong, priceStocks, setLongPrice) => {
    const vstype = searchBoxType === "from" ? "to" : "from"

    if (parseFloat(swap[searchBoxType].amount) === 0) {
        swap[vstype].amount = "0"
        return swap
    }


    try {
        const data = searchBoxType === "from" ?
            handleGetAmountsOut(swap.from, swap.to, amount, isLong, priceStocks, setLongPrice) :
            handleGetAmountsIn(swap.from, swap.to, amount, isLong, priceStocks, setLongPrice)
        swap[vstype].amount = getStayledNumber(data, 9)
        return swap

    } catch (error) {
        console.log(error);
        return swap
    }

}

export const methods = {
    onStart: () => {

    },
    onSuccess: () => {
        const { swap, typeTransaction } = this.state
        console.log(typeTransaction);
        if (typeTransaction.action === "approve") {
            this.handleIinitBalancesB(swap.from.name, true)
        }
        if (typeTransaction.action === "sell" || typeTransaction.action === "buy") {
            console.log("perfect its sell here");
            this.getTokenWrapBalance(typeTransaction.swap.from)
            this.getTokenWrapBalance(typeTransaction.swap.to)
        }

    },
    onError: () => console.log("onError"),
}



export const handleInitAllowances = async (token, web3Class, foceUpdate) => {
    try {
        return await web3Class.getSingleAllowances(token.address, foceUpdate)
    } catch (error) {
        console.log(error);
        return 0
    }
}

