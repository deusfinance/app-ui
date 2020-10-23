import React, { Component } from 'react';
import './steps.scss'

class BuildRegistrar extends Component {
    state = {}
    render() {
        return (<>

            <div className="conductr-wrap">
                <div className="bg-conductr-wrap">
                    <div className="bg-conductr ">
                        <div className="bg-left">
                            <img className="" src={process.env.PUBLIC_URL + "/img/right-conductr.svg"} alt="" />
                        </div>
                        <div className="bg-right">
                            <img className="" src={process.env.PUBLIC_URL + "/img/right-conductr.svg"} alt="" />
                        </div>
                    </div>

                    <div className="container">
                        <div className="build-wrap">
                            <div className="decription">
                                <div className="step-number">step 1</div>
                                <div className="step-title">Build your registrar</div>
                                <div className="step-info">
                                    <pre>{`
Use the search bar to find desired assets that you want to mirror.

You can select currently two different assets.


In the v0.1 Pilot we are offering
- TSLA
- QQQ
- inverted TSLA
- inverted QQQ


500 + more will be added in december
                                    `}
                                    </pre>
                                </div>
                                <div className="bar-wrap">
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
                                </div>
                            </div>
                            <div className="tools"></div>
                        </div>
                    </div>

                </div>
            </div>

        </>);
    }
}

export default BuildRegistrar;