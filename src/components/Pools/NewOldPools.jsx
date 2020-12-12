import React, { Component } from 'react';
import TopNotif from './TopNotif';
import QStake from './Stake/QStake';
import * as stakeService from '../../services/StakingService'
import { getStayledNumber } from '../../utils/utils';

import "./staking.scss"
import { OldStakes } from '../../config';

class NewOldPools extends Component {
    state = {
        tokens: ["dea_usdc", "deus_eth", "deus_dea", "deus", "ampl_eth", "snx", "uni"],
        tokensMap: OldStakes
    }

    async componentDidUpdate(prevProps) {

        const { chainId, account } = this.props

        if (prevProps.account !== account || prevProps.chainId !== chainId) {
            console.log("chain id is", chainId);
            if (!chainId || !account) return
            console.log("log did update", account, chainId);

            const { tokens } = this.state
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

        tokens.map(async (tokenName) => {
            await this.getTokenAllAmounts(tokenName)
        })
        // this.props.setStakedTokens(tokensMap)
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
        // this.initalStakes()
    }

    // initalStakes = () => {
    //     let all_tokens = this.props.stakedTokens

    //     if (all_tokens.dea.lastFetch) {
    //         this.setState({ tokensMap: all_tokens })
    //         console.log("fetched");
    //     }
    //     const { tokens } = this.state
    //     tokens.map(tokenName => {
    //         all_tokens[tokenName].title = tokenName.toUpperCase().replaceAll("_", "-")
    //         all_tokens[tokenName].deposited = 0
    //         all_tokens[tokenName].claimable_unit = "DEA"
    //         all_tokens[tokenName].pool = "-";
    //         all_tokens[tokenName].claimable_amount = "-";
    //     })
    //     this.setState({ tokensMap: all_tokens })
    // }


    getTokenAllAmounts = (stakedToken, force = false) => {

        const { tokensMap } = this.state

        const token = tokensMap[stakedToken]

        // if (!force && token.lastFetch) {
        //     console.log("single fetched");
        //     return
        // }

        console.log("initial called for \t" + stakedToken);

        stakeService.getNumberOfStakedTokens(token.name).then((amount) => {
            token.deposited = getStayledNumber(amount)
            console.log(token.deposited);
            // this.setState({ tokensMap })

            stakeService.getTotalStakedToken(token.name).then((amount) => {
                token.pool = token.deposited === "0" || amount === "0" ? 0 : (token.deposited / amount) * 100

                // this.setState({ tokensMap })

                stakeService.getNumberOfPendingRewardTokens(token.name).then((amount) => {
                    token.claimable_amount = parseFloat(amount)
                    // token.lastFetch = true
                    // this.setState({ tokensMap })
                    this.setState({ tokensMap })

                })
            })

        })

        // this.setState({ tokensMap })
        // this.setState({ renderLoop: !renderLoop })
    }
    handleClaim = () => {
        //calim
        console.log("claim");
    }

    handleWithdraw = () => {
        //calim
        console.log("handleWithdraw");
    }


    render() {
        const { tokensMap, tokens } = this.state

        return (<>

            <div className="staking-wrap" >
                <img className="st-bg" src={process.env.PUBLIC_URL + "/img/staking-bg.svg"} alt="dd" />

                <TopNotif typeID={2} />

                <div className="stake-container-wrap" ></div>
                <div className="container-single-wrap" style={{ marginTop: "50px" }}>
                    {
                        tokens.map((token, i) => <QStake
                            key={i}
                            handleClaim={this.handleClaim}
                            handleWithdraw={this.handleWithdraw}
                            token={tokensMap[token]}
                            handleStake={this.handleStake}
                            stakable={false} />)
                    }

                </div>
            </div>
        </>);
    }
}

export default NewOldPools;