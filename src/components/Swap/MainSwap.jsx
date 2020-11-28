import React, { Component } from 'react';
import PriceBox from './PriceBox';
import TokenBox from './TokenBox';
import SearchBox from './SearchBox';
import TokenMarket from './TokenMarket';
import SwapButton from './SwapButton';

import './mainSwap.scss';

class MainSwap extends Component {
    state = {
        tokens: [
            { name: "DEA", pic_name: "dea", price: 34.05, balance: 0.96 },
            { name: "DEUS", pic_name: "deus", price: 1.47, balance: 700.48 },
            { name: "USDC", pic_name: "usdc", price: 1.05, balance: 436.23 },
            // { name: "rTSLA", pic_name: "registrar", price: 1.05, balance: 0 },
            // { name: "rQQQ", pic_name: "registrar", price: 53.09, balance: 0 },
            { name: "ETH", pic_name: "eth-logo", price: 350.33, balance: 0.668 },
        ],
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
    }

    handleInitToken = (type, tokenName) => {
        const { tokens, swap } = this.state
        const tk = tokens.find(t => t.name === tokenName)
        swap[type] = { ...tk, amount: "" }
        this.setState({ swap })
    }

    handleChangeType = () => {
        const { swap } = this.state
        const { from, to } = swap
        from.amount = ""
        to.amount = ""
        swap.from = to
        swap.to = from
        this.setState({ swap })
        console.log("handleChangeType");
    }

    handleTokenInputChange = (stype, amount) => {
        // this.handleTyping()
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
        this.setState({ swap })
    }


    handleSearchBox = (flag, type) => {
        this.setState({ showSearchBox: flag, searchBoxType: type })
    }

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

    componentDidMount() {
        this.handleInitToken("from", "ETH")
        this.handleInitToken("to", "DEUS")
    }

    render() {

        const { showSearchBox, swap } = this.state
        const from_token = swap.from
        const to_token = swap.to

        return (<div className="deus-swap-wrap">
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

                            <TokenMarket handleChangeType={this.handleChangeType} />

                            <SwapButton />
                        </div>

                        <PriceBox />

                        <SearchBox
                            showSearchBox={showSearchBox}
                            handleSearchBox={this.handleSearchBox}
                            handleFilterToken={this.handleFilterToken}
                            handleChangeToken={this.handleChangeToken}
                        />

                    </div>
                </div>
            </div>
        </div>);
    }
}


export default MainSwap;