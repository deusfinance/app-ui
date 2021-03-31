import React from 'react';
import { getStayledNumber } from '../../../utils/utils';
import { WaveLoading, RotateCircleLoading } from 'react-loadingg';
import { Link } from 'react-router-dom';

const QStake = ({ staking, deposited, handleStakePopup, dollarPool, handleClaim, handleWithdrawPopup }) => {

    const { claimable_unit, claimable_amount } = staking
    const isStaked = staking ? parseFloat(deposited) > 0 ? true : false : false
    const closedClass = isStaked ? "" : "closed "
    const stakeHere = isStaked ? "more" : "here"

    const balanceClass = staking ? staking.balancer ? "balancer " : "" : ""
    const canStakeClass = !staking.isClose && staking.balance > 1 ? "can-stake" : ""
    let stakeClasses = "single-wrap " + closedClass + balanceClass
    const onlyMainClasses = staking && staking.onlyMain ? "only-main" : ""
    const claimAmount = claimable_amount ? getStayledNumber(claimable_amount) + " " + (claimable_unit ? claimable_unit : "DEA") + " claimable" : null


    return (staking && <div className={`${onlyMainClasses} ${stakeClasses}   ${canStakeClass}`}>
        {staking && staking.onlyMain && <img className="img-only-main" src={process.env.PUBLIC_URL + "/img/only-main.svg"} alt="" />}
        <div className="single">
            {/* {!staking.isClose && <div className="stake-here" onClick={() => handleStakePopup(staking.name)}>STAKE {stakeHere}</div>} */}
            {!staking.isClose && <div className="stakes-btns">

                <div className="grad-wrap stake-here-wrap" >
                    <div className=" grad stake-here" >
                        {staking.innerLink ? <Link to={staking.provideLink}>
                            <span>buy  {stakeHere}</span>
                            {/* <img src={process.env.PUBLIC_URL + "/img/staking/swap.svg"} alt="vaults" /> */}
                        </Link>
                            : <a className=" grad stake-here" href={staking.liqLink} target="_blank" rel="noopener noreferrer">provide {isStaked ? "more" : "Liquidity"}</a>}
                    </div>
                </div>
                <div className="grad-wrap stake-here-wrap" >

                    {!deposited && deposited !== 0
                        ? <div className="stake-here stake-here-closed" >STAKE {stakeHere}</div>
                        : <div className="stake-here" onClick={() => handleStakePopup(staking.name)}>STAKE {stakeHere}</div>}


                </div></div>}
            {staking.isClose && <div className="grad-wrap stake-here-wrap" ><div className="stake-here stake-here-closed"> STAKE {stakeHere}</div></div>}
            {!deposited && deposited !== 0 && <div className="loading-qstake-top"><RotateCircleLoading color="#a0a0a0" size={'small'} ></RotateCircleLoading></div>}

            {staking && <div className="token-name">{staking.title}</div>
            }
            {staking.apy && <div className="apy">{parseFloat(staking.apy.toString()).toFixed(2)}% APY</div>}
            {staking.balancer && !isStaked && <div className="balancer-text">
                <div className="desc">In order to stake you need to  provide <br /> liquidity  to the following Balancer pool</div>
                <div className="perc">
                    <pre>{staking.info}</pre>
                </div>
            </div>}

            {/* {!staking.isClose && !isStaked && <><ProvideButton staking={staking} isSand={isSand} /></>} */}

            {isStaked && <>
                {staking.pool && <div className="own-pool">you own {parseFloat(staking.pool.toString()).toFixed(2)}% {dollarPool ? "($" + dollarPool + ") " : ""}of the pool</div>}

                <div className="bottom-btns">
                    <div className="btns-wrap">
                        <div className="btns">

                            <div className="left-single disabled" style={{ position: "relative" }}>{claimAmount ? claimAmount :
                                <div className="loading-qstake"><WaveLoading color="#a0a0a0" size={'small'} ></WaveLoading></div>} </div>
                            <div className="right-single" onClick={() => handleClaim(0)}>
                                <span>claim</span>
                            </div>
                        </div>
                    </div>
                    <div className="btns-wrap">
                        <div className="btns">
                            <div className="left-single disabled">{getStayledNumber(deposited)} deposited</div>
                            <div className="right-single" onClick={() => handleWithdrawPopup(staking.name)}>
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
