import React from 'react';

const TokenMarket = ({ handleChangeType }) => {
    return (<div className="token-market">
        <div>
            <p>Price</p>
            <p>0.0038 ETH per DEUS <img
                onClick={handleChangeType}
                className="switch"
                src={process.env.PUBLIC_URL + "/img/switch-logo.svg"} alt="switch" /></p>
        </div>
        <div>
            <p>TVL</p>
            <p>6,245.343 ETH</p>
        </div>
        <div>
            <p>Trading Volume</p>
            <p>945.343 ETH</p>
        </div>
    </div>);
}

export default TokenMarket;