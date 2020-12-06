import { Link } from 'react-router-dom';
import React, { Component } from 'react';

const OpenBox = ({ handleLock, handleUnLock, token }) => {
    return (<div className="  door open-door">
        <div className="container">
            <div className="title">{token.title} <br />Vaults</div>
            <div className="desc">
                you currently own <br />4.64% ($4320,30) of this vault
        </div>

            <div className="door-btns">
                <div className="label-lock">
                    <div className="">locked untill:</div>
                    <div className="">03.06.2021</div>
                </div>
                <div className="grad-wrap reedem-wrap">
                    <div className="reemable">{token.locked.toFixed(4)} DEA locked</div>
                    <div className="reemable-btn disabled" onClick={handleUnLock}>reedem</div>
                </div>
                <div className="grad-wrap stake-btn-wrap">
                    <Link to={"/new-staking"} className="left-btn half">stake your sand</Link>
                    <Link to="/timetoken" className="half">stake your time</Link>
                </div>

                <div className="grad-wrap stake-btn-wrap" onClick={() => handleLock(token)}>
                    {/* <div className="left-btn half disabled">13743.7184 DEA locked</div> */}
                    <div className="grad lock-more ">lock more</div>
                </div>
                {/* <div className="grad-wrap get-wrap">
                                        <div className="grad">Get UNI-LP tokens <img src={process.env.PUBLIC_URL + "/vaults/uni.svg"} alt="uni" /></div>
                                    </div> */}
            </div>
        </div>
    </div>);
}

export default OpenBox;