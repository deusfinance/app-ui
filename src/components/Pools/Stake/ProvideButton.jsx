import React from 'react';

const ProvideButton = ({ token }) => {
    return (<div className="grad-wrap provide-more-wrap">
        <div className=" grad">
            <div className="provide-more"><span>get {token.coin} Sand Token </span><img src={process.env.PUBLIC_URL + "/vaults/sand-token.svg"} alt="uni" /></div>
        </div>
    </div>);
}

export default ProvideButton;