import React, { useState, useEffect } from 'react';

const Slippage = ({ slippage, setSlippage }) => {
    const amounts = [0.1, 0.2, 1]
    const [isCusEnable, setCusEnable] = useState(false)
    const [cusAmount, setCusAmount] = useState("")


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
            <div className="item-title">Slippage Tolerance</div>

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