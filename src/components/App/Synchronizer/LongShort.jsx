import React from 'react';
import styled from 'styled-components'
import { ButtonSyncActive } from '../Button';

const WrapActions = styled.div`
  margin-top: ${({ mt }) => mt && mt};
  margin-bottom: ${({ mb }) => mb && mb};
  height: 55px;
  display: flex;
  font-size: 20px;
  font-family: "Monument Grotesk Semi";
  & > button {
    margin: 0px 5px;
  }
`;
const ButtonSelect = styled(ButtonSyncActive)`
  background: ${({ theme, active }) => active ? theme.grad4 : theme.sync_dactive};
  color: ${({ theme, active }) => active ? theme.text1_2 : theme.text1};
  font-size:20px;
  cursor:pointer;
  &:hover{
    filter : ${({ active }) => active ? "none" : "brightness(1.2)"};
  }
`

const LongShort = ({ isLong, setLong, mb="0", mt="20px" }) => {
    return (
      <>
        <WrapActions mt={mt} mb={mb}>
          <ButtonSelect active={isLong} onClick={() => setLong(true)}>
            LONG
          </ButtonSelect>
          <ButtonSelect active={!isLong} onClick={() => setLong(false)}>
            SHORT
          </ButtonSelect>
        </WrapActions>
      </>
    );
}

export default LongShort;
