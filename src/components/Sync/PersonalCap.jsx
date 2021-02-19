import React from 'react';
import { useState } from 'react';

import './styles/personal-cap.scss';

const PersonalCap = ({ remindedAmount, totalAmount }) => {

    const [posX, setPosX] = useState(0)
    const handleMove = (e) => {
        setPosX(e.nativeEvent.offsetX - 115)
    }
    return (<div className="personal-cap-wrap">
        <div className="personal-cap">
            <div className="title">
                Personal SYNCHRONIZER Cap
            </div>
            <div className="borders" onMouseEnter={e => handleMove(e)}>
                <div className="reminded-line" style={{ width: (remindedAmount / totalAmount * 100).toFixed(2) + "%" }}></div>
                <div className="tooltip-wrap" style={{ left: (posX) + "px", bottom: parseFloat(remindedAmount) <= 0 ? "100px" : "65px" }}>
                    <div className="tooltip">
                        During our initial Trial phase.
                        You can only buy  3% percentage of your TIME token holdings, lock something into vaults to aquire more TIME
                        <svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.5 8L0.00480968 0.5L12.9952 0.499999L6.5 8Z" fill="#EFEFEF" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="amounts">
                <div className="reminded">${remindedAmount.toFixed(2)}</div>
                <span> / </span>
                <div className="total">${totalAmount.toFixed(2)}</div>
            </div>
            {parseFloat(remindedAmount) <= 0 && <a href="https://wiki.deus.finance/docs/timetoken" target="_blank" rel="noopener noreferrer" className="get-time">
                <div>How to get TIME</div> <div className="arrow">{"→"}</div>
            </a>}
        </div>

    </div >);
}

export default PersonalCap;