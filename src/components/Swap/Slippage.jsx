import React from 'react';
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const Slippage = ({ slippage, setSlippage }) => {
    const amounts = [0.1, 0.5, 1]
    const [isCusEnable, setCusEnable] = useState(false)
    const [cusAmount, setCusAmount] = useState("")
    const { t } = useTranslation()

    useEffect(() => {
        if (!isNaN(cusAmount) && parseFloat(cusAmount) > 0.1) {
            setSlippage(parseFloat(cusAmount))
            setCusEnable(true)
        } else {
            setCusEnable(false)
            if (amounts.indexOf(slippage) === -1) {
                setSlippage(amounts[0])
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cusAmount])

    return (<div className="slippage">
        <div className="item">
            <div className="item-title">{t("slipage")}</div>

            <div className="buttons-wrap">
                {amounts.map((amount, i) => {
                    const activeClass = !isCusEnable && amount === slippage ? "active" : ""
                    return <div key={i} className={`grad-wrap btn-wrap ${activeClass}`} onClick={() => {
                        setCusEnable(false)
                        setCusAmount("")
                        setSlippage(amount)
                    }}>
                        <div className="grad btn">{amount}%</div>
                    </div>
                })}

                <div className={`grad-wrap custom-amount-wrap ${isCusEnable ? "active" : ""}`}>
                    <div className="grad">
                        <div className="custom-amount">
                            <input type="number" placeholder={slippage} value={cusAmount} onChange={(e) => {
                                setCusAmount(e.currentTarget.value)
                            }}

                            />
                            <p>%</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div >);
}

export default Slippage;