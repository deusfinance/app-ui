import React, { Component } from 'react';
import "./staking.scss"
import Pools from './Pools';

class NewStaking extends Component {
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

            <div className="stake-container-wrap" ref={this.scrollRef} onClick={this.handleScroller}>
                <div className="stake-container" >
                    <div className="row1">
                        <div className="stake-token-wrap">
                            <div className="stake-more"><p>stake</p></div>
                            <div className="token-name"> DEUS-DEA SAND TOKEN</div>
                            <div className="apy">1,250% APY</div>
                            <div className="black-line"></div>
                            <div className="own-pool">you own 0.0000% of the pool</div>
                            <div className="grad-wrap deposit-wrap">
                                <div className=" deposit">
                                    <div className="deposit-amount">137.7184 <span>tokens deposited</span></div>
                                    <div className="provide-more"><span>provide more</span><img src={process.env.PUBLIC_URL + "/vaults/uni.svg"} alt="uni" /></div>
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
                    <div className="row2">

                        <div className="tvl-wrap">
                            <div className="tvl">
                                <div className="sand-token">Staking Pools</div>
                                <div className="price">$2,925,602</div>
                                <p className="tvl-txt">TVL</p>
                                <div className="grad-wrap tvl-btn">
                                    <div className="grad">How to get Sand Tokens</div>
                                </div>
                            </div>
                        </div>


                        <div className="stake-token-wrap closed">
                            <div className="stake-more"><p>stake</p></div>
                            <div className="token-closed-name">DEA-USDC SAND TOKEN</div>
                            <div className="apy">1,250% APY</div>

                            <div className="grad-wrap provide-more-wrap">
                                <div className=" grad">
                                    <div className="provide-more"><span>get DEA-USDC Sand Token </span><img src={process.env.PUBLIC_URL + "/vaults/sand-token.svg"} alt="uni" /></div>
                                </div>
                            </div>
                        </div>

                        <div className="stake-token-wrap">
                            <div className="stake-more"><p>stake</p></div>
                            <div className="token-name">DEUS SAND TOKEN</div>
                            <div className="apy">1,250% APY</div>
                            <div className="black-line"></div>
                            <div className="own-pool">you own 0.0000% of the pool</div>
                            <div className="grad-wrap deposit-wrap">
                                <div className=" deposit">
                                    <div className="deposit-amount">137.7184 <span>tokens deposited</span></div>
                                    <div className="provide-more">provide more</div>
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
            <div>SDfsfsf</div>
        </div>);
    }
}

export default NewStaking;