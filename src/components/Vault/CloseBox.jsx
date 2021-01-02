import React from 'react';
import { Link } from 'react-router-dom';

const CloseBox = ({ token, vault, handleLock }) => {
    return (<div className="close-door door">
        <div className="container">
            <div className="title">{vault.title} <br /> Vault</div>
            {/* <div className="desc" style={{ opacity: "0" }}>estimated yearly growth<div className="percent">{vault.estimation ? vault.estimation + "%" : "..."} </div></div> */}
            <div className="all-info">
                <div className="wrap-info">
                    <div className="titles">Total:</div>
                    <div className="description">415 sealed {vault.title} minted</div>
                </div>
            </div>
            {/* <div className="grad-wrap get-wrap" >
                <Link to="/newswap" className="grad" style={{ color: "#ffffff" }}>get {token.title} token
                    <img className="uni-icon" src={process.env.PUBLIC_URL + "/vaults/uni.svg"} alt="uni" />
                </Link>
            </div> */}
            <div className="btns">
                <div className="grad-wrap" onClick={() => handleLock(vault)}>
                    <div className="grad" >lock here
                {/* <img src={process.env.PUBLIC_URL + "/vaults/lock-icon.svg"} alt="lock" /> */}
                    </div>
                </div >
            </div>

            {/* <div className="grad-wrap zap">
                <div className="grad disabled">ZAP ⚡  (directly into staking)</div>
            </div> */}
        </div >
    </div >);
}

export default CloseBox;