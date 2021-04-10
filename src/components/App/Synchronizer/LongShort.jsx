import React from 'react';
import styled from 'styled-components'
import { ButtonSyncDeactive, ButtonSyncActice, Base } from '../Button';
import { flexCenter, FlexCenter } from '../Container';
import Loader from '../Loader';

const checkError = () => {
    return false;
}



const WrapActions = styled.div`
    margin-top:20px;
    height: 55px;
    display:flex;
    font-size:20px;
    font-family:"Monument Grotesk Semi";
    & > button {
        margin:0px 5px;
    }
`
const ButtonSelect = styled(ButtonSyncActice)`
  background: ${({ theme, active }) => active ? theme.grad1 : theme.sync_dactive};
  color: ${({ theme }) => theme.text1};
  font-size:20px;
  cursor:pointer;
  &:hover{
    filter : ${({ active }) => !active && "brightness(1.5)"};
  }
`


const LongShort = ({ isLong }) => {
    return (<>
        <WrapActions>
            <ButtonSelect active={isLong} >LONG</ButtonSelect>
            <ButtonSelect active={!isLong}>SHORT</ButtonSelect>
        </WrapActions>
    </>);
}

export default LongShort;
