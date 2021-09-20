import React from 'react';
import styled from 'styled-components'
import SelectBox from './SelectBox';
import { FlexCenter } from '../Container';

const SmallWrapper = styled(FlexCenter)`
    background-color: #18191D;
    border-radius: 15px;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const SwapNetwork = styled.div`
    margin-bottom: 20px;
    font-size: 12px;
    font-weight: 400;
    margin-top: 20px;
`;

const titleText = styled.span`
    opacity: "0.5";
    font-size: "12px";
`

const MigratorBox = ({ title, SyncChainId, setSyncChainId }) => {
    return (
        <SmallWrapper>
            <SwapNetwork>
                <titleText> {title} </titleText>
                <SelectBox currRow={SyncChainId} setCurrRow={setSyncChainId} />
            </SwapNetwork>
        </SmallWrapper>
    );
}
export default MigratorBox
