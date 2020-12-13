import React, { Component } from 'react';
import TopNotif from './TopNotif';
import QStake from './Stake/QStake';
import { getStayledNumber, notify } from '../../utils/utils';

import "./staking.scss"
import { StakeService } from '../../services/StakeService';
import StakePopup from '../common/Popup/StakePopup';
import { AllStakings } from '../../config';
import { ToastContainer } from 'react-toastify';

class SandToken extends Component {
    state = {
        tokens: ["sand_dea", "sand_deus", "sand_dai", "sand_eth", "sand_wbtc", "timetoken"],
        tokensMap: this.props.allTokens,
        stakings: AllStakings.sand,
        isStakePopup: false,
        approved: false,
        typeTransaction: ""
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
                this.setState({ typeTransaction: "", approved: true })
            } else {
                this.getSingleBalance(currToken.name, true)
                this.setState({ isStakePopup: false })

                // this.getSingleBalance("timetoken", true)
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
                await this.getStakingAllAmounts(tokenName)
            })
            tokens.map(async (tokenName) => {
                await this.getSingleBalance(tokenName)
            })

        }
    }


    getSingleBalance = async (tokenName) => {
        const { tokensMap, web3 } = this.state
        try {

            const data = await web3.getTokenBalance(tokenName)
            console.log(data);
            tokensMap[tokenName].balance = getStayledNumber(data)
            this.setState({ tokensMap })
        } catch (error) {
            console.log(error);
        }
    }

    handleInitAllowances = async (tokenName, contractName) => {
        const { tokensMap, stakings, web3 } = this.state

        try {
            const data = await web3.getAllowances(tokenName, contractName)
            console.log(tokenName, "\t allowances");
            tokensMap[tokenName].allowances = data
            stakings[tokenName].allowances = data
            console.log("appr ", data > 0);
            this.setState({ approved: data > 0, tokensMap, stakings })

        } catch (error) {
            console.log(error);
        }
    }


    async componentDidMount() {
        const { tokens } = this.state

        const { chainId, account } = this.props
        if (!chainId || !account) return


        await this.setState({ web3: new StakeService(account, chainId) })

        tokens.map(async (tokenName) => {
            await this.getSingleBalance(tokenName)
        })


        tokens.map(async (tokenName) => {
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
        // console.log(stakedToken);
        const { isStakePopup, web3 } = this.state
        this.setState({
            currStake: isStakePopup ? null : stakedToken,
            stakeAmount: undefined
        })
        try {
            const data = await web3.stake(stakedToken.name, amount, notify(this.methods))

        } catch (error) {
            console.log(error)
        }
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
            this.setState({ typeTransaction: "approve" })

        } catch (error) {
            console.log(error)
        }
    }


    handlePopup = (stakedToken) => {
        const { isStakePopup } = this.state
        console.log(stakedToken, " called");
        try {
            const data = this.handleInitAllowances(stakedToken, stakedToken)
            this.setState({ isStakePopup: !isStakePopup, currStake: stakedToken })

        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const { tokensMap, tokens, stakings } = this.state
        const { isStakePopup, approved, currStake, stakeAmount } = this.state
        const currToken = tokensMap[currStake]
        const currStaking = stakings[currStake]


        this.blurBG()

        return (<>
            <ToastContainer style={{ width: "400px" }} />

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

                <TopNotif typeID={0} />

                <div className="stake-container-wrap" ></div>
                <div className="container-single-wrap" style={{ marginTop: "50px" }}>
                    {
                        tokens.slice(0, tokens.length).map((token, i) => {
                            return <QStake
                                key={i}
                                handleClaim={this.handleClaim}
                                handleWithdraw={this.handleWithdraw}
                                handleStakePopup={this.handlePopup}
                                staking={stakings[token]}
                                handleStake={this.handleStake}
                                stakable={stakings[token].onlyMain ? false : true} />
                        })
                    }

                </div>
            </div>
        </>);
    }
}

export default SandToken;