import React from 'react';
import { getStayledNumber } from '../../utils/utils';
import { TokenType } from '../../config';



const StockBox = (props) => {

    const { type, estimated, handleSearchBox, handleTokenInputChange, token, isIPO } = props

    console.log(token);

    const validate = (e) => {
        var ev = e || window.event;
        var key = ev.keyCode || ev.which;
        key = String.fromCharCode(key);
        var regex = /[0-9\\.]/;
        if (!regex.test(key)) {
            ev.returnValue = false;
            if (ev.preventDefault) ev.preventDefault();
        }
    }

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
                    onKeyPress={validate}
                    onChange={(e) => handleTokenInputChange(type, e.currentTarget.value)}
                    autoComplete="off" autoCorrect="off" placeholder="0.0" spellCheck="false" />
                {type === "from" && <div className="max-btn" onClick={() => handleTokenInputChange(type, token.balance)}>MAX</div>}
                <div className={`token-info ${isIPO ? "token-ipo" : ""}`} onClick={() => handleSearchBox(true, type)} >
                    <img className="token-icon" src={process.env.PUBLIC_URL + `${token?.logo}`} alt={token?.symbol} />
                    <span className="token-name" >{token.type === TokenType.Wrapped && "w" + token?.symbol.toUpperCase()}</span>
                    <img className="select-icon" src={process.env.PUBLIC_URL + "/img/select.svg"} alt="select" />
                </div>
            </div>
        </div>
    </div >);
}

export default StockBox;


