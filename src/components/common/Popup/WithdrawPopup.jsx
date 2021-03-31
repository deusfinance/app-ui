import React, { Component } from 'react';
import { contractEndpoint } from '../../../config';
import Popup from './Popup';

class WithdrawPopup extends Component {
    state = {
        stakeAmount: '',
    }


    handleChange = (amount) => {
        this.setState({ stakeAmount: amount })
    }

    render() {
        const { isWithdrawPopup, handleWithdrawPopup, handleWithdraw, deposited, token, close, title, contractAddr } = this.props
        const { stakeAmount } = this.state
        const popupMsg = token && <div className="stake-pop-wrap">
            <div className="uni-token-name">{token.coin ? token.coin : token.title}</div>
            <div className="amount-wrap">
                <div className="balance">Staked Amount: <span>{deposited}</span></div>

                <input type="number" className="amount" value={stakeAmount} onChange={(e) => this.handleChange(e.currentTarget.value)} placeholder="0.00" />
                <div className="max-btn" onClick={() => this.handleChange(deposited)}>MAX</div>
            </div>
            <a className="show-contract" href={contractEndpoint + "/" + contractAddr} target="_blank" rel="noopener noreferrer">Show me the contract</a>
            <div className="btn-wrap" onClick={() => handleWithdraw(stakeAmount)}>WITHDRAW & CLAIM</div>

        </div>
        return (<Popup
            title={title}
            close={close}
            show={isWithdrawPopup}
            handlePopup={handleWithdrawPopup}
            popBody={popupMsg}
        />);
    }
}

export default WithdrawPopup;