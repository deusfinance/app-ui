import React from 'react';

const DepositButton = ({ token }) => {
    const isSingle = token.name.indexOf("_") === -1 ? true : false
    let provide;
    if (isSingle) {
        provide = <div className="provide-more"><span>buy more</span><img className="swap-icon" src={process.env.PUBLIC_URL + "/vaults/swap.svg"} alt="swap" /></div>
    } else {
        provide = <div className="provide-more"><span>provide more</span><img src={process.env.PUBLIC_URL + "/vaults/uni.svg"} alt="uni" /></div>
    }
    return (<div className="grad-wrap deposit-wrap">
        <div className=" deposit">
            {/* <div className="zap-wrap" title="ready soon"> <div className="zap">ZAP <span role="img" aria-label="power"> ⚡ </span> in/out</div></div> */}
            <div className="deposit-amount">{token.deposited} <span> deposited</span></div>
            {/* {provide} */}
        </div>
    </div>);
}

export default DepositButton;