import React, { Component } from 'react';
import { contractEndpoint } from '../../../config';
import Popup from './Popup';

class StakePopup extends Component {
    state = {
        stakeAmount: '',
        isApproved: this.props.isApproved

    }

    handleChange = (amount) => {
        this.setState({ stakeAmount: amount })
    }

    render() {
        const { isStakePopup, handlePopup, token, isApproved, staking, close, title, handleStake, handleApprove } = this.props
        const { stakeAmount } = this.state



        const popupMsg = token && <div className="stake-pop-wrap">
            <div className="uni-token-name">{token.title}</div>
            <div className="amount-wrap">
                <div className="balance">Balance: <span>{token.balance ? token.balance : 0}</span></div>

                <input type="number" className="amount" value={stakeAmount} onChange={(e) => this.handleChange(e.currentTarget.value)} placeholder="0.00" />
                <div className="max-btn" onClick={() => this.handleChange(token.balance)}>MAX</div>
            </div>
            <a className="show-contract" href={contractEndpoint + "/" + staking.stakingLink} target="_blank" rel="noopener noreferrer">Show me the contract</a>
            {!isApproved && <div className="btn-wrap" onClick={() => handleApprove(stakeAmount)}>Approve</div>}
            {isApproved && <div className="btn-wrap" onClick={() => handleStake(stakeAmount)}>Stake</div>}
        </div>
        return (<Popup
            title={title}
            close={close}
            show={isStakePopup}
            handlePopup={handlePopup}
            popBody={popupMsg}
        />);
    }
}

export default StakePopup;