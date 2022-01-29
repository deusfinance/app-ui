import React from 'react';
import { BigNumber } from 'bignumber.js';

const Days = ({ totalDeus, vv }) => {
    return (<>
        <span>
            {totalDeus.isZero()
                ? "0.00"
                : new BigNumber(4 * 365).div(totalDeus).times(vv).toFormat(0)
            }
        </span>
        <span className="days-item" style={{ fontSize: "15px", marginLeft: "5px" }}>days</span>
    </>);
}

export default Days;