import React from 'react';
import { Type } from '../Text';
import { SmallWrapper } from '../Swap';

const InfoBox = ({ title }) => {
    return (
        <SmallWrapper mt="0">
            <Type.SM>{title}</Type.SM>
        </SmallWrapper>
    );
}
export default InfoBox
