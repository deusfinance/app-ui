import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { ToastContainer } from 'react-toastify';
import { notify } from '../../utils/utils';
import TokenMarket from './../../components/Swap/TokenMarket';
import SwapStockButton from '../../components/Sync/SwapStockButton';
import WrappedTokenButton from '../../components/Sync/WrappedTokenButton';
import SearchAssets from '../../components/Sync/SearchAssets';
import StockBox from '../../components/Sync/StockBox';
import _ from "lodash"
import { toast } from 'react-toastify';
import { TokenType } from '../../config';
import { StockService } from '../../services/StockService';
import { handleCalcPairPrice, deaToken, daiToken, fetcher, emptyToken } from '../../services/stock';
import './../../components/Swap/mainSwap.scss';
import { useWeb3React } from '@web3-react/core';
import PersonalCap from '../../components/Sync/PersonalCap';

import './styles/style.scss'
import { assetsTitle } from '../../utils/constant';

const Stonks = () => {

    const { account, chainId } = useWeb3React()

    const [tokens,] = useState([{ ...daiToken, type: TokenType.Main }, deaToken])

    const [swap, setSwap] = useState(
        {
            from: {
                name: "", logo: "", price: "", balance: "", amount: ""
            },
            to: {
                name: "", logo: "", price: "", balance: "", amount: ""
            }
        }
    )

    const [typingTimeout, setTypingTimeout] = useState(0)
    const isMobile = window.innerWidth < 670
    const [isLong, setLong] = useState(true)
    const [showSearchBox, setShowSearchBox] = useState(false)
    const [stocks, setStocks] = useState(null)
    const [conducted, setConducted] = useState(null)
    const [prices, setPrice] = useState(null)
    const [fromPerTo, setFromPerTo] = useState(true)
    const [searchBoxType, setSearchBoxType] = useState("from")
    const to_token = swap.to
    const from_token = swap.from

    const [loading, setLoading] = useState(true);
    // const [loadingDAI, setLoadingDAI] = useState(true);
    const [loadingCap, setLoadingCAP] = useState(false);
    const [subscrible, setSubscrible] = useState(null);
    const [totalCap, setTotalCap] = useState(0);
    const [remindCap, setRemindCap] = useState(0);
    const [longPrice, setLongPrice] = useState("");
    const [web3Class, setWeb3Class] = useState(new StockService(account, chainId))
    // const [apiEndpoint, setApiEndpoint] = useState("https://sync.deus.finance/oracle-files")
    const [apiEndpoint,] = useState("https://oracle1.deus.finance")
    let transactionType = {}
    useEffect(() => {
        if (account && chainId) {
            setWeb3Class(new StockService(account, chainId))
        }
        initialCap()

    }, [account, chainId])


    const getConducted = useCallback(() => fetcher(apiEndpoint + "/conducted.json?v=2"), [apiEndpoint])
    const getPrices = useCallback(() => fetcher(apiEndpoint + "/price.json"), [])
    const getBuySell = useCallback(() => fetcher(apiEndpoint + "/buyOrSell.json"), [apiEndpoint])
    const getStocks = useCallback(() => fetcher(apiEndpoint + "/registrar.json?v=2"), [apiEndpoint])

    useEffect(() => {
        handleInitToken("from", { ...daiToken })
        setSubscrible(setInterval(() => {
            getPrices().then((res) => {
                setPrice(res)
            })
        }, 15000))
        return clearInterval(subscrible)
    }, [])

    useEffect(() => {
        document.body.style.backgroundColor = '#2c2f36'
        document.body.style.backgroundImage = 'radial-gradient(50% 50% at 50% 50%, #5c5c5c61 0%, #000000 100%)'
        document.body.style.backgroundRepeat = "no-reapet"

        const fromToken = tokens[0]
        const toToken = { ...emptyToken, balance: "0" }

        handleInitToken("from", { ...fromToken })
        handleInitToken("to", { ...toToken })

    }, [web3Class])

    useEffect(() => { //adding chain and type wrap
        if (conducted && stocks) {
            conducted.tokens.map(async (token) => {
                stocks[token.id].decimals = 18
                stocks[token.id].conducted = true
                stocks[token.id].long = { address: token.long }
                stocks[token.id].short = { address: token.short }
                stocks[token.id].long.balance = await web3Class.getTokenBalance(token.long, account)
                stocks[token.id].short.balance = await web3Class.getTokenBalance(token.short, account)
                if (swap.to.symbol === token.id) {
                    handleInitTokenByName("to", token.id)
                }
                if (swap.from.symbol === token.id) {
                    handleInitTokenByName("from", token.id)
                }
            })
            setStocks(stocks)
            // handleInitTokenByName("to", "TSLA")

        }
    }, [stocks, account])


    useEffect(() => {
        handleTokenInputChange("from", swap.from.amount)
    }, [isLong, prices])

    const initialCap = useCallback(async () => {
        if (account) {
            setLoadingCAP(true)
            web3Class.getTotalCap(account).then(total => {
                setTotalCap(total)
                web3Class.getUsedCap(account).then(used => {
                    setRemindCap(total - used)
                    setLoadingCAP(false)
                })
            })
        }
    }, [account, chainId])

    const getData = useCallback(() => {
        setLoading(true);
        getConducted().then((res) => {
            setConducted(res)
            getStocks().then((res) => {
                setStocks(res)
                getPrices().then((res) => {
                    setPrice(res)
                    setLoading(false);
                    console.log("fetching finished");
                })
            })
        })
    }, [getStocks, getConducted, getPrices, apiEndpoint]);

    useEffect(() => {
        getData();
    }, [getData]);

    const handleFilterToken = () => {
        const { searchBoxType, tokens, swap } = this.state
        return tokens.filter(t => swap[searchBoxType].name !== t.name)
    }


    const handleChangeToken = (token) => {
        const vstype = searchBoxType === "from" ? "to" : "from"

        handleInitToken(searchBoxType, token)

        if (token.symbol !== "DAI") {
            handleInitToken(vstype, tokens[0])
        }
        setLong(true)
        handleSearchBox(false)
    }

    const handleChangeType = () => {

        const { from, to } = swap
        if (!to.conducted && to.type !== TokenType.Main) {
            to.symbol !== "" && toast.warning("After conducting the asset you can long/short it.", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            return
        }
        from.amount = ""
        to.amount = ""
        setSwap({ from: { ...to }, to: { ...from } })
    }

    const handleInitToken = async (type, token, amount = "") => {
        if (token.type === TokenType.Main) {
            token.balance = await web3Class.getTokenBalance(token.address, account)
            token.allowances = await web3Class.getAllowances(token.address, account)
            // setLoadingDAI(false)
        }
        swap[type] = { ...token, amount: amount }
        setSwap({ ...swap })
    }

    const handleInitTokenByName = async (type, tokenName, amount = "", force = false) => {
        let token = {}
        // console.log("handleInitTokenByName \t", tokenName);

        if (type === "from") {
            token = _.find(stocks, { symbol: tokenName })
        } else {
            token = _.find(stocks, { symbol: tokenName })
        }
        if (force) {
            token.long.balance = await web3Class.getTokenBalance(token.long.address, account)
            token.short.balance = await web3Class.getTokenBalance(token.short.address, account)
        }

        swap[type] = { ...token, amount: amount }
        setSwap({ ...swap })
    }

    const handleSearchBox = (flag, type = "from") => {
        setShowSearchBox(flag)
        setSearchBoxType(type)
    }


    const handleTokenInputChange = (stype, amount) => {
        handleTyping()
        if (amount === "00") return

        if (amount === "") {
            swap.from.amount = ""
            swap.to.amount = ""
            setSwap({ ...swap })
            return
        }

        swap[stype].amount = amount
        setSwap({ ...swap })

        if (swap.to.symbol === "") return
        setTypingTimeout(
            setTimeout(async () => {
                const newSwap = await handleCalcPairPrice(swap, stype, amount, isLong, prices, setLongPrice)
                setSwap({ ...newSwap })
            }, 500)
        )
    }

    const handleTyping = () => {
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }
    }
    const handleSwichPerPrice = () => {
        setFromPerTo(!fromPerTo)
    }

    const methods = {
        onStart: () => {

        },
        onSuccess: () => {
            console.log("onSuccess ", transactionType);

            if (transactionType.action === "approve") {
                handleInitToken(transactionType.type, transactionType.token, transactionType.token.amount)
            }

            if (transactionType.action === "sell" || transactionType.action === "buy") {
                console.log("perfect its sell here");
                if (swap.from.type === TokenType.Main) {
                    handleInitToken("from", swap.from)
                    handleInitTokenByName("to", swap.to.symbol, "", true)
                } else {
                    handleInitToken("to", swap.to)
                    handleInitTokenByName("from", swap.from.symbol, "", true)
                }
                initialCap()
            }
        },
        onError: () => console.log("onError"),
    }


    const handleSwap = async () => {
        const { from, to } = swap
        try {
            if (from.type !== TokenType.Wrapped && !parseInt(from.allowances) > 0) {
                const payload = { action: "approve", type: "from", token: from }
                transactionType = payload
                // console.log(transactionType);
                await web3Class.approve(from.address, from.amount, notify(methods))
            } else {
                if (to.type === TokenType.Main) {
                    await handleSync(from, from.amount, "sell")
                } else {
                    await handleSync(to, to.amount, "buy")
                }
            }
        } catch (error) { }
    }

    const handleSync = async (token, amount, type) => {

        const tokenAddress = isLong ? token.long.address : token.short.address
        const makerBuySell = await getBuySell()
        console.log(type, tokenAddress, makerBuySell[tokenAddress], amount);
        try {
            transactionType = { action: "buy", swap: swap, isLong: isLong }
            type === "buy" ?
                await web3Class.buy(tokenAddress, amount, makerBuySell[tokenAddress], notify(methods)) :
                await web3Class.sell(tokenAddress, amount, makerBuySell[tokenAddress], notify(methods))
            // console.log(data);
        } catch (error) {
            console.log("handleSync", error);
        }
    }

    if (loading || loadingCap) {
        return (<div className="loader-wrap">
            <img className="loader" src={process.env.PUBLIC_URL + "/img/loading.png"} alt="loader" />
        </div>)
    }

    // const assetsTitle = [
    //     { symbol: "AMC", name: " AMC Entertainment Holdings Inc" },
    //     { symbol: "GME", name: " Gamestop Inc" },
    //     { symbol: "NOK", name: "Nokia Oyj" },
    //     { symbol: "BB", name: "BlackBerry Limited" },
    //     { symbol: "APPL", name: "Apple Inc" },
    //     { symbol: "TSLA", name: " Tesla Inc" },
    //     { symbol: "SLV", name: "iShares Silver Trust" },
    //     { symbol: "PLTR", name: "Palantir Technologies Inc" },
    //     { symbol: "SNDL", name: "Sundial Growers Inc" },
    //     { symbol: "SPCE", name: "Virgin Galactic Holdings Inc" },
    // ]

    return (<div className="deus-swap-wrap" style={{ paddingTop: "20px" }}>

        {!isMobile && <ToastContainer style={{ width: "450px" }} />}

        <div className="sync-title-wrap">
            <img src={process.env.PUBLIC_URL + "/img/sync-title.svg"} alt="SWAGGY" />
            <div className="sync-wrap" >
                <div className="sync" style={{ textTransform: "uppercase" }}>
                    SWAGGY STOCKS INDEX
                </div>
                <div className="description">
                    <span className="gray">Breakdown: </span><br />
                    {assetsTitle.map((asset, i) => {
                        return <span key={i}> 10% {asset.symbol}, <span className="gray">{asset.name}.</span></span>
                    })}
                </div>
            </div>
        </div>

        <SearchAssets
            searchBoxType={searchBoxType}
            nAllStocks={stocks}
            showSearchBox={showSearchBox}
            choosedToken={swap[searchBoxType].name}
            handleSearchBox={handleSearchBox}
            handleFilterToken={handleFilterToken}
            handleChangeToken={handleChangeToken}
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
                            handleSearchBox={handleSearchBox}
                            handleTokenInputChange={handleTokenInputChange}
                        />

                        <img
                            onClick={handleChangeType}
                            src={process.env.PUBLIC_URL + "/img/arrow.svg"}
                            alt="arrow"
                            className="arrow" />

                        <StockBox
                            type="to"
                            token={swap.to}
                            estimated=" (estimated)"
                            isLong={isLong}
                            handleSearchBox={handleSearchBox}
                            handleTokenInputChange={handleTokenInputChange}
                        />

                        <div style={{ margin: "16px 0" }}></div>
                        {
                            (to_token.conducted || to_token.type === TokenType.Main) ?
                                to_token.conducted ? <WrappedTokenButton token={to_token} isWrap={true} isLong={isLong} handleLong={setLong} /> :
                                    <WrappedTokenButton token={from_token} isWrap={true} isLong={isLong} handleLong={setLong} /> : <></>
                        }

                        <div style={{ margin: "16px 0" }}></div>

                        <TokenMarket
                            handleSwich={handleSwichPerPrice}
                            swap={swap}
                            toAmount={swap.to.amount}
                            fromAmount={swap.from.amount}
                            fromPerTo={fromPerTo}
                            isLong={isLong}
                            longPrice={longPrice}
                            isStock={true}
                            perPrice={""}
                            tvl={""}
                            tradeVol={""}
                        />

                        <div style={{ margin: "16px 0" }}></div>

                        <SwapStockButton
                            // handleConduct={this.handleConduct}
                            handleSwap={handleSwap}
                            from_token={from_token}
                            to_token={to_token}
                            isLong={isLong}
                            prices={prices}
                            remindCap={remindCap}
                            isMobile={isMobile} />

                        <div style={{ margin: "2px 0" }}></div>
                        {/* {(!to_token.conducted && to_token.type !== TokenType.Main) && <div className="conducted-text">
                            This asset is not conducted yet. After conducting you can long/short. <br />
                            Note that there are higher GAS fees involved to conduct assets rather than longing/shorting them.
                        </div>} */}
                        <div style={{ margin: "4px 0" }}></div>
                    </div>
                    <PersonalCap remindedAmount={remindCap} totalAmount={totalCap} />
                    {/* <ConductedText /> */}
                </div>
            </div>
        </div>
    </div >);
}

export default Stonks;