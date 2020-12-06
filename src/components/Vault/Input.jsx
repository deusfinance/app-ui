import React from 'react';


const InputBox = ({ token, amount, title, max, tokenTitle, svg, handleChange }) => {

    return (<div className="lock-input ">
        <div className="input-top">
            <p>{title}</p>
            <p>
                Balance: <span>{token.balance}</span>
            </p>
        </div>
        <div className="input-bottom">
            <input type="number" placeholder="0.0" value={amount} onChange={(e) => handleChange(e.currentTarget.value)} />
            {max && <div className="max-btn" onClick={() => handleChange(token.balance)}>max</div>}
            {svg}
            <div className="token-name">{tokenTitle ? tokenTitle : token.title}</div>
        </div>
    </div>);
}

export default InputBox;