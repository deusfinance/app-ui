import React, { Component } from 'react';
import TopNotif from './TopNotif';
import QStake from './Stake/QStake';
// import * as stakeService from '../../services/StakingService'
import { getStayledNumber, notify } from '../../utils/utils';

import "./staking.scss"
import { OldStakes } from '../../config';
import { StakeService } from '../../services/StakeService';
import StakePopup from '../common/Popup/StakePopup';

class SandToken extends Component {
    state = {
        tokens: ["sand_dea", "sand_deus", "sand_dai", "sand_eth", "sand_wbtc", "timetoken"],
        tokensMap: {},
        isStakePopup: false
    }



    methods = {
        onStart: () => {
            console.log("onStart")
        },
        onSuccess: () => {
            console.log("onSuccess")
            const { currToken, typeTransaction } = this.state
            if (typeTransaction === "approve") {
                this.handleInitAllowances(currToken.name, currToken.name)
                this.setState({ typeTransaction: "" })
            } else {
                this.getSingleBalance(currToken.name, true)
                this.getSingleBalance("sand_" + currToken.name, true)
                this.getSingleBalance("timetoken", true)
                this.getLockedAmount("timetoken", true)
            }
        },
        onError: () => console.log("onError"),
    }

    async componentDidUpdate(prevProps) {



        const { chainId, account } = this.props
        const { tokens } = this.state
        if (prevProps.account !== account || prevProps.chainId !== chainId) {

            console.log("chain id is", chainId);

            if (!chainId || !account) return

            console.log("log did update", account, chainId);

            await this.setState({ web3: new StakeService(account, chainId) })
            tokens.map(async (tokenName) => {
                await this.getTokenAllAmounts(tokenName)
            })

        }
    }


    async componentDidMount() {
        const { tokens } = this.state
        // this.setState({ tokensMap: this.props.stakedTokens })

        const { chainId, account } = this.props
        if (!chainId || !account) return


        await this.setState({ web3: new StakeService(account, chainId) })

        tokens.map(async (tokenName) => {
            await this.getTokenAllAmounts(tokenName)
        })
        // this.props.setStakedTokens(tokensMap)
        console.log("did mounted sand token");
    }

    dollarPrice = (price, fixed = 0) => {
        return Number(price).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: fixed
        })
    }

    componentWillMount() {
        this.setState({ tokensMap: this.props.allTokens })
        // this.initalStakes()
    }




    getTokenAllAmounts = (stakedToken, force = false) => {

        const { tokensMap, web3 } = this.state

        const token = tokensMap[stakedToken]

        console.log("initial called for \t" + stakedToken);

        web3.getNumberOfStakedTokens(token.name).then((amount) => {
            token.deposited = getStayledNumber(amount)
            console.log(token.deposited);
            // this.setState({ tokensMap })

            web3.getTotalStakedToken(token.name).then((amount) => {
                token.pool = token.deposited === "0" || amount === "0" ? 0 : (token.deposited / amount) * 100

                // this.setState({ tokensMap })

                web3.getNumberOfPendingRewardTokens(token.name).then((amount) => {
                    token.claimable_amount = parseFloat(amount)
                    // token.lastFetch = true
                    // this.setState({ tokensMap })
                    this.setState({ tokensMap })

                })
            })

        })
    }
    handleClaim = () => {
        console.log("claim");
    }

    handleStake = (stakedToken) => {
        const { isStakePopup } = this.state
        this.setState({ isStakePopup: !isStakePopup, currStake: isStakePopup ? null : stakedToken, stakeAmount: undefined })
    }


    handleWithdraw = () => {
        console.log("handleWithdraw");
    }



    blurBG = () => {
        const { isStakePopup } = this.state

        const blurPop = "blured"
        if (!(isStakePopup)) {
            document.getElementById("blur-pop").classList.remove(blurPop)
        } else {
            document.getElementById("blur-pop").classList.add(blurPop)
        }
    }

    handleApprove = (from) => async (amount) => {
        console.log(from.name + "\t" + amount + "\t handleApprove ");
        const { allTokens, web3 } = this.state
        try {
            const data = await web3.approve(from.name, from.name, amount, notify(this.methods))

        } catch (error) {
            console.log(error)
        }
    }


    handlePopup = (stakedToken) => {
        console.log(stakedToken, " called");
        const { isStakePopup } = this.state
        this.setState({ isStakePopup: !isStakePopup, currStake: stakedToken })
    }

    render() {
        const { tokensMap, tokens } = this.state
        const { isStakePopup, approve, currStake, stakeAmount } = this.state
        const currToken = tokensMap[currStake]
        console.log(currStake);

        this.blurBG()

        return (<>

            { currStake && <StakePopup
                title={"STAKE TOKENS TO EARN " + "DEA"}
                close={true}
                isStakePopup={isStakePopup}
                handleApprove={this.handleApprove(currStake.name)}
                handleStake={this.handleStake(currStake.name)}
                handlePopup={this.handlePopup}
                token={currToken}
                isApproved={approve}
            />}

            <div className="staking-wrap" >
                <img className="st-bg" src={process.env.PUBLIC_URL + "/img/staking-bg.svg"} alt="dd" />

                <TopNotif typeID={0} />

                <div className="stake-container-wrap" ></div>
                <div className="container-single-wrap" style={{ marginTop: "50px" }}>
                    {
                        tokens.map((token, i) => {
                            return <QStake
                                key={i}
                                handleClaim={this.handleClaim}
                                handleWithdraw={this.handleWithdraw}
                                handleStakePopup={this.handlePopup}
                                token={tokensMap[token]}
                                handleStake={this.handleStake}
                                stakable={true} />
                        })
                    }

                </div>
            </div>
        </>);
    }
}

export default SandToken;