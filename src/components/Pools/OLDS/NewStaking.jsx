import React, { Component } from 'react';
import Popup from '../common/Popup/Popup';
import { sandTokens, contractEndpoint } from '../../config'

import "./staking.scss"
import NStake from './Stake/NStake';
import TopNotif from './TopNotif';
import QStake from './Stake/QStake';
import StakePopup from '../common/Popup/StakePopup';

class NewStaking extends Component {
    state = {
        isSelect: false,
        isStakePopup: false,
        tokens: {},
        currStake: null,
        stakeAmount: null,
        market: {
            tvl: 2925602,
        },
    }

    constructor(props) {
        super(props);
        // create a ref to store the textInput DOM element
        this.scrollRef = React.createRef();
    }

    componentDidMount() {
        this.handleScroller()
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
        sandTokens.map(token => {
            all_tokens[token.name] = {
                ...token,
                title: token.name.toUpperCase().replaceAll("_", "-"),
                coin: token.coin.toUpperCase(),
                apy: 20,
                deposited: token.deposited ? token.deposited : 0,
                claimable_amount: 10,
                claimable_unit: "DEA",
                pool: 10.25,
                balance: token.balance ? token.balance : 0,
                allowances: token.allowances ? token.allowances : 0,
            }
        })
        this.setState({ tokens: all_tokens })
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



    handleScroller = () => {
        const width = (1900 - window.innerWidth) / 2
        if (this.scrollRef.current) {
            console.log(window.innerWidth);
            this.scrollRef.current.scrollLeft = width
        }
    }


    handleMax = (token) => {
        this.setState({ stakeAmount: token.balance })
    }

    render() {
        const {
            isStakePopup, market, tokens,
            currStake, stakeAmount } = this.state
        const currToken = tokens[currStake]

        this.blurBG()

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

                <TopNotif typeID={0} />

                <div className="stake-container-wrap" ref={this.scrollRef} onClick={this.handleScroller}>
                    <div className="stake-container" >
                        {/* <div className="row1">
                            <NStake token={tokens.uni_lp_deus_dea} handleStake={this.handleStake} />
                        </div> */}
                        <div className="row2">

                            <div className="tvl-wrap">
                                <div className="tvl">
                                    <div className="sand-token">Staking Pools</div>
                                    <div className="price">{this.dollarPrice(market.tvl)}</div>
                                    <p className="tvl-txt">TVL</p>
                                    {/*<div className="grad-wrap tvl-btn">
                                    <div className="grad">How to get Sand Tokens</div>
                                </div> */}
                                </div>
                            </div>
                            <NStake token={tokens.dea} handleStake={this.handleStake} />
                            <NStake token={tokens.deus} handleStake={this.handleStake} />
                        </div>
                    </div>
                </div>
                <div className="container-single-wrap">
                    <QStake token={tokens.wbtc} handleStake={this.handleStake} />
                    <QStake token={tokens.eth} handleStake={this.handleStake} />
                    <QStake token={tokens.dai} handleStake={this.handleStake} />
                </div>
            </div>
        </>);
    }
}

export default NewStaking;