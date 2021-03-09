import React, { useState } from 'react';

import './styles/tutorial.scss';
import { useWeb3React } from '@web3-react/core';
import { addRPC } from '../../services/addRPC'

const Tutorial = () => {
    const [currStep, setCurrStep] = useState(1)
    const { account } = useWeb3React()
    const steps = [
        {
            title: "get xDAI",
            actions: "Bridge DAI to xDAI",
            link: "https://bridge.xdaichain.com/",
            onClick: () => console.log("clicked"),
            description: "Swap your DAI to xDAI to use it on the xDAI L2 chain to buy and trade stocks. xDAI allows you to trade stocks with near to none GAS fees (payed in xDAI – no need to bridge any ETH)"
        },
        {
            title: "add Network",
            actions: "Add xDAI to MetaMask",
            onClick: () => addRPC(account),
            description: "A tutorial on how to add the xDAI network to your metamask written by the xDAI Team.If you need any help setting up your network don't hesitate contacting one of our admins in our communities on Telegram / Discord"
        },
    ]

    return (<div className="tutorial-wrap">
        <p>STEP BY STEP GUIDE</p>
        <p>GET READY TO TRADE STOCKS ON L2</p>
        <p>Synchronizer is ready for xDAI,<br />
            follow the tutorial for the full DEUS experience</p>
        <div className="steps">
            {

                steps.map((step, index) => {
                    const step_number = index + 1
                    const isActive = (currStep === step_number) ? true : false
                    return (
                        <div className="step-content" key={index} style={{ opacity: isActive ? "1" : "0.15" }}>
                            <div className="step">
                                <div className="number">{index + 1}</div>
                                <div className="title">{step.title}
                                    {currStep > step_number && <span className="passed">
                                        <img src={process.env.PUBLIC_URL + "/img/bridge/passed.svg"} alt="passed" />
                                    </span>}
                                </div>
                                <div className="actions">
                                    {isActive ?
                                        <a href={step.link} target="_blank" className="xdai-button" onClick={step.onClick}>
                                            <div className="igrad">
                                                {step.actions}
                                            </div>
                                        </a> :
                                        <div className="grad-wrap" >
                                            <div className="igrad">
                                                {step.actions}
                                            </div>
                                        </div>}
                                </div>
                            </div>
                            {(step_number === currStep) && <div className="decription">
                                {step.description}
                            </div>}
                            {/* {  step_number === steps.length && <div className="success-msg">
                                <div>
                                    Success we detected a network change.
                                You will automatically* be re-directed to the Synchronizer.</div>

                                <div>*Note if this takes a while please just click close tutotial below</div>
                            </div>} */}
                        </div>)
                })
            }

        </div>

        <div className="close-wrap">
            <div className="next" onClick={() => setCurrStep(currStep - 1)} style={{ left: "10px", right: "unset", opacity: currStep - 1 < 1 ? "0" : "1" }}>
                <div className="arrow" >{`←`}</div>
                <div>PREV</div>
            </div>
            <div className="close"><a style={{ color: "#ffffff" }} href="/crosschain/xdai/synchronizer">CLOSE TUTORIAL</a></div>
            <div className="next" onClick={() => setCurrStep(currStep + 1)} style={{ opacity: currStep + 1 > steps.length ? "0" : "1" }}>
                <div>NEXT</div>
                <div className="arrow" >{`→`}</div>
            </div>
        </div>

    </div>);
}

export default Tutorial;