import React, { Component } from 'react';
import "./staking.scss"
import Pools from './Pools';

class NewStaking extends Component {
    state = {}

    constructor(props) {
        super(props);
        // create a ref to store the textInput DOM element
        this.scrollRef = React.createRef();
    }

    componentDidMount() {
        this.handleScroller()
    }

    handleScroller = () => {
        const width = (1900 - window.innerWidth) / 2
        if (this.scrollRef.current) {
            console.log(window.innerWidth);
            this.scrollRef.current.scrollLeft = width
        }
    }


    render() {
        return (<div className="staking-wrap" >
            <div className="grad-wrap notif-wrap">
                <div className=" notif">
                    Only swap DEUS/DEA on Uniswap to avoid slippage. Swap DEUS/ETH on DEUS Swap.
                </div>
            </div>
            <div className="top-btns">
                <div className="select-group grad-wrap">
                    <div className=" token-btn-wrap">
                        <div className=" grad token-btn">
                            <p>DEA SAND TOKEN</p>
                            <img className="arrow-nav" src={process.env.PUBLIC_URL + "/img/arrow-nav.svg"} />
                        </div>
                    </div>

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
                            <div className="stake-more"><p>stake more</p></div>
                            <div className="token-name">sand token dea</div>
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
                    <div className="row2">

                        <div className="tvl-wrap">
                            <div className="tvl">
                                <div className="sand-token">DEUS-DEA Sand Token Price</div>
                                <div className="extra">If we need some extra info</div>
                                <div className="price">$2,925,602</div>
                                <p className="tvl-txt">TVL</p>
                            </div>
                        </div>


                        <div className="stake-token-wrap">
                            <div className="stake-more"><p>stake more</p></div>
                            <div className="token-name">sand token dea</div>
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

                        <div className="stake-token-wrap">
                            <div className="stake-more"><p>stake more</p></div>
                            <div className="token-name">sand token dea</div>
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
        </div >);
    }
}

export default NewStaking;