import React from 'react';
import { getStayledNumber } from '../../utils/utils';
import { TokenType } from '../../config';
import { useTranslation } from 'react-i18next'
import './styles/stock-box.scss';

const StockBox = (props) => {

    const { type, estimated, handleSearchBox, handleTokenInputChange, token, isIPO, isLong } = props
    const { t} = useTranslation()

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

    const getBalance = () => {
        return token.type === TokenType.Wrapped ? isLong ? token.long?.balance : token.short?.balance : token.balance
    }

    return (<div className="token-box-wrap">
        <div className="token-box">
            <div className="top">
                  <p>{t(type) + estimated}</p>
                <div className="balance">
                    <span>{t("balance")}: </span>
                    {/* <span>{getStayledNumber(token.balance)}</span> */}
                    <span> {getStayledNumber(getBalance())}</span>
                </div>
            </div>
            <div className="bottom">
                <input type="number" className="input-amount"
                    value={token.amount}
                    onKeyPress={validate}
                    onChange={(e) => handleTokenInputChange(type, e.currentTarget.value)}
                    autoComplete="off" autoCorrect="off" placeholder="0.0" spellCheck="false" />
                {type === "from" && <div className="max-btn" onClick={() => handleTokenInputChange(type, getBalance())}>{t("max")}</div>}
                <div className={`token-info ${isIPO ? "token-ipo" : ""}`} onClick={() => handleSearchBox(true, type)} >
                    <img className="token-icon" src={process.env.PUBLIC_URL + `${token?.logo}`} alt={token ? token?.symbol : "logo"} />
                    <span className="token-name" >{token.type === TokenType.Wrapped ? token.conducted ? isLong ? token?.long_symbol : token?.short_symbol : token.symbol : token?.symbol}</span>
                    <img className="select-icon" src={process.env.PUBLIC_URL + "/img/select.svg"} alt="select" />
                </div>
            </div>
        </div>
    </div >);
}

export default StockBox;


