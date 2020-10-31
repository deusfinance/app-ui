import React from 'react';

const TokenMarket = ({ handleChangeType }) => {
    return (<div className="token-market-wrap">
        <div className="token-market">
            <p>Price</p>
            <div className="per-wrap">
                <div>0.0038 ETH per DEUS</div>
                <div className="switch-wrap">
                    <svg onClick={handleChangeType} className="switch" xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
                    </svg>
                </div>
            </div>
        </div>
        <div className="token-market">
            <p>TVL</p>
            <p>6,245.343 ETH</p>
        </div>
        <div className="token-market">
            <p>Trading Volume</p>
            <p>945.343 ETH</p>
        </div>
    </div>);
}

export default TokenMarket;