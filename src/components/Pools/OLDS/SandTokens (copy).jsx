import React, { Component } from 'react';
// import Popup from '../common/Popup/Popup';
import { AllStakings, contractEndpoint, sandTokens, timeToken } from '../../config'

import "./staking.scss"
// import NStake from './Stake/NStake';
import TopNotif from './TopNotif';
import QStake from './Stake/QStake';
import StakePopup from '../common/Popup/StakePopup';
import { useState } from 'react';
import { getStayledNumber } from '../../utils/utils';
// import { VaultsService } from '../../services/vaultsService';
import { StakeService } from '../../services/StakeService';
import { useWeb3React } from '@web3-react/core';

/* 
class SandTokens extends Component {
    state = {
        isSelect: false,
        isStakePopup: false,
        tokens: sandTokens,
        tokensMap: {},
        currStake: null,
        stakeAmount: null,
    }


    dollarPrice = (price, fixed = 0) => {
        return Number(price).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: fixed
        })
    }

    initialAllAmounts = (sandTokenName) => {

    }

    handleClaim = () => {
        //calim
        console.log("claim");
    }

    handleWithdraw = () => {
        //calim
        console.log("handleWithdraw");
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

    handlePopup = (stakedToken) => {
        const { isStakePopup } = this.state
        this.setState({ isStakePopup: !isStakePopup, currStake: isStakePopup ? null : stakedToken, stakeAmount: undefined })
    }

    handleMax = (token) => {
        this.setState({ stakeAmount: token.balance })
    }

    handleStake = (sandTokenName) => (amount) => {
        console.log(sandTokenName, amount, " staked");
    }

    handleApprove = (sandTokenName) => (amount) => {
        console.log(sandTokenName, amount, " Approve");
    }


    render() {
        const { isStakePopup, tokens, currStake, stakeAmount } = this.state
        const currToken = currStake !== "timetoken" ? tokens[currStake] : timeToken
        this.blurBG()

        // let popupMsg = ""
        // if (currToken) {
        //     const isApproved = currToken.allowances > 0 ? true : false
        //     popupMsg = <div className="stake-pop-wrap">
        //         <div className="uni-token-name">{currToken.name !== "timetoken" ? "s" : "" + currToken.title}</div>
        //         <div className="amount-wrap">
        //             <div className="balance">Balance: <span>{currToken.balance}</span></div>
        //             <input type="number" className="amount" value={stakeAmount} placeholder="0.00" />
        //             <div className="max-btn" onClick={() => this.handleMax(currToken)}>MAX</div>
        //         </div>
        //         <a className="show-contract" href={contractEndpoint + "/" + currToken.stakingLink} target="_blank" rel="noopener noreferrer">Show me the contract</a>
        //         {!isApproved && <div className="btn-wrap" onClick={this.handleApprove(currToken.name)}>Approve</div>}
        //         {isApproved && <div className="btn-wrap" onClick={this.handleStake(currToken.name)}>Stake</div>}
        //     </div>
        // }

        return (<>

            {currToken && <StakePopup
                title={"STAKE TOKENS TO EARN " + "DEA"}
                close={true}
                isStakePopup={isStakePopup}
                handleApprove={this.handleApprove(currToken.name)}
                handleStake={this.handleStake(currToken.name)}
                handlePopup={this.handlePopup}
                token={currToken}
            />}

            <div className="staking-wrap" >
                <img className="st-bg" src={process.env.PUBLIC_URL + "/img/staking-bg.svg"} alt="dd" />

                <TopNotif typeID={0} />

                <div className="stake-container-wrap" ></div>
                <div className="container-single-wrap" style={{ marginTop: "50px" }}>
                    {
                        Object.values(tokens).map((token, i) => <QStake key={i}
                            token={token}
                            handleStake={this.handlePopup}
                            handleClaim={this.handleClaim}
                            handleWithdraw={this.handleWithdraw}
                            isSand={true}
                            stakable={true}
                            dollarPool={10}
                        />)
                    }

                    <QStake token={timeToken} handleStake={this.handlePopup} isSand={false} stakable={true} />
                </div>
            </div>

        </>
        );
    }
}

export default SandTokens;
 */



const SandTokens = (props) => {
    const Web3React = useWeb3React()
    const { account, chainId } = Web3React

    const [stakePopup, setPopup] = useState(false)
    const sandsList = ["sand_dea", "sand_deus", "sand_dai", "sand_eth", "sand_wbtc", "timetoken"]
    const sandStaking = AllStakings.sand
    const [stokens, setSTokens] = useState(props.allTokens)
    const [tokens, setTokens] = useState(sandTokens)
    const [currStake, setCurrStake] = useState(null)
    const [stakeAmount, setStakeAmount] = useState(null)
    const [approve, setApprove] = useState(false)

    const handleClaim = () => {
        console.log("claim");
    }

    const handleWithdraw = () => {
        console.log("handleWithdraw");
    }


    const blurBG = () => {
        const blurPop = "blured"
        if (!(stakePopup)) {
            document.getElementById("blur-pop").classList.remove(blurPop)
        } else {
            document.getElementById("blur-pop").classList.add(blurPop)
        }
    }


    const handlePopup = (stakedToken) => {
        console.log(stakedToken, " called");
        setPopup(!stakePopup)
        setApprove(false)
        setCurrStake(stakePopup ? null : stokens[stakedToken])
        setStakeAmount(undefined)
    }




    const handleIinitToken = async () => {

        sandsList.map((tokenName) => {
            getSingleBalance(tokenName)
        })
        getSingleBalance("timetoken")
    }


    const getSingleBalance = async (tokenName) => {

        try {
            const data = await new StakeService(account, chainId).getTokenBalance(tokenName)
            stokens[tokenName].balance = getStayledNumber(data)

            setSTokens(stokens)
        } catch (error) {
            console.log(error);
        }
    }

    const handleStake = (sandTokenName) => (amount) => {
        console.log(sandTokenName, amount, " staked");
        setTimeout(() => {
            currStake.allowances = 9999
            currStake.deposited = getStayledNumber(parseFloat(amount) + parseFloat(currStake.deposited))
            handlePopup(sandTokenName)
            console.log("updated");
        }, 1000)
    }

    const handleApprove = (sandTokenName) => (amount) => {
        console.log(sandTokenName, amount, " Approve");
        stokens[sandTokenName].allowances = 9999
        setSTokens(stokens)

        setApprove(true)

    }

    // const currToken = currStake.name !== "timetoken" ? tokens[currStake] : timeToken
    blurBG()

    handleIinitToken()
    return (<>
        { currStake && <StakePopup
            title={"STAKE TOKENS TO EARN " + "DEA"}
            close={true}
            isStakePopup={stakePopup}
            handleApprove={handleApprove(currStake.name)}
            handleStake={handleStake(currStake.name)}
            handlePopup={handlePopup}
            token={currStake}
            isApproved={approve}
        />
        }

        <div className="staking-wrap" >
            <img className="st-bg" src={process.env.PUBLIC_URL + "/img/staking-bg.svg"} alt="dd" />

            <TopNotif typeID={0} />

            <div className="stake-container-wrap" ></div>
            <div className="container-single-wrap" style={{ marginTop: "50px" }}>
                {
                    sandsList.map((name, i) => {
                        return <QStake key={i}
                            token={stokens[name]}
                            handleStakePopup={handlePopup}
                            handleClaim={handleClaim}
                            handleWithdraw={handleWithdraw}
                            isSand={true}
                            stakable={true}
                            dollarPool={10}
                        />
                    })
                }
            </div>
        </div>

    </>
    );
}

export default SandTokens;