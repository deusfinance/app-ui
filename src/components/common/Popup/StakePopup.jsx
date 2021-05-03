import React, { Component } from 'react';
import { contractEndpoint } from '../../../config';
import Popup from './Popup';
import { withTranslation } from 'react-i18next'

class StakePopup extends Component {
    state = {
        stakeAmount: '',
        oldApprove: this.props.isApproved,
    }


    handleChange = (amount) => {
        this.setState({ stakeAmount: amount })
    }

    render() {
        const { isStakePopup, handlePopup, token, isApproved, close, title, handleStake, handleApprove, contractAddr ,t} = this.props
        const { stakeAmount, oldApprove } = this.state
        const recentlyApproved = isApproved
        const recentlyApprovedClasses = recentlyApproved ? "approved" : ""
        const popupMsg = token && <div className="stake-pop-wrap">
            <div className="uni-token-name">{token.coin ? token.coin : token.title}</div>
            <div className="amount-wrap">
                <div className="balance">{t("balance")}: <span>{token?.balance}</span></div>

                <input type="number" className="amount" value={stakeAmount} onChange={(e) => this.handleChange(e.currentTarget.value)} placeholder="0.00" />
                <div className="max-btn" onClick={() => this.handleChange(token.balance)}>{t("max")}</div>
            </div>
            <a className="show-contract" href={contractEndpoint + "/" + contractAddr} target="_blank" rel="noopener noreferrer">{t("showContract")}</a>
            {!oldApprove && <><div className={`action-btn ${recentlyApprovedClasses}`}>
                <div className="btn-wrap" onClick={() => handleApprove(stakeAmount)}>{isApproved ? t("approved") : t("approve")}</div>
                <div className="btn-wrap" onClick={() => handleStake(stakeAmount)}>{t("stake")}</div>
            </div>
                <div className={`indicator ${recentlyApprovedClasses}`}>
                    <div className="cyc c-left">1</div>
                    <div className="c-line"></div>
                    <div className="cyc c-right">2</div>
                </div></>}
            {oldApprove && <div className="btn-wrap" onClick={() => handleStake(stakeAmount)}>{t("stake")}</div>}

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

export default withTranslation()(StakePopup);