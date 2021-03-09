import React from 'react';
import "./styles/popup.scss";


const Popup = ({ title, close, show, popBody, handlePopup }) => {
    return (<>
        {show && <div className="popup-wrap">
            <div className="popup">
                <div className="title">{title}
                    {close && <div className="close-btn" onClick={() => handlePopup()}>
                        <svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L7 7L13 1" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M13 13L7 7L0.999999 13" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>


                    </div>}
                </div>
                {popBody}
            </div>
        </div>}
    </>);
}

export default Popup;