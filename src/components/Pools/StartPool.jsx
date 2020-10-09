import React, { PureComponent } from 'react';

const StartPool = ({ handleConnectWallet, isConnected }) => {
    return (!isConnected && <div className="pools-unlock-wrap" id="pools-unlock-wrap">
        <img className="line-top-img" src="../img/line-top.png" alt="line-top" />
        <div className="beta-btn">We are currently in beta DEA</div>
        <div className="pools-unlock">
            <div className="liquidity-title">DEUS <br />Liquidity Pools</div>
            <div className="decription">provide Liquidity to <br /> Uniswap or single assets <br /> and earn DEA</div>
            <div className="pools-btn unlock-btn" onClick={handleConnectWallet}>Unlock Wallet</div>
            <a className="pools-btn learn-more-btn" href="https://medium.com/@deusfinance/dea-part-ii-release-of-dea-and-the-staking-reward-program-46b065322936" target="_blank" rel="noopener noreferrer">Learn more about DEA</a>
        </div>
    </div>);
}

export default StartPool;