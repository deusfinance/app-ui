import React from 'react';
import { getStayledNumber } from '../../utils/utils';

import './styles/token-box.scss'

const TokenBox = ({ type, estimated, handleSearchBox, handleTokenInputChange, token }) => {

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
                    <span>{getStayledNumber(token?.balance)}</span>
                </div>
            </div>
            <div className="bottom">
                <input type="number" className="input-amount"
                    value={token?.amount}
                    onKeyPress={validate}
                    onChange={(e) => handleTokenInputChange(type, e.currentTarget.value)}
                    autoComplete="off" autoCorrect="off" placeholder="0.0" spellCheck="false" />
                {type === "from" && <div className="max-btn" onClick={() => handleTokenInputChange(type, token?.balance)}>MAX</div>}
                <div className={`token-info`} onClick={() => handleSearchBox(true, type)} >
                    <img className="token-icon" src={process.env.PUBLIC_URL + `/tokens/${token?.pic_name}`} alt={token?.title} />
                    <span className="token-name" >{token?.title}</span>
                    <img className="select-icon" src={process.env.PUBLIC_URL + "/img/select.svg"} alt="select" />
                </div>
            </div>
        </div>
    </div >);
}

export default TokenBox;
