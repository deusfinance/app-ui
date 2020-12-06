import React, { Component } from 'react';

class UnStake extends Component {
    state = {}
    render() {
        const { token } = this.props

        return (<div className="container">
            <div className="stake-more-wrap">
                <div className="stake-more">stake</div>
            </div>
            <div className="content">


                <div className="title">{token.title}</div>
                <div className="apy">{token.apy}% APY</div>


                <div className="desciption">

                    <pre>
                        {`

In order to stake you need to provide
liquidity to the following Balancer pool


50% DEA 
25% sUNI-LP-DEUS-DEA 
15% sDEUS 
10% sUNI-LP-DEA-USDC 
                        `}
                    </pre>

                    <pre className="cant">
                        {`You can't deposit tokens directly you need
to lock them in vaults to get the sand token
sDEUS-DEA
sDEA-USDC`}
                    </pre>
                </div>

                <div className="grad-wrap provide-wrap">
                    <div className=" grad">
                        <div>
                            provide Liquidity
                                        </div>

                        <svg width={29} height={18} viewBox="0 0 29 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M20.3625 10.459C25.4502 11.0104 29 12.2576 29 13.7078C29 15.669 22.5081 17.2589 14.5 17.2589C6.49187 17.2589 0 15.669 0 13.7078C0 12.2576 3.54976 11.0104 8.63746 10.459C10.3849 10.7194 12.3807 10.867 14.5 10.867C16.5661 10.867 18.5148 10.7268 20.2307 10.4785L20.3625 10.459Z" fill="white" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M18.1697 4.61914C22.7776 4.99519 26.0999 6.06003 26.0999 7.3149C26.0999 8.88386 20.9064 10.1558 14.4999 10.1558C8.0934 10.1558 2.8999 8.88386 2.8999 7.3149C2.8999 6.06003 6.22216 4.99519 10.8301 4.61914C11.9588 4.75442 13.1987 4.82915 14.4999 4.82915C15.7556 4.82915 16.9542 4.75955 18.0508 4.63316L18.1697 4.61914Z" fill="white" />
                            <path d="M14.5003 4.26128C19.3052 4.26128 23.2003 3.30736 23.2003 2.13064C23.2003 0.953921 19.3052 0 14.5003 0C9.69542 0 5.80029 0.953921 5.80029 2.13064C5.80029 3.30736 9.69542 4.26128 14.5003 4.26128Z" fill="white" />
                        </svg>


                    </div>
                </div>
            </div>
        </div>);
    }
}

export default UnStake;