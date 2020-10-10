import React, { Component } from 'react'
import { connectWallet } from '../../services/SwapService'
import * as stakeService from '../../services/StakingService'
import { getStayledNumber } from '../../utils/utils'
import { ToastContainer, toast } from 'react-toastify';
import * as config from '../../config';

import 'react-toastify/dist/ReactToastify.css';
import '../../styles/scss/pools.css';
import StartPool from './StartPool';
import Pools from './Pools';
import StakePopup from './StakePopup';


class PoolsContainer extends Component {
    state = {
        isConnected: false,
        showPopup: false,
        staking: {
            name: "",
            amount: "",
            contract: "",
            coin_name: "",
            isApprove: true
        },
        wallet: {
            address: null,
        },
        stakes: {
            deus_eth: {
                name: "deus_eth",
                amounts: {
                    dea: 0,
                    newdea: 0,
                    apy: 0,
                    lp: 0,
                    pool: 0,
                    currLp: 0,
                },
                coin_name: "UNI-V2-DEUS/ETH",
                stakingLink: "0xCC284f82cD51A31bA045839F009cB208246Bb5f9",
                liqLink: "https://app.uniswap.org/#/add/ETH/0xf025DB474fcF9bA30844e91A54bC4747d4FC7842",
                rewardRatio: 0,
            },
            deus: {
                name: "deus",
                amounts: {
                    dea: 0,
                    newdea: 0,
                    apy: 0,
                    lp: 0,
                    pool: 0,
                    currLp: 0,
                },
                coin_name: "DEUS",
                stakingLink: "0x2a0C5fc61619372A811e093f0D5Ec4050aE0124d",
                liqLink: "https://app.uniswap.org/#/add/ETH/0xf025DB474fcF9bA30844e91A54bC4747d4FC7842",
                rewardRatio: 0,
            },
        },
    }

    constructor(props) {
        super(props);
        // create a ref to store the textInput DOM element
        this.scrollRef = React.createRef();
    }

