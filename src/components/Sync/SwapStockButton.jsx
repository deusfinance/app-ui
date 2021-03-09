import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { TokenType } from '../../config';
import { WaveLoading } from 'react-loadingg';

import './styles/stock-button.scss';

const SwapStockButton = ({ loading, under_maintenance, from_token, remindCap, to_token, handleSwap, isLong, prices, validChain }) => {
    const { account, chainId } = useWeb3React()
    const { conducted } = to_token

    const getBalance = () => {
        return from_token.type !== TokenType.Main ? isLong ? from_token.long?.balance : from_token.short?.balance : from_token.balance
    }

    const getAllowances = () => {
        if (from_token.type === TokenType.Main) {
            return from_token.allowances !== "0"
        } else {
            if (isLong) return from_token.long.allowances !== "0"
            else return from_token.short.allowances !== "0"
        }
    }


    let isClosed = false
    if (prices && from_token.address !== "0x0" && to_token.address !== "0x0") {
        if (from_token.type !== TokenType.Main) {
            isClosed = prices[from_token.symbol]["Long"]?.is_close || !prices[from_token.symbol]["Long"].price || prices[from_token.symbol]["Long"].price === 0
        } else if (to_token.type !== TokenType.Main && to_token.symbol !== "") {
            isClosed = prices[to_token.symbol]["Long"]?.is_close || !prices[to_token.symbol]["Long"].price || prices[to_token.symbol]["Long"].price === 0
        }
    }

    let amount = typeof (from_token.amount) === "string" ? parseFloat(from_token.amount) : from_token.amount


    if (under_maintenance) {
        return (<div className="swap-btn-wrap grad-wrap Insufficient stock-swap-btn " style={{ padding: 0, boxShadow: "none", background: "#1C1C1C" }} >
            <div className="swap-btn grad Insufficient" >
                UNDER MAINTENANCE
            </div>
        </div>)
    }

    if (loading) {
        return (<div className="swap-btn-wrap grad-wrap Insufficient stock-swap-btn " style={{ padding: 0, boxShadow: "none", background: "#1C1C1C" }} >
            <div className="swap-btn grad Insufficient" >
                <WaveLoading color="#ffffff" ></WaveLoading> LOADING ...
            </div>
        </div>)
    }


    if (validChain && chainId && chainId !== validChain) {
        return (<div className="swap-btn-wrap grad-wrap Insufficient stock-swap-btn " style={{ padding: 0, boxShadow: "none", background: "#1C1C1C" }} >
            <div className="swap-btn grad Insufficient" >
                WRONG NETWORK
            </div>
        </div>)
    }

    if (!conducted && to_token.type !== TokenType.Main) {
        return (<div className="swap-btn-wrap grad-wrap Insufficient stock-swap-btn " style={{ padding: 0, boxShadow: "none", background: "#1C1C1C" }} >
            <div className="swap-btn grad Insufficient" >
                SELECT AN ASSET
            </div>
        </div>)
    }


    if (to_token.conducted || from_token.conducted || Number(remindCap) <= 0 || isClosed || !account) {

        let errTxt = null

        if (isClosed) {
            errTxt = "MARKET IS CLOSED"
        } else if (isNaN(amount) || Number(amount) === 0) {
            errTxt = "ENTER AN AMOUNT"
        } else if (!account) {
            errTxt = "CONNECT WALLET"
        } else if (getBalance() < amount) {
            errTxt = "INSUFFICIENT BALANCE"
        } else if (Number(remindCap) <= 0 && from_token.symbol === "DAI") {
            errTxt = "YOU NEED TIME TOKENS"
        } else if (Number(remindCap) < Number(from_token.amount) && from_token.symbol === "DAI") {
            errTxt = "YOU NEED MORE TIME TOKENS"
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
                {getAllowances() ? `SYNC ${from_token.type === TokenType.Main ? "(BUY)" : "(SELL)"} ` : "APPROVE"}
            </div>
        </div>
    </>);
}

export default SwapStockButton;