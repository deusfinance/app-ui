import React, { Component } from 'react';
import ProvideButton from './ProvideButton';


class QStake extends Component {
    state = {}

    render() {
        const { token, stakable, handleStake, dollarPool, isSand } = this.props
        const isStaked = parseFloat(token.deposited) > 0 ? true : false
        const closedClass = isStaked ? "" : "closed "
        const stakeHere = isStaked ? "more" : "here"
        const balanceClass = token.balancer ? "balancer " : ""
        let stakeClasses = "single-wrap " + closedClass + balanceClass

        return (<div className={`${stakeClasses}`}>
            <div className="single">
                {stakable && <div className="stake-here" onClick={() => handleStake(token.name)}>
                    STAKE {stakeHere}
                </div>}
                {!stakable && <div className="stake-here stake-here-closed"> STAKE {stakeHere}</div>}

                <div className="token-name">{isSand ? "s" : ""}{token.title}</div>
                {/* <div className="token-title">SandToken</div> */}
                {token.apy && <div className="apy">{parseFloat(token.apy.toString()).toFixed(2)}% APY</div>}

                {token.balancer && <div className="balancer-text">
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
                    <div className="own-pool">you own {token.pool}% {dollarPool ? "($" + dollarPool + ") " : ""}of the pool</div>

                    <div className="bottom-btns">
                        <div className="btns-wrap">
                            <div className="btns">

                                <div className="left-single disabled">{token.claimable_amount} {token.claimable_unit} claimable</div>
                                <div className="right-single">
                                    <span>claim</span>
                                </div>
                            </div>
                        </div>
                        <div className="btns-wrap">
                            <div className="btns">
                                <div className="left-single disabled">{token.deposited} deposited</div>
                                <div className="right-single">
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
        </div>)
    }
}

export default QStake;