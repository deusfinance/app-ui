import React, { Component } from 'react';
import { getStayledNumber } from '../../utils/utils';


class TokenBox extends Component {
    state = {}

    handleMax = () => {
        const { token } = this.props
        token.amount = token.balance
        console.log(token);
    }

    validate = (e) => {
        var ev = e || window.event;
        var key = ev.keyCode || ev.which;
        key = String.fromCharCode(key);
        var regex = /[0-9\\.]/;
        if (!regex.test(key)) {
            ev.returnValue = false;
            if (ev.preventDefault) ev.preventDefault();
        }
    }


    render() {
        const { type, estimated, handleSearchBox, handleTokenInputChange, token, isIPO } = this.props
        return (<div className="token-box-wrap">
            <div className="token-box">
                <div className="top">
                    <p>{type.charAt(0).toUpperCase() + type.slice(1) + estimated}</p>
                    <div className="balance">
                        <span>Balance: </span>
                        <span>{getStayledNumber(token.balance)}</span>
                    </div>
                </div>
                <div className="bottom">
                    <input type="number" className="input-amount"
                        value={token.amount}
                        onKeyPress={this.validate}
                        onChange={(e) => handleTokenInputChange(type, e.currentTarget.value)}
                        autoComplete="off" autoCorrect="off" placeholder="0.0" spellCheck="false" />
                    {type === "from" && <div className="max-btn" onClick={() => handleTokenInputChange(type, token.balance)}>MAX</div>}
                    <div className={`token-info ${isIPO ? "token-ipo" : ""}`} onClick={() => handleSearchBox(true, type)} >
                        <img className="token-icon" src={process.env.PUBLIC_URL + `/tokens/${token.pic_name}`} alt={token.title} />
                        <span className="token-name" style={{ textTransform: "uppercase" }}>{token.title}</span>
                        {token.isFutures && <img className="futures" src={process.env.PUBLIC_URL + "/img/futures.svg"} alt="futures" />}
                        {token.isBakkt && <img className="futures" src={process.env.PUBLIC_URL + "/img/SPAC.png"} alt="spac" />}
                        {!isIPO && <img className="select-icon" src={process.env.PUBLIC_URL + "/img/select.svg"} alt="select" />}
                    </div>
                </div>
            </div>
        </div >);
    }
}

export default TokenBox;
