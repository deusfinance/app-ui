import React from 'react';

import './styles/tutorial.scss';

const Tutorial = () => {
    const steps = [
        {
            title: "get xDAI",
            actions: "Bridge DAI to xDAI",
            onClick: () => console.log("clicked"),
            description: "Swap your DAI to xDAI to use it on the xDAI L2 chain to buy and trade stocks. xDAI allows you to trade stocks with near to none GAS fees (payed in xDAI – no need to bridge any ETH)"
        },
        {
            title: "add Network",
            actions: "Add xDAI to MetaMask",
            onClick: () => console.log("clicked"),
            description: "Just click the button and the network will be automatically added to your MetaMask — as easy as that."
        },
        {
            title: "swap Network",
            actions: "Change MetaMask network to xDAI",
            onClick: () => console.log("clicked"),
            description: "Swap your DAI to xDAI to use it on the xDAI L2 chain to buy and trade stocks. xDAI allows you to trade stocks with near to none GAS fees (payed in xDAI – no need to bridge any ETH)"
        },

    ]
    return (<div className="tutorial-wrap">
        <p>STEP BY STEP GUIDE</p>
        <p>GET READY TO TRADE STOCKS ON L2</p>
        <div className="steps">
            {
                steps.map((step, index) => {
                    return (
                        <div className="step-content" key={index}>
                            <div className="step">
                                <div className="number">{index + 1}</div>
                                <div className="title">{step.title}
                                    <span className="passed">
                                        <img src={process.env.PUBLIC_URL + "/img/bridge/passed.svg"} alt="passed" />
                                    </span>
                                </div>
                                <div className="actions">
                                    <div className="grad-wrap" onClick={step.onClick}>
                                        <div className="igrad">
                                            {step.actions}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="decription">

                                {step.description}
                            </div>
                        </div>)
                })
            }

        </div>
    </div>);
}

export default Tutorial;