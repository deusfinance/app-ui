import React from 'react';

const WrappedTokenButton = ({ isLong, isWrap, token, handleLong, longAmount, shortAmount }) => {

    const changePosition = (bool) => {
        if (token?.conducted) {
            handleLong(bool)
        }
    }

    // useEffect(() => {
    // }, [isLong, longAmount, shortAmount])



    return (<>
        {isWrap && <div className="wrap-btns">
            <div className="grad-wrap wrap-btn stock-swap-btn" onClick={() => changePosition(true)}>
                <div className={`grad  ${isLong === true && "checked"}`}>
                    LONG
                    {/* <div className="amount-available">
                        [3892 available]
                    </div> */}
                </div>

            </div>
            <div className="grad-wrap wrap-btn stock-swap-btn" onClick={() => changePosition(false)}>
                <div className={`grad ${isLong === false && "checked"}`}>
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