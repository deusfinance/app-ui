import React from 'react';

const TopNotif = ({ selectedToken, tokenTypes, handleOpenSelect, changeSelectToken, isSelect }) => {
    return (<>
        <div className="grad-wrap notif-wrap">
            <div className=" notif">
                Only swap DEUS/DEA on Uniswap to avoid slippage. Swap DEUS/ETH on DEUS Swap.
                    </div>
        </div>
        <div className="top-btns">
            <div className="select-group">
                {!isSelect && <div className="grad-wrap token-btn-wrap" onClick={handleOpenSelect}>
                    <div className=" grad token-btn">
                        <p>{selectedToken.name} </p>
                        <img className="arrow-nav" src={process.env.PUBLIC_URL + "/img/arrow-nav.svg"} />
                    </div>
                </div>}
                {isSelect && <div className="grad-wrap list-tokens-wrap ">
                    <div className="list-tokens">
                        {tokenTypes.map((t, index) => {
                            return <div key={index} className="token-item" onClick={() => changeSelectToken(t)}>
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
    </>);
}

export default TopNotif;