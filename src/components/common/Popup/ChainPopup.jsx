import React from 'react';
import "./chain-popup.scss";


const ChainPupop = ({ title, close, show, popBody, handlePopup }) => {
    return (<>
        {show && <div className="popup-chain-wrap">
            <div className="popup">
                <div className="title">{title}
                    {close && <div className="close-btn" onClick={() => handlePopup()}>close</div>}
                </div>
                {popBody}
            </div>
        </div>}
    </>);
}

export default ChainPupop;