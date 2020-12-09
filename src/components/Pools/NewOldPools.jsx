import React, { Component } from 'react';
// import Popup from '../common/Popup/Popup';
import { oldPoolToken, contractEndpoint } from '../../config'

import "./staking.scss"
// import NStake from './Stake/NStake';
import TopNotif from './TopNotif';
import QStake from './Stake/QStake';
import StakePopup from '../common/Popup/StakePopup';

class NewOldPools extends Component {
    state = {
        isSelect: false,
        isStakePopup: false,
        tokens: oldPoolToken,
        tokensMap: {},
        currStake: null,
        stakeAmount: null,
        market: {
            tvl: 2925602,
        },
    }

    componentDidMount() {
        console.log("did mounted NewOldPools");

    }

    dollarPrice = (price, fixed = 0) => {
        return Number(price).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: fixed
        })
    }

    componentWillMount() {
        let all_tokens = {}
        const { tokens } = this.state
        tokens.map(token => {
            all_tokens[token.name] = {
                ...token,
                title: token.name.toUpperCase().replaceAll("_", "-"),
                deposited: 0,
                claimable_amount: "-",
                claimable_unit: "DEA",
                balance: "-",
                pool: "-",
                allowances: 0,
            }
        })
        this.setState({ tokensMap: all_tokens })
    }

    blurBG = () => {
        const { isPopup, isStakePopup } = this.state
        const blurPop = "blured"
        if (!(isPopup || isStakePopup)) {
            document.getElementById("blur-pop").classList.remove(blurPop)
        } else {
            document.getElementById("blur-pop").classList.add(blurPop)
        }
    }

    handleStake = (stakedToken) => {
        const { isStakePopup } = this.state
        this.setState({ isStakePopup: !isStakePopup, currStake: isStakePopup ? null : stakedToken, stakeAmount: undefined })
    }



    handleMax = (token) => {
        this.setState({ stakeAmount: token.balance })
    }

    render() {
        const { isStakePopup, tokensMap, tokens, currStake, stakeAmount } = this.state

        const currToken = tokensMap[currStake]

        // this.blurBG()

        let popupMsg = ""
        if (currToken) {
            const isApproved = currToken.allowances > 0 ? true : false
            popupMsg = <div className="stake-pop-wrap">
                <div className="uni-token-name">{"s" + currToken.title}</div>
                <div className="amount-wrap">
                    <div className="balance">Balance: <span>{currToken.balance}</span></div>

                    <input type="number" className="amount" value={stakeAmount} placeholder="0.00" />
                    <div className="max-btn" onClick={() => this.handleMax(currToken)}>MAX</div>
                </div>
                <a className="show-contract" href={contractEndpoint + "/" + currToken.stakingLink} target="_blank" rel="noopener noreferrer">Show me the contract</a>
                {!isApproved && <div className="btn-wrap" onClick={() => console.log("approve")}>Approve</div>}
                {isApproved && <div className="btn-wrap" onClick={() => console.log("stake")}>Stake</div>}
            </div>
        }

        return (<>
            {currToken && <StakePopup
                title={"STAKE TOKENS TO EARN " + "DEA"}
                close={true}
                isStakePopup={isStakePopup}
                handleStake={this.handleStake}
                token={currToken}
            />
            }
            <div className="staking-wrap" >
                <img className="st-bg" src={process.env.PUBLIC_URL + "/img/staking-bg.svg"} alt="dd" />

                <TopNotif typeID={2} />

                <div className="stake-container-wrap" ></div>
                <div className="container-single-wrap" style={{ marginTop: "50px" }}>
                    {
                        tokens.map((token, i) => <QStake key={i} token={tokensMap[token.name]} handleStake={this.handleStake} stakable={false} dollarPool={10} />)
                    }

                </div>
            </div>
        </>);
    }
}

export default NewOldPools;