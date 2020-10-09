import React, { Component } from 'react';
import Stake from './Stake';

class Pools extends Component {

    orders = {
        tokens: ["deus_eth", "deus_ucdt", "deus", "yellow-400-shadow", "yellow-300-shadow", "blue-200-shadow"],
        shadows: ["blue-200-shadow", "yellow-400-shadow", "blue-200-shadow", "yellow-400-shadow", "yellow-300-shadow", "blue-200-shadow"],
    }

    componentDidMount() {
        setTimeout(() => this.props.handleScroller(), 100);
    }


    stakeProvider = (stakedTokens) => {
        const { tokens, shadows } = this.orders
        const { handleClaim, handleLP, handlePopup, handleWithdraw, stakes } = this.props
        return stakedTokens.map(stakedTokenIndex => <Stake shadowClass={shadows[stakedTokenIndex - 1]} token={stakes[tokens[stakedTokenIndex - 1]]} handlePopup={handlePopup} handleClaim={handleClaim} handleLP={handleLP} handleWithdraw={handleWithdraw} />)
    }

    render() {
        const { isConnected } = this.props
        const { scrollRef, showAddress, handleConnectWallet, handleScroller } = this.props
        return (isConnected && <div className="main-wrap  " id="main-wrap" ref={scrollRef} onClick={handleScroller}>
            <div className="right-btn">
                <div className="pools-btn beta-btn ">We are currently in BETA</div>
                <a className="pools-btn learn-more-btn" href="https://medium.com/@deusfinance/dea-part-ii-release-of-dea-and-the-staking-reward-program-46b065322936" target="_blank" rel="noopener noreferrer">Learn more about DEA</a>
            </div>
            <div className="pools-btn unlock-btn connected" onClick={handleConnectWallet}>{showAddress()}</div>
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
                            <div className="triangle-wrap yellow-400-shadow">
                                <div className="triangle" />
                            </div>
                            {this.stakeProvider([3])}
                        </div>
                    </div>
                    <div className="row-2">
                        <div className="triangle-wrap  yellow-400-shadow ">
                            <div className="triangle" />
                        </div>
                        <div className="triangle-wrap  yellow-300-shadow ">
                            <div className="triangle" />
                        </div>
                        <div className="triangle-wrap blue-200-shadow">
                            <div className="triangle" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default Pools;