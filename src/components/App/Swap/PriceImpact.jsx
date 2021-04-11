import React from 'react';

import { SmallWrapper } from ".";
import { Type } from "../Text";

const PriceImpact = ({ amount }) => {
    return (
        <SmallWrapper>
            <Type.SM className="title">Price Impact</Type.SM>
            <Type.SM >{amount || "<0.005 %"}</Type.SM>
        </SmallWrapper>
    );
}

export default PriceImpact;