import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { WaveLoading } from 'react-loadingg';

import './styles/stock-button.scss';

const BridgeButton = ({ loading, from_token, handleSwap }) => {
    const web3React = useWeb3React()

    const { account } = web3React

    const getBalance = () => {
        return from_token.balance
    }

    let amount = typeof (from_token.amount) === "string" ? parseFloat(from_token.amount) : from_token.amount

    if (loading || !from_token.allowances) {
        return (<>
            <WaveLoading color="#000000"></WaveLoading>
        </>)
    }

    let errTxt = null

    if (!account) {
        errTxt = "CONNECT WALLET"
    } else if (isNaN(amount) || Number(amount) === 0) {
        errTxt = "ENTER AN AMOUNT"
    } else if (getBalance() < amount) {
        errTxt = "INSUFFICIENT BALANCE"
    }

    if (errTxt) {
        return (<div className="swap-btn-wrap grad-wrap Insufficient stock-swap-btn " style={{ padding: 0, boxShadow: "none", background: "#1C1C1C" }}>
            <div className="swap-btn igrad Insufficient" >
                {errTxt}
            </div>
        </div>)
    }


    if (from_token.allowances === "0") {
        return (<>
            <div className="action-btn">
                <div className="action">APPROVE</div>
                <div className="action disabled">BRIDGE</div>
            </div>
            <div class="indicator ">
                <div class="cyc ">1</div>
                <div class="c-line disabled"></div>
                <div class="cyc disabled">2</div>
            </div>
        </>)
    }

    return (<>
        <div className=" grad-wrap swap-btn-wrap stock-swap-btn" onClick={handleSwap}>
            <div className="swap-btn grad" style={{ background: "none" }} >
                {from_token.allowances !== "0" ? `BRIDGE ` : "APPROVE"}
            </div>
        </div>
    </>);
}

export default BridgeButton;