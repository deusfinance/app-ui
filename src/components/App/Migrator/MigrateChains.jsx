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

const TitleText = styled.span`
    opacity: "0.5";
    font-size: "12px";
`

const MigrateChains = ({ title, SyncChainId, setSyncChainId, validNetworks }) => {
    return (
        <SmallWrapper>
            <SwapNetwork>
                <TitleText> {title} </TitleText>
                <SelectBox currRow={SyncChainId} setCurrRow={setSyncChainId} validNetworks={validNetworks} />
            </SwapNetwork>
        </SmallWrapper>
    );
}
export default MigrateChains
