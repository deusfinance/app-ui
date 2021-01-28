import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { getStayledNumber, notify, formatBalance } from '../../utils/utils';
import TokenMarket from './../../components/Swap/TokenMarket';
import Title from './../../components/Swap/Title';
import SwapStockButton from './../../components/Swap/SwapStockButton';
import WrappedTokenButton from './../../components/Swap/WrappedTokenButton';
import SearchAssets from './../../components/Swap/SearchAssets';
import StockBox from './../../components/Swap/StockBox';
import _, { rest } from "lodash"
import { toast } from 'react-toastify';
import { TokenType } from '../../config';
import { StockService } from '../../services/StockService';
import { useState, useEffect } from 'react';
import './../../components/Swap/mainSwap.scss';
import { handleGetAmountsOut, handleCalcPairPrice, handleGetAmountsIn, handleApprove, handleSwap, deaToken, daiToken } from '../../services/stock';
// showSearchBox: false,
// priceStocks: null,
// conductedCount: 0,
// searchBoxType: "from",
// conducted: {},
// fromPerTo: true,
// claimable_amount: null,
// typingTimeout: 0,
// typeTransaction: "",
// slippageAmount: 0.1,
// isLong: true,
// buySell: {},
// toAmount: "",
// fromAmount: ""


// async componentDidMount() {
// const { chainId, account } = this.props
// if (!nAllStocks) {

// }

// this.getPrices()
// this.getConducted()

// if (!chainId || !account) return

// await this.setState({ web3: new StockService(account, chainId) })
// await this.handleIinitBalances()
// await this.handleIinitBalancesB()
// }

// async componentDidUpdate(prevProps) {

//     const { chainId, account } = this.props

//     if (prevProps.account !== account || prevProps.chainId !== chainId) {
//         if (!chainId || !account) return

//         await this.setState({ web3: new StockService(account, chainId) })
//         await this.handleIinitBalances(true)
//         await this.handleIinitBalancesB()

//         await this.getClaimable()
//         // await this.handleInitAllowances(true)

//         this.handleInitToken("from", this.state.tokens[0])
//         this.handleInitTokenByName("to", "TSLA")
//     }
// }

/* const handleLong = (bool) => {
    this.setState({ isLong: bool })
}

const getTokenWrapBalance = async (token) => {
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

const addConductedToToken = () => {
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

const getClaimable = async () => {
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

const handleSlippage = (amount) => {
    this.setState({ slippageAmount: amount })
}

const handleTokensToMap = () => {
    const { tokens, tokensMap } = this.state
    for (let i = 0; i < tokens.length; i++) {
        tokensMap[tokens[i].name] = tokens[i]
    }
    this.setState({ tokensMap })
}

const getToken = (tokenName) => this.state.tokens.find(t => t.name === tokenName)

const handleChangeType = () => {
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

const handleSwichPerPrice = () => {
    const { fromPerTo } = this.state
    this.setState({ fromPerTo: !fromPerTo })
}

const handleSearchBox = (flag, type = "from") => {

    this.setState({ showSearchBox: flag, searchBoxType: type })
}

const handleIinitBalances = async (foceUpdate) => {
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

const handleIinitBalancesB = async (foceUpdate) => {
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

const getSingleBalanceB = async (address, force = false) => {

    const { web3 } = this.state
    if (!web3) return
    try {
        return await web3.getAllowances(address)
    } catch (error) {
        console.log("getSingleBalanceB ", address, error);
        return 0
    }
}

const getSingleBalance = async (address, force = false) => {

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

const handleInitAllowances = async (foceUpdate) => {

    this.state.tokens.map(async (t) => {
        try {
            this.getSingleAllowances(t, foceUpdate)
        } catch (error) {
            console.log(error);
        }
    })
}






*/


