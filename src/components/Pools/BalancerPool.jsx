import React, { Component } from 'react';
import "./staking.scss"

class BalancerPool extends Component {
    state = {
        isSelect: false,
        tokens: [
            { id: 1, name: "Sand Token" },
            { id: 2, name: "Balancer Pool" },
            { id: 3, name: "Time Token" },
        ],
        selectedTokenID: 1,
    }

    constructor(props) {
        super(props);
        // create a ref to store the textInput DOM element
        this.scrollRef = React.createRef();
    }

    componentDidMount() {
        this.handleScroller()
    }
    handleOpenSelect = () => {
        this.setState({ isSelect: true })
    }

    handleScroller = () => {
        const width = (1900 - window.innerWidth) / 2
        if (this.scrollRef.current) {
            console.log(window.innerWidth);
            this.scrollRef.current.scrollLeft = width
        }
    }

    changeSelectToken = (t) => {
        this.setState({ selectedTokenID: t.id, isSelect: false })
    }

    render() {
        const { isSelect, tokens, selectedTokenID } = this.state
        const selectedToken = tokens.find(t => t.id === selectedTokenID)
        return (<div className="staking-wrap" >
            <div className="grad-wrap notif-wrap">
                <div className=" notif">
                    Only swap DEUS/DEA on Uniswap to avoid slippage. Swap DEUS/ETH on DEUS Swap.
                </div>
            </div>
            <div className="top-btns">
                <div className="select-group">
                    {!isSelect && <div className="grad-wrap token-btn-wrap" onClick={this.handleOpenSelect}>
                        <div className=" grad token-btn">
                            <p>{selectedToken.name} </p>
                            <img className="arrow-nav" src={process.env.PUBLIC_URL + "/img/arrow-nav.svg"} />
                        </div>
                    </div>}
                    {isSelect && <div className="grad-wrap list-tokens-wrap ">
                        <div className="list-tokens">
                            {tokens.map((t, index) => {
                                return <div key={index} className="token-item" onClick={() => this.changeSelectToken(t)}>
                                    <div className=" grad token-btn">
                                        <p>{t.name}</p>
                                        {index === 0 && <img className="arrow-nav" src={process.env.PUBLIC_URL + "/img/arrow-nav.svg"} />}
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>}
                </div>

                <div className="old-new-btn">
                    <div className="grad-wrap old-btn-wrap">
                        <p className="grad old-btn">Visit old Pools</p>
                    </div>
                    <p className="msg">*To unstake your old staked tokens <br /> just visit our old pools</p>
                </div>
            </div>

            <div className="balancer-wrap" ref={this.scrollRef} onClick={this.handleScroller}>
                <div className="balancer" >
                    <div className="left-balancer">
                        <div className="container">
                            <div className="stake-more-wrap">
                                <div className="stake-more">stake</div>
                            </div>
                            <div className="content">


                                <div className="title">Native Balancer</div>
                                <div className="apy">130% APY</div>


                                <div className="desciption">
                                    <pre>{`
                                        In order to stake you need to provide 
                                        liquidity to the following Balancer pool:


                                        50% DEA
                                        25% sUNI-LP-DEUS-DEA
                                        15% sDEUS
                                        10% sUNI-LP-DEA-USDC
                                      `}  </pre>

                                    <pre className="cant">
                                        {`You can't deposit tokens directly you need
                                         to lock them in vaults to get the sand token.
                                        sDEUS-DEA
                                        sDEUS
                                        sDEA-USDC`}
                                    </pre>
                                </div>

                                <div className="grad-wrap provide-wrap">
                                    <div className=" grad">
                                        <div>
                                            provide Liquidity
                                        </div>

                                        <svg width={29} height={18} viewBox="0 0 29 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M20.3625 10.459C25.4502 11.0104 29 12.2576 29 13.7078C29 15.669 22.5081 17.2589 14.5 17.2589C6.49187 17.2589 0 15.669 0 13.7078C0 12.2576 3.54976 11.0104 8.63746 10.459C10.3849 10.7194 12.3807 10.867 14.5 10.867C16.5661 10.867 18.5148 10.7268 20.2307 10.4785L20.3625 10.459Z" fill="white" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M18.1697 4.61914C22.7776 4.99519 26.0999 6.06003 26.0999 7.3149C26.0999 8.88386 20.9064 10.1558 14.4999 10.1558C8.0934 10.1558 2.8999 8.88386 2.8999 7.3149C2.8999 6.06003 6.22216 4.99519 10.8301 4.61914C11.9588 4.75442 13.1987 4.82915 14.4999 4.82915C15.7556 4.82915 16.9542 4.75955 18.0508 4.63316L18.1697 4.61914Z" fill="white" />
                                            <path d="M14.5003 4.26128C19.3052 4.26128 23.2003 3.30736 23.2003 2.13064C23.2003 0.953921 19.3052 0 14.5003 0C9.69542 0 5.80029 0.953921 5.80029 2.13064C5.80029 3.30736 9.69542 4.26128 14.5003 4.26128Z" fill="white" />
                                        </svg>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right-balancer">
                        <div className="container">
                            <div className="stake-more-wrap">
                                <div className="stake-more">stake</div>
                            </div>
                            <div className="content">


                                <div className="title">Legacy Balancer</div>
                                <div className="apy">130% APY</div>
                                <div className="token-name">
                                    <pre>
                                        {`25% DEA
25% sWBTC
25% sETH
25% sDAI`}
                                    </pre>
                                </div>
                                <div className="own-pool">you own 0.0000% of the pool</div>
                                <div className="grad-wrap deposit-wrap">
                                    <div className=" deposit">
                                        <div className="deposit-amount">137.7184 <span>tokens deposited</span></div>
                                        <div className="provide-more"><span>provide more</span>    <svg width={29} height={18} viewBox="0 0 29 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M20.3625 10.459C25.4502 11.0104 29 12.2576 29 13.7078C29 15.669 22.5081 17.2589 14.5 17.2589C6.49187 17.2589 0 15.669 0 13.7078C0 12.2576 3.54976 11.0104 8.63746 10.459C10.3849 10.7194 12.3807 10.867 14.5 10.867C16.5661 10.867 18.5148 10.7268 20.2307 10.4785L20.3625 10.459Z" fill="white" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M18.1697 4.61914C22.7776 4.99519 26.0999 6.06003 26.0999 7.3149C26.0999 8.88386 20.9064 10.1558 14.4999 10.1558C8.0934 10.1558 2.8999 8.88386 2.8999 7.3149C2.8999 6.06003 6.22216 4.99519 10.8301 4.61914C11.9588 4.75442 13.1987 4.82915 14.4999 4.82915C15.7556 4.82915 16.9542 4.75955 18.0508 4.63316L18.1697 4.61914Z" fill="white" />
                                            <path d="M14.5003 4.26128C19.3052 4.26128 23.2003 3.30736 23.2003 2.13064C23.2003 0.953921 19.3052 0 14.5003 0C9.69542 0 5.80029 0.953921 5.80029 2.13064C5.80029 3.30736 9.69542 4.26128 14.5003 4.26128Z" fill="white" />
                                        </svg></div>
                                    </div>
                                </div>
                                <div className="grad-wrap claim-wrap">
                                    <div className=" claim">
                                        <div className="withdraw">claim & withdraw</div>
                                        <div className="dea-amount">0.000000 DEA </div>
                                        <div className="caim-btn">claim</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >);
    }
}

export default BalancerPool;