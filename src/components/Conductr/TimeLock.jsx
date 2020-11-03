import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TimeLock extends Component {
    state = {
        query: "",
    }

    render() {
        const { added, handleRemove } = this.props
        const nextClass = added.length > 0 ? "" : "disabledButton"

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
                            <div className="grad-wrap plan-wrap ">
                                <div className="plan">
                                    <img src={process.env.PUBLIC_URL + "/img/lock.svg"} />
                                    <div className="amount">3 Months</div>
                                    <div className="desc">After three months your provided ETH is goig to be claimable
                                    if you burn your minted rTSLAQQQ token.
                                    </div>
                                    <div className="expire-time">
                                        rT SLAQQQ will expire on 01.28.2020 @ 10:49PM GMT
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}

            <div className="next-btn-wrap grad-wrap">
                {added.length > 0 ? <Link to="/conductr/build/timelock" className={`next-btn grad ${nextClass}`} >
                    Next
                    </Link> : <div className="disabledButton grad">Next</div>}
            </div>

        </div>);
    }
}

export default TimeLock;