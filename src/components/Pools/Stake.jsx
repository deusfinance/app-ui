import React, { Component } from 'react'
import CountUp from 'react-countup';

class Stake extends Component {
    render() {
        const { token, shadowClass, handlePopup, handleClaim, handleWithdraw } = this.props
        const { name, amounts, liqLink } = token
        const isStaked = parseFloat(amounts.lp) > 0 ? true : false
        const isSingle = name.indexOf("_") == -1 ? true : false
        const provideWrapClasses = isSingle ? "single-asset-wrap" : "provide-liquidity-wrap"
        const stakedClass = isStaked ? "staked" : ""
        const shadowClasses = shadowClass ? shadowClass : "blue-200-shadow"
        const stakedText = isStaked ? "more" : "here"
        return (<div className={`triangle-wrap  ${shadowClasses}`}>
            <div className={`triangle ${stakedClass}`}>
                <div className="stake-here" onClick={() => handlePopup(name, true)}>Stake <br /> {stakedText}</div>
                <div className="title">{name.toUpperCase().replace("_", "-")} </div>
                <div className="apy"> {amounts.apy}% APY</div>
                {!isStaked && <div className={provideWrapClasses}>
                    {isSingle && <div className="single-asset" >single asset pool</div>}
                    {!isSingle && <a className="provide-liquidity" href={liqLink} target="_blank" rel="noopener noreferrer">provide Liquidity</a>}
                </div>
                }
                {isStaked &&
                    <div className="boxes">
                        <div className="box percentage">
                            <div className="box-title-wrap">
                                <div className="box-title">you own {token.amounts.pool}% <br /> of the pool</div>
                            </div>
                            <a className="box-btn" href={liqLink} target="_blank" rel="noopener noreferrer">provide more</a>
                        </div>
                        <div className="box">
                            <div className="box-title-wrap">
                                <div className="box-title">
                                    {token.amounts.newdea === "0" ? "0 " :
                                        <CountUp
                                            start={parseFloat(token.amounts.dea)}
                                            end={parseFloat(token.amounts.newdea)}
                                            delay={0}
                                            duration={2}
                                            decimals={6}
                                        >
                                            {({ countUpRef }) => (
                                                <span ref={countUpRef} />
                                            )}
                                        </CountUp>}DEA claimable</div>
                            </div>
                            <div className="box-btn" onClick={() => handleClaim(name)}>
                                claim DEA</div>
                        </div>
                        <div className="box">
                            <div className="box-title-wrap" >
                                <div className="box-title">
                                    {amounts.lp} Lp tokens deposited</div>
                            </div>
                            <div className="box-btn" onClick={() => handleWithdraw(name, amounts.lp)}>
                                withdraw &amp; claim
                                </div>
                        </div>
                    </div>}
            </div>
        </div >);
    }
}


export default Stake;