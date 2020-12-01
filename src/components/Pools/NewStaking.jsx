import React, { Component } from 'react';
import Popup from '../common/Popup/Popup';
import { stakingTokens, contractEndpoint } from '../../config'

import "./staking.scss"
import NStake from './Stake/NStake';
import TopNotif from './TopNotif';
import QStake from './Stake/QStake';

class NewStaking extends Component {
    state = {
        isSelect: false,
        isStakePopup: false,
        tokens: {},
        currStake: null,
        stakeAmount: null,
        tokenTypes: [
            { id: 1, name: "Sand Token" },
            { id: 2, name: "Balancer Pool" },
            { id: 3, name: "Time Token" },
        ],
        selectedTokenID: 1,
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
        stakingTokens.map(token => {
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
                allowances: 0,
            }
        })
        this.setState({ tokens: all_tokens })
    }

    blurBG = () => {
        const { isPopup, isStakePopup } = this.state
        let blurPop = "blured"
        let hidden = "hidden"
        if (!(isPopup || isStakePopup)) {
            blurPop = "hidden";
            hidden = "blured"
        }
        document.getElementById("blur-pop").classList.remove(hidden)
        document.getElementById("blur-pop").classList.add(blurPop)
    }

    handleStake = (stakedToken) => {
        const { isStakePopup } = this.state
        this.setState({ isStakePopup: !isStakePopup, currStake: stakedToken, stakeAmount: null })
    }


    handleOpenSelect = () => {
        this.setState({ isSelect: true })
    }

    handleScroller = () => {
        const width = (1900 - window.innerWidth) / 2
        if (this.scrollRef.current) {
            console.log(window.innerWidth);
            this.scrollRef.current.scrollLeft = width
        }
    }

    changeSelectToken = (t) => {
        this.setState({ selectedTokenID: t.id, isSelect: false })
    }

    handleMax = (token) => {
        this.setState({ stakeAmount: token.balance })
    }

    render() {
        const {
            isSelect, isStakePopup, market,
            tokenTypes, tokens, selectedTokenID,
            currStake, stakeAmount } = this.state
        const currToken = tokens[currStake]
        const selectedToken = tokenTypes.find(t => t.id === selectedTokenID)
        this.blurBG()

        let popupMsg = ""
        if (currToken)
            popupMsg = <div className="stake-pop-wrap">
                <div className="uni-token-name">{"s" + currToken.title}</div>
                <div className="amount-wrap">
                    <div className="balance">Balance: <span>{currToken.balance}</span></div>

                    <input type="number" className="amount" value={stakeAmount} placeholder="0.00" />
                    <div className="max-btn" onClick={() => this.handleMax(currToken)}>MAX</div>
                </div>
                <a className="show-contract" href={contractEndpoint + "/" + currToken.stakingLink} target="_blank" rel="noopener noreferrer">Show me the contract</a>
                <div className="btn-wrap">Approve</div>
            </div>
        return (<>
            <Popup
                title={"STAKE TOKENS TO EARN " + "DEA"}
                close={true}
                show={isStakePopup}
                handlePopup={this.handleStake}
                popBody={popupMsg}
            />
            <div className="staking-wrap" >

                <TopNotif selectedToken={selectedToken}
                    handleOpenSelect={this.handleOpenSelect}
                    changeSelectToken={this.changeSelectToken}
                    isSelect={isSelect}
                    tokenTypes={tokenTypes}
                />

                <div className="stake-container-wrap" ref={this.scrollRef} onClick={this.handleScroller}>
                    <div className="stake-container" >
                        <div className="row1">
                            <NStake token={tokens.uni_lp_deus_dea} handleStake={this.handleStake} />
                        </div>
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
                            <NStake token={tokens.uni_lp_dea_usdc} handleStake={this.handleStake} />
                            <NStake token={tokens.deus} handleStake={this.handleStake} />
                        </div>
                    </div>
                </div>
                <div className="container-single-wrap">
                    <div className="single-wrap closed">
                        <div className="stake-here">
                            STAKE HERE
                        </div>

                        <div className="token-name">sDEA</div>
                        <div className="token-title">SandToken</div>

                        <div className="grad-wrap provide-more-wrap">
                            <div className=" grad">
                                <div className="provide-more"><span>get DEA Sand Token </span><img src={process.env.PUBLIC_URL + "/vaults/sand-token.svg"} alt="uni" /></div>
                            </div>
                        </div>


                    </div>




                    {/*                     <div className="single-wrap">
                        <div className="single">
                            <div className="stake-here">
                                STAKE MORE
                        </div>

                            <div className="token-name">sDEA</div>
                            <div className="token-title">SandToken</div>
                            <div className="own-pool">you own 4.64% ($4320,30) of the pool</div>

                            <div className="btns-wrap">
                                <div className="btns">
                                    <div className="left-single disabled">1245.10 sDAI claimable</div>
                                    <div className="right-single">
                                        <span>claim</span>
                                    </div>
                                </div>
                            </div>
                            <div className="btns-wrap">
                                <div className="btns">
                                    <div className="left-single disabled">31,241.10 sDAI deposited</div>
                                    <div className="right-single">
                                        <span>withdraw and claim</span>
                                    </div>
                                </div>
                            </div>

                            <div className="btns-wrap">
                                <div className="btns">
                                    <div className="left-single disabled zap" ><span>ZAP⚡ in/out</span></div>
                                    <div className="right-single">
                                        <span>buy more</span><img className="swap-icon" src={process.env.PUBLIC_URL + "/vaults/swap.svg"} alt="swap" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div> */}

                    <QStake token={tokens.dai} handleStake={this.handleStake} />

                    <div className="single-wrap">
                        <div className="single">
                            <div className="stake-here">
                                STAKE MORE
                        </div>

                            <div className="token-name">sDEA</div>
                            <div className="token-title">SandToken</div>
                            <div className="own-pool">you own 4.64% ($4320,30) of the pool</div>

                            <div className="btns-wrap">
                                <div className="btns">
                                    <div className="left-single disabled">1245.10 sDAI claimable</div>
                                    <div className="right-single">
                                        <span>claim</span>
                                    </div>
                                </div>
                            </div>
                            <div className="btns-wrap">
                                <div className="btns">
                                    <div className="left-single disabled">31,241.10 sDAI deposited</div>
                                    <div className="right-single">
                                        <span>withdraw and claim</span>
                                    </div>
                                </div>
                            </div>

                            <div className="btns-wrap">
                                <div className="btns">
                                    <div className="left-single disabled zap" ><span>ZAP⚡ in/out</span></div>
                                    <div className="right-single">
                                        <span>buy more</span><img className="swap-icon" src={process.env.PUBLIC_URL + "/vaults/swap.svg"} alt="swap" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>);
    }
}

export default NewStaking;