    componentDidMount() {
        document.title = 'DEUS pools';
        // this.isConnected()
        setTimeout(() => this.isConnected(), 1000);
        setTimeout(() => this.handleScroller(), 100);
        this.handleUpdateDEA()
        window.addEventListener('resize', this.handleResize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }

    handleResize = () => this.handleScroller()

    handleScroller = () => {
        const width = (2300 - window.innerWidth) / 2
        if (this.scrollRef.current) {
            this.scrollRef.current.scrollLeft = width
        }
    }


    handleStakeState = (state) => {
        if (state === "receipt" || state === "error") {
            this.setState({ SwapState: null })
            this.notify(state)
            return
        }
        this.notify(state)
    }

    notify = (state) => {
        const { staking } = this.state

        switch (state) {
            case "waiting": {
                toast.info("Waiting for Metamask confirmation.", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                break
            }
            case "transactionHash": {
                toast.info("Transaction broadcasted.", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                break
            }
            case "receipt": {
                toast.success("Transaction Successful.", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                if (staking.isApprove) {
                    staking.isApprove = false
                    this.setState({ staking })
                } else {
                    this.handlePopup(staking.name, false)
                }
                this.getTokenAllAmounts(staking.name)
                break
            }
            case "connectWallet": {
                toast.warn("Please Connect Wallet.", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                break
            }
            case "error": {
                toast.warn("Transaction Failed.", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                break
            }
            default: {
                toast.info("Unhandled Event.", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
        }
    };

    initial = () => {
        console.log("initial called");
        const { stakes } = this.state
        for (const stakedToken in stakes) {
            this.getTokenAllAmounts(stakedToken)
        }
    }


    getTokenAllAmounts = (stakedToken) => {
        const { stakes } = this.state
        const token = stakes[stakedToken]
        stakeService.getNumberOfStakedTokens(token.name).then((amount) => {
            token.amounts.lp = getStayledNumber(amount)
            this.setState({ stakes })

            stakeService.getTotalStakedToken(token.name).then((amount) => {
                token.amounts.pool = token.amounts.lp === "0" || amount === "0" ? 0 : (token.amounts.lp / amount) * 100
                this.setState({ stakes })

                stakeService.getNumberOfPendingRewardTokens(token.name).then((amount) => {
                    token.amounts.dea = getStayledNumber(amount)
                    token.rewardRatio = token.amounts.pool * config.FixedRatio / 100
                    token.amounts.newdea = getStayledNumber(parseFloat(amount) + (config.ClaimableDuration / config.UpdateDuration) * token.rewardRatio)
                    this.setState({ stakes })
                })
            })
        })
        stakeService.getUserWalletStakedTokenBalance(token.name).then((amount) => {
            token.amounts.currLp = getStayledNumber(amount)
            this.setState({ stakes })
        })
    }

    handleUpdateDEA = () => setInterval(() => {
        const { stakes } = this.state
        for (const tokenName in stakes) {
            const token = stakes[tokenName]
            stakeService.getNumberOfPendingRewardTokens(token.name).then((amount) => {
                token.amounts.dea = getStayledNumber(parseFloat(amount))
                token.amounts.newdea = getStayledNumber(parseFloat(amount) + (config.ClaimableDuration / config.UpdateDuration) * token.rewardRatio)
                this.setState({ stakes })
            })
        }

    }, (config.ClaimableDuration) * 1000)


    handleStake = () => {
        const { staking } = this.state
        console.log(staking.amount);
        stakeService.stake(staking.name, staking.amount, this.handleStakeState)
    }


    handleApprove = () => {
        const { staking } = this.state
        console.log(staking.amount);
        stakeService.approve(staking.name, staking.amount, this.handleStakeState)
    }




    handleClaim = (stakedToken) => {
        stakeService.withdraw(stakedToken, 0, this.handleStakeState)
        console.log("0 handleClaim clicked")
    }


    handleWithdraw = (stakedToken, amount) => {
        console.log("withdraw" + amount);
        stakeService.withdraw(stakedToken, amount, this.handleStakeState)
    }


    handleLP = (pair) => {
        console.log(pair + " handleLP clicked");
    }


    isConnected = () => {
        if (window.ethereum) {
            if (window.ethereum.selectedAddress) {
                const { wallet } = this.state
                wallet.address = window.ethereum.selectedAddress
                this.setState({ wallet, isConnected: true })
                this.handleScroller()
            }
            if (window.ethereum.isMetaMask) {
                this.setState({ isMetamask: true })
            }
        }
        this.initial()
    }


    setStakingAmount = (value) => {
        const { staking } = this.state
        staking.amount = value
        this.setState({ staking })
    }


    handleConnectWallet = async () => {
        try {
            const rep = await connectWallet(this.isConnected())
            console.log(rep ? "connected to metamask" : "");
            this.isConnected()
        } catch (error) {
            console.log("didnt connect to metamask");
        }
    }
    showAddress = () => {
        const { address } = this.state.wallet
        return address.substring(0, 6) + "..." + address.substring(address.length - 4, address.length)
    }

    handleMaxLP = (amount) => {
        const { staking } = this.state
        staking.amount = amount
        this.setState({ staking })
    }

    handlePopup = (stakedToken, bool) => {
        const { staking } = this.state
        if (bool) {
            staking.contract = "" + this.state.stakes[stakedToken].stakingLink
            staking.coin_name = this.state.stakes[stakedToken].coin_name
            this.getTokenAllAmounts(stakedToken)
        }
        staking.amount = ""
        staking.isApprove = true
        staking.name = stakedToken
        this.setState({ showPopup: bool, staking })
    }

    render() {
        const { isConnected, stakes, staking, showPopup } = this.state
        return (<>
            <ToastContainer />
            <StakePopup
                showPopup={showPopup}
                staking={staking}
                stakes={stakes}
                handlePopup={this.handlePopup}
                handleMaxLP={this.handleMaxLP}
                setStakingAmount={this.setStakingAmount}
                handleApprove={this.handleApprove}
                handleStake={this.handleStake}
            />
            <StartPool isConnected={isConnected} handleConnectWallet={this.handleConnectWallet} />
            <Pools
                stakes={stakes}
                isConnected={isConnected}
                scrollRef={this.scrollRef}
                handleScroller={this.handleScroller}
                handleConnectWallet={this.handleConnectWallet}
                showAddress={this.showAddress}
                handlePopup={this.handlePopup}
                handleClaim={this.handleClaim}
                handleLP={this.handleLP}
                handleWithdraw={this.handleWithdraw}
            />
        </>);
    }
}

export default PoolsContainer;
