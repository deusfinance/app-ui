import React from 'react';
import { RotateCircleLoading } from 'react-loadingg';
import { AllStakings } from '../../config';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'


const CloseBox = ({ token, vault, handleLock }) => {
    const { t } = useTranslation()

    return (<div className="close-door door">
        <div className="container">
            <div className="title">{vault.title} <br /> {t("vault")}</div>
            {/* <div className="desc" style={{ opacity: "0" }}>estimated yearly growth<div className="percent">{vault.estimation ? vault.estimation + "%" : "..."} </div></div> */}
            <div className="all-info">
                {vault && vault.total && vault.total !== 0 ? <div className="wrap-info">
                    <div className="titles">{t("total")}:</div>
                    <div className="description">{vault.total} {token.title} {t("minted")}</div>
                </div> : ""}
            </div>
            {/* <div className="grad-wrap get-wrap" >
                <Link to="/newswap" className="grad" style={{ color: "#ffffff" }}>get {token.title} token
                    <img className="uni-icon" src={process.env.PUBLIC_URL + "/vaults/uni.svg"} alt="uni" />
                </Link>
            </div> */}
            <div className="btns">
                {(vault.allowances || vault.total) ? <>
                    {vault.allowances ? <div className="grad-wrap" onClick={() => handleLock(vault)}>
                        <div className="grad" >{t("lockHere")}
                        </div>
                    </div > : <span></span>}
                    <div className="grad-wrap get-wrap">
                        {AllStakings[vault.name].innerLink ?
                            <Link to={"/swap"} className="grad" >{t("get")} {vault.title}</Link> :
                            <a href={AllStakings[vault.name].liqLink} className="grad" target="_blank" rel="noopener noreferrer">{t("provide")} {vault.title}</a>}
                    </div>
                </> : <div className="loading-vaults"><RotateCircleLoading color="#a0a0a0" size={'small'} ></RotateCircleLoading></div>}
            </div>

            {/* <div className="grad-wrap zap">
                <div className="grad disabled">ZAP ⚡  (directly into staking)</div>
            </div> */}
        </div >
    </div >);
}

export default CloseBox;