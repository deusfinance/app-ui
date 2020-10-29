import React, { Component } from 'react';
import './mainSwap.scss';

class MainSwap extends Component {
    state = {}
    render() {
        return (<div className="deus-swap-wrap">
            <div className="title">
                <img src={process.env.PUBLIC_URL + "/img/DEUSName.svg"} alt="DEUS" />
                <div className="swap-wrap">
                    <div className="swap">
                        Swap
                </div>
                </div>
            </div>


            <div className="swap-container-wrap">
                <div className="swap-container">
                    <div className="show-dollar-wrap grad-wrap">
                        <div className="show-dollar grad">SHOW DOLLAR PRICE</div>
                    </div>

                    <div className="swap-box-wrap">
                        <div className="swap-box">

                            <div className="token-box-wrap">
                                <div className="token-box">
                                    <div className="top">
                                        <p>From</p>
                                        <div className="balance">
                                            <span>Balance: </span>
                                            <span>999</span>
                                        </div>
                                    </div>
                                    <div className="bottom">
                                        <input type="number" className="input-amount" autocomplete="off" autocorrect="off" pattern="^[0-9]*[.,]?[0-9]*$" placeholder="0.0" minlength="1" maxlength="79" spellcheck="false" />
                                        <div className="max-btn">MAX</div>
                                        <div className="token-info">
                                            <img className="token-icon" src={process.env.PUBLIC_URL + "/tokens/eth-logo.svg"} alt="ETH" />
                                            <span className="token-name">ETH</span>
                                            <img className="select-icon" src={process.env.PUBLIC_URL + "/img/select.svg"} alt="select" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <img src={process.env.PUBLIC_URL + "/img/arrow.svg"} alt="arrow" className="arrow" />

                            <div className="token-box-wrap to-token">
                                <div className="token-box">
                                    <div className="top">
                                        <p>To</p>
                                        <div className="balance">
                                            <span>Balance: </span>
                                            <span>123</span>
                                        </div>
                                    </div>
                                    <div className="bottom">
                                        <input type="number" className="input-amount" placeholder="0.0" />
                                        <div className="token-info">
                                            <img className="token-icon" src={process.env.PUBLIC_URL + "/tokens/deus-logo.svg"} alt="ETH" />
                                            <span className="token-name">DEUS</span>
                                            <img className="select-icon" src={process.env.PUBLIC_URL + "/img/select.svg"} alt="select" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="token-market">
                                <div>
                                    <p>Price</p>
                                    <p>0.0038 ETH per DEUS <img className="switch" src={process.env.PUBLIC_URL + "/img/switch-logo.svg"} /></p>
                                </div>
                                <div>
                                    <p>TVL</p>
                                    <p>6,245.343 ETH</p>
                                </div>
                                <div>
                                    <p>Trading Volume</p>
                                    <p>945.343 ETH</p>
                                </div>
                            </div>
                            <div className="swap-btn-wrap grad-wrap">
                                <div className="swap-btn grad">
                                    swap
                                </div>
                            </div>
                        </div>
                        <div className="price-box">
                            <div>
                                <p>Price Impact</p>
                                <p>0.05%</p>
                            </div>
                            <div>
                                <p>Vault Fee</p>
                                <p>0.0015 ETH</p>
                            </div>
                        </div>
                        <div className="search-box-wrap">
                            <div className="search-box">
                                <div className="label">
                                    <p>Select or search for a token</p>
                                    <div >close</div>
                                </div>
                                <input type="text" placeholder="Search name or paste address" spellCheck="false" autoComplete="false" />
                                <div className="token-items-wrap">
                                    <p>Token</p>
                                    <div className="token-items">

                                    </div>
                                </div>
                            </div>
                            <p className="msg">
                                <div>There will be 500+ Stocks added until 31.12.2020</div> </p>
                        </div>
                    </div>


                </div>
            </div>

        </div>);
    }
}


export default MainSwap;