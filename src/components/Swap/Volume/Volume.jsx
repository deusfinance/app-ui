import React from 'react';
import Item from './Item';


const Volume = () => {
    const data = [
        {
            name: "Volume total",
            period: "24h",
            amount: "534.25",
            percent: "+12.6",
            classColor: "green"
        },
        {
            name: "DEUS",
            period: "24h",
            amount: "134.25",
            percent: "-3.6",
            classColor: "red"
        },
        {
            name: "DEA",
            period: "24h",
            amount: "69.25",
            percent: "-6.1",
            classColor: "red"
        },
    ]
    return (<div className="volume">
        <div className="top">
            <div className="title">DEUS SWAP Volume</div>
            <div className="close">close</div>
        </div>
        {data.map((item, i) => {
            return <Item key={i} isFirst={i === 0} {...item} />
        })}
    </div>);
}

export default Volume;