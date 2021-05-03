import React, { Component } from 'react';
import TopNotif from './TopNotif';
import QStake from './Stake/QStake';
import { getStayledNumber, notify, formatBalance } from '../../utils/utils';
import { StakeService } from '../../services/StakeService';
import StakePopup from '../common/Popup/StakePopup';
import { withRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import addrs from '../../services/addresses.json'
import "./staking.scss"
import ChainPupop from '../common/Popup/ChainPopup';
import WithdrawPopup from '../common/Popup/WithdrawPopup';
import { withTranslation } from 'react-i18next'

class StakingManager extends Component {
    state = {
        pools: this.props.pools,
        tokensMap: this.props.allTokens,
        stakingsMap: this.props.allStakings,
        isStakePopup: false,
        isWithdrawPopup: false,
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

        // if (!chainId || !account) return

        const { pools } = this.state

        await this.setState({ web3: new StakeService(account, chainId) })


        pools.map(async (tokenName) => {
            await this.handleInitAllowances(tokenName)
            await this.getSingleBalance(tokenName)
            await this.getStakingAllAmounts(tokenName)
        })

    }

    componentWillUnmount() {
        const { subscrible } = this.state
        this.setState({ subscrible: clearTimeout(subscrible) })
    }

    async componentDidUpdate(prevProps) {
        const { chainId, account, navId } = this.props
        if (prevProps.account !== account || prevProps.chainId !== chainId) {

            // if (!chainId || !account) return

            const { pools } = this.state

            await this.setState({ web3: new StakeService(account, chainId) })

            pools.map(async (tokenName) => {
                await this.handleInitAllowances(tokenName)
                await this.getSingleBalance(tokenName)
                await this.getStakingAllAmounts(tokenName)

            })

        }

        if (prevProps.navId !== navId) {

            const currentPools = [
                ["sand_dea", "sand_deus", "timetoken"],
                ["bpt_native"],
                ["coinbase_usdc", "deus_dea", "dea_usdc", "deus_eth", "deus", "dea", "ampl_eth", "snx", "uni"],
            ]


            this.setState({
                pools: currentPools[navId],
                isStakePopup: false,
                isWithdrawPopup: false,
                approved: false,
            })

            currentPools[navId].map(async (stakeName) => {
                await this.handleInitAllowances(stakeName)
                await this.getSingleBalance(stakeName)
                await this.getStakingAllAmounts(stakeName)
            })
            this.getApyForAllStakings()
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

        if (!web3) return

        pools.map(async (poolName, i) => {
            const { deposited } = stakingsMap[poolName]
            if (!deposited || deposited === "0") return
            stakingsMap[poolName].claimable_amount = null
            this.setState({ stakingsMap })
            try {
                const data = await web3?.getNumberOfPendingRewardTokens(poolName)
                let claim = stakingsMap[poolName].isClose ? data : parseFloat(data) * 100 / 3
                stakingsMap[poolName].claimable_amount = getStayledNumber(claim)
                this.setState({ stakingsMap })
            } catch (error) {
                console.log(poolName, " error amount");
            }
        })
    }

    escFunction = (event) => {
        if (event.keyCode === 27) {
            this.setState({ isStakePopup: false, isWithdrawPopup: false, approved: false })
        }
    }

    methods = {
        onStart: () => {
        },
        onSuccess: () => {
            const { currStake, typeTransaction } = this.state

            if (typeTransaction === "approved") {
                this.setState({ typeTransaction: "" })
                this.handleInitAllowances(currStake, currStake)
                return
            } else {
                this.getSingleBalance(currStake, true)
                this.getStakingAllAmounts(currStake)
            }
            this.setState({ typeTransaction: "", isStakePopup: false, isWithdrawPopup: false })
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
            tokensMap[tokenName].balance = formatBalance(data)
            this.setState({ tokensMap })
        } catch (error) {
            console.log(error);
        }
    }

    handleInitAllowances = async (contractName) => {
        const { tokensMap, currStake, stakingsMap, web3 } = this.state

        try {
            const data = await web3.getAllowances(contractName, contractName)
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


        //off stake so we put stakaing
        if (stakingsMap[stakedToken].onlyMain) {
            stakingsMap[stakedToken].deposited = 0
            stakingsMap[stakedToken].claimable_amount = 0
            this.setState({ stakingsMap })
            return
        }

        if (!web3) return

        if (!this.props.account) {
            stakingsMap[stakedToken].deposited = 0
            this.setState({ stakingsMap })
            return
        }


        web3.getTotalStakedToken(stakedToken).then((total) => {
            //TODO
            web3.getNumberOfStakedTokens(stakedToken).then((amount) => {
                stakingsMap[stakedToken].deposited = amount
                if (amount === "0") {
                    this.setState({ stakingsMap })
                    return
                }
                stakingsMap[stakedToken].pool = stakingsMap[stakedToken].deposited === "0" || total === "0" ?
                    0 : (stakingsMap[stakedToken].deposited / total) * 100

                web3.getNumberOfPendingRewardTokens(stakedToken).then((amount) => {
                    let claim = stakingsMap[stakedToken].isClose ? amount : parseFloat(amount) * 100 / 3
                    stakingsMap[stakedToken].claimable_amount = getStayledNumber(claim)
                    this.setState({ stakingsMap })

                })
            })

        })
    }


    handleClaim = (stakedToken) => () => {
        this.handleWithdraw(stakedToken)(0)
    }


    handleWithdraw = (stakedToken) => async (amount) => {
        console.log("withdraw with ", amount);
        const { web3 } = this.state
        this.setState({ currStake: stakedToken })

        try {
            await web3.withdraw(stakedToken, amount, notify(this.methods))
        } catch (error) {
            console.log(error);
        }
    }




    blurBG = () => {
        const { isStakePopup, isWithdrawPopup } = this.state

        const blurPop = "blured"
        if (!(isStakePopup || isWithdrawPopup)) {
            document.getElementById("blur-pop").classList.remove(blurPop)
        } else {
            document.getElementById("blur-pop").classList.add(blurPop)
        }
    }


    handleApprove = (token) => async (amount) => {
        console.log("here");
        const { web3, approved } = this.state
        if (approved || !web3) return
        this.setState({ typeTransaction: "approved" })
        try {
            await web3.approve(token.name, amount, notify(this.methods))

        } catch (error) {
            console.log(error)
        }
    }

    handleStake = (stakedToken) => async (amount) => {

        const { approved, web3 } = this.state
        if (!approved) return

        try {
            await web3.stake(stakedToken.name, amount, notify(this.methods))

        } catch (error) {
            console.log(error)
        }

        this.setState({
            currStake: stakedToken,
            isStakePopup: false,
            isWithdrawPopup: false,
            stakeAmount: undefined
        })
    }


    handlePopup = (stakedToken) => {
        const { isStakePopup, stakingsMap } = this.state
        console.log(stakedToken, " called");
        const approved = stakingsMap[stakedToken] && stakingsMap[stakedToken].allowances > 0
        this.setState({ isStakePopup: !isStakePopup, currStake: stakedToken, approved })
    }

    handleWithdrawPopup = (stakedToken) => {
        const { isWithdrawPopup } = this.state
        console.log(stakedToken, " handleWithdrawPopup called");
        this.setState({ isWithdrawPopup: !isWithdrawPopup, currStake: stakedToken })
        this.setState({ isWithdrawPopup: !isWithdrawPopup, currStake: stakedToken })
    }

    render() {
        const { tokensMap, pools, stakingsMap, isStakePopup, isWithdrawPopup, approved, currStake } = this.state
        const { chainId, t } = this.props
        const currToken = tokensMap[currStake]
        const currStaking = stakingsMap[currStake]
        // const innnerText = <div className="staking-notif-wrap">{t("importantText1")}{t("importantText2")} <br />
        //     {t("importantText3")}{t("importantText4")}{t("importantText5")}</div>



        this.blurBG()


        return (<>
            <ToastContainer style={{ width: "400px" }} />
            <ChainPupop
                title={t("wrongNetwork")}
                show={chainId && chainId !== 1}
                close={false}
                handlePopup={() => console.log()}
                popBody={<div className="description" style={{ padding: "30px  10px", textAlign: "center" }}>
                    <div>
                        {t("badNetwork1")}
                        <br />
                        <br />
                        {t("changeToMain")}
                    </div>
                </div>}
            />
            {/* <TopNotification text={innnerText} /> */}
            { currStake && currToken && <StakePopup
                title={t("stakeToEarn")}
                close={true}
                isStakePopup={isStakePopup}
                handleApprove={this.handleApprove(currToken)}
                handleStake={this.handleStake(currToken)}
                handlePopup={this.handlePopup}
                token={currToken}
                staking={currStaking}
                contractAddr={addrs["staking"][currStake][chainId ? chainId : 1]}
                isApproved={approved}
            />}

            { currStake && currToken && <WithdrawPopup
                title={t("withdraw")}
                close={true}
                deposited={stakingsMap[currToken.name].deposited}
                isWithdrawPopup={isWithdrawPopup}
                handleWithdraw={this.handleWithdraw(currToken.name)}
                handleWithdrawPopup={this.handleWithdrawPopup}
                token={currToken}
                staking={currStaking}
                contractAddr={addrs["staking"][currStake][chainId ? chainId : 1]}
            />}

            <div className="staking-wrap" >

                <TopNotif typeID={this.props.navId} />

                <div className="stake-container-wrap" ></div>
                <div className="container-single-wrap">
                    {
                        pools.map((token, i) => {
                            return <QStake
                                key={i}
                                handleClaim={this.handleClaim(token)}
                                handleStakePopup={this.handlePopup}
                                handleWithdrawPopup={this.handleWithdrawPopup}
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

export default withTranslation()(withRouter(StakingManager));