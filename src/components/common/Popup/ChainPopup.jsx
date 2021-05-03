import React from 'react';
import "./chain-popup.scss";
import { useTranslation } from 'react-i18next'


const ChainPupop = ({ title, close, show, popBody, handlePopup }) => {
    const { t } = useTranslation()

    return (<>
        {show && <div className="popup-chain-wrap">
            <div className="popup">
                <div className="title">{title}
                    {close && <div className="close-btn" onClick={() => handlePopup()}>{t("close")}</div>}
                </div>
                {popBody}
            </div>
        </div>}
    </>);
}

export default ChainPupop;