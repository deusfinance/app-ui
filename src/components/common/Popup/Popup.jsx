import React from 'react';
import "./popup.scss";

const Popup = ({ title, close, show, popBody, handlePopup }) => {
    return (<>
        {show && <div className="popup-wrap">
            <div className="popup">
                <div className="title">{title}
                    {close && <div className="close-btn" onClick={() => handlePopup()}>close</div>}
                </div>
                {popBody}
            </div>
        </div>}
    </>);
}

export default Popup;