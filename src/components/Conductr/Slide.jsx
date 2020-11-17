import React, { Component } from 'react';
class Slide extends Component {
    state = {}
    render() {
        const { isFocus } = this.props

        return (<div className="decription">
            <div className="step-number">step 1</div>
            <div className="step-title">Build your registrar</div>
            <div className="step-info">
                {!isFocus && <pre>{`
Use the search bar to find desired assets that you want to mirror.

You can select currently four different assets.


In the v0.1 Pilot we are offering
- TSLA
- QQQ
- inverted TSLA
- inverted QQQ


500+ assets and 250,000+ combinations will be available in Q4 2020 - Q1 2021
                                    `}
                </pre>}
                {isFocus && <pre>{`
Use the search bar to find desired assets that you want to mirror to conduct your personalised registrar. 

You can select as many different assets as you wish and change their allocation.
                                    `}
                </pre>}
            </div>
            {/* <div className="bar-wrap">
                <div className="bar-chart-wrap">
                    <div className="bar-chart-light">
                        ${"37,083"}
                    </div>
                    <div className="bar-chart-black"></div>
                </div>
                <div className="bar-text">
                    <div className="title">current :</div>
                    <div className="title">hardcap :  ${"150,000"}</div>
                </div>
            </div> */}
        </div>);
    }
}

export default Slide;