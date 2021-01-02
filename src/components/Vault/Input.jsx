import React from 'react';
import { getStayledNumber } from '../../utils/utils';


const InputBox = ({ token, amount, title, max, tokenTitle, svg, handleChange, disabled }) => {

    return (<div className="lock-input ">
        <div className="input-top">
            <p>{title}</p>
            <p>
                Balance: <span>{getStayledNumber(token.balance ? token.balance : 0, 11)}</span>
            </p>
        </div>
        <div className="input-bottom">
            <input type="number" placeholder="0.0" value={getStayledNumber(amount, 11)} onChange={(e) => handleChange(e.currentTarget.value)} disabled={disabled} />
            {max && <div className="max-btn" onClick={() => handleChange(token.balance)}>max</div>}
            {svg}
            <div className="token-name">{token.title}</div>
        </div>
    </div>);
}

export default InputBox;