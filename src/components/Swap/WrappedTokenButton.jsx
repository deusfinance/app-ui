import React, { useEffect } from 'react';

const WrappedTokenButton = ({ isLong, isWrap, longAmount, shortAmount }) => {


    useEffect(() => {

    }, [isLong, longAmount, shortAmount])



    return (<>
        {isWrap && <div className="wrap-btns">
            <div className="grad-wrap wrap-btn">
                <div className="grad">
                    LONG
                      <div className="amount-available">
                        [3892 available]
            </div>
                </div>

            </div>
            <div className="grad-wrap wrap-btn">
                <div className="grad">
                    SHORT
                         <div className="amount-available">
                        [3892 available]
            </div>
                </div>

            </div>

        </div>}
    </>);
}

export default WrappedTokenButton;