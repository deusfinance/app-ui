import React, { Component } from 'react';
import { CircleToBlockLoading } from 'react-loadingg';


class Swap extends Component {
    state = {}

    validate = (e) => {
        var ev = e || window.event;
        var key = ev.keyCode || ev.which;
        key = String.fromCharCode(key);
        var regex = /[0-9\.]/;
        if (!regex.test(key)) {
            ev.returnValue = false;
            if (ev.preventDefault) ev.preventDefault();
        }
    }

    render() {

        const { tokens, swap, handleTokenInputChange, handleMax, isBuy, switchOrder, perDeus, handleSwap, SwapState, showPopup, handleApproveSell } = this.props
        const { from, to } = swap
        const fromToken = <div className="tokenbox">
            <div className="balance">Balance: <span>{tokens[from.name].balance}</span> </div>
            <div className="fields">
                <input id="from-coin" type="number" onKeyPress={this.validate} placeholder="0.0" value={from.amount} onChange={(e) => handleTokenInputChange("from", e.currentTarget.value)} />
                {isBuy && <div className="max-btn " onClick={() => handleMax("from", tokens[from.name].balance)}>max</div>}
                <div className="selected-coin">
                    <img className="coin-icon" src="img/coins/eth.svg" alt="eth" />
                    <div className="name-coin" >ETH</div>
                </div>
            </div>
        </div>

        const toToken = <div className="tokenbox">
            <div className="balance" style={{ backgroundColor: '#684e7c' }}>Balance: <span>{tokens[to.name].balance}</span> </div>
            <div className="fields">
                <input id="to-coin" type="number" onKeyPress={this.validate} placeholder="0.0" value={to.amount} onChange={(e) => handleTokenInputChange("to", e.currentTarget.value)} />
                {!isBuy && <div className="max-btn " onClick={() => handleMax("to", tokens[to.name].balance)}>max</div>}
                <div className="selected-coin">
                    <img className="deus-icon " src="img/Logo.png" alt="logo" />
                    <div className="deus-coin">DEUS</div>
                </div>
            </div>
        </div>



        return (<div className="swap-wrapper">
            {/*   {showPopup && <div className="sell-popup-mob" >
                <div className="ptitle">Important Notice:</div>
                <div className="pdetails"> TWO transactions will need your approval </div>
                <div className="pdetails-steps"> 1. Selling DEUS to ETH. <br /> 2. Withdrawing ETH to your Wallet. </div>
                <div className="btn-wrp">
                    <div className="understood" onClick={handleApproveSell}>  Roger that, Lafa!</div>
                </div>
            </div>} */}
            {isBuy ? fromToken : toToken}
            <img src="img/mask-arrow.svg" className="mask-arrow" alt="arrow" onClick={switchOrder} style={{ cursor: "pointer" }} />
            {isBuy ? toToken : fromToken}
            <div className="price-wrapper">
                <p>Price</p>
                <div className="perDeus">
                    <div className="dollarPerDeus">{perDeus && parseFloat(perDeus).toFixed(4)} ETH per DEUS</div>
                    <img src="img/perDeus.svg" onClick={switchOrder} style={{ marginRight: "5px", width: "23px", cursor: "pointer" }} />
                </div>
            </div>
            <div className="swap-btn" onClick={handleSwap}  >{SwapState ? <CircleToBlockLoading color="#371f43" size={'small'} ></CircleToBlockLoading> : "Swap"}</div>
        </div>);
    }
}

export default Swap;



