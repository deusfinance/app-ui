import React from 'react';

const SwapButton = ({ approved }) => {
    return (<>
        <div className="swap-btn-wrap grad-wrap">
            <div className="swap-btn grad">
                {approved ? "swap" : "approve"}
            </div>
        </div>
    </>);
}

export default SwapButton;