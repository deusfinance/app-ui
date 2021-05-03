import React from 'react';
import { AllStakings } from '../../config'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'

const OpenBox = ({ handleLock, vault, token }) => {
    const { t } = useTranslation()

    return (<div className="  door open-door">
        <div className="container">
            <div className="title">{vault.title} <br />{t("vault")}</div>
            <div className="all-info">
                {vault?.total && <div className="wrap-info">
                    <div className="titles">Total:</div>
                    <div className="description">{vault?.total} {token.title} {t("minted")}</div>
                </div>}
            </div>
            <div className="door-btns">

                <div className="grad-wrap stake-btn-wrap" onClick={() => handleLock(vault)}>
                    <div className="grad lock-more ">{t("lockMore")}</div>
                </div>
                <div className="grad-wrap get-wrap">
                    {AllStakings[vault.name].innerLink ?
                        <Link to={"/swap"} className="grad" >{t("get")} {vault.title}</Link> :
                        <a href={AllStakings[vault.name].liqLink} className="grad" target="_blank" rel="noopener noreferrer">{t("provide")} {vault.title}</a>}
                </div>
            </div>
        </div>
    </div>);
}

export default OpenBox;