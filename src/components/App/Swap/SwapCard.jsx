import React, { useMemo } from 'react';
import { SmallWrapper } from '.';
import { Type } from '../Text';

const SwapCard = ({ title, value, style }) => {
    return (useMemo(() => {
        return <SmallWrapper mt="0" style={style}>
            <Type.SM className="inner-title">{title}</Type.SM>
            <Type.SM color="#ffe7a1">
                {value ? value : <img src="/img/spinner.svg" width="20" height="20" alt="sp" />}
            </Type.SM>
        </SmallWrapper>
    }, [title, value, style])
    );
}
export default SwapCard
