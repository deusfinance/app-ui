import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { getStayledNumber, notify, formatBalance } from '../../utils/utils';
import TokenMarket from './TokenMarket';
import Title from './Title';
import SwapStockButton from './SwapStockButton';
import WrappedTokenButton from './WrappedTokenButton';
import SearchAssets from './SearchAssets';
import StockBox from './StockBox';
import _ from "lodash"
import { toast } from 'react-toastify';
import { TokenType } from '../../config';
import { StockService } from '../../services/StockService';

import './mainSwap.scss';

class StockSwap extends Component {
    state = {
        tokens: [{
            symbol: "DAI",
            name: "DAI",
            title: "DAI",
            "conducted": true,
            chainId: 4,
            address: "0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735",
            logo: "/tokens/dai.png"
        }],
        web3: null,
        tokensMap: {},
        swap: {
            from: {
                name: "", pic_name: "", price: "", balance: "", amount: ""
            },
            to: {
                name: "", pic_name: "", price: "", balance: "", amount: ""
            }
        },
        showSearchBox: false,
        priceStocks: null,
        conductedCount: 0,
        searchBoxType: "from",
        conducted: {},
        fromPerTo: true,
        claimable_amount: null,
        typingTimeout: 0,
        typeTransaction: "",
        slippageAmount: 0.1,
        isLong: true,
        buySell: {},
        toAmount: "",
        fromAmount: ""
    }


