import React, { Component } from 'react';
import PriceBox from './PriceBox';
import TokenBox from './TokenBox';
import SearchBox from './SearchBox';
import TokenMarket from './TokenMarket';
import SwapButton from './SwapButton';
import { swapTokensList } from '../../config';
import { approve, swapTokens, getAllowances, getAmountsIn, getAmountsOut, getTokenBalance } from '../../services/SwapServices';


import { getStayledNumber, notify } from '../../utils/utils';
import { ToastContainer } from 'react-toastify';
import './mainSwap.scss';


class MainSwap extends Component {
    state = {
        tokens: swapTokensList,
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
        searchBoxType: "from",
        fromPerTo: false,
        typingTimeout: 0,

    }


    methods = {
        onStart: () => {
            console.log("onStart")

        },
        onSuccess: () => {
            console.log("onSuccess")
            const { swap } = this.state
            this.handleSingleInit(swap.to)
            this.handleSingleInit(swap.from)
        },
        onError: () => console.log("onError"),
    }

    async componentDidMount() {
        console.log("chain id is", this.props.chainId);

        this.handleTokensToMap()
        await this.handleIinitBalances()
        await this.handleInitAllowances()
        this.handleInitToken("from", "ETH")
        this.handleInitToken("to", "DEUS")
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.account !== this.props.account) {
            console.log("chain id is", this.props.chainId);
            await this.handleIinitBalances()
            await this.handleInitAllowances()
            // this.handleInitToken("from", "ETH")
            // this.handleInitToken("to", "DEUS")
        }
    }

    handleSingleInit = (token) => {
        this.getSingleBalance(token)
        this.getSingleAllowances(token)
    }


    handleTokensToMap = () => {
        const { tokens, tokensMap } = this.state
        tokens.map(t => {
            tokensMap[t.name] = t
        })
        this.setState({ tokensMap })
    }

    handleInitToken = (type, tokenName) => {
        const { swap, tokensMap } = this.state
        const tk = tokensMap[tokenName]
        swap[type] = { ...tk, amount: "" }
        this.setState({ swap })
    }

    getToken = (tokenName) => this.state.tokens.find(t => t.name === tokenName)

    handleChangeType = () => {
        const { swap } = this.state
        const { from, to } = swap
        from.amount = ""
        to.amount = ""
        swap.from = to
        swap.to = from
        this.setState({ swap })
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
            this.setState({ swap })
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
            }, 750)
        })

        this.setState({ swap })
        // this.handleCalcPairPrice(stype, amount)
    }


    handleTyping = () => {
        if (this.state.typingTimeout) {
            clearTimeout(this.state.typingTimeout);
        }
    }

    handleCalcPairPrice = async (searchBoxType, amount) => {
        const { swap } = this.state
        const vstype = searchBoxType === "from" ? "to" : "from"

        try {
            const data = searchBoxType === "from" ? await getAmountsOut(swap.from.name, swap.to.name, amount) : await getAmountsIn(swap.from.name, swap.to.name, amount)
            console.log(data);
            swap[vstype].amount = getStayledNumber(data, 9)
            this.setState({ swap })
        } catch (error) {
            console.log(error);
            // swap[vstype].amount = "1"
            this.setState({ swap })
        }
    }

    handleSearchBox = (flag, type) => {
        this.setState({ showSearchBox: flag, searchBoxType: type })
    }

    handleIinitBalances = async () => {
        const { tokensMap, tokens, swap } = this.state

        tokens.map(async (t) => {
            try {
                this.getSingleBalance(t)
            } catch (error) {
                console.log(error);
            }
        })
        this.setState({ tokensMap })
    }

    getSingleBalance = async (token) => {
        const { tokensMap, swap } = this.state
        try {
            const balance = await getTokenBalance(token.name)
            tokensMap[token.name].balance = getStayledNumber(parseFloat(balance))
            if (token.name === swap.to.name || token.name === swap.from.name) {
                this.handleInitToken("from", swap.from.name)
                this.handleInitToken("to", swap.to.name)
            }
        } catch (error) {
            console.log(error);
        }
        this.setState({ tokensMap })
    }


    handleInitAllowances = async () => {
        const { tokensMap, tokens, swap } = this.state

        tokens.map(async (t) => {
            try {
                this.getSingleAllowances(t)
            } catch (error) {
                console.log(error);
            }
        })
        this.setState({ tokensMap })
    }


    getSingleAllowances = async (token) => {
        const { tokensMap, swap } = this.state

        const allowances = await getAllowances(token.name)
        console.log(allowances);
        tokensMap[token.name].allowances = parseInt(allowances)
        if (token.name === swap.to.name || token.name === swap.from.name) {
            this.handleInitToken("from", swap.from.name)
            this.handleInitToken("to", swap.to.name)
        }
    }

    handleGetBalance = async (tokenName) => await getTokenBalance(tokenName)




    handleChangeToken = (tokenName) => {
        const { searchBoxType, swap } = this.state
        const vstype = searchBoxType === "from" ? "to" : "from"

        if (swap[vstype].name === tokenName) {
            const tmp = swap[searchBoxType].name
            this.handleInitToken(vstype, tmp)
        }
        this.handleInitToken(searchBoxType, tokenName)
        this.handleSearchBox(false)
    }

    handleFilterToken = () => {
        const { searchBoxType, tokens, swap } = this.state
        return tokens.filter(t => swap[searchBoxType].name !== t.name)
    }

    // handleFilterToken = () => {
    //     const { searchBoxType, tokens, swap } = this.state
    //     return tokens.filter(t => swap[searchBoxType].name !== t.name)
    // }



    isApproved = () => {
        const { swap } = this.state
        // console.log(swap.to.allowances > 0);
        return swap.from.allowances > 0
    }

    handleSwap = async () => {
        const { swap } = this.state
        const { from, to } = swap
        console.log("come");
        try {
            const data = !(swap.from.allowances > 0) ?
                await approve(from.name, from.amount, notify(this.methods)) :
                await swapTokens(from.name, to.name, from.amount, to.amount, notify(this.methods))
        } catch (error) {

        }
    }



    render() {

        const { showSearchBox, swap, fromPerTo } = this.state
        const from_token = swap.from
        const to_token = swap.to
        const approved = this.isApproved()


        return (<div className="deus-swap-wrap">

            <ToastContainer style={{ width: "400px" }} />

            <div className="title">
                <img src={process.env.PUBLIC_URL + "/img/DEUSName.svg"} alt="DEUS" />
                <div className="swap-wrap">
                    <div className="swap">
                        Swap
                </div>
                </div>
            </div>


            <div className="swap-container-wrap">
                <div className="swap-container">
                    {/* <div className="show-dollar-wrap grad-wrap">
                        <div className="show-dollar grad">SHOW DOLLAR PRICE</div>
                    </div> */}

                    <div className="swap-box-wrap">
                        <div className="swap-box">

                            <TokenBox type="from" token={from_token}
                                handleSearchBox={this.handleSearchBox}
                                handleTokenInputChange={this.handleTokenInputChange}
                            />

                            <img
                                onClick={this.handleChangeType}
                                src={process.env.PUBLIC_URL + "/img/arrow.svg"}
                                alt="arrow"
                                className="arrow" />

                            <TokenBox type="to" token={to_token}
                                handleSearchBox={this.handleSearchBox}
                                handleTokenInputChange={this.handleTokenInputChange}
                            />

                            <TokenMarket handleSwich={this.handleSwichPerPrice} swap={swap} fromPerTo={fromPerTo} perPrice={0.3003} tvl={6245.343} tradeVol={945.343} />

                            <SwapButton handleSwap={this.handleSwap} token={swap.from} approved={approved} />
                        </div>

                        <PriceBox impact={0.05} vaultsFee={0.0098} />

                        <SearchBox
                            showSearchBox={showSearchBox}
                            handleSearchBox={this.handleSearchBox}
                            handleFilterToken={this.state.tokensMap}
                            handleChangeToken={this.handleChangeToken}
                        />

                    </div>
                </div>
            </div>
        </div>);
    }
}


export default MainSwap;