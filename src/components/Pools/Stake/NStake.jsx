import React, { Component } from 'react';
import ClaimButton from './ClaimButton';
import DepositButton from './DepositButton';
import ProvideButton from './ProvideButton';
class NStake extends Component {
    state = {}

    render() {
        const { token, handleStake } = this.props
        const isStaked = parseFloat(token.deposited) > 0 ? true : false
        const closedClass = isStaked ? "" : "closed"
        const stakeHere = isStaked ? "more" : "here"

        return (<>
            <div className={`stake-token-wrap ${closedClass}`}>
                <div className="stake-more" onClick={() => handleStake(token.name)}><p>stake <br /> {stakeHere}</p></div>
                <div className="token-name"> {"s" + token.title}</div>
                {/* <div className="sand-title">SandToken</div> */}
                <div className="apy">{token.apy}% APY</div>
                {isStaked && <>
                    <div className="black-line"></div>
                    <div className="own-pool">you own {token.pool}% ($4320.30) of the pool</div>
                    <DepositButton token={token} />
                    <ClaimButton token={token} />
                </>}

                {!isStaked && <>
                    <ProvideButton token={token} />
                </>}

            </div>
        </>);
    }
}

export default NStake;