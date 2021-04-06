import React from 'react';
import styled from 'styled-components'
import { ButtonSyncDeactive, ButtonSyncActice, Base } from '../Button';
import { flexCenter, FlexCenter } from '../Container';
import Loader from '../Loader';

const checkError = () => {
    return false;
}



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
const ButtonSwap = styled(ButtonSyncActice)`
  background: ${({ theme }) => theme.grad3};
  color: ${({ theme }) => theme.text1_2};
  font-size:20px;

`
const WrapStep = styled(FlexCenter)`
margin-top:10px;
`

const CycleNumber = styled(FlexCenter)`
width:20px;
height:20px;
border-radius:20px;
background: ${({ theme, active }) => active ? theme.grad3 : theme.border1};
color: ${({ theme, active }) => active ? theme.text1_2 : theme.text1};
z-index: 0;
font-size:12px;
margin:0 -1px;
`
const Line = styled.div`
background: ${({ theme }) => theme.grad3} ;
height: 2px;
width: 50%;
`
const SwapAction = ({ isPreApproved }) => {

    if (checkError()) {
        return <ButtonSyncDeactive>ENTER AN AMOUNT</ButtonSyncDeactive>
    }

    return (<>
        {isPreApproved ? <WrapActions><ButtonSwap active={true} > SWAP</ButtonSwap> </WrapActions> : <>
            <WrapActions>
                <ButtonSwap active={true} >
                    APPROVE
                 {/* <Loader></Loader> */}
                </ButtonSwap>
                <ButtonSyncDeactive>SWAP</ButtonSyncDeactive>
            </WrapActions>
            <WrapStep>
                <CycleNumber active={true}>1</CycleNumber>
                <Line></Line>
                <CycleNumber active={false}>2</CycleNumber>
            </WrapStep>
        </>
        }
    </>);
}

export default SwapAction;