import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { TokenType } from '../../config';
import { WaveLoading } from 'react-loadingg';

import './styles/stock-button.scss';

const SwapStockButton = ({ loading, from_token, remindCap, to_token, handleSwap, isLong, prices }) => {
    const web3React = useWeb3React()
    const { account } = web3React
    const { conducted } = to_token

    const getBalance = () => {
        return from_token.type !== TokenType.Main ? isLong ? from_token.long?.balance : from_token.short?.balance : from_token.balance
    }

    let isClosed = false
    if (prices && from_token.address !== "0x0" && to_token.address !== "0x0") {
        if (from_token.type !== TokenType.Main) {
            isClosed = prices[from_token.symbol]["Long"]?.is_close
        } else if (to_token.type !== TokenType.Main && to_token.symbol !== "") {
            isClosed = prices[to_token.symbol]["Long"]?.is_close
        }
    }

    let amount = typeof (from_token.amount) === "string" ? parseFloat(from_token.amount) : from_token.amount

    if (loading) {
        return (<>
            <div className=" grad-wrap swap-btn-wrap stock-swap-btn" onClick={handleSwap}>
                <div className="swap-btn grad" style={{ background: "none" }} >
                    <WaveLoading color="#ffffff"></WaveLoading>
                </div>
            </div>
        </>)
    }

    if (!account) {
        return (<div className="swap-btn-wrap grad-wrap Insufficient stock-swap-btn " style={{ padding: 0, boxShadow: "none", background: "#1C1C1C" }} >
            <div className="swap-btn grad Insufficient" >
                CONNECT WALLET
            </div>
        </div>)
    }

    // if (!account) {
    //     return (<>
    //         <a href={"#"} className="swap-btn-wrap grad-wrap dapp-link" onClick={handleConnect}>
    //             <div className="swap-btn grad">{"CONNECT WALLET"}</div>
    //         </a>
    //     </>)
    // }



    if (!conducted && to_token.type !== TokenType.Main) {
        return (<div className="swap-btn-wrap grad-wrap Insufficient stock-swap-btn " style={{ padding: 0, boxShadow: "none", background: "#1C1C1C" }} >
            <div className="swap-btn grad Insufficient" >
                SELECT AN ASSET
            </div>
        </div>)
    }

    if (to_token.conducted || from_token.conducted || Number(remindCap) <= 0 || isClosed) {


        let errTxt = null

        if (isNaN(amount) || Number(amount) === 0) {
            errTxt = "ENTER AN AMOUNT"
        } else if (getBalance() < amount) {
            errTxt = "INSUFFICIENT BALANCE"
        } else if (Number(remindCap) <= 0 && from_token.symbol === "DAI") {
            errTxt = "YOU NEED TIME TOKENS"
        } else if (Number(remindCap) < Number(from_token.amount) && from_token.symbol === "DAI") {
            errTxt = "YOU NEED MORE TIME TOKENS"
        } else if (isClosed) {
            errTxt = "MARKET IS CLOSED"
        }

        if (errTxt) {
            return (<div className="swap-btn-wrap grad-wrap Insufficient stock-swap-btn " style={{ padding: 0, boxShadow: "none", background: "#1C1C1C" }}>
                <div className="swap-btn grad Insufficient" >
                    {errTxt}
                </div>
            </div>)
        }

    }



    return (<>
        <div className=" grad-wrap swap-btn-wrap stock-swap-btn" onClick={handleSwap}>
            <div className="swap-btn grad" style={{ background: "none" }} >
                {from_token.allowances !== "0" ? `SYNC ${from_token.type === TokenType.Main ? "(BUY)" : "(SELL)"} ` : "APPROVE"}
            </div>
        </div>
    </>);
}

export default SwapStockButton;