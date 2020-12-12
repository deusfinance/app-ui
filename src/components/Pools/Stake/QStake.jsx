import React, { Component, useEffect } from 'react';
import { getStayledNumber } from '../../../utils/utils';
import ProvideButton from './ProvideButton';
import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';
import { WaveLoading, RotateCircleLoading } from 'react-loadingg';

const QStake = ({ token, depositedAmount, stakable, handleStakePopup, dollarPool, isSand, handleClaim, handleWithdraw }) => {
    const Web3React = useWeb3React()
    const { account, chainId } = Web3React
    const isStaked = token ? parseFloat(token.deposited) > 0 ? true : false : false
    const [deposited, setDeposited] = useState(token ? token.deposited : depositedAmount)
    const closedClass = isStaked ? "" : "closed "
    const stakeHere = isStaked ? "more" : "here"
    const balanceClass = token ? token.balancer ? "balancer " : "" : ""
    const canStakeClass = stakable && token.balance > 1 ? "can-stake" : ""
    let stakeClasses = "single-wrap " + closedClass + balanceClass

    useEffect(() => {
        console.log("rerender me");
    }, [deposited])

    return (<div className={`${stakeClasses} ${canStakeClass}`}>
        <div className="single">
            {stakable && <div className="stake-here" onClick={() => handleStakePopup(token.name)}>
                STAKE {stakeHere}
            </div>}
            {!stakable && <div className="stake-here stake-here-closed"> STAKE {stakeHere}</div>}
            {!(token && token.deposited) && <div className="loading-qstake-top"><RotateCircleLoading color="#a0a0a0" size={'small'} ></RotateCircleLoading></div>}
            <div className="token-name">{token.title}

            </div>
            {/* <div className="token-title">SandToken</div> */}
            {token.apy && <div className="apy">{parseFloat(token.apy.toString()).toFixed(2)}% APY</div>}

            {token.balancer && !isStaked && <div className="balancer-text">
                <div className="desc">In order to stake you need to  provide <br /> liquidity  to the following Balancer pool</div>
                <div className="perc">

                    <pre>
                        {token.info}
                    </pre>

                </div>
            </div>}

            {stakable && !isStaked && <>
                <ProvideButton token={token} isSand={isSand} />
            </>}


            {isStaked && <>
                {token.pool && <div className="own-pool">you own {parseFloat(token.pool.toString()).toFixed(2)}% {dollarPool ? "($" + dollarPool + ") " : ""}of the pool</div>}

                <div className="bottom-btns">
                    <div className="btns-wrap">
                        <div className="btns">

                            <div className="left-single disabled">{token.claimable_amount ? getStayledNumber(token.claimable_amount) : <div className="loading-qstake"></div>} {token.claimable_unit} claimable</div>
                            <div className="right-single" onClick={handleClaim}>
                                <span>claim</span>
                            </div>
                        </div>
                    </div>
                    <div className="btns-wrap">
                        <div className="btns">
                            <div className="left-single disabled">{getStayledNumber(token.deposited)} deposited</div>
                            <div className="right-single" onClick={handleWithdraw}>
                                <span>withdraw and claim</span>
                            </div>
                        </div>
                    </div>

                    {/* <div className="btns-wrap">
                        <div className="btns">
                            <div className="left-single disabled zap" ><span>ZAP⚡ in/out</span></div>
                            <div className="right-single">
                                <span>buy more</span><img className="swap-icon" src={process.env.PUBLIC_URL + "/vaults/swap.svg"} alt="swap" />
                            </div>
                        </div>
                    </div> */}
                </div>
            </>}


        </div>
    </div>);
}

export default QStake;
