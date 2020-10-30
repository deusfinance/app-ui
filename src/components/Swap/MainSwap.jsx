import React, { Component } from 'react';
import './mainSwap.scss';
import TokenBox from './TokenBox';

class MainSwap extends Component {
    state = {
        tokens: [
            { name: "DEA", pic_name: "dea", price: 34.05, balance: 0.96 },
            { name: "DEUS", pic_name: "deus", price: 1.47, balance: 700.48 },
            { name: "USDC", pic_name: "usdc", price: 1.05, balance: 436.23 },
            { name: "rTSLA", pic_name: "registrar", price: 1.05, balance: 0 },
            { name: "rQQQ", pic_name: "registrar", price: 53.09, balance: 0 },
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
        // this.getAmountFromSwap(stype, amount)
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
        // const type = searchBoxType === "from" ? "to" : "from"
        return tokens.filter(t => swap[searchBoxType].name !== t.name)
    }

    componentDidMount() {
        this.handleInitToken("from", "ETH")
        this.handleInitToken("to", "DEUS")
    }

    render() {

        const { tokens, showSearchBox, swap } = this.state

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
                    <div className="show-dollar-wrap grad-wrap">
                        <div className="show-dollar grad">SHOW DOLLAR PRICE</div>
                    </div>

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


                            {/*                           
                              <div className="token-box-wrap to-token">
                                <div className="token-box">
                                    <div className="top">
                                        <p>To</p>
                                        <div className="balance">
                                            <span>Balance: </span>
                                            <span>123</span>
                                        </div>
                                    </div>
                                    <div className="bottom">
                                        <input type="number" className="input-amount" placeholder="0.0" />
                                        <div className="token-info" onClick={() => this.handleSearchBox("from")}>
                                            <img className="token-icon" src={process.env.PUBLIC_URL + "/tokens/deus-logo.svg"} alt="ETH" />
                                            <span className="token-name">DEUS</span>
                                            <img className="select-icon" src={process.env.PUBLIC_URL + "/img/select.svg"} alt="select" />
                                        </div>
                                    </div>
                                </div>
                            </div> */}

                            <div className="token-market">
                                <div>
                                    <p>Price</p>
                                    <p>0.0038 ETH per DEUS <img
                                        onClick={this.handleChangeType}
                                        className="switch"
                                        src={process.env.PUBLIC_URL + "/img/switch-logo.svg"} /></p>
                                </div>
                                <div>
                                    <p>TVL</p>
                                    <p>6,245.343 ETH</p>
                                </div>
                                <div>
                                    <p>Trading Volume</p>
                                    <p>945.343 ETH</p>
                                </div>
                            </div>
                            <div className="swap-btn-wrap grad-wrap">
                                <div className="swap-btn grad">
                                    swap
                                </div>
                            </div>
                        </div>
                        <div className="price-box">
                            <div>
                                <p>Price Impact</p>
                                <p>0.05%</p>
                            </div>
                            <div>
                                <p>Vault Fee</p>
                                <p>0.0015 ETH</p>
                            </div>
                        </div>

                        {showSearchBox && <div className="search-box-wrap">
                            <div className="search-box">
                                <div className="label">
                                    <p>Select or search for a token</p>
                                    <div onClick={() => this.handleSearchBox(false)}>close</div>
                                </div>
                                <input type="text" placeholder="Search name or paste address" spellCheck="false" autoComplete="false" />
                                <div className="token-items-wrap">
                                    <p>Token</p>
                                    <div className="token-items">
                                        {
                                            this.handleFilterToken().map((t, i) => {
                                                return <div key={i} className="token-item" onClick={() => this.handleChangeToken(t.name)}>
                                                    <div>
                                                        <img src={process.env.PUBLIC_URL + `/tokens/${t.pic_name}.svg`} alt={t.name} />
                                                        <p>{t.name}</p>
                                                    </div>
                                                    <p >{t.price}</p>
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <p className="msg">
                                <div>There will be 500+ Stocks added until 31.12.2020</div>
                            </p>
                        </div>}


                    </div>


                </div>
            </div>

        </div>);
    }
}


export default MainSwap;