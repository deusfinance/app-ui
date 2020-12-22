import React, { Component } from 'react';
import TopNotif from './TopNotif';
import QStake from './Stake/QStake';
import { getStayledNumber, notify } from '../../utils/utils';
import addrs from '../../services/addresses.json'
import "./staking.scss"
import { StakeService } from '../../services/StakeService';
import StakePopup from '../common/Popup/StakePopup';

import { withRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

class StakingManager extends Component {
    state = {
        pools: this.props.pools,
        tokensMap: this.props.allTokens,
        stakingsMap: this.props.allStakings,
        isStakePopup: false,
        approved: false,
    }

    async componentDidMount() {
        document.body.style.backgroundColor = '#000000'
        document.body.style.backgroundImage = 'none'

        const { chainId, account } = this.props
        this.getApyForAllStakings()


        this.setState({
            subscrible: setInterval(() => {
                this.cliamWatcher()
                this.getApyForAllStakings()
            }, 15000)
        })
        document.addEventListener("keydown", this.escFunction, false);
        if (!chainId || !account) return

        const { pools } = this.state

        await this.setState({ web3: new StakeService(account, chainId) })


        pools.map(async (tokenName) => {
            await this.handleInitAllowances(tokenName)
            await this.getSingleBalance(tokenName)
            this.getStakingAllAmounts(tokenName)
        })

        console.log("did mounted sand token");
    }

    componentWillUnmount() {
        const { subscrible } = this.state
        this.setState({ subscrible: clearTimeout(subscrible) })
    }

    async componentDidUpdate(prevProps) {
        const { chainId, account, navId } = this.props
        if (prevProps.account !== account || prevProps.chainId !== chainId) {

            console.log("chain id is", chainId);

            if (!chainId || !account) return

            console.log("log did update", account, chainId);

            const { pools } = this.state

            await this.setState({ web3: new StakeService(account, chainId) })

            pools.map(async (tokenName) => {
                await this.handleInitAllowances(tokenName)
                await this.getSingleBalance(tokenName)
                await this.getStakingAllAmounts(tokenName)

            })

        }

        if (prevProps.navId !== navId) {
            console.log("nav changed");

            const currentPools = [
                ["deus", "dea"],
                ["deus_dea", "dea_usdc"],
                ["deus_eth", "ampl_eth", "snx", "uni"],
            ]

            this.setState({
                pools: currentPools[navId],
                isStakePopup: false,
                approved: false,
            })

            currentPools[navId].map(async (stakeName) => {
                await this.handleInitAllowances(stakeName)
                await this.getSingleBalance(stakeName)
                await this.getStakingAllAmounts(stakeName)
            })
        }
    }



    getApyForAllStakings = async () => {
        const { stakingsMap } = this.state
        try {
            const resp = await fetch("https://app.deus.finance/static-api.json")
            const jresp = await resp.json()
            const apys = jresp.apy
            for (const apyKey in apys) {
                if (!stakingsMap[apyKey]) continue
                stakingsMap[apyKey].apy = parseFloat(apys[apyKey]).toFixed(2)
            }
        } catch (error) {
            console.log(" get Market Amounts had some error", error);
        }
        this.setState({ stakingsMap })
    }



    //update all claim amount if user had any deposited tokens
    cliamWatcher = () => {
        const { pools, stakingsMap, web3 } = this.state

        console.log("cliamWatcher");

        if (!web3) return

        pools.map(async (poolName, i) => {
            const { deposited } = stakingsMap[poolName]
            if (!deposited || deposited === "0") return
            console.log(poolName);
            stakingsMap[poolName].claimable_amount = null
            this.setState({ stakingsMap })
            try {
                const data = await web3?.getNumberOfPendingRewardTokens(poolName)
                console.log(poolName, " recived amount");
                stakingsMap[poolName].claimable_amount = getStayledNumber(data)
                this.setState({ stakingsMap })
            } catch (error) {
                console.log(poolName, " error amount");
            }
        })
        // this.setState({ stakingsMap })
    }

    escFunction = (event) => {
        if (event.keyCode === 27) {
            this.setState({ isStakePopup: false, approved: false })
        }
    }

    methods = {
        onStart: () => {
            console.log("onStart")
        },
        onSuccess: () => {
            const { currStake, typeTransaction } = this.state
            console.log("onSuccess ", currStake)

            if (typeTransaction === "approved") {
                console.log("it was approve");
                this.setState({ typeTransaction: "" })
                this.handleInitAllowances(currStake, currStake)
                return
            } else {
                this.getSingleBalance(currStake, true)
                this.getStakingAllAmounts(currStake)
            }
            this.setState({ typeTransaction: "", isStakePopup: false })
        },
        onError: () => {
            console.log("onError")
            this.setState({ typeTransaction: "" })
        },
    }

    getSingleBalance = async (tokenName) => {

        const { tokensMap, web3 } = this.state
        try {

            const data = await web3.getTokenBalance(tokenName)
            console.log("getSingleBalance ", data);
            tokensMap[tokenName].balance = getStayledNumber(data)
            this.setState({ tokensMap })
        } catch (error) {
            console.log(error);
        }
    }

    handleInitAllowances = async (contractName) => {
        const { tokensMap, currStake, stakingsMap, web3 } = this.state

        try {
            const data = await web3.getAllowances(contractName, contractName)
            console.log(contractName, "\t allowances");
            stakingsMap[contractName].allowances = data
            if (currStake && stakingsMap[currStake].allowances > 0) {
                this.setState({ approved: true })
            }
            this.setState({ tokensMap, stakingsMap })

        } catch (error) {
            console.log(error);
        }
    }

    getStakingAllAmounts = (stakedToken, force = false) => {

        const { web3, stakingsMap } = this.state

        console.log("initial called for \t" + stakedToken);

        //off stake so we put stakaing
        if (stakingsMap[stakedToken].onlyMain) {
            stakingsMap[stakedToken].deposited = 0
            stakingsMap[stakedToken].claimable_amount = 0
            this.setState({ stakingsMap })
            console.log("isClosed", stakedToken);
            return
        }

        if (!web3) return

        web3.getNumberOfStakedTokens(stakedToken).then((amount) => {
            stakingsMap[stakedToken].deposited = amount
            if (amount === "0") {
                this.setState({ stakingsMap })
                return
            }
            web3.getTotalStakedToken(stakedToken).then((amount) => {
                stakingsMap[stakedToken].pool = stakingsMap[stakedToken].deposited === "0" || amount === "0" ?
                    0 : (stakingsMap[stakedToken].deposited / amount) * 100

                web3.getNumberOfPendingRewardTokens(stakedToken).then((amount) => {
                    stakingsMap[stakedToken].claimable_amount = parseFloat(amount)
                    this.setState({ stakingsMap })

                })
            })

        })
    }


    handleClaim = (stakedToken) => () => {
        console.log("handleClaim");

        this.handleWithdraw(stakedToken)(0)
    }


    handleWithdraw = (stakedToken) => async (amount) => {
        const { web3 } = this.state
        this.setState({ currStake: stakedToken })

        try {
            console.log("handleWithdraw");
            const data = await web3.withdraw(stakedToken, amount, notify(this.methods))
        } catch (error) {
            console.log(error);
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
        const { web3, approved } = this.state
        console.log(token.name + "\t" + amount + "\t handleApprove ");
        if (approved || !web3) return
        this.setState({ typeTransaction: "approved" })
        try {
            const data = await web3.approve(token.name, amount, notify(this.methods))

        } catch (error) {
            console.log(error)
        }
    }

    handleStake = (stakedToken) => async (amount) => {
        console.log("handleStake ", stakedToken, " ", amount);

        const { isStakePopup, approved, web3 } = this.state
        if (!approved) return

        try {
            const data = await web3.stake(stakedToken.name, amount, notify(this.methods))

        } catch (error) {
            console.log(error)
        }

        this.setState({
            currStake: stakedToken,
            isStakePopup: !isStakePopup,
            stakeAmount: undefined
        })
    }


    handlePopup = (stakedToken) => {
        const { isStakePopup, stakingsMap } = this.state
        console.log(stakedToken, " called");
        const approved = stakingsMap[stakedToken] && stakingsMap[stakedToken].allowances > 0
        this.setState({ isStakePopup: !isStakePopup, currStake: stakedToken, approved })
    }

    render() {
        const { tokensMap, pools, stakingsMap, isStakePopup, approved, currStake } = this.state
        const currToken = tokensMap[currStake]
        const currStaking = stakingsMap[currStake]


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
                contractAddr={addrs["staking"][currStake][this.props.chainId]}
                isApproved={approved}
            />}

            <div className="staking-wrap" >
                <img className="st-bg" src={process.env.PUBLIC_URL + "/img/staking-bg.svg"} alt="dd" />

                <TopNotif typeID={this.props.navId} />

                <div className="stake-container-wrap" ></div>
                <div className="container-single-wrap" style={{ marginTop: "50px" }}>
                    {
                        pools.slice(0, pools.length).map((token, i) => {
                            // console.log(token);
                            return <QStake
                                key={i}
                                handleClaim={this.handleClaim(token)}
                                handleWithdraw={this.handleWithdraw(token)}
                                handleStakePopup={this.handlePopup}
                                staking={stakingsMap[token]}
                                handleStake={this.handleStake}
                                deposited={stakingsMap[token].deposited}
                                stakable={stakingsMap[token].onlyMain || stakingsMap[token].off ? false : true}
                            />
                        })
                    }

                </div>
            </div>
        </>);
    }
}

export default withRouter(StakingManager);