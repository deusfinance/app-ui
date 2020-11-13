import React, { Component } from 'react';
import './vaults.scss'

class Vault extends Component {
    state = {}
    render() {
        return (<div className="vaults-wrap">
            <div className="top-buttons">
                <div className="grad-wrap explain-wrap">
                    <div className="grad explain">Vaults Explainantion</div>
                </div>
                <div className="grad-wrap beta-wrap">
                    <div className="grad beta">DEUS is still in BETA (codes not audited)</div>
                </div>
            </div>
            <div className="gonbad">
                <div className="title">DEUS-DEA <br /> Vault</div>
                <div className="estimaited">Estimated yearly growth:</div>
                <div className="percent">230%</div>
                <div className="gonab-btns">
                    <div className="grad-wrap lock-wrap ">
                        <div className="grad">Lock your UNI-LP tokens</div>
                    </div>
                    <div className="grad-wrap get-wrap">
                        <div className="grad">Get UNI-LP tokens</div>
                    </div>
                </div>
            </div>
            <div className="doors">
                <div className=" open-door door"></div>
                <div className="close-door door"></div>
                <div className="open-door door"></div>
            </div>
        </div>);
    }
}

export default Vault;