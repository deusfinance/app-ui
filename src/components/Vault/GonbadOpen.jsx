import React from 'react';

const GonbadOpen = ({ token, handleLock }) => {

    return (<div className="gonbad">
        <div className="title">{token.title} <br /> Vault</div>
        {token.pool ? <div className="estimaited">you currently own </div> : ""}
        {token.pool ? <div className="percent"> {token.pool.toFixed(2)}%</div> : ""}
        <div className="gonab-btns">
            <div className="grad-wrap  lock-wrap deposit-gonbad " onClick={() => handleLock(token)}>
                <div className="grad">{token.locked ? token.locked : "-"} tokens locked</div>
            </div>

            <div className="grad-wrap lock-wrap " style={{ marginTop: "5px" }} onClick={() => handleLock(token)}>
                <div className="grad">lock more <img src={process.env.PUBLIC_URL + "/vaults/lock-icon.svg"} alt="lock" /></div>
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

export default GonbadOpen;