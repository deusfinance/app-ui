import BigNumber from 'bignumber.js';
import React, { useEffect, useState } from 'react';

import { SmallWrapper } from ".";
import { isZero } from '../../../constant/number';
import { Type } from "../Text";

const PriceImpact = ({ minAmountOut, amountOut, amountIn }) => {
    const [amount, setAmount] = useState(0)
    useEffect(() => {
        const getImpact = () => {
            const impact = (new BigNumber(1).minus(new BigNumber(amountOut)
                .div(new BigNumber(minAmountOut)
                    .multipliedBy(new BigNumber(amountIn).div(0.001)))
            )).multipliedBy(100).toFixed(4)
            setAmount(impact)
        }

        if (amountOut === "" || amountIn === "" || isZero(amountIn)) setAmount(0)
        else getImpact()
    }, [amountOut, minAmountOut])//eslint-disable-line

    return (
        <SmallWrapper>
            <Type.SM className="title">Price Impact</Type.SM>
            {/* <Type.SM >{(amountOut === "" || amountIn === "") ? "<0.005 %" : ""}</Type.SM> */}
            <Type.SM >{amount < 0.005 ? "<0.005" : amount} %</Type.SM>
        </SmallWrapper>
    );
}

export default PriceImpact;