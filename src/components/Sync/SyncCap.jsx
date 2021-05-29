import BigNumber from 'bignumber.js';
import React from 'react';

import './styles/personal-cap.scss';

const SyncCap = ({ remindedAmount }) => {

    return (<div className="personal-cap-wrap" style={{ padding: "15px 15px" }}>
        <div className="personal-cap" style={{ display: 'flex', alignItems: "center", justifyContent: "space-between" }}>
            <a href="http://wiki.deus.finance/docs/limits" target="_blank" rel="noopener noreferrer" className="title" style={{ color: "#c3c3c3" }} >
                <u>Remaining Synchronizer Capacity ↗</u>
            </a>
            <div className="amounts" style={{ marginTop: "0" }}>
                <div className="reminded" style={{ marginLeft: "5px" }}> <span>$</span>{new BigNumber(remindedAmount).toFormat(2)}</div>
            </div>
        </div>
    </div >);
}

export default SyncCap;