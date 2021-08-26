import React from 'react';
import styled from 'styled-components'
import { ButtonSyncActive } from '../Button';

const WrapActions = styled.div`
  margin-top: ${({ mt }) => mt && mt};
  margin-bottom: ${({ mb }) => mb && mb};
  height: 45px;
  display: flex;
  font-size: 20px;
  border-radius: 10px;
  overflow: hidden;
  border:1px solid #373737;
  font-family: "Monument Grotesk Semi";
  & > button {
    margin: 0px 5px;
  }
`;
const ButtonSelect = styled.div`
  background: ${({ active, theme, bg }) => active ? bg : theme.sync_dactive};
  color: ${({ theme, color, active }) => active ? color ? color : theme.text1_2 : theme.text1};
  opacity: ${({ active }) => active ? 1 : 0.5};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size:20px;
  width:100%;
  height: 45px;
  cursor:pointer;
  &:hover{
    /* opacity: 1; */
    filter : ${({ active }) => active ? "none" : "brightness(1.2)"};
  }
`

const LongShort = ({ isLong, setLong, mb = "0", mt = "20px" }) => {
  return (<WrapActions mt={mt} mb={mb} >
    <ButtonSelect active={isLong} bg={"linear-gradient(225deg, #B6CADF 0%, #82F59E 100%)"} onClick={() => setLong(true)}>
      LONG
    </ButtonSelect>
    <ButtonSelect active={!isLong} bg={"linear-gradient(135deg, #B6CADF 0%, #F5829A 100%)"} onClick={() => setLong(false)}>
      SHORT
    </ButtonSelect>
  </WrapActions>
  );
}

export default LongShort;