const Sync = () => {

    const [tokens, _] = useState([daiToken, deaToken])

    const [swap, setSwap] = useState(
        {
            from: {
                name: "", pic_name: "", price: "", balance: "", amount: ""
            },
            to: {
                name: "", pic_name: "", price: "", balance: "", amount: ""
            }
        }
    )

    const [typingTimeout, setTypingTimeout] = useState(0)

    const isMobile = window.innerWidth < 670

    const isLong = true
    const claimable_amount = 0
    const searchBoxType = "from"
    const showSearchBox = false

    const [stocksList, setStocksList] = useState(null)

    useEffect(() => {
        document.body.style.backgroundColor = '#2c2f36'
        document.body.style.backgroundImage = 'radial-gradient(50% 50% at 50% 50%, #5c5c5c61 0%, #000000 100%)'
        // handleInitTokenByName("to", "TSLA")
        const fromToken = tokens[0]
        const toToken = tokens[1]

        handleInitToken("from", { ...fromToken })
        handleInitToken("to", { ...toToken })

        // this.setState({
        //     subscrible: setInterval(() => {
        //         this.getPrices()
        //         this.getConducted()
        //     }, 30000)
        // })


    }, [])

    const handleFilterToken = () => {
        const { searchBoxType, tokens, swap } = this.state
        return tokens.filter(t => swap[searchBoxType].name !== t.name)
    }

    const handleChangeToken = (token) => {
        const { searchBoxType } = this.state
        const vstype = searchBoxType === "from" ? "to" : "from"

        this.handleInitToken(searchBoxType, token)

        if (token.symbol !== "DAI") {
            this.handleInitToken(vstype, this.state.tokens[0])
        }
        this.setState({ isLong: true })
        this.handleSearchBox(false)
    }

    const getBuySell = async () => {
        try {
            const resp = await fetch("https://test.deus.finance/oracle-files/buyOrSell.json")
            const respj = await resp.json()
            return respj
        } catch (error) {
            console.log(" get Market Amounts had some error", error);
        }
    }

    async function getStocks() {
        try {
            const resp = await fetch("https://test.deus.finance/oracle-files/registrar.json")
            const respj = await resp.json()
            return respj
        } catch (error) {
            console.log(" get Market Amounts had some error", error);
        }
    }

    const getPrices = async () => {
        try {
            const resp = await fetch("https://test.deus.finance/oracle-files/price.json")
            const respj = await resp.json()
            this.setState({ priceStocks: respj })
        } catch (error) {
            console.log(" get Market Amounts had some error", error);
        }
    }

    const getConducted = async () => {
        try {
            const resp = await fetch("https://test.deus.finance/oracle-files/conducted.json")
            const respj = await resp.json()
            this.setState({ conducted: respj })
        } catch (error) {
            console.log(" get Market Amounts had some error", error);
        }
        this.addConductedToToken()
    }

    const handleInitToken = (type, token, amount = "") => {
        swap[type] = { ...token, amount: amount }
        // this.setState({ swap, toAmount: "", fromAmount: "" })
        console.log("handleInitToken");
        setSwap(swap)
    }


    const handleInitTokenByName = (type, tokenName, amount = "") => {
        let token = {}
        console.log("handleInitTokenByName");

        if (type === "from") {
            token = _.find([], { symbol: tokenName })
        } else {
            token = _.find([], { symbol: tokenName })
        }
        swap[type] = { ...token, amount: amount }
        setSwap(swap)
    }


    const handleTokenInputChange = (stype, amount) => {

        handleTyping()

        if (amount === "00") {
            return
        }

        if (amount === "") {
            swap.from.amount = ""
            swap.to.amount = ""
            setSwap({ ...swap })
            return
        }

        swap[stype].amount = amount
        setSwap({ ...swap })

        setTypingTimeout(
            setTimeout(async () => {
                const newSwap = await handleCalcPairPrice(swap, stype, amount)
                setSwap({ ...newSwap })
            }, 500)
        )
    }

    const handleTyping = () => {
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }
    }


    return (<div className="deus-swap-wrap">

        {!isMobile && <ToastContainer style={{ width: "450px" }} />}
        <Title isStock={true} claimable_amount={claimable_amount} />

        <SearchAssets
            searchBoxType={searchBoxType}
            nAllStocks={[]}
            showSearchBox={showSearchBox}
            choosedToken={swap[searchBoxType].name}
            // handleSearchBox={handleSearchBox}
            handleFilterToken={{}}
        // handleChangeToken={handleChangeToken}
        />

        <div className="swap-container-wrap">
            <div className="swap-container">
                <div className="swap-box-wrap">
                    <div className="swap-box">

                        <StockBox
                            type="from"
                            token={swap.from}
                            estimated=""
                            isLong={isLong}
                            // handleSearchBox={handleSearchBox}
                            handleTokenInputChange={handleTokenInputChange}
                        />

                        <img
                            // onClick={handleChangeType}
                            src={process.env.PUBLIC_URL + "/img/arrow.svg"}
                            alt="arrow"
                            className="arrow" />

                        <StockBox
                            type="to"
                            token={swap.to}
                            estimated=" (estimated)"
                            isLong={isLong}
                            // handleSearchBox={handleSearchBox}
                            handleTokenInputChange={handleTokenInputChange}
                        />

                        <div style={{ margin: "16px 0" }}></div>

                        {/* 
                        {to_token.conducted && to_token.type === TokenType.Wrapped && <WrappedTokenButton token={to_token} isWrap={true} isLong={isLong} handleLong={handleLong} />}
                        {from_token.conducted && from_token.type === TokenType.Wrapped && <WrappedTokenButton token={from_token} isWrap={true} isLong={isLong} handleLong={handleLong} />}

                        <div style={{ margin: "16px 0" }}></div>

                        <TokenMarket
                            handleSwich={handleSwichPerPrice}
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
                            isMobile={isMobile} /> */}
                        <div style={{ margin: "2px 0" }}></div>

                        <div style={{ margin: "4px 0" }}></div>
                    </div>


                    {/* <p className="ipo" style={{ fontSize: "15px" }}>
                        conduct   -{`>`} long/short  -{`>`} synchronize <br /><br />
                            Synchronize your crypto portfolio with your favorite Stock or ETF <br />
                        <br />
                            *Only if your desired asset was not “conducted” (deployed as an ERC-20 Token) yet.
                        </p> */}
                </div>
            </div>
        </div>
    </div >);
}

export default Sync;