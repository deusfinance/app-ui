import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TimeLock extends Component {
    state = {
        plans: [
            { id: 1, name: "3 Months", },
            {
                id: 2, name: "6 Months", text: `
                `
            },
            { id: 3, name: "12 Months" },
            { id: 4, name: "infinit", }
        ],
        activePlane: 2
    }

    handleActive = (plan) => {
        console.log("disabled");
        // this.setState({ activePlane: plan.id })
    }

    render() {
        const { added } = this.props
        const { plans, activePlane } = this.state
        const nextClass = activePlane ? "" : "disabledButton"
        console.log(added);
        return (<div className="search-step" style={{ position: "relative", height: "calc(100% - 40px)", }}>
            <div className="note">
                {`Note: for pilot puroses we’re only supporting tsla +/- and qqqq +/-`}
            </div>
            { <div className="addbox-wrap">
                <div className={`addbox-output over-flow-y-auto`}>
                    <div className="name-asset">rTSLA</div>
                    <div className="timelock">
                        <div className="title">
                            <p>CHOOSE TIME LOCK</p>
                            <img src={process.env.PUBLIC_URL + "/img/lock.svg"} />
                        </div>
                        <div className="plans">
                            {
                                plans.map((p, key) => {
                                    const activeClass = activePlane && p.id === activePlane ? "active" : ""
                                    return <div key={key}
                                        className={`grad-wrap plan-wrap  ${activeClass}`}
                                        onClick={() => this.handleActive(p)} >
                                        <div className=" plan">

                                            <svg width={22} height={30} viewBox="0 0 24 30" fill="none" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <g filter="url(#filter0_d)">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M6.19888 8.79972V5.50014C6.19888 2.4625 8.66138 0 11.699 0C14.7367 0 17.1992 2.4625 17.1992 5.50014V8.79972H17.4753C18.5037 8.79972 19.4004 9.65375 19.4004 10.8164V19.9833C19.4004 21.146 18.5037 22.0001 17.4753 22.0001H5.92505C4.89673 22.0001 4 21.146 4 19.9833V10.8164C4 9.65375 4.89673 8.79972 5.92505 8.79972H6.19888ZM14.9991 8.79972V5.50014C14.9991 3.67755 13.5216 2.20006 11.699 2.20006C9.87643 2.20006 8.39893 3.67755 8.39893 5.50014V8.79972H14.9991Z" fill="white" />
                                                </g>
                                                <defs>
                                                    <filter id="filter0_d" x={0} y={0} width="23.4004" height="30.0001" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                        <feFlood floodOpacity={0} result="BackgroundImageFix" />
                                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                                        <feOffset dy={4} />
                                                        <feGaussianBlur stdDeviation={2} />
                                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                                                    </filter>
                                                </defs>
                                            </svg>

                                            <div className="amount">{p.name}</div>
                                            <div className="desc">

                                                After three months your provided ETH is going to be claimable if you burn your minted rTSLAQQQ token.
                                            </div>
                                            <div className="expire-time">
                                                rT SLAQQQ will expire on 01.28.2020 @ 10:49PM GMT
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>}

            <div className="next-btn-wrap grad-wrap">
                {activePlane ? <Link to="/conductr/conduct" className={`next-btn grad ${nextClass}`} >
                    Next
        </Link> : <div className="disabledButton grad">Next</div>}
            </div>

        </div>);
    }
}

export default TimeLock;