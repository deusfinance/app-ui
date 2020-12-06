import React, { Component } from 'react';
import { balancerTokens } from '../../../config';
import "../staking.scss"
import TopNotif from '../TopNotif';
import Stake from './Stake';
import UnStake from './UnStake';

class BalancerPool extends Component {
    state = {}

    constructor(props) {
        super(props);
        // create a ref to store the textInput DOM element
        this.scrollRef = React.createRef();
    }

    componentDidMount() {
        this.handleScroller()
    }

    isStaked = (token) => {
        return token.deposited !== 0 && token.deposited !== "0"
    }

    handleScroller = () => {
        const width = (1900 - window.innerWidth) / 2
        if (this.scrollRef.current) {
            console.log(window.innerWidth);
            this.scrollRef.current.scrollLeft = width
        }
    }

    render() {

        return (<div className="staking-wrap" >

            <TopNotif typeID={1} />

            <div className="balancer-wrap" ref={this.scrollRef} onClick={this.handleScroller}>
                <div className="balancer" >
                    <div className="left-balancer">
                        {this.isStaked(balancerTokens.native) ? <Stake token={balancerTokens.native} /> : <UnStake token={balancerTokens.native} />}
                    </div>

                    <div className="right-balancer">
                        {this.isStaked(balancerTokens.legacy) ? <Stake token={balancerTokens.legacy} /> : <UnStake token={balancerTokens.legacy} />}
                    </div>
                </div>
            </div>
        </div >);
    }
}

export default BalancerPool;