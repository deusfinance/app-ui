import React, { Component } from 'react';
import { contractEndpoint } from '../../../config';
import Popup from './Popup';

class StakePopup extends Component {
    state = {
        stakeAmount: ''
    }

    handleChange = (amount) => {
        this.setState({ stakeAmount: amount })
    }


    render() {
        const { isStakePopup, handleStake, token, close, title, isTimeToken } = this.props
        const { stakeAmount } = this.state
        const isApproved = token.allowances > 0 ? true : false
        const popupMsg = <div className="stake-pop-wrap">
            <div className="uni-token-name">{(isTimeToken ? "" : "s") + token.title}</div>
            <div className="amount-wrap">
                <div className="balance">Balance: <span>{token.balance}</span></div>

                <input type="number" className="amount" value={stakeAmount} onChange={(e) => this.handleChange(e.currentTarget.value)} placeholder="0.00" />
                <div className="max-btn" onClick={() => this.handleChange(token.balance)}>MAX</div>
            </div>
            <a className="show-contract" href={contractEndpoint + "/" + token.stakingLink} target="_blank" rel="noopener noreferrer">Show me the contract</a>
            {!isApproved && <div className="btn-wrap" onClick={() => console.log("approve")}>Approve</div>}
            {isApproved && <div className="btn-wrap" onClick={() => console.log("stake")}>Stake</div>}
        </div>
        return (<Popup
            title={title}
            close={close}
            show={isStakePopup}
            handlePopup={handleStake}
            popBody={popupMsg}
        />);
    }
}

export default StakePopup;