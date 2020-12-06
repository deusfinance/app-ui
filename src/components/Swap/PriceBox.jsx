import React from 'react';
const PriceBox = ({ vaultsFee, impact }) => {
    return (<div className="price-box">
        <div>
            <p>Price Impact</p>
            <p>{impact}%</p>
        </div>
        <div>
            <p>Vault Fee</p>
            <p>{vaultsFee} ETH</p>
        </div>
    </div>);
}

export default PriceBox;