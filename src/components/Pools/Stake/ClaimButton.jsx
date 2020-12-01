import React from 'react';

const ClaimButton = ({ token }) => {
    return (<div className="grad-wrap claim-wrap">
        <div className=" claim">
            <div className="withdraw">claim & withdraw</div>
            <div className="dea-amount">{token.claimable_amount} {token.claimable_unit} ($60.24) </div>
            <div className="caim-btn">claim</div>
        </div>
    </div>);
}

export default ClaimButton;