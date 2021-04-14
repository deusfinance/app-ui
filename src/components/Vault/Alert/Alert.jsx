import React from 'react';

import "./alert.scss"

const Alert = ({ show, handleGotIt, handleClose }) => {
    return (<>
        {show && <div className="alert-wrap">
            <div className="title">Vaults cheat sheet <span onClick={handleClose}>close</span></div>
            <div className="body-wrap">

                <div className="inner-body-wrap">

                    <div className="inner-body">
                        <ul>
                            <li>Deposits can be unlocked over a 3 months period of time again. </li>

                            <li>You can also sell the sDEA / sDEUS you mint anytime on balancer.exchange, if you want to exit prior the 3 months unlocking time. </li>

                            <li>Vault-stakers are liquidity providers for stock traders. </li>

                            <li>Unusual trading profits lead to a loss of stake for Vault-stakers. </li>
                        </ul>

                    </div>

                    <div className="actions">
                        <div className="alert-btn-wrap">
                            <div className="alert-btn"> <a href="https://lafayettetabor.medium.com/" target="_blank" rel="noopener noreferrer">more infos</a></div>
                        </div>
                        <div className="alert-btn-wrap" onClick={handleGotIt}>
                            <div className="alert-btn">Got it</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>}
    </>);
}

export default Alert;