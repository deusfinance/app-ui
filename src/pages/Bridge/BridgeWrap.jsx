import React from 'react';

import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useWeb3React } from '@web3-react/core';
import { notify } from '../../utils/utils';
import { TokenType } from '../../config';
// import BridgeButton from '../../components/Sync/BridgeButton';
// import StockBox from '../../components/Sync/StockBox';
import { StockService } from '../../services/StockService';
import { handleCalcPairPrice, deaToken, daiTokenRinbkeby, xdaiToken } from '../../services/stock';
// import SyncWrap from '../../components/Sync/SyncWrap';
import Tutorial from '../../components/Sync/Tutorial';

// import './../../components/Swap/sync.scss';
import './../../components/Swap/bridge.scss';
import SelectedNetworks from '../../components/Sync/SelectNetworks';
import MinToturial from '../../components/Sync/MinTutorials';


const BridgeWrap = () => {

    const [tokens,] = useState([{ ...daiTokenRinbkeby, type: TokenType.Main }, deaToken])

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
    const [showSearchBox, setShowSearchBox] = useState(false)
    const [fromPerTo, setFromPerTo] = useState(true)
    const [searchBoxType, setSearchBoxType] = useState("from")
    const to_token = swap.to
    const from_token = swap.from

    const [loading, setLoading] = useState(false);
    // const [subscrible, setSubscrible] = useState(null);
    const { account, chainId } = useWeb3React()
    const [web3Class, setWeb3Class] = useState(new StockService(account, chainId))

    let transactionType = {}

    useEffect(() => {
        if (account && chainId) {
            setWeb3Class(new StockService(account, chainId))
        }
    }, [account, chainId])


    useEffect(() => {
        // document.body.style.backgroundColor = '#2c2f36'
        // document.body.style.backgroundImage = 'radial-gradient(49.81% 49.81% at 50% 49.81%, #272727 0%, #000000 100%)'

        const fromToken = tokens[0]
        const toToken = { ...xdaiToken, balance: "0" }

        handleInitToken("from", { ...fromToken })
        handleInitToken("to", { ...toToken })

    }, [web3Class])


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
        handleSearchBox(false)
    }

    const handleChangeType = () => {
        const { from, to } = swap
        from.amount = ""
        to.amount = ""
        setSwap({ from: { ...to }, to: { ...from } })
    }

    const handleInitToken = async (type, token, amount = "") => {
        token.balance = await web3Class.getTokenBalance(token.address, account)
        token.allowances = await web3Class.getAllowances(token.address, account)
        swap[type] = { ...token, amount: amount }
        setSwap({ ...swap })
    }

    const handleInitTokenByName = async (type, tokenName, amount = "", force = false) => {
        let token = {}

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
        try {
            transactionType = { action: "buy", swap: swap }
            type === "buy" ? console.log("buy") : console.log("sell")
            // console.log(data);
        } catch (error) {
            console.log("handleSync", error);
        }
    }

    if (loading) {
        return (<div className="loader-wrap">
            <img className="loader" src={process.env.PUBLIC_URL + "/img/loading.png"} alt="loader" />
        </div>)
    }

    return (<div className="deus-swap-wrap" style={{ paddingTop: 0, overflowX: "hidden" }}>
        <ToastContainer style={{ width: "450px" }} />



        <Tutorial />

        <div className='tut-left-wrap'>
            <SelectedNetworks />
            <MinToturial isOpen={false} />
        </div>

        {/* <Success /> */}

    </div >);
}

export default BridgeWrap;