import React from 'react';
import "./popup.scss";
import { useTranslation } from 'react-i18next'

const Popup = ({ title, close, show, popBody, handlePopup }) => {
    const { t } = useTranslation()

    return (<>
        {show && <div className="popup-wrap">
            <div className="popup">
                <div className="title">{title}
                    {close && <div className="close-btn" onClick={() => handlePopup()}>{t("close")}</div>}
                </div>
                {popBody}
            </div>
        </div>}
    </>);
}

export default Popup;