import React from 'react';

const GonbadBox = ({ token, handleLock }) => {
    return (<div className="gonbad">
        <div className="title">{token.title} <br /> Vault</div>
        <div className="estimaited">Estimated yearly growth:</div>
        <div className="percent">230%</div>
        <div className="gonab-btns">
            <div className="grad-wrap lock-wrap " onClick={() => handleLock(token)}>
                <div className="grad">Lock Here <img src={process.env.PUBLIC_URL + "/vaults/lock-icon.svg"} alt="lock" /></div>
            </div>
            {/* <div className="grad-wrap get-wrap">
                <div className="grad">Provide Liquidity <img className="uni-icon" src={process.env.PUBLIC_URL + "/vaults/uni.svg"} alt="uni" /></div>
            </div> */}
            {/* <div className="grad-wrap zap">
                <div className="grad">ZAP ⚡  (directly into staking)</div>
            </div> */}
        </div>
    </div>);
}

export default GonbadBox;