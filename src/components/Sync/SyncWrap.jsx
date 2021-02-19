import React from 'react';

const SyncWrap = (props) => {
    return (
        <div className="swap-container-wrap">
            <div className="swap-container">
                <div className="swap-box-wrap">
                    {props.children}
                </div>
            </div>
        </div>
    );
}

export default SyncWrap;