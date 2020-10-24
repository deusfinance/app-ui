import React, { Component } from 'react';
import './steps.scss'

class BuildRegistrar extends Component {
    state = {
        query: "",
        isFocus: false,
        assets: [
            {
                name: "tsla",
                real_name: "U.S.: NASDAQ",
                inc: "TESLA Inc.",
                price: "448.16",
                new_price: "468.18",
            },
            {
                name: "tsla inverted ",
                real_name: "U.S.: NASDAQ",
                inc: "TESLA Inc.",
                price: "230.16",
                new_price: "220.73",
            },
            {
                name: "qqq",
                real_name: "U.S.: NASDAQ",
                inc: "TESLA Inc.",
                price: "100.92",
                new_price: "100.92",
            },
            {
                name: "qqq inverted",
                real_name: "U.S.: NASDAQ",
                inc: "TESLA Inc.",
                price: "120.92",
                new_price: "145.37",
            },
            {
                name: "tsla",
                real_name: "U.S.: NASDAQ",
                inc: "TESLA Inc.",
                price: "448.16",
                new_price: "468.18",
            },
            {
                name: "tsla inverted ",
                real_name: "U.S.: NASDAQ",
                inc: "TESLA Inc.",
                price: "230.16",
                new_price: "220.73",
            },
            {
                name: "qqq",
                real_name: "U.S.: NASDAQ",
                inc: "TESLA Inc.",
                price: "100.92",
                new_price: "100.92",
            },
            {
                name: "qqq inverted",
                real_name: "U.S.: NASDAQ",
                inc: "TESLA Inc.",
                price: "120.92",
                new_price: "145.37",
            },
        ]
    }

    computeProfit = (prevPrice, newPrice) => {

        if (prevPrice === newPrice) {
            return { price: 0, percentage: 0, className: "profit-zero" }
        } else if (prevPrice > newPrice) {

            return { price: (newPrice - prevPrice).toFixed(2), percentage: (-1 * ((prevPrice - newPrice) / prevPrice) * 100).toFixed(2), className: "profit-down" }

        } else {
            return { price: '+' + (newPrice - prevPrice).toFixed(2), percentage: '+' + (((newPrice - prevPrice) / prevPrice) * 100).toFixed(2), className: "profit-up" }
        }
    }

    handleSearchInputChange = (query) => {
        this.setState({ query: query })
    }
    onBlur = () => {
        this.setState({ isFocus: false })
    }
    onFocus = () => {
        this.setState({ isFocus: true })
    }

    render() {
        const { query, assets, isFocus } = this.state
        const filterdAssets = assets.filter(s => {
            if (s.real_name.includes(query) || s.name.includes(query)) {
                return true
            }
            return false
        })
        const seachClasses = filterdAssets.length < 5 ? "over-flow-y-hidden" : "over-flow-y-auto"
        return (<>

            <div className="conductr-wrap">
                <div className="bg-conductr-wrap">
                    <div className="bg-conductr ">
                        <div className="bg-left">
                            <img className="" src={process.env.PUBLIC_URL + "/img/right-conductr.svg"} alt="" />
                        </div>
                        <div className="bg-right">
                            <img className="" src={process.env.PUBLIC_URL + "/img/right-conductr.svg"} alt="" />
                        </div>
                    </div>

                    <div className="container">
                        <div className="build-wrap">
                            <div className="decription">
                                <div className="step-number">step 1</div>
                                <div className="step-title">Build your registrar</div>
                                <div className="step-info">
                                    {!isFocus && <pre>{`
Use the search bar to find desired assets that you want to mirror.

You can select currently two different assets.


In the v0.1 Pilot we are offering
- TSLA
- QQQ
- inverted TSLA
- inverted QQQ


500 + more will be added in december
                                    `}
                                    </pre>}
                                    {isFocus && <pre>{`
Use the search bar to find desired assets that you want to mirror to conduct your personalised registrar. 

You can select as many different assets as you wish and change their allocation.
                                    `}
                                    </pre>}
                                </div>
                                <div className="bar-wrap">
                                    <div className="bar-chart-wrap">
                                        <div className="bar-chart-light">
                                            ${"37,083"}
                                        </div>
                                        <div className="bar-chart-black"></div>
                                    </div>
                                    <div className="bar-text">
                                        <div className="title">current :</div>
                                        <div className="title">hardcap :  ${"150,000"}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="tools">
                                <div className="pilot-wrap-step1">
                                    <div className="pilot">
                                        <div className="title">
                                            conduct <img src={`${process.env.PUBLIC_URL}/img/conducr-icon.svg`} alt="" />
                                        </div>
                                        <div className="title-pilot">pilot</div>
                                    </div>
                                </div>

                                <div className="note"> {isFocus ? `Note: for pilot puroses we’re only supporting tsla +/- and qqqq +/-` : <span style={{ opacity: 0 }}>empty</span>}

                                </div>

                                <div className="symbol-wrap">
                                    <input
                                        className="symbol"
                                        type="text"
                                        id="symbol"
                                        placeholder="Enter a symbol or keyword"
                                        onChange={(e) => this.handleSearchInputChange(e.currentTarget.value)}
                                        onFocus={this.onFocus} onBlur={this.onBlur}
                                    />
                                </div>

                                {isFocus && <div className="search-wrap">
                                    <div className={`search-output ${seachClasses}`}>
                                        {
                                            filterdAssets.map(s => {
                                                let profit = this.computeProfit(s.price, s.new_price)
                                                return <>
                                                    <div className="search-item">
                                                        <div className="search-left">
                                                            <div className="search-top">
                                                                <div className="name">
                                                                    <span>{s.name}</span> <span>{s.real_name}</span>
                                                                </div>

                                                                <div className="price">{s.new_price}</div>
                                                            </div>
                                                            <div className="search-bottom">
                                                                <div className="p1">{s.inc}</div>
                                                                <div className={profit.className}>{profit.price} ({profit.percentage}%)</div>
                                                            </div>
                                                        </div>
                                                        <div className="search-right">
                                                            <div className="add-btn-wrap">
                                                                <div className="add-btn">Add</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            })
                                        }
                                    </div>
                                </div>}



                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>);
    }
}

export default BuildRegistrar;