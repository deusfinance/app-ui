import React from 'react';

import './styles/token-button.scss';
import { useTranslation } from 'react-i18next'

const WrappedTokenButton = ({ isLong, isWrap, token, handleLong }) => {
    const { t} = useTranslation()

    const changePosition = (bool) => {
        if (token?.conducted) {
            handleLong(bool)
        }
    }

    return (<>
        {isWrap && <div className="wrap-btns">
            <div className="grad-wrap wrap-btn " onClick={() => changePosition(true)}>
                <div className={`grad  ${isLong === true && "checked"}`}>
                    {t("long")}
                </div>

            </div>
            <div className="grad-wrap wrap-btn " onClick={() => changePosition(false)}>
                <div className={`grad ${isLong === false && "checked"}`}>
                    {t("short")}
                </div>

            </div>

        </div>}
    </>);
}

export default WrappedTokenButton;