import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Conduct extends Component {
    state = {
        query: "",
    }

    render() {
        const { added } = this.props
        const nextClass = added.length > 0 ? "" : "disabledButton"

        return (<div className="search-step" style={{ position: "relative", height: "calc(100% - 40px)", }}>
            <div className="note">
                {`Note: for pilot puroses we’re only supporting tsla +/- and qqqq +/-`}
            </div>
            { <div className="addbox-wrap">
                <div className={`addbox-output over-flow-y-auto`}>
                    <div className="name-asset">rTSLA</div>

                    <div className="allocation">
                        <div className="main-allocation">
                            <div className="top">
                                <p>assets</p>
                                <p>allocation</p>
                            </div>
                            <div className="allocation-list">
                                {/*                         <div className="allocation-item">
                                    <div className="name">tsel</div>
                                    <div className="name">50%</div>
                                </div> */}
                                {
                                    added.map((tk, key) => {
                                        return <div key={key} className="allocation-item">
                                            <div className="name">{tk.name}</div>
                                            <div className="name">{tk.allocation}%</div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </div>


                    <div className="btns-wrap" style={{ left: 0, right: 0 }}>
                        <div className="conduct-btn-wrap grad-wrap">
                            <Link to="/conductr/build" className="conduct-btn grad">conduct Registrar</Link>
                        </div>
                    </div>
                </div>
            </div>}

            <div className="prev-btn-wrap ">
                <Link to="/conductr/build/timelock" className={`prev-btn`} >
                    <svg width="15" height="10" viewBox="0 0 15 10" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.61306 5.81633L5.46799 8.57743C5.99778 9.08763 5.64459 10 4.90878 10L4.90289 10C4.69098 10 4.48495 9.91597 4.33191 9.7599L0.240814 5.58223C-0.0770552 5.2581 -0.0770552 4.73589 0.240814 4.41777L4.33779 0.240096C4.49084 0.0840332 4.69687 -4.30472e-07 4.90878 -4.21209e-07C5.6387 -3.89303e-07 5.99778 0.912365 5.46211 1.42257L2.61306 4.17767L13.7326 4.15366C14.18 4.15366 14.5449 4.52581 14.5449 4.98199L14.5449 5.01201C14.5449 5.46819 14.18 5.83433 13.7326 5.83433L2.61306 5.81633Z" fill="white" />
                    </svg>
                    <p>Previous</p>
                </Link>
            </div>

        </div>);
    }
}

export default Conduct;