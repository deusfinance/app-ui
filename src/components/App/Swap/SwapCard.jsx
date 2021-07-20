import React from 'react';
import { SmallWrapper } from '.';
import { Type } from '../Text';

const SwapCard = ({ title, value }) => {
    return (
        <SmallWrapper mt="0">
            <Type.SM className="inner-title">{title}</Type.SM>
            <Type.SM >{value}</Type.SM>
        </SmallWrapper>
    );
}
export default SwapCard