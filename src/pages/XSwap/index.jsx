import React, { useState, useEffect } from 'react';
import TokenBox from '../../components/XSwap/TokenBox';
import { daiToken } from '../../services/stock';
import { useWeb3React } from '@web3-react/core';
import { TokenType } from '../../config';
import './styles/xswap.scss';
import SwapButton from '../../components/XSwap/SwapButton';

const XSwap = () => {
    const [tokens] = ["eth", "deus"]

    const [swap, setSwap] = useState({
        from: {
            name: "", pic_name: "", price: "", balance: "", amount: ""
        },
        to: {
            name: "", pic_name: "", price: "", balance: "", amount: ""
        }
    })

    const [typingTimeout, setTypingTimeout] = useState(0)

    const [popup, setPopup] = useState()

    const to_token = swap.to
    const from_token = swap.from
    const [fromPerTo, setFromPerTo] = useState(true)
    const [subscrible, setSubscrible] = useState(null);
    const { account, chainId } = useWeb3React()

    useEffect(() => {
        handleInitToken("from", { ...daiToken })
    }, [])




    const handleInitToken = async (type, token, amount = "") => {
        if (token.type === TokenType.Main) {
            token.balance = 0
            token.allowances = 0
            // setLoadingDAI(false)
        }
        swap[type] = { ...token, amount: amount }
        setSwap({ ...swap })
    }


    return (<div className="xdeus-wrap">
        <div className="xdeus-container">
            <div className="title">
                <div className="logo">
                    <img src={process.env.PUBLIC_URL + "/img/xdeus.svg"} alt="xSwap" />
                    <p>SWAP</p>
                </div>
                <div>networks : main</div>
            </div>
            <div className="xswap-box-wrap">
                <div className="xswap-box">

                    <TokenBox type="from" />
                    <img
                        onClick={() => console.log("Hi")}
                        src={process.env.PUBLIC_URL + "/img/arrow.svg"}
                        alt="arrow"
                        className="arrow" />

                    <TokenBox type="to" />
                    <SwapButton
                        handleSwap={() => console.log("hiii")}
                        from_token={from_token}
                        to_token={to_token}
                        isLong={true}
                    />

                </div>
            </div>
        </div>
    </div>);
}

export default XSwap;