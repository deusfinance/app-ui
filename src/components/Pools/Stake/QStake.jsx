import React, { Component, useEffect } from 'react';
import { getStayledNumber } from '../../../utils/utils';
import ProvideButton from './ProvideButton';
import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';

const QStake = ({ token, stakable, handleStakePopup, dollarPool, isSand, handleClaim, handleWithdraw }) => {
    const Web3React = useWeb3React()
    const { account, chainId } = Web3React
    const isStaked = parseFloat(token.deposited) > 0 ? true : false
    const [deposited, setDeposited] = useState(token.deposited)
    const closedClass = isStaked ? "" : "closed "
    const stakeHere = isStaked ? "more" : "here"
    const balanceClass = token.balancer ? "balancer " : ""
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

            <div className="token-name">{token.title}</div>
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
                <div className="own-pool">you own {parseFloat(token.pool.toString()).toFixed(2)}% {dollarPool ? "($" + dollarPool + ") " : ""}of the pool</div>

                <div className="bottom-btns">
                    <div className="btns-wrap">
                        <div className="btns">

                            <div className="left-single disabled">{getStayledNumber(token.claimable_amount)} {token.claimable_unit} claimable</div>
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
