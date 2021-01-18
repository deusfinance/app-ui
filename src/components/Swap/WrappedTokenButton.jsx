import React, { useEffect, useState } from 'react';

const WrappedTokenButton = ({ isLong, isWrap, longAmount, shortAmount }) => {

    const [checked, setCheck] = useState(isLong !== null ? isLong ? 1 : 2 : null)

    // useEffect(() => {

    // }, [isLong, longAmount, shortAmount])



    return (<>
        {isWrap && <div className="wrap-btns">
            <div className="grad-wrap wrap-btn" onClick={() => setCheck(1)}>
                <div className={`grad ${checked === 1 && "checked"}`}>
                    LONG
                    {/* <div className="amount-available">
                        [3892 available]
                    </div> */}
                </div>

            </div>
            <div className="grad-wrap wrap-btn" onClick={() => setCheck(2)}>
                <div className={`grad ${checked === 2 && "checked"}`}>
                    SHORT
                 {/* <div className="amount-available">
                        [3892 available]
            </div> */}
                </div>

            </div>

        </div>}
    </>);
}

export default WrappedTokenButton;