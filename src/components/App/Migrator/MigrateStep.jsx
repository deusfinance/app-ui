import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { FlexCenter } from '../Container';

const WrapActions = styled.div`
    margin-top:33px;
    height: "55px";
    display:flex;
    font-size:20px;
    font-family:"Monument Grotesk Semi";
    & > button {
        margin:0px 5px;
    }
`

const WrapSteps = styled(FlexCenter)`
    flex-direction: column;
    align-items: flex-start;
`

const WrapEachStep = styled(FlexCenter)`
    flex-direction: row;
`

const Text = styled.span`
    opacity: ${({ active }) => active ? 1 : 0.5 };
    margin-left: 10px;
    font-size: 14px;
`

const Date = styled.span`
    opacity: ${({ active }) => active ? 1 : 0.5};
    margin-left: 10px;
    font-size: 14px;
    margin-left: 100px;
`

const CycleNumber = styled(FlexCenter)`
    width:20px;
    height:20px;
    border-radius:20px;
    background: ${({ theme, bgColor, active }) => active ? bgColor ? theme[bgColor] : theme.grad3 : theme.border1};
    color: ${({ theme, active }) => active ? theme.text1_2 : theme.text1};
    z-index: 0;
    font-size:12px;
    margin:0 -1px;
`

const Line = styled.div`
    background: ${({ theme, bgColor }) => bgColor ? theme[bgColor] : theme.grad3} ;
    margin-left: 8px;
    width: 2px;
    height: 20px;
`

const MigrateStep = ({ bgColor, state = 1 }) => {
    return (<>
        <WrapActions style={{ backgroundColor: "" }}>
            <WrapSteps style={{ backgroundColor: "" }} bgColor={bgColor}>
                <WrapEachStep>
                    <CycleNumber bgColor={bgColor} active={state > 0}>1</CycleNumber>
                    <Text active={state > 0}> Withdrawal order submitted </Text>
                    <Date active={false}> 2021-07-17 08:12 </Date>
                </WrapEachStep>

                <Line bgColor={bgColor}></Line>

                <WrapEachStep>
                    <CycleNumber bgColor={bgColor} active={state > 1}>2</CycleNumber>
                    <Text active={state > 1}> System processing </Text>
                </WrapEachStep>

                <Line bgColor={bgColor}></Line>

                <WrapEachStep>
                    <CycleNumber bgColor={bgColor} active={state > 2}>3</CycleNumber>
                    <Text active={state > 2}> Completed </Text>
                </WrapEachStep>
            </WrapSteps>
        </WrapActions>
    </>);
}

export default MigrateStep;