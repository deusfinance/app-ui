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
                            <li> Deposits are locked for 6 months.</li>
                            <li>Emergency exits will be implemented in Q1.</li>
                            <li>sTokens act as LP tokens, you can sell them any time on Balancer to exit your Vaultpositions.</li>
                            <li>Vault-stakers are liquidity providers for traders.</li>
                            <li> Unusual trading profits lead to a loss of stake for Vault-stakers.</li>
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