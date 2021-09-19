import React from 'react';
import styled from 'styled-components'
import { Type } from '../Text';
import SelectBox from './SelectBox';
import { FlexCenter } from '../Container';

const SmallWrapper = styled(FlexCenter)`
    background-color: #18191D;
    border-radius: 15px;
    padding: 0 20px;
`

const SwapNetwork = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    font-size: 12px;
    font-weight: 400;
    margin-top: 20px;
`;

const MigratorBox = ({ title, SyncChainId, setSyncChainId }) => {
    return (
        <SmallWrapper>
            <SwapNetwork>
                <span style={{ opacity: "0.5" }}> {title} </span>
                <SelectBox currRow={SyncChainId} setCurrRow={setSyncChainId} />
            </SwapNetwork>
        </SmallWrapper>
    );
}
export default MigratorBox
