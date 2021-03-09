import React from 'react';
import { useEffect, useState } from 'react';

const PriceBox = ({ impact }) => {
    const absImpact = Math.abs(impact)


    return (<div className="price-box">
        <div >
            <p>Price Impact</p>
            <p>{absImpact < 0 ? <span style={{ color: "red" }}>{absImpact + " %"}</span> : absImpact < 0.005 ? "<0.005 %" : <span style={{ color: "#00ea00" }}>{absImpact + " %"}</span>}</p>
        </div>
        <div>
            <p></p>
            <p>{""} </p>
        </div>
    </div>);
}

export default PriceBox;