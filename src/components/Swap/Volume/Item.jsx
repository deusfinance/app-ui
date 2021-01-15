import React from 'react';

const Item = (props) => {
    return (<div className={`item ${props?.isFirst ? "" : "has-border"}`}>
        <div className="token-name">{props.name} <span className="period">{props.period}</span> </div>
        <div className="amount">${props.amount} <span className={`percent ${props.classColor}`}>{props.percent}%</span></div>
    </div>);
}

export default Item;