    methods = {
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



    async componentDidMount() {
        document.body.style.backgroundColor = '#2c2f36'
        document.body.style.backgroundImage = 'radial-gradient(50% 50% at 50% 50%, #5c5c5c61 0%, #000000 100%)'
        const { chainId, account } = this.props
        // if (!nAllStocks) {

        // }

        this.getPrices()
        this.getConducted()
        this.handleInitTokenByName("to", "TSLA")
        this.handleInitToken("from", this.state.tokens[0])

        this.setState({
            subscrible: setInterval(() => {
                this.getPrices()
                this.getConducted()
            }, 30000)
        })

        if (!chainId || !account) return

        await this.setState({ web3: new StockService(account, chainId) })
        await this.handleIinitBalances()
        await this.handleIinitBalancesB()
    }

    async componentDidUpdate(prevProps) {

        const { chainId, account } = this.props

        if (prevProps.account !== account || prevProps.chainId !== chainId) {
            if (!chainId || !account) return

            await this.setState({ web3: new StockService(account, chainId) })
            await this.handleIinitBalances(true)
            await this.handleIinitBalancesB()

            await this.getClaimable()
            // await this.handleInitAllowances(true)

            this.handleInitToken("from", this.state.tokens[0])
            this.handleInitTokenByName("to", "TSLA")
        }
    }

    handleLong = (bool) => {
        this.setState({ isLong: bool })
    }

    getConducted = async () => {
        try {
            const resp = await fetch("https://test.deus.finance/oracle-files/conducted.json")
            const respj = await resp.json()
            this.setState({ conducted: respj })
        } catch (error) {
            console.log(" get Market Amounts had some error", error);
        }
        this.addConductedToToken()
    }



    getTokenWrapBalance = async (token) => {
        const { nAllStocks } = this.props
        const { swap } = this.state
        const currToken = nAllStocks[token.id]
        if (token.type === TokenType.Wrapped) {
            currToken.long.balance = await this.getSingleBalance(currToken.long.address)
            currToken.short.balance = await this.getSingleBalance(currToken.short.address)
            this.props.setnAllStocks(nAllStocks)
            if (swap.to.symbol === token.id) this.handleInitTokenByName("to", token.id)
            if (swap.from.symbol === token.id) this.handleInitTokenByName("from", token.id)
        } else {
            this.handleIinitBalances()
        }
    }


    getBuySell = async () => {
        try {
            const resp = await fetch("https://test.deus.finance/oracle-files/buyOrSell.json")
            const respj = await resp.json()
            return respj
        } catch (error) {
            console.log(" get Market Amounts had some error", error);
        }
    }

    getPrices = async () => {
        try {
            const resp = await fetch("https://test.deus.finance/oracle-files/price.json")
            const respj = await resp.json()
            this.setState({ priceStocks: respj })
        } catch (error) {
            console.log(" get Market Amounts had some error", error);
        }
    }

    addConductedToToken = () => {
        const { conducted, swap, conductedCount } = this.state
        const { nAllStocks } = this.props
        if (conductedCount === conducted.count) {
            return
        }
        conducted.tokens.map(async (token) => {
            console.log(token);
            nAllStocks[token.id].conducted = true
            nAllStocks[token.id].long = { address: token.long }
            nAllStocks[token.id].long.balance = await this.getSingleBalance(token.long)
            nAllStocks[token.id].short = { address: token.short }
            nAllStocks[token.id].short.balance = await this.getSingleBalance(token.short)
            if (swap.to.symbol === token.id) this.handleInitTokenByName("to", token.id)
            if (swap.from.symbol === token.id) this.handleInitTokenByName("from", token.id)
        })
        this.setState({ conductedCount: conducted.count })
        this.props.setnAllStocks(nAllStocks)
    }

    getClaimable = async () => {
        const { web3 } = this.state
        if (!web3) return
        try {
            const amount = await web3.getWithdrawableAmount()
            this.setState({ claimable_amount: amount })
            return amount
        } catch (error) {
            return 0
        }
    }

    handleSlippage = (amount) => {
        this.setState({ slippageAmount: amount })
    }

    handleTokensToMap = () => {
        const { tokens, tokensMap } = this.state
        for (let i = 0; i < tokens.length; i++) {
            tokensMap[tokens[i].name] = tokens[i]
        }
        this.setState({ tokensMap })
    }

    handleInitToken = (type, token, amount = "") => {
        const { swap } = this.state
        swap[type] = { ...token, amount: amount }
        this.setState({ swap, toAmount: "", fromAmount: "" })
    }

    handleInitTokenByName = (type, tokenName, amount = "") => {
        const { swap } = this.state
        let token = {}
        if (type === "from") {
            token = _.find(this.props.nAllStocks, { symbol: tokenName })
        } else {
            token = _.find(this.props.nAllStocks, { symbol: tokenName })
        }
        swap[type] = { ...token, amount: amount }
        this.setState({ swap, toAmount: "", fromAmount: "" })
    }

    getToken = (tokenName) => this.state.tokens.find(t => t.name === tokenName)

    handleChangeType = () => {
        const { swap } = this.state
        const { from, to } = swap
        if (!to.conducted) {
            toast.warning("After conducting the asset you can long/short it.", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            return
        }
        from.amount = ""
        to.amount = ""
        swap.from = to
        swap.to = from
        this.setState({ swap, toAmount: "", fromAmount: "" })
        this.handleSwichPerPrice()
    }

    handleSwichPerPrice = () => {
        const { fromPerTo } = this.state
        this.setState({ fromPerTo: !fromPerTo })
    }

    handleTokenInputChange = (stype, amount) => {
        this.handleTyping()

        const { swap } = this.state

        if (amount === "") {
            swap.from.amount = ""
            swap.to.amount = ""
            this.setState({ swap, toAmount: "", fromAmount: "" })
            return
        }
        if (amount === "00") {
            swap.from.amount = "0"
            swap.to.amount = "0"
            this.setState({ swap })
            return
        }

        swap[stype].amount = amount

        this.setState({
            typingTimeout: setTimeout(() => {
                this.handleCalcPairPrice(stype, amount)

                this.setState({ swap })
            }, 500)
        })

        this.setState({ swap })
    }

    handleTyping = () => {
        if (this.state.typingTimeout) {
            clearTimeout(this.state.typingTimeout);
        }
    }

    handleCalcPairPrice = async (searchBoxType, amount) => {
        const { swap, web3 } = this.state
        if (!web3) return

        const vstype = searchBoxType === "from" ? "to" : "from"

        if (parseFloat(swap[searchBoxType].amount) === 0) {
            swap[vstype].amount = "0"
            this.setState({ swap })
            return
        }

        try {
            const data = searchBoxType === "from" ?
                this.handleGetAmountsOut(swap.from, swap.to, amount) :
                this.handleGetAmountsIn(swap.from, swap.to, amount)
            swap[vstype].amount = getStayledNumber(data, 9)
            this.setState({
                swap,
                fromAmount: swap.from.amount,
                toAmount: swap.to.amount
            })
        } catch (error) {
            console.log(error);
            this.setState({ swap })
        }
    }


    handleGetAmountsOut = (from, to, amount) => {
        const { priceStocks, isLong } = this.state
        if (to.type === TokenType.Wrapped) {
            const p = isLong ? priceStocks[to.id].Long : priceStocks[to.id].Short
            const sum = (parseFloat(amount) / p.price)
            return sum * (1 - p.fee)
        } else {
            const p = isLong ? priceStocks[from.id].Long : priceStocks[from.id].Short
            const sum = (parseFloat(amount) * p.price)
            return sum * (1 - p.fee)
        }
    }

    handleGetAmountsIn = (from, to, amount) => {
        const { priceStocks, isLong } = this.state
        if (from.type === TokenType.Wrapped) {
            console.log("come");
            const p = isLong ? priceStocks[from.id].Long : priceStocks[from.id].Short
            const sum = (parseFloat(amount) / p.price)
            return sum * (1 + p.fee)
        } else {
            const p = isLong ? priceStocks[to.id].Long : priceStocks[to.id].Short
            const sum = (parseFloat(amount) * p.price)
            return sum * (1 + p.fee)
        }
    }




    handleSearchBox = (flag, type = "from") => {

        this.setState({ showSearchBox: flag, searchBoxType: type })
    }

    handleIinitBalances = async (foceUpdate) => {
        const { tokens, swap } = this.state
        for (let i = 0; i < tokens.length; i++) {
            tokens[i].balance = await this.getSingleBalance(tokens[i].address, foceUpdate)
            console.log(tokens[0].balance);
            if (swap.to.symbol === tokens[i].symbol)
                this.handleInitToken("to", this.state.tokens[i])
            if (swap.from.symbol === tokens[i].symbol)
                this.handleInitToken("from", this.state.tokens[i])
        }

        this.setState({ tokens })
    }

    handleIinitBalancesB = async (foceUpdate) => {
        const { tokens, swap } = this.state
        for (let i = 0; i < tokens.length; i++) {
            tokens[i].allowances = await this.getSingleBalanceB(tokens[i].address, foceUpdate)
            if (swap.to.symbol === tokens[i].symbol)
                this.handleInitToken("to", this.state.tokens[i])
            if (swap.from.symbol === tokens[i].symbol)
                this.handleInitToken("from", this.state.tokens[i])
        }

        this.setState({ tokens })
    }

    getSingleBalanceB = async (address, force = false) => {

        const { web3 } = this.state
        if (!web3) return
        try {
            return await web3.getAllowances(address)
        } catch (error) {
            console.log("getSingleBalanceB ", address, error);
            return 0
        }
    }

    getSingleBalance = async (address, force = false) => {

        const { web3 } = this.state
        if (!web3) return

        // console.log(address);
        try {
            console.log(address);
            const data = await web3.getTokenBalance(address)
            const balance = formatBalance(data)
            return balance
        } catch (error) {
            console.log("getSingleBalance ", address, error);
            return 0
        }
    }

    handleInitAllowances = async (foceUpdate) => {

        this.state.tokens.map(async (t) => {
            try {
                this.getSingleAllowances(t, foceUpdate)
            } catch (error) {
                console.log(error);
            }
        })
    }


    getSingleAllowances = async (token, force = false) => {
        const { swap, web3 } = this.state

        if (!web3) return

        const { tokens } = this.state

        if (force || !token.lastFechAllowance) {

            try {
                const allowances = await web3.getAllowances(token.address)
                token.allowances = allowances
                token.lastFechAllowance = true
                if (token.symbol === swap.from.symbol) {
                    this.handleInitToken("from", token, swap.from.amount)
                }
                // setAllTokens(allTokens)

            } catch (error) {
                console.log(token, error);
            }
        }

    }

    handleBuy = async (token, amount) => {
        console.log("buy called react");
        const { web3, isLong } = this.state
        if (!web3) return
        const tokenAddress = isLong ? token.long.address : token.short.address
        const makerBuySell = await this.getBuySell()
        console.log(makerBuySell[tokenAddress], amount);
        try {
            this.setState({ typeTransaction: { action: "buy", swap: this.state.swap, isLong: isLong } })
            const data = await web3.buy(tokenAddress, amount, makerBuySell[tokenAddress], notify(this.methods))
            //address, amount, blockNo, v, r, s, price, fee
            console.log(data);
        } catch (error) {

        }

    }

    handleSell = async (token, amount) => {
        const { web3, isLong } = this.state
        if (!web3) return
        const makerBuySell = await this.getBuySell()
        const tokenAddress = isLong ? token.long.address : token.short.address
        try {
            this.setState({ typeTransaction: { action: "sell", swap: this.state.swap, isLong: isLong } })
            await web3.sell(tokenAddress, amount, makerBuySell[tokenAddress], notify(this.methods))

            // ans = ans.substr(0, ans.length - max) + "." + ans.substr(ans.length - max);
            // if (ans[0] === ".") {
            //     ans = "0" + ans;
            // }
            // console.log(data);
            // // console.log(data.events);
            // const amm = data.events["Sell"]["returnValues"].amount
            // console.log(amm);
            // amm = amm.substr(0, amm.length - 18) + "." + amm.substr(amm.length - 18);
            // console.log(amm);
        } catch (error) {

        }
    }

    handleConduct = async (token) => {
        const { web3 } = this.state

        if (!web3) return

        try {
            const data = await web3.conduct(token, notify(this.methods))
            console.log(data);
            // token.allowances = allowances
            // setAllTokens(allTokens)

        } catch (error) {
            console.log(token, error);
        }
    }

    handleChangeToken = (token) => {
        const { searchBoxType } = this.state
        const vstype = searchBoxType === "from" ? "to" : "from"

        this.handleInitToken(searchBoxType, token)

        if (token.symbol !== "DAI") {
            this.handleInitToken(vstype, this.state.tokens[0])
        }
        this.setState({ isLong: true })
        this.handleSearchBox(false)
    }

    handleFilterToken = () => {
        const { searchBoxType, tokens, swap } = this.state
        return tokens.filter(t => swap[searchBoxType].name !== t.name)
    }


    isApproved = () => {
        const { swap } = this.state
        return swap.from.allowances > 0
    }

    handleSwap = async () => {
        const { swap, web3 } = this.state
        if (!web3) return

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
        } catch (error) {

        }
    }


    handleApprove = async (swap) => {
        const { web3 } = this.state

        try {
            this.setState({ typeTransaction: { action: "approve" } })
            const data = await web3.approve(swap.from.address, swap.from.amount, notify(this.methods))
            return data
        } catch (error) {
            console.log(error);
        }
        return 0
    }

    render() {
        const { showSearchBox, isLong, swap, fromPerTo, toAmount, fromAmount, searchBoxType, web3, claimable_amount } = this.state

        const from_token = swap.from
        const to_token = swap.to
        const approved = this.isApproved()
        const isMobile = window.innerWidth < 670

        return (<div className="deus-swap-wrap">

            {!isMobile && <ToastContainer style={{ width: "450px" }} />}
            <Title web3={web3} isStock={true} claimable_amount={claimable_amount} />

            <SearchAssets
                searchBoxType={searchBoxType}
                nAllStocks={this.props.nAllStocks}
                showSearchBox={showSearchBox}
                choosedToken={swap[searchBoxType].name}
                handleSearchBox={this.handleSearchBox}
                handleFilterToken={this.state.tokensMap}
                handleChangeToken={this.handleChangeToken}
            />

            <div className="swap-container-wrap">
                <div className="swap-container">
                    <div className="swap-box-wrap">
                        <div className="swap-box">

                            <StockBox type="from" token={from_token}
                                estimated=""
                                isLong={isLong}
                                handleSearchBox={this.handleSearchBox}
                                handleTokenInputChange={this.handleTokenInputChange}
                            />

                            <img
                                onClick={this.handleChangeType}
                                src={process.env.PUBLIC_URL + "/img/arrow.svg"}
                                alt="arrow"
                                className="arrow" />

                            <StockBox type="to" token={to_token}
                                estimated=" (estimated)"
                                isLong={isLong}
                                handleSearchBox={this.handleSearchBox}
                                handleTokenInputChange={this.handleTokenInputChange}
                            />
                            <div style={{ margin: "16px 0" }}></div>


                            {to_token.conducted && to_token.type === TokenType.Wrapped && <WrappedTokenButton token={to_token} isWrap={true} isLong={isLong} handleLong={this.handleLong} />}
                            {from_token.conducted && from_token.type === TokenType.Wrapped && <WrappedTokenButton token={from_token} isWrap={true} isLong={isLong} handleLong={this.handleLong} />}

                            <div style={{ margin: "16px 0" }}></div>

                            <TokenMarket
                                handleSwich={this.handleSwichPerPrice}
                                swap={swap}
                                toAmount={toAmount}
                                fromAmount={fromAmount}
                                fromPerTo={fromPerTo}
                                isLong={isLong}
                                perPrice={""}
                                tvl={""}
                                tradeVol={""}
                            />

                            <div style={{ margin: "16px 0" }}></div>
                            <SwapStockButton handleConduct={this.handleConduct}
                                handleSwap={this.handleSwap}
                                from_token={from_token}
                                to_token={to_token}
                                approved={approved}
                                web3={web3}
                                isStock={true}
                                isMobile={isMobile} />
                            <div style={{ margin: "2px 0" }}></div>

                            <div style={{ margin: "4px 0" }}></div>
                        </div>

                        {/* <PriceBox impact={""} vaultsFee={""} /> */}

                        {/* {from_token.name && to_token && <Routes from={from_token} to={to_token} chainId={chainId} />} */}

                        <p className="ipo" style={{ fontSize: "15px" }}>
                            conduct   -{`>`} long/short  -{`>`} synchronize <br /><br />
                            Synchronize your crypto portfolio with your favorite Stock or ETF <br />
                            <br />
                            *Only if your desired asset was not “conducted” (deployed as an ERC-20 Token) yet.
                        </p>
                    </div>
                </div>
            </div>
        </div >);
    }
}


export default StockSwap;