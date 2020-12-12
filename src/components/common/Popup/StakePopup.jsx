import React, { Component } from 'react';
import { contractEndpoint } from '../../../config';
import Popup from './Popup';

class StakePopup extends Component {
    state = {
        stakeAmount: '',
        isApproved: false
    }

    handleChange = (amount) => {
        this.setState({ stakeAmount: amount })
    }

    componentWillMount() {
        this.setState({ isApproved: this.props.isApproved })
    }



    render() {
        console.log("rerender");
        const { isStakePopup, handlePopup, token, isApproved, close, title, handleStake, handleApprove } = this.props
        const { stakeAmount } = this.state

        console.log(isStakePopup, token);

        const popupMsg = <div className="stake-pop-wrap">
            <div className="uni-token-name">{token.coin ? token.coin : token.title}</div>
            <div className="amount-wrap">
                <div className="balance">Balance: <span>{token.balance}</span></div>

                <input type="number" className="amount" value={stakeAmount} onChange={(e) => this.handleChange(e.currentTarget.value)} placeholder="0.00" />
                <div className="max-btn" onClick={() => this.handleChange(token.balance)}>MAX</div>
            </div>
            <a className="show-contract" href={contractEndpoint + "/" + token.stakingLink} target="_blank" rel="noopener noreferrer">Show me the contract</a>
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