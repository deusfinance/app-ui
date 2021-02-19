import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { TokenType } from '../../config';
import { WaveLoading } from 'react-loadingg';

import './styles/stock-button.scss';

const BridgeButton = ({ loading, from_token, remindCap, to_token, handleSwap, isLong, prices }) => {
    const web3React = useWeb3React()
    const { account } = web3React

    const getBalance = () => {
        return from_token.type !== TokenType.Main ? isLong ? from_token.long?.balance : from_token.short?.balance : from_token.balance
    }

    let amount = typeof (from_token.amount) === "string" ? parseFloat(from_token.amount) : from_token.amount

    if (loading) {
        return (<>
            <div className=" grad-wrap swap-btn-wrap stock-swap-btn" onClick={handleSwap}>
                <div className="swap-btn igrad" style={{ background: "none" }} >
                    <WaveLoading color="#ffffff"></WaveLoading>
                </div>
            </div>
        </>)
    }

    if (!account) {
        return (<div className="swap-btn-wrap grad-wrap Insufficient stock-swap-btn " style={{ padding: 0, boxShadow: "none", background: "#1C1C1C" }} >
            <div className="swap-btn igrad Insufficient" >
                CONNECT WALLET
            </div>
        </div>)
    }


    if (to_token.conducted || from_token.conducted || Number(remindCap) <= 0) {


        let errTxt = null

        if (isNaN(amount) || Number(amount) === 0) {
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