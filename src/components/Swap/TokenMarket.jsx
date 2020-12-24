import React, { useEffect, useState } from 'react';
import { getStayledNumber } from '../../utils/utils';



const TokenMarket = ({ handleSwich, swap, toAmount, fromAmount, fromPerTo, tvl, tradeVol }) => {


    const [perPrice, setPerPrice] = useState("")
    const [perTo, setPerTo] = useState(fromPerTo)


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
    }, [toAmount, fromAmount, fromPerTo])


    return (<div className="token-market-wrap" >
        <div className="token-market">
            <p>Price</p>
            <div className="per-wrap">
                {perTo ? <div>{perPrice} {swap.from.title} per {swap.to.title}</div> : <div>{perPrice} {swap.to.title} per {swap.from.title}</div>}
                <div className="switch-wrap">
                    <svg onClick={handleSwich} className="switch" xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
                    </svg>
                </div>
            </div>
        </div>
        <div className="token-market" style={{ opacity: 0 }}>
            <p>TVL</p>
            <p>{tvl} ETH</p>
        </div>
        <div className="token-market" style={{ opacity: 0 }}>
            <p>Trading Volume</p>
            <p>{tradeVol} ETH</p>
        </div>
    </div>);
}

export default TokenMarket;