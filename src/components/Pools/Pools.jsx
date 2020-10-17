import React, { Component } from 'react';
import Stake from './Stake';

class Pools extends Component {

    orders = {
        tokens: ["dea_usdc", "deus_eth", "deus", "ampl_eth", "snx", "uni"],
        shadows: ["blue-200-shadow", "yellow-400-shadow", "blue-200-shadow", "yellow-400-shadow", "yellow-300-shadow", "blue-200-shadow"],
    }

    componentDidMount() {
        setTimeout(() => this.props.handleScroller(), 100);
    }


    stakeProvider = (stakedTokens) => {
        const { tokens, shadows } = this.orders
        const { handleClaim, handleLP, handlePopup, handleWithdraw, stakes } = this.props
        return stakedTokens.map((stakedTokenIndex, key) => <Stake key={key} shadowClass={shadows[stakedTokenIndex - 1]} token={stakes[tokens[stakedTokenIndex - 1]]} handlePopup={handlePopup} handleClaim={handleClaim} handleLP={handleLP} handleWithdraw={handleWithdraw} />)
    }

    render() {
        const { isConnected } = this.props
        const { scrollRef, showAddress, handleConnectWallet, handleScroller, markets } = this.props
        return (isConnected && <div className="main-wrap  " id="main-wrap" ref={scrollRef} onClick={handleScroller}>
            <div className="right-btn">
                <div className="pools-btn beta-btn ">We are currently in BETA</div>
                <a className="pools-btn learn-more-btn" href="https://medium.com/@deusfinance/dea-part-ii-release-of-dea-and-the-staking-reward-program-46b065322936" target="_blank" rel="noopener noreferrer">Learn more about DEA</a>
            </div>
            <div className="left-btn">

                <div className="pools-btn unlock-btn connected" onClick={handleConnectWallet}>{showAddress()}</div>
                <div className="voted-message" >
                    <div className="msg">
                        As voted on we changed the pools of DEUS / DEA.
                        visit our news channel for more info
                </div>
                    <a className=" telegram-btn" href="https://t.me/deusfinance" target="_blank" rel="noopener noreferrer">to telegram</a>
                </div>
                <div className="pool-link">new pool</div>
            </div>
            <div className="pools-wrapper" id="pools-wrap">
                <img className="line-top-img" src="../img/line-top.png" alt="line-top" />
                <div className="pools">
                    <div className="row-1">
                        {this.stakeProvider([1])}
                    </div>
                    <div style={{ position: 'relative' }}>
                        <div className="staking-pools">
                            <div className="title">Staking Pools </div>
                            <div className="desc">provide Liquidity to <br /> Uniswap or single assets <br /> and earn DEA</div>
                        </div>
                        <div className="row-2">
                            {this.stakeProvider([2, 3])}
                        </div>
                    </div>
                    <div style={{ position: 'relative' }}>
                        <a href="https://info.uniswap.org/token/0x80ab141f324c3d6f2b18b030f1c4e95d4d658778" className="dea-price-up" style={{ color: "#ffffff", "cursor": "pointer" }} target="_blank" rel="noopener noreferrer">DEA Price : <b> {Number(markets.dea_price).toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            minimumFractionDigits: 2
                        })} </b>
                        </a>
                        <div className="dea-amount-wrap">
                            <div className="outside-wrap">
                                <div className="total-value">
                                    <div className="title" > TVL : <b> {Number(parseInt(markets.total_locked)).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                        minimumFractionDigits: 0
                                    })} </b></div>
                                </div>
                            </div>
                            <div className="outside-wrap">
                                <div className="dea-price">
                                    <div className="title" >DEA Marketcap :  <b>{Number(parseInt(markets.market_cap)).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                        minimumFractionDigits: 0
                                    })} </b></div>
                                    <div className="title">Fully Diluted : <b> {Number(parseInt(markets.fully_duilted)).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                        minimumFractionDigits: 0
                                    })} </b></div>

                                </div>
                            </div>
                        </div>
                        <div className="row-2">
                            {this.stakeProvider([4, 5, 6])}
                        </div>
                    </div>
                </div>
            </div>
        </div >
        );
    }
}

export default Pools;