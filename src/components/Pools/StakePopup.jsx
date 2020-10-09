import React from 'react';
import * as config from '../../config';

const StakePopup = ({ showPopup, handlePopup, stakes, staking, handleMaxLP, setStakingAmount, handleApprove, handleStake }) => {
    return (<>
        {showPopup &&
            <div className="stake-popup ">
                <div className="pop-x" onClick={() => handlePopup(false)}>X</div>
                <div className="pop-title">Stake your tokens to earn DEA</div>
                <div className="stake-wrap">
                    <div className="pop-input-wrap">
                        <div className="pop-input-label">Amount: {stakes[staking.name].amounts.currLp} {stakes[staking.name].coin_name}</div>
                        <div className="pop-input" >
                            <div className="pop-max" onClick={() => handleMaxLP(stakes[staking.name].amounts.currLp)}>max</div>
                            <input type="number" name="stake-amount" placeholder="0.0" value={staking.amount} onChange={(e) => setStakingAmount(e.currentTarget.value)} />
                        </div>
                    </div>
                    <a className="pop-contract" href={config.contractEndpoint + "/" + stakes[staking.name].stakingLink} target="_blank" rel="noopener noreferrer">show me  the contract
        <div className="arrow-triangle"></div>
                    </a>
                    <div className="pop-btns">
                        <button className="approve" onClick={() => handleApprove()} disabled={staking.isApprove && staking.amount > 0 ? false : true}>Approve</button>
                        <button className="stake" onClick={() => handleStake()} disabled={staking.isApprove ? true : false}>Stake</button>
                    </div>
                </div>
            </div>}
    </>);
}

export default StakePopup;