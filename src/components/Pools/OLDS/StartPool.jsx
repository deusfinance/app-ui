import React from 'react';

const StartPool = ({ handleConnectWallet, isConnected }) => {
    // console.log("isConnected", isConnected);
    return (!isConnected && <div className="pools-unlock-wrap" id="pools-unlock-wrap">
        <img className="line-top-img" src="../img/line-top.png" alt="line-top" />
        <div className="pools-unlock">
            <div className="liquidity-title">DEUS <br />Liquidity Pools</div>
            <div className="decription">provide Liquidity to <br /> Uniswap or single assets <br /> and earn DEA</div>
            <div className="pools-btn unlock-btn" onClick={handleConnectWallet}>Open Pool</div>
        </div>
    </div>);
}

export default StartPool;