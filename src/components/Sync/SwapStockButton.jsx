import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { TokenType } from '../../config';
import { WaveLoading } from 'react-loadingg';
import { useTranslation } from 'react-i18next';
import './styles/stock-button.scss';

const SwapStockButton = ({ loading, under_maintenance, from_token, to_token, handleSwap, isLong, prices, validChain }) => {
    const { account, chainId } = useWeb3React()
    const { conducted } = to_token
    const { t } = useTranslation()

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

    const isClosedMarket = (tokenType) => {
        const position = isLong ? "Long" : "Short"
        return prices[tokenType["symbol"]][position]?.is_close || !prices[tokenType["symbol"]][position].price || prices[tokenType["symbol"]][position].price === 0
    }

    let isClosed = false
    if (prices && from_token.address !== "0x0" && to_token.address !== "0x0") {
        if (from_token.type !== TokenType.Main) {
            isClosed = isClosedMarket(from_token)
        } else if (to_token.type !== TokenType.Main && to_token.symbol !== "") {
            isClosed = isClosedMarket(to_token)
        }
    }

    let amount = typeof (from_token.amount) === "string" ? parseFloat(from_token.amount) : from_token.amount


    if (under_maintenance) {
        return (<div className="swap-btn-wrap grad-wrap Insufficient stock-swap-btn " style={{ padding: 0, boxShadow: "none", background: "#1C1C1C" }} >
            <div className="swap-btn grad Insufficient" >
                {t("underMaintenance")}
            </div>
        </div>)
    }

    if (loading) {
        return (<div className="swap-btn-wrap grad-wrap Insufficient stock-swap-btn " style={{ padding: 0, boxShadow: "none", background: "#1C1C1C" }} >
            <div className="swap-btn grad Insufficient" >
                <WaveLoading color="#ffffff" ></WaveLoading> {t("loading")} ...
            </div>
        </div>)
    }


    if (!conducted && to_token.type !== TokenType.Main) {
        return (<div className="swap-btn-wrap grad-wrap Insufficient stock-swap-btn " style={{ padding: 0, boxShadow: "none", background: "#1C1C1C" }} >
            <div className="swap-btn grad Insufficient" >
                {t("selectAnAsset")}
            </div>
        </div>)
    }


    if (to_token.conducted || from_token.conducted || isClosed || !account || (validChain && chainId && chainId !== validChain)) {

        let errTxt = null

        if (isClosed)
            errTxt = t("marketIsClosed")
        else if ((validChain && chainId && chainId !== validChain)) {
            errTxt = t("wrongNetwork")
        } else if (isNaN(amount) || Number(amount) === 0) {
            errTxt = t("enterAmount")
        } else if (!account) {
            errTxt = t("connectWallet")
        } else if (getBalance() < amount) {
            errTxt = t("insufficientBalance")
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
                {getAllowances() ? `SYNC ${from_token.type === TokenType.Main ? `(${t("buy")})` : `(${t("sell")})`} ` : t("approve")}
            </div>
        </div>
    </>);
}

export default SwapStockButton;