import React, { Component, useEffect } from 'react';
import { getStayledNumber } from '../../../utils/utils';
import ProvideButton from './ProvideButton';
import { useState } from 'react';
import { WaveLoading, RotateCircleLoading } from 'react-loadingg';

const QStake = ({ staking, depositedAmount, stakable, handleStakePopup, dollarPool, isSand, handleClaim, handleWithdraw }) => {

    const isStaked = staking ? parseFloat(staking.deposited) > 0 ? true : false : false
    const [deposited, setDeposited] = useState(staking ? staking.deposited : depositedAmount)
    const closedClass = isStaked ? "" : "closed "
    const stakeHere = isStaked ? "more" : "here"
    const balanceClass = staking ? staking.balancer ? "balancer " : "" : ""
    const canStakeClass = stakable && staking.balance > 1 ? "can-stake" : ""
    let stakeClasses = "single-wrap " + closedClass + balanceClass
    const onlyMainClasses = staking && staking.onlyMain ? "only-main" : ""

    useEffect(() => {
        console.log("rerender me");
    }, [deposited])

    return (staking && <div className={`${onlyMainClasses} ${stakeClasses}   ${canStakeClass}`}>
        {staking && staking.onlyMain && <img className="img-only-main" src={process.env.PUBLIC_URL + "/img/only-main.svg"} alt="" />}
        <div className="single">
            {stakable && <div className="stake-here" onClick={() => handleStakePopup(staking.name)}>STAKE {stakeHere}</div>}
            {!stakable && <div className="stake-here stake-here-closed"> STAKE {stakeHere}</div>}
            {!(staking && staking.deposited) && <div className="loading-qstake-top"><RotateCircleLoading color="#a0a0a0" size={'small'} ></RotateCircleLoading></div>}

            {staking && <div className="token-name">{staking.title}</div>
            }
            {staking.apy && <div className="apy">{parseFloat(staking.apy.toString()).toFixed(2)}% APY</div>}
            {staking.balancer && !isStaked && <div className="balancer-text">
                <div className="desc">In order to stake you need to  provide <br /> liquidity  to the following Balancer pool</div>
                <div className="perc">
                    <pre>{staking.info}</pre>
                </div>
            </div>}

            {stakable && !isStaked && <><ProvideButton staking={staking} isSand={isSand} /></>}

            {isStaked && <>
                {staking.pool && <div className="own-pool">you own {parseFloat(staking.pool.toString()).toFixed(2)}% {dollarPool ? "($" + dollarPool + ") " : ""}of the pool</div>}

                <div className="bottom-btns">
                    <div className="btns-wrap">
                        <div className="btns">

                            <div className="left-single disabled">{staking.claimable_amount ? getStayledNumber(staking.claimable_amount) : <div className="loading-qstake"></div>} {staking.claimable_unit} claimable</div>
                            <div className="right-single" onClick={handleClaim}>
                                <span>claim</span>
                            </div>
                        </div>
                    </div>
                    <div className="btns-wrap">
                        <div className="btns">
                            <div className="left-single disabled">{getStayledNumber(staking.deposited)} deposited</div>
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
