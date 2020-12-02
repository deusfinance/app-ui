import React, { Component } from 'react';
import LockPopup from './LockPupop';
import './vaults.scss'

class Vault extends Component {
    state = {
        isLocked1: false,
        isLocked2: false
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    handleLock = () => {
        document.getElementById("blur-pop").classList.add("blured")
        this.setState({ isLocked2: true, isLocked1: false })
    }
    handleUnLock = () => {
        document.getElementById("blur-pop").classList.add("blured")

        this.setState({ isLocked1: true, isLocked2: false })
    }

    handleClose = () => {
        document.getElementById("blur-pop").classList.remove("blured")
        this.setState({ isLocked1: false, isLocked2: false })
    }



    render() {
        const { isLocked1, isLocked2 } = this.state
        return (<div>
            {/* <div className={`${blurVaultsClass}`}></div> */}
            <div style={{ position: "relative" }}>
                {isLocked1 && <div className="lock-swap" >
                    <div className="top">
                        <div className="close-btn close-btn-2" onClick={this.handleClose}>close</div>

                        <div className="time-vaults time-vaults-2">Time Vault Lock</div>
                        <div className="token token-2">Deus-dea</div>
                        <div className="contract">Show me the contract</div>
                        <div className="from from-2">
                            <div className="from-top">
                                <p>From</p>
                                <p>
                                    Balance: <span>9999</span>
                                </p>
                            </div>
                            <div className="bottom-from">
                                <input type="text" placeholder="0.0" />
                                <div className="max-btn">max</div>
                                <div className="token-name">Sand token</div>
                            </div>
                        </div>

                        <svg width={368} height={170} viewBox="0 20 368 170" fill="currentColor" xmlns="http://www.w3.org/2000/svg" onClick={this.handleLock}>
                            <path d="M367.699 14.5C367.699 6.5 363.643 5.20656 355.774 5.20656C315.106 5.20656 208.017 10.0107 193.963 10.0107C182.419 10.0107 155.315 7.86695 142.317 7.86695C132.466 12.27 4.7628 -8.52678 2.04796 4.15947C1.34174 7.45882 1.22251 9.59643 1.22251 9.59643C1.10328 11.5482 -0.562823 13.2806 0.198431 15C7.53582 31.4619 138.483 79.8254 150.663 95.2534L158.523 105.221C170.098 119.859 176.472 139.353 176.472 160.09C176.472 165.574 179.976 170 184.296 170C188.616 170 192.119 165.574 192.119 160.09C192.119 139.365 198.494 119.871 210.059 105.221L217.929 95.2418C219.864 92.8021 239.199 72.5 239.199 72.5C297.199 31 372.199 27 367.699 14.5Z" fill="currentColor" />
                            <path d="M184.667 65.4063L187.831 61.4808C188.416 60.7523 189.462 61.238 189.462 62.2497V62.2578C189.462 62.5492 189.365 62.8325 189.187 63.0429L184.398 68.6682C184.027 69.1052 183.428 69.1052 183.064 68.6682L178.275 63.0348C178.096 62.8244 178 62.5411 178 62.2497C178 61.2461 179.046 60.7523 179.631 61.4889L182.788 65.4063L182.761 53.117C182.761 52.5018 183.187 52 183.71 52H183.745C184.268 52 184.687 52.5018 184.687 53.117L184.667 65.4063Z" fill="white" />
                        </svg>



                    </div>
                    <div className="bottom">
                        <div className="to to-2">
                            <div className="from-top">
                                <p>To</p>
                                <p>
                                    Balance: <span>10</span>
                                </p>
                            </div>
                            <div className="bottom-from">
                                <input type="text" placeholder="0.0" />
                                <div className="token-name">UNI-DEUS-DEA-LP</div>
                            </div>
                        </div>
                        <div className="text">
                            Your tokens are still locked until block #11219221 which is roughly the 01.06.2021
                    </div>
                        <div className=" grad-wrap swap-btn-wrap ">
                            <div className=" swap-btn disabled">
                                Swap & Unlock
                        </div>
                        </div>
                    </div>

                </div>}

                {isLocked2 && <LockPopup handleLock={this.handleLock} />}

                <div className={`vaults-wrap`}>

                    <div className="top-buttons">
                        <div className="grad-wrap explain-wrap">
                            <div className="grad explain">Vaults Explainantion</div>
                        </div>
                        <div className="grad-wrap beta-wrap">
                            <div className="grad beta">DEUS is still in BETA (codes not audited)</div>
                        </div>
                    </div>
                    <div className="gonbad">
                        <div className="title">UNI-LP-DEUS-DEA <br /> Vault</div>
                        <div className="estimaited">Estimated yearly growth:</div>
                        <div className="percent">230%</div>
                        <div className="gonab-btns">
                            <div className="grad-wrap lock-wrap " onClick={this.handleLock}>
                                <div className="grad">Lock Here <img src={process.env.PUBLIC_URL + "/vaults/lock-icon.svg"} alt="lock" /></div>
                            </div>
                            <div className="grad-wrap get-wrap">
                                <div className="grad">Provide Liquidity <img className="uni-icon" src={process.env.PUBLIC_URL + "/vaults/uni.svg"} alt="uni" /></div>
                            </div>
                            <div className="grad-wrap zap">
                                <div className="grad">ZAP ⚡  (directly into staking)</div>
                            </div>
                        </div>
                    </div>
                    <div className="doors-wrap">

                        <div className="doors">
                            <div className="close-door door">
                                <div className="container">
                                    <div className="title">UNI-LP-DEA-USDC <br /> Vault</div>
                                    <div className="desc">Estimated yearly growth:<div className="percent">20%</div></div>
                                    <div className="grad-wrap">
                                        <div className="grad">Lock Here <img src={process.env.PUBLIC_URL + "/vaults/lock-icon.svg"} alt="lock" /> </div>
                                    </div>
                                    <div className="grad-wrap get-wrap">
                                        <div className="grad">Provide Liquidity <img className="uni-icon" src={process.env.PUBLIC_URL + "/vaults/uni.svg"} alt="uni" /></div>
                                    </div>
                                    <div className="grad-wrap zap">
                                        <div className="grad">ZAP ⚡  (directly into staking)</div>
                                    </div>
                                </div>
                            </div>

                            <div className="  door open-door">
                                <div className="container">
                                    <div className="title">DEA <br /> Vault</div>
                                    <div className="desc">
                                        you currently own <br />
                                    4.64% ($4320,30) of this vault
                                </div>

                                    <div className="door-btns">
                                        <div className="label-lock">
                                            <div className="">locked untill:</div>
                                            <div className="">03.06.2021</div>
                                        </div>
                                        <div className="grad-wrap reedem-wrap" onClick={this.handleLock}>
                                            <div className="reemable">13743.7184 DEA locked</div>
                                            <div className="reemable-btn disabled">reedem</div>
                                        </div>
                                        <div className="grad-wrap stake-btn-wrap" onClick={this.handleLock}>
                                            <div className="left-btn half">stake your sand</div>
                                            <div className="half">stake your time</div>
                                        </div>

                                        <div className="grad-wrap stake-btn-wrap" onClick={this.handleLock}>
                                            {/* <div className="left-btn half disabled">13743.7184 DEA locked</div> */}
                                            <div className="grad lock-more ">lock more</div>
                                        </div>
                                        {/* <div className="grad-wrap get-wrap">
                                        <div className="grad">Get UNI-LP tokens <img src={process.env.PUBLIC_URL + "/vaults/uni.svg"} alt="uni" /></div>
                                    </div> */}
                                    </div>
                                </div>
                            </div>

                            <div className="close-door door">
                                <div className="container">
                                    <div className="title">DAI <br /> Vault</div>
                                    <div className="desc">Estimated yearly growth:<div className="percent">20%</div></div>
                                    <div className="grad-wrap">
                                        <div className="grad">Lock Here <img src={process.env.PUBLIC_URL + "/vaults/lock-icon.svg"} alt="lock" /> </div>
                                    </div>
                                    <div className="grad-wrap get-wrap">
                                        <div className="grad">Get DAI tokens <img className="uni-icon" src={process.env.PUBLIC_URL + "/vaults/uni.svg"} alt="uni" /></div>
                                    </div>
                                    <div className="grad-wrap zap">
                                        <div className="grad">ZAP ⚡  (directly into staking)</div>
                                    </div>
                                </div>
                            </div>
                            <div className="close-door door">
                                <div className="container">
                                    <div className="title">DEA <br /> Vault</div>
                                    <div className="desc">Estimated yearly growth:<div className="percent">20%</div></div>
                                    <div className="grad-wrap">
                                        <div className="grad">Lock your Uni-Lp tokens <img src={process.env.PUBLIC_URL + "/vaults/lock-icon.svg"} alt="lock" /> </div>
                                    </div>
                                    <div className="grad-wrap">
                                        <div className="grad">Get DEA <img className="swap" src={process.env.PUBLIC_URL + "/vaults/swap.svg"} alt="lock" /> </div>
                                    </div>
                                    <div className="grad-wrap zap">
                                        <div className="grad">ZAP ⚡  (directly into staking)</div>
                                    </div>
                                </div>
                            </div>




                        </div>
                    </div>
                </div>
            </div></div>);
    }
}

export default Vault;