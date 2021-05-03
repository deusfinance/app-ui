import React from 'react';
import { useTranslation } from 'react-i18next'

const PriceBox = ({ impact }) => {
    const absImpact = Math.abs(impact)
    const { t } = useTranslation()

    return (<div className="price-box">
        <div >
            <p>{t("priceImpact")}</p>
            <p>{absImpact < 0 ? <span style={{ color: "red" }}>{absImpact + " %"}</span> : absImpact < 0.005 ? "<0.005 %" : <span style={{ color: "#00ea00" }}>{absImpact + " %"}</span>}</p>
        </div>
        <div>
            <p></p>
            <p>{""} </p>
        </div>
    </div>);
}

export default PriceBox;