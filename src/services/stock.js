import { Token } from '../sdk/tokens';
import { getStayledNumber } from '../utils/utils';
import { TokenType } from '../config';

export const deaToken = new Token(1, "0x80ab141f324c3d6f2b18b030f1c4e95d4d658778", 18, "DEA", "DEA Finance", "tokens/dea.svg");
export const daiToken = new Token(4, "0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735", 18, "DAI", "DAI", "tokens/dai.png");


export const handleConduct = async (token) => {
    return true
    // try {
    //     const data = await web3.conduct(token, notify(this.methods))
    //     console.log(data);
    //     // token.allowances = allowances
    //     // setAllTokens(allTokens)

    // } catch (error) {
    //     console.log(token, error);
    // }
}

export const handleGetAmountsOut = (from, to, amount) => {
    // const { priceStocks, isLong } = this.state
    // if (to.type === TokenType.Wrapped) {
    //     const p = isLong ? priceStocks[to.id].Long : priceStocks[to.id].Short
    //     const sum = (parseFloat(amount) / p.price)
    //     return sum * (1 - p.fee)
    // } else {
    //     const p = isLong ? priceStocks[from.id].Long : priceStocks[from.id].Short
    //     const sum = (parseFloat(amount) * p.price)
    //     return sum * (1 - p.fee)
    // }
}

export const handleGetAmountsIn = (from, to, amount) => {
    // const { priceStocks, isLong } = this.state
    // if (from.type === TokenType.Wrapped) {
    //     console.log("come");
    //     const p = isLong ? priceStocks[from.id].Long : priceStocks[from.id].Short
    //     const sum = (parseFloat(amount) / p.price)
    //     return sum * (1 + p.fee)
    // } else {
    //     const p = isLong ? priceStocks[to.id].Long : priceStocks[to.id].Short
    //     const sum = (parseFloat(amount) * p.price)
    //     return sum * (1 + p.fee)
    // }
}


export const isApproved = (swap) => {
    return swap.from.allowances > 0
}

export const handleSwap = async (swap) => {
    return true
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

export const handleApprove = async (swap) => {
    return true
    // try {
    //     this.setState({ typeTransaction: { action: "approve" } })
    //     const data = await web3.approve(swap.from.address, swap.from.amount, notify(this.methods))
    //     return data
    // } catch (error) {
    //     console.log(error);
    // }
    return 0
}


const handleBuy = async (token, amount, isLong) => {
    console.log("buy called react");
    // const tokenAddress = isLong ? token.long.address : token.short.address
    // const makerBuySell = await this.getBuySell()
    // console.log(makerBuySell[tokenAddress], amount);
    // try {
    //     this.setState({ typeTransaction: { action: "buy", swap: this.state.swap, isLong: isLong } })
    //     const data = await web3.buy(tokenAddress, amount, makerBuySell[tokenAddress], notify(this.methods))
    //     //address, amount, blockNo, v, r, s, price, fee
    //     console.log(data);
    // } catch (error) {

    // }

}


const getSingleAllowances = async (token, force = false) => {
    return 0
    // const { swap, web3 } = this.state

    // if (!web3) return

    // const { tokens } = this.state

    // if (force || !token.lastFechAllowance) {

    //     try {
    //         const allowances = await web3.getAllowances(token.address)
    //         token.allowances = allowances
    //         token.lastFechAllowance = true
    //         if (token.symbol === swap.from.symbol) {
    //             this.handleInitToken("from", token, swap.from.amount)
    //         }
    //         // setAllTokens(allTokens)

    //     } catch (error) {
    //         console.log(token, error);
    //     }
    // }

}

const handleSell = async (token, amount, isLong) => {
    // const { isLong } = this.state
    return 0
    // const makerBuySell = await this.getBuySell()
    // const tokenAddress = isLong ? token.long.address : token.short.address
    // try {
    //     this.setState({ typeTransaction: { action: "sell", swap: this.state.swap, isLong: isLong } })
    //     await web3.sell(tokenAddress, amount, makerBuySell[tokenAddress], notify(this.methods))

    //     // ans = ans.substr(0, ans.length - max) + "." + ans.substr(ans.length - max);
    //     // if (ans[0] === ".") {
    //     //     ans = "0" + ans;
    //     // }
    //     // console.log(data);
    //     // // console.log(data.events);
    //     // const amm = data.events["Sell"]["returnValues"].amount
    //     // console.log(amm);
    //     // amm = amm.substr(0, amm.length - 18) + "." + amm.substr(amm.length - 18);
    //     // console.log(amm);
    // } catch (error) {

    // }
}

export const handleCalcPairPrice = async (swap, searchBoxType, amount) => {
    const vstype = searchBoxType === "from" ? "to" : "from"

    if (parseFloat(swap[searchBoxType].amount) === 0) {
        swap[vstype].amount = "0"
        return swap
    }

    swap[vstype].amount = swap[searchBoxType].amount * 5
    return swap

    try {
        const data = searchBoxType === "from" ?
            handleGetAmountsOut(swap.from, swap.to, amount) :
            handleGetAmountsIn(swap.from, swap.to, amount)
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