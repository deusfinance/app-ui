import React, { Component } from 'react';
import './vaults.scss'

class Vault extends Component {
    state = {
        isLocked1:false,
        isLocked2:false
    }

    handleLock = () => {
        const { isLocked1, isLocked2 } = this.state
        this.setState({ isLocked2: ~isLocked2})
    }
    handleLock1 = () => {
        const { isLocked1, isLocked2 } = this.state
        this.setState({ isLocked1: ~isLocked1})
    }
    render() {
        const { isLocked1, isLocked2 } = this.state
        const blurVaultsClass = isLocked1 || isLocked2?"blured":""
        return (<div style={{position:"relative"}}>
            {isLocked1 && <div className="lock-swap" >
                <div className="top">
                    <div className="time-vaults">Time Vault Lock</div>
                    <div className="token">Deus-dea</div>
                    <div className="contract">show me the contract</div>
                    <div className="from">
                        <div className="from-top">
                            <p>From</p>
                            <p>
                                Balance : <span>9999</span>
                            </p>
                        </div>
                        <div className="bottom-from">
                            <input type="text" placeholder="0.0" />
                            <div className="max-btn">max</div>
                            <div className="token-name">Sand token</div>
                        </div>
                    </div>
                    
                    {/* <svg width={369} height={170} viewBox="0 20 369 170" fill="currentColor"   xmlns="http://www.w3.org/2000/svg">
                        <path d="M368.5 14.5C368.5 6.5 364.444 5.20656 356.575 5.20656C315.907 5.20656 208.818 10.0107 194.764 10.0107C183.22 10.0107 156.116 7.86695 143.118 7.86695C133.267 12.27 5.56358 -8.52678 2.84875 4.15947C2.14252 7.45882 2.02329 9.59643 2.02329 9.59643C1.90406 11.5482 0.237958 13.2806 0.999212 15C8.3366 31.4619 139.284 79.8254 151.464 95.2534L159.324 105.221C170.899 119.859 177.273 139.353 177.273 160.09C177.273 165.574 180.777 170 185.097 170C189.417 170 192.92 165.574 192.92 160.09C192.92 139.365 199.294 119.871 210.86 105.221L218.729 95.2418C220.665 92.8021 240 72.5 240 72.5C298 31 373 27 368.5 14.5Z" fill="currentColor" />
                        <path d="M185.667 66.4063L188.831 62.4808C189.416 61.7523 190.462 62.238 190.462 63.2497V63.2578C190.462 63.5492 190.365 63.8325 190.187 64.0429L185.398 69.6682C185.027 70.1052 184.428 70.1052 184.064 69.6682L179.275 64.0348C179.096 63.8244 179 63.5411 179 63.2497C179 62.2461 180.046 61.7523 180.631 62.4889L183.788 66.4063L183.761 54.117C183.761 53.5018 184.187 53 184.71 53H184.745C185.268 53 185.687 53.5018 185.687 54.117L185.667 66.4063Z" fill="white" />
                    </svg> */}

                    <svg width={368} height={170} viewBox="0 20 368 170" fill="currentColor"   xmlns="http://www.w3.org/2000/svg">
                        <path d="M367.699 14.5C367.699 6.5 363.643 5.20656 355.774 5.20656C315.106 5.20656 208.017 10.0107 193.963 10.0107C182.419 10.0107 155.315 7.86695 142.317 7.86695C132.466 12.27 4.7628 -8.52678 2.04796 4.15947C1.34174 7.45882 1.22251 9.59643 1.22251 9.59643C1.10328 11.5482 -0.562823 13.2806 0.198431 15C7.53582 31.4619 138.483 79.8254 150.663 95.2534L158.523 105.221C170.098 119.859 176.472 139.353 176.472 160.09C176.472 165.574 179.976 170 184.296 170C188.616 170 192.119 165.574 192.119 160.09C192.119 139.365 198.494 119.871 210.059 105.221L217.929 95.2418C219.864 92.8021 239.199 72.5 239.199 72.5C297.199 31 372.199 27 367.699 14.5Z" fill="currentColor" />
                         <path d="M184.667 65.4063L187.831 61.4808C188.416 60.7523 189.462 61.238 189.462 62.2497V62.2578C189.462 62.5492 189.365 62.8325 189.187 63.0429L184.398 68.6682C184.027 69.1052 183.428 69.1052 183.064 68.6682L178.275 63.0348C178.096 62.8244 178 62.5411 178 62.2497C178 61.2461 179.046 60.7523 179.631 61.4889L182.788 65.4063L182.761 53.117C182.761 52.5018 183.187 52 183.71 52H183.745C184.268 52 184.687 52.5018 184.687 53.117L184.667 65.4063Z" fill="white" />
                    </svg>



                </div>
                <div className="bottom">
                    <div className="to">
                        <div className="from-top">
                            <p>To</p>
                            <p>
                                Balance : <span>10</span>
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

            {isLocked2 &&
                <div className="lock-swap-2" >
                <div className="top">
                    <div className="time-vaults">Time Vault Lock</div>
                    <div className="token">Deus-dea</div>
                    <div className="locked-text">
                    Your tokens will be locked until 01.06.2021
                    </div>
                    <div className="contract">show me the contract</div>
                    <div className="from">
                        <div className="from-top">
                            <p>From</p>
                            <p>
                                Balance : <span>9999</span>
                            </p>
                        </div>
                        <div className="bottom-from">
                            <input type="text" placeholder="0.0" />
                            <div className="max-btn">max</div>
                            <div className="token-name">UNI-DEUS-DEA-LP</div>
                        </div>
                    </div>
                    
                    {/* <svg width={369} height={170} viewBox="0 20 369 170" fill="currentColor"   xmlns="http://www.w3.org/2000/svg">
                        <path d="M368.5 14.5C368.5 6.5 364.444 5.20656 356.575 5.20656C315.907 5.20656 208.818 10.0107 194.764 10.0107C183.22 10.0107 156.116 7.86695 143.118 7.86695C133.267 12.27 5.56358 -8.52678 2.84875 4.15947C2.14252 7.45882 2.02329 9.59643 2.02329 9.59643C1.90406 11.5482 0.237958 13.2806 0.999212 15C8.3366 31.4619 139.284 79.8254 151.464 95.2534L159.324 105.221C170.899 119.859 177.273 139.353 177.273 160.09C177.273 165.574 180.777 170 185.097 170C189.417 170 192.92 165.574 192.92 160.09C192.92 139.365 199.294 119.871 210.86 105.221L218.729 95.2418C220.665 92.8021 240 72.5 240 72.5C298 31 373 27 368.5 14.5Z" fill="currentColor" />
                        <path d="M185.667 66.4063L188.831 62.4808C189.416 61.7523 190.462 62.238 190.462 63.2497V63.2578C190.462 63.5492 190.365 63.8325 190.187 64.0429L185.398 69.6682C185.027 70.1052 184.428 70.1052 184.064 69.6682L179.275 64.0348C179.096 63.8244 179 63.5411 179 63.2497C179 62.2461 180.046 61.7523 180.631 62.4889L183.788 66.4063L183.761 54.117C183.761 53.5018 184.187 53 184.71 53H184.745C185.268 53 185.687 53.5018 185.687 54.117L185.667 66.4063Z" fill="white" />
                    </svg> */}

                    <svg width={368} height={170} viewBox="0 20 368 170" fill="currentColor"   xmlns="http://www.w3.org/2000/svg">
                        <path d="M367.699 14.5C367.699 6.5 363.643 5.20656 355.774 5.20656C315.106 5.20656 208.017 10.0107 193.963 10.0107C182.419 10.0107 155.315 7.86695 142.317 7.86695C132.466 12.27 4.7628 -8.52678 2.04796 4.15947C1.34174 7.45882 1.22251 9.59643 1.22251 9.59643C1.10328 11.5482 -0.562823 13.2806 0.198431 15C7.53582 31.4619 138.483 79.8254 150.663 95.2534L158.523 105.221C170.098 119.859 176.472 139.353 176.472 160.09C176.472 165.574 179.976 170 184.296 170C188.616 170 192.119 165.574 192.119 160.09C192.119 139.365 198.494 119.871 210.059 105.221L217.929 95.2418C219.864 92.8021 239.199 72.5 239.199 72.5C297.199 31 372.199 27 367.699 14.5Z" fill="currentColor" />
                         <path d="M184.667 65.4063L187.831 61.4808C188.416 60.7523 189.462 61.238 189.462 62.2497V62.2578C189.462 62.5492 189.365 62.8325 189.187 63.0429L184.398 68.6682C184.027 69.1052 183.428 69.1052 183.064 68.6682L178.275 63.0348C178.096 62.8244 178 62.5411 178 62.2497C178 61.2461 179.046 60.7523 179.631 61.4889L182.788 65.4063L182.761 53.117C182.761 52.5018 183.187 52 183.71 52H183.745C184.268 52 184.687 52.5018 184.687 53.117L184.667 65.4063Z" fill="white" />
                    </svg>



                </div>
                <div className="bottom">
                    <div className="to">
                        <div className="from-top">
                            <p>To</p>
                            <p>
                                Balance : <span>10</span>
                            </p>
                        </div>
                        <div className="bottom-from">
                            <input type="text" placeholder="0.0" />
                            <svg style={{ marginRight: "10px" }} width={25} height={26} viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12.3944" cy="12.8944" r="12.3944" fill="#CECECE" fillOpacity="0.5" />
                                <circle cx="12.3944" cy="12.8944" r="12.3944" fill="url(#paint0_linear)" />
                                <defs>
                                    <linearGradient id="paint0_linear" x1="12.4119" y1="-11.675" x2="-12.2743" y2="13.2331" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#5EC4D6" />
                                        <stop offset={1} stopColor="#F1FC68" />
                                    </linearGradient>
                                </defs>
                            </svg>  


                            <div className="token-name">Sand Token</div>
                        </div>
                    </div>
                    <div className="and">
                        <div className="from-top">
                            <p>And</p>
                            <p>
                                Balance : <span>10</span>
                            </p>
                        </div>
                        <div className="bottom-from">
                            <input type="text" placeholder="0.0" />
                            <svg style={{marginRight:"10px"}} width={25} height={26} viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12.3944" cy="12.8944" r="12.3944" fill="#CECECE" fillOpacity="0.5" />
                                <circle cx="12.3944" cy="12.8944" r="12.3944" fill="url(#paint0_linear)" />
                                <defs>
                                    <linearGradient id="paint0_linear" x1="12.4119" y1="-11.675" x2="-12.2743" y2="13.2331" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#5EC4D6" />
                                        <stop offset={1} stopColor="#F1FC68" />
                                    </linearGradient>
                                </defs>
                            </svg>  
                            <div className="token-name">Time Token</div>
                        </div>
                    </div>
                 
               <div className="btns">
                    <div className=" grad-wrap swap-btn-wrap ">
                        <div className=" swap-btn disabled">
                            APPROVE
                        </div>
                        </div>
                    <div className=" grad-wrap swap-btn-wrap ">
                        <div className=" swap-btn disabled">
                            LOCK & SWAP
                        </div>
                        </div>
                </div>
                        
                      
                </div>

                </div>
            }


            <div className={`vaults-wrap ${blurVaultsClass}`}>

            <div className="top-buttons">
                <div className="grad-wrap explain-wrap">
                    <div className="grad explain">Vaults Explainantion</div>
                </div>
                <div className="grad-wrap beta-wrap">
                    <div className="grad beta">DEUS is still in BETA (codes not audited)</div>
                </div>
            </div>
            <div className="gonbad">
                <div className="title">DEUS-DEA <br /> Vault</div>
                <div className="estimaited">Estimated yearly growth:</div>
                <div className="percent">230%</div>
                <div className="gonab-btns">
                    <div className="grad-wrap lock-wrap " onClick={this.handleLock}>
                        <div className="grad">Lock your UNI-LP tokens</div>
                    </div>
                    <div className="grad-wrap get-wrap">
                        <div className="grad">Get UNI-LP tokens</div>
                    </div>
                </div>


            </div>
            <div className="doors">
                <div className=" open-door door">
                    <div className="container">
                        <div className="title">
                            DEUS
                    </div>
                        <div className="desc">
                            Vault still locked.
                    </div>
                        <div className="estimated">Estimated yearly growth:</div>
                        <div className="percent">230%</div>

                            <div className="grad-wrap lock-wrap " onClick={this.handleLock}>
                            <div className="grad">Lock your UNI-LP tokens</div>
                        </div>
                            <div className="grad-wrap get-wrap" onClick={this.handleLock1}>
                            <div className="grad">Get UNI-LP tokens</div>
                        </div>
                    </div>
                </div>
                <div className="close-door door">
                    <div className="container">

                        <div className="title">
                            DEA-TSLA-QQQ
                        
                        </div>
                        <div className="desc">
                            Soon to be unlocked
                        </div>
                    </div>
                </div>
                 <div className="close-door door">
                    <div className="container">

                        <div className="title">
                            DEUS-TSLA-QQQ
                        
                        </div>
                        <div className="desc">
                            Soon to be unlocked
                        </div>
                    </div>
                </div>
            </div>
        </div></div>);
    }
}

export default Vault;