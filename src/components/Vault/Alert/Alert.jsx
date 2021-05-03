import React from 'react';
import { useTranslation } from 'react-i18next'

import "./alert.scss"

const Alert = ({ show, handleGotIt, handleClose }) => {
    const {t} = useTranslation()
    return (<>
        {show && <div className="alert-wrap">
            <div className="title">{t("vaultsCheat")}  <span onClick={handleClose}>{t("close")} </span></div>
            <div className="body-wrap">

                <div className="inner-body-wrap">

                    <div className="inner-body">
                        <ul>
                            <li>{t("vaultsText1")} </li>
                            <li>{t("vaultsText2")} </li>
                            <li>{t("vaultsText3")} </li>
                            <li>{t("vaultsText4")} </li>

                        </ul>

                    </div>

                    <div className="actions">
                        <div className="alert-btn-wrap">
                            <div className="alert-btn"> <a href="https://lafayettetabor.medium.com/" target="_blank" rel="noopener noreferrer">{t("moreInfos")}</a></div>
                        </div>
                        <div className="alert-btn-wrap" onClick={handleGotIt}>
                            <div className="alert-btn">{t("gotIt")}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>}
    </>);
}

export default Alert;