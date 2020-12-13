import React from 'react';
const PriceBox = ({ vaultsFee, impact }) => {
    return (<div className="price-box">
        <div >
            <p></p>
            <p>{impact}</p>
        </div>
        <div>
            <p></p>
            <p>{vaultsFee} </p>
        </div>
    </div>);
}

export default PriceBox;