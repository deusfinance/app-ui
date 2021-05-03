import React, { useEffect, useState } from 'react';
import { getStayledNumber } from '../../utils/utils';
import { TokenType } from '../../config';

import './styles/token-market.scss';
import { useTranslation } from 'react-i18next'

const TokenMarket = ({ handleSwich, isLong = true, swap, longPrice, toAmount, fromAmount, fromPerTo, isStock = false, tvl, tradeVol }) => {

    const [perPrice, setPerPrice] = useState("")
    const [perTo, setPerTo] = useState(fromPerTo)
    const { from, to } = swap
    const getTokenName = (token) => token.type !== TokenType.Main ? isLong ? "d" + token.symbol : "d" + token.symbol + "-S" : (token.title || token.name)
    const { t} = useTranslation()

    useEffect(() => {
        const calcPerPerice = () => {
            if (toAmount === "" || fromAmount === "" || toAmount === "0" || fromAmount === "0") return ""
            if (fromPerTo) {
                return getStayledNumber(parseFloat(fromAmount) / parseFloat(toAmount))
            }
            return getStayledNumber(parseFloat(toAmount) / parseFloat(fromAmount))
        }
        if (fromPerTo !== perTo) {
            setPerTo(fromPerTo)
        }
        setPerPrice(calcPerPerice())
    }, [toAmount, fromAmount, fromPerTo, perTo])


    return (<div className="token-market-wrap" >
        <div className="token-market" style={{ display: isStock ? "block" : "flex" }}>

            {isStock ? <p >{t("marketPrice")} {getStayledNumber(longPrice) !== "0" ? " @ " + getStayledNumber(longPrice) : ""}</p> : <p>{t("price")}</p>}
            <div className="per-wrap">
                {!isLong && <div className="short-price-info">
                    <a className="icon-info" href="https://wiki.deus.finance/docs/shortpremium" rel="noopener noreferrer" target="_blank" >i</a>
                    {t("withShortPremium")}&nbsp;</div>}
                {perTo ? <div>{perPrice} {getTokenName(from)} {t("per")} {getTokenName(to)}</div> : <div>{perPrice} {getTokenName(to)} {t("per")} {getTokenName(from)}</div>}
                <div className="switch-wrap" onClick={handleSwich}>
                    <svg className="switch" xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
                    </svg>
                </div>
            </div>
        </div>
    </div>);
}

export default TokenMarket;