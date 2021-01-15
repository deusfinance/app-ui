import React from 'react';
import { getStayledNumber, newFormatAmount } from '../../utils/utils';
import { AllStakings } from '../../config'
import { Link } from 'react-router-dom';

const OpenBox = ({ handleLock, handleUnLock, vault, token }) => {
    return (<div className="  door open-door">
        <div className="container">
            <div className="title">{vault.title} <br />Vault</div>
            {/* <div className="desc">
                you currently own <br />  {vault.own ? <div> {getStayledNumber(vault.own, 4)}%</div> : "..."}
            </div> */}
            <div className="all-info">
                {vault?.total && <div className="wrap-info">
                    <div className="titles">Total:</div>
                    <div className="description">{vault?.total} {token.title} minted</div>
                </div>}

                {token?.balance && vault?.total && <div className="wrap-info">
                    <div className="titles">You own: </div>
                    <div className="description">{newFormatAmount(token.balance, 6)} {token.title} <br /> {getStayledNumber(token.balance / vault?.total * 100, 5)}%</div>
                </div>}
            </div>
            <div className="door-btns">
                {/* <div className="label-lock">
                    <div className="">locked untill:</div>
                    <div className="">03.06.2021</div>
                </div> */}
                {/* <div className="grad-wrap reedem-wrap">
                    <div className="reemable">{getStayledNumber(vault.locked)}  locked</div>
                    <div className="reemable">{token.locked.toFixed(4)} DEA locked</div>
                    <div className="reemable-btn disabled" onClick={handleUnLock}>reedem</div>
                </div> */}

                {/* <div className="grad-wrap stake-btn-wrap">
                    <Link to={"/new-staking"} className="left-btn half">get  {vault.name}</Link>
                    <div to="/timetoken" className="half" onClick={() => handleLock(vault)}>lock more</div>
                </div> */}

                <div className="grad-wrap stake-btn-wrap" onClick={() => handleLock(vault)}>
                    <div className="grad lock-more ">lock more</div>
                </div>
                <div className="grad-wrap get-wrap">
                    {AllStakings[vault.name].innerLink ?
                        <Link to={"/swap"} className="grad" >get {vault.title}</Link> :
                        <a href={AllStakings[vault.name].liqLink} className="grad" target="_blank" rel="noopener noreferrer">provide {vault.title}</a>}
                </div>
            </div>
        </div>
    </div>);
}

export default OpenBox;