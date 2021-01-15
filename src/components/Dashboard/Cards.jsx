import React from 'react';


export const Balance = () => {
    return (
        <div className="card balance" >
            <div className="title">Your Wallet Balance </div>
            <div className="token">
                <div className="amount">3452.200 <span className="name">DEUS</span></div>
                <div className="dollar">$12,500</div>
            </div>
            <div className="btns">
                <div className="btn">
                    <div className="grad-wrap">
                        <div className="grad">
                            lock
                        </div>
                    </div>
                </div>
                <div className="btn">
                    <div className="grad-wrap">
                        <div className="grad">
                            trade
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}


export const Supply = () => {
    return (
        <div className="card supply">
            <div className="title">Total supply & Market CAP</div>
            <div className="token">
                <div className="amount">3452.200 <span className="name">DEUS</span></div>
                <div className="dollar">$12,500</div>
            </div>
            <div className="tvl-wrap">
                <div>Total Value Locked (in staking)</div>
                <div>3545444 <span className="symbol">ETH</span></div>
                <div>125,444 <span className="symbol">$</span></div>
            </div>
        </div>
    )
}