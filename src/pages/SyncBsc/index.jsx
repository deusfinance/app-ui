import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { ToastContainer } from 'react-toastify';
import { notifSync } from '../../utils/utils';
import TokenMarket from '../../components/Sync/TokenMarket';
import SwapStockButton from '../../components/Sync/SwapStockButton';
import WrappedTokenButton from '../../components/Sync/WrappedTokenButton';
import SearchAssets from '../../components/Sync/SearchAssets';
import StockBox from '../../components/Sync/StockBox';
import _ from "lodash"
import { toast } from 'react-toastify';
import { TokenType } from '../../config';
import { StockService } from '../../services/bscTestService';
import { useTranslation } from 'react-i18next'
import { handleCalcPairPrice, busdToken, fetcher, emptyToken } from '../../services/stock';
import { useWeb3React } from '@web3-react/core';
import SyncCap from '../../components/Sync/SyncCap';
import SelectedNetworks from '../../components/Sync/SelectNetworks';
import { xdaiMutileOracleHandler } from '../../utils/mutiOracles';
import { sendMessage } from '../../utils/telegramLogger';

import './styles/sync-xdai.scss';



const SyncBscTest = () => {

    const [tokens,] = useState([{ ...busdToken, type: TokenType.Main }])

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
    const [loading, setLoading] = useState(false);
    const [loadingCap, setLoadingCAP] = useState(false);
    const [loadingAllowance, setLoadingAllowance] = useState(false);
    const [subscrible, setSubscrible] = useState(null);
    const [totalCap, setTotalCap] = useState(0);
    const [remindCap, setRemindCap] = useState(0);
    const [longPrice, setLongPrice] = useState("");
    const [lastInputFocus, setLastInputFocus] = useState(null)
    const { account, chainId } = useWeb3React()
    const [web3Class, setWeb3Class] = useState(new StockService(account, 56))
    const apis = [
        "https://oracle1.deus.finance/bsc/signatures.json",
    ]
    const { t } = useTranslation()

    let transactionType = {}
    useEffect(() => {
        if (account && chainId) {
            setWeb3Class(new StockService(account, 56))
        }
        // initialCap()
    }, [account, chainId])

    const getConducted = useCallback(() => fetcher("https://oracle1.deus.finance/bsc/conducted.json", { cache: "no-cache" }), [])
    const getPrices = useCallback(() => fetcher("https://oracle1.deus.finance/bsc/price.json", { cache: "no-cache" }), [])

    const getBuySell = useCallback(() => {
        let reportMessages = ""
        return Promise.allSettled(
            apis.map(api => fetch(api, { cache: "no-cache" }))
        ).then(function (responses) {

            responses = responses.filter((result, i) => {
                if (result?.value?.ok) return true
                reportMessages = apis[i] + "\t is down\n"
                return false
            })
            if (reportMessages !== "") {
                sendMessage(reportMessages)
                reportMessages = ""
            }
            return Promise.all(responses.map(function (response) {
                return response.value.json();
            }));
        }).catch(function (error) {
            console.log(error);
        })
    }, [apis])

    const getStocks = useCallback(() => fetcher("https://oracle1.deus.finance/registrar-detail.json", { cache: "no-cache" }), [])

    useEffect(() => {
        handleInitToken("from", { ...busdToken })
        setSubscrible(setInterval(() => {
            getPrices().then((res) => {
                setPrice(res)
            })
        }, 15000))
        return clearInterval(subscrible)
    }, [])//eslint-disable-line

    useEffect(() => {
        document.body.style.backgroundColor = '#2c2f36'
        document.body.style.backgroundImage = 'radial-gradient(49.81% 49.81% at 50% 49.81%, #272727 0%, #000000 100%)'
        const fromToken = tokens[0]
        const toToken = { ...emptyToken, balance: "0" }
        handleInitToken("from", { ...fromToken })
        handleInitToken("to", { ...toToken })
    }, [web3Class])//eslint-disable-line

    useEffect(() => { //adding chain and type wrap
        if (conducted && stocks) {
            conducted.tokens.map(async (token) => {
                if (!stocks[token.id]) {
                    console.log(token.id, " there isn't in registrar");
                    return
                }
                stocks[token.id].decimals = 18
                stocks[token.id].conducted = true
                stocks[token.id].long = { address: token.long }
                stocks[token.id].short = { address: token.short }

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
    }, [conducted, stocks, account])//eslint-disable-line


    useEffect(() => {
        const stype = lastInputFocus ? lastInputFocus : "from"
        handleTokenInputChange(stype, swap[stype].amount)
    }, [isLong, prices])//eslint-disable-line

    //eslint-disable-next-line
    const initialCap = useCallback(async () => {
        if (account && chainId && chainId === 56) {
            setLoadingCAP(true)
            web3Class.getTotalCap().then(total => {
                setTotalCap(total)
                web3Class.getUsedCap().then(used => {
                    setRemindCap(parseFloat(used))
                    setLoadingCAP(false)
                })
            })
        }
    }, [account, chainId])//eslint-disable-line


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
    }, [getStocks, getConducted, getPrices]);

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

        if (token.symbol !== "BUSD") {
            handleInitToken(vstype, tokens[0])
        }

        setLong(true)
        setLongPrice("")
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
        swap[type] = { ...token, amount: amount }
        setLoadingAllowance(true)
        if (token.type === TokenType.Main) {
            token.balance = await web3Class.getTokenBalance(token.address, account)
            console.log("token balance ", token.balance);
            if (!token.allowances || !parseInt(token.allowances) > 0)
                token.allowances = await web3Class.getAllowances(token.address, account)
        } else {
            if (token.long) {
                token.long.balance = await web3Class.getTokenBalance(token.long.address, account)
                if (!parseInt(token.long.allowances) > 0) {
                    token.long.allowances = await web3Class.getAllowances(token.long.address, account)
                    // const currLong = token.long
                    // swap[type] = { ...token, long: { ...currLong }, amount: amount }
                }
            }

            if (token.short) {
                token.short.balance = await web3Class.getTokenBalance(token.short.address, account)
                if (!parseInt(token.short.allowances) > 0) {
                    token.short.allowances = await web3Class.getAllowances(token.short.address, account)
                    // const currShort = token.short
                    // swap[type] = { ...token, short: { ...currShort }, amount: amount }
                }
            }
        }
        setLoadingAllowance(false)
        swap[type] = { ...token, amount: amount }
        setSwap({ ...swap })
    }

    const handleInitTokenByName = async (type, tokenName, amount = "", force = false) => {
        let token = {}

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
        setLastInputFocus(stype)
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
        onStart: (hash) => {
            if (hash) console.log(hash)
            else {
                console.log("didnt defined");
            }
            if (transactionType.action !== "approve")
                toast.info(<div>Transaction Pending <br />
                    <a href={`https://bscscan.com/tx/${hash}`} target="_blank" rel="noopener noreferrer">{`Swap ${swap.from.amount} ${swap.from.symbol} for ~${swap.to.amount} ${swap.to.symbol} ↗ `}</a></div>, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: false,
                    closeOnClick: false,
                    pauseOnFocusLoss: false,
                });
            else {
                toast.info(<div>Transaction Pending <br />
                    {`Approve ${swap.from.symbol}`}</div>, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: false

                });
            }
        },
        onSuccess: () => {
            console.log("onSuccess ", transactionType);
            toast.dismiss();
            if (transactionType.action === "approve") {
                handleInitToken(transactionType.type, transactionType.token, transactionType.token.amount)
                toast.success(<div>Transaction Successful <br />
                    {`Approved ${swap.from.symbol}`}</div>, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }

            if (transactionType.action === "sell" || transactionType.action === "buy") {
                toast.success(<div>Transaction Successful <br />
                    {`Swapped ${swap.from.amount} ${swap.from.symbol} for ~${swap.to.amount} ${swap.to.symbol}`}</div>, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });

                console.log("perfect its sell here");
                if (swap.from.type === TokenType.Main) {
                    handleInitToken("from", swap.from)
                    handleInitTokenByName("to", swap.to.symbol, "", true)
                } else {
                    handleInitToken("to", swap.to)
                    handleInitTokenByName("from", swap.from.symbol, "", true)
                }
                // initialCap()
            }
        },
        onError: () => {
            console.log("onError")
        },
    }

    const handleSwap = async () => {
        const { from, to } = swap
        try {
            if (from.type === TokenType.Main && !parseInt(from.allowances) > 0) {
                console.log({ action: "approve", type: "from" });
                const payload = { action: "approve", type: "from", token: from }
                transactionType = payload
                return await web3Class.approve(from.address, from.amount, notifSync(methods))
            }

            if (to.type === TokenType.Main) {
                await handleSync(from, from.amount, "sell")
            } else {
                await handleSync(to, to.amount, "buy")
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleSync = async (token, amount, type) => {

        const tokenAddress = isLong ? token.long.address : token.short.address
        const makerBuySell = await getBuySell()

        const oracles = xdaiMutileOracleHandler(type, tokenAddress, makerBuySell, 1)

        try {
            transactionType = { action: "buy", swap: swap, isLong: isLong }
            if (type === "buy")
                await web3Class.buy(tokenAddress, amount, oracles.result, notifSync(methods))
            else
                await web3Class.sell(tokenAddress, amount, oracles.result, notifSync(methods))
            // console.log(data);
        } catch (error) {
            console.log("handleSync", error);
        }
    }


    if (loading || loadingCap) {
        return (<div className="loader-wrap">
            { <img className="loader" src={process.env.PUBLIC_URL + "/img/loading.png"} alt="loader" />}
        </div>)
    }



    return (<div className="deus-swap-wrap" style={{ paddingTop: 0, overflowX: "hidden" }}>

        <div style={{ margin: "64px 0" }}></div>

        {!isMobile && <ToastContainer style={{ width: "450px" }} />}

        <div className="swap-title">
            <img src={process.env.PUBLIC_URL + "/img/sync-logo.svg"} alt="DEUS" />
            <div className="sync-wrap" >
                <div className="sync" style={{ textTransform: "uppercase" }}>
                    {t("synchronizerBSC")}
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
                            estimated={` (${t("estimated")})`}
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
                            validChain={56}
                            loading={loadingAllowance}
                            handleSwap={handleSwap}
                            from_token={from_token}
                            to_token={to_token}
                            isLong={isLong}
                            prices={prices}
                            remindCap={remindCap}
                            isMobile={isMobile} />

                        <div style={{ margin: "6px 0" }}></div>
                    </div>
                    {chainId && chainId === 56 && <SyncCap remindedAmount={remindCap} totalAmount={totalCap} />}
                    {/* <TimerTrading /> */}
                </div>
            </div>
        </div>

        <div className='tut-left-wrap'>
            <SelectedNetworks />
        </div>

    </div >);
}

export default SyncBscTest;