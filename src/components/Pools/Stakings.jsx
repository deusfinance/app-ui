import React, { Component } from 'react';
import TopNotif from './TopNotif';
import QStake from './Stake/QStake';
import { getStayledNumber, notify } from '../../utils/utils';

import "./staking.scss"
import { StakeService } from '../../services/StakeService';
import StakePopup from '../common/Popup/StakePopup';
import { AllStakings } from '../../config';
import { withRouter } from 'react-router-dom';

class StakingManager extends Component {
    state = {
        pools: this.props.pools,
        tokensMap: this.props.allTokens,
        stakings: this.props.stakings,
        isStakePopup: false,
        approved: false,
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
                this.getSingleBalance("timetoken", true)
            }
        },
        onError: () => console.log("onError"),
    }

    async componentDidUpdate(prevProps) {
        const { chainId, account, navId } = this.props
        const { pools } = this.state
        if (prevProps.account !== account || prevProps.chainId !== chainId) {

            console.log("chain id is", chainId);

            if (!chainId || !account) return

            console.log("log did update", account, chainId);

            await this.setState({ web3: new StakeService(account, chainId) })
            pools.map(async (tokenName) => {
                await this.getStakingAllAmounts(tokenName)
            })

        }
        if (prevProps.navId !== navId) {
            this.setState({
                pools: this.props.pools,
                tokensMap: this.props.allTokens,
                stakings: this.props.stakings,
                isStakePopup: false,
                approved: false,
            })
            this.props.pools.map(async (tokenName) => {
                await this.getStakingAllAmounts(tokenName)
            })
        }
    }


    async componentDidMount() {
        const { pools } = this.state

        const { chainId, account } = this.props
        if (!chainId || !account) return


        await this.setState({ web3: new StakeService(account, chainId) })

        pools.map(async (tokenName) => {
            await this.getStakingAllAmounts(tokenName)
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


    getStakingAllAmounts = (stakedToken, force = false) => {

        const { web3, stakings } = this.state

        console.log("initial called for \t" + stakedToken);

        web3.getNumberOfStakedTokens(stakedToken).then((amount) => {
            console.log(amount, "is");
            stakings[stakedToken].deposited = getStayledNumber(amount)

            web3.getTotalStakedToken(stakedToken).then((amount) => {
                stakings[stakedToken].pool = stakings[stakedToken].deposited === "0" || amount === "0" ?
                    0 : (stakings[stakedToken].deposited / amount) * 100

                web3.getNumberOfPendingRewardTokens(stakedToken).then((amount) => {
                    stakings[stakedToken].claimable_amount = parseFloat(amount)
                    this.setState({ stakings })

                })
            })

        })
    }


    handleClaim = () => {
        console.log("claim");
    }


    handleWithdraw = () => {
        console.log("handleWithdraw");
    }

    handleStake = (stakedToken) => async (amount) => {
        const { isStakePopup } = this.state
        this.setState({
            currStake: isStakePopup ? null : stakedToken,
            isStakePopup: !isStakePopup,
            stakeAmount: undefined
        })
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

    handleApprove = (token) => async (amount) => {
        console.log(token.name + "\t" + amount + "\t handleApprove ");
        const { web3 } = this.state
        try {
            const data = await web3.approve(token.name, amount, notify(this.methods))

        } catch (error) {
            console.log(error)
        }
    }


    handlePopup = (stakedToken) => {
        const { isStakePopup } = this.state
        console.log(stakedToken, " called");
        this.setState({ isStakePopup: !isStakePopup, currStake: stakedToken })
    }

    render() {
        const { tokensMap, pools, stakings } = this.state
        const { isStakePopup, approved, currStake, stakeAmount } = this.state
        const currToken = tokensMap[currStake]
        const currStaking = stakings[currStake]


        this.blurBG()

        return (<>

            { currStake && currToken && <StakePopup
                title={"STAKE TOKENS TO EARN " + "DEA"}
                close={true}
                isStakePopup={isStakePopup}
                handleApprove={this.handleApprove(currToken)}
                handleStake={this.handleStake(currToken)}
                handlePopup={this.handlePopup}
                token={currToken}
                staking={currStaking}
                isApproved={approved}
            />}

            <div className="staking-wrap" >
                <img className="st-bg" src={process.env.PUBLIC_URL + "/img/staking-bg.svg"} alt="dd" />

                <TopNotif typeID={this.props.navId} />

                <div className="stake-container-wrap" ></div>
                <div className="container-single-wrap" style={{ marginTop: "50px" }}>
                    {
                        pools.slice(0, pools.length).map((token, i) => {
                            return <QStake
                                key={i}
                                handleClaim={this.handleClaim}
                                handleWithdraw={this.handleWithdraw}
                                handleStakePopup={this.handlePopup}
                                staking={stakings[token]}
                                handleStake={this.handleStake}
                                stakable={stakings[token].onlyMain || stakings[token].off ? false : true} />
                        })
                    }

                </div>
            </div>
        </>);
    }
}

export default withRouter(StakingManager);