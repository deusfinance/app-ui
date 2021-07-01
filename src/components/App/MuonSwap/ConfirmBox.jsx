import React from 'react';
import { X } from 'react-feather'
import { Type } from '../../App/Text';
import { RowBetween } from '../../App/Row';

const Wrapper = styled.div`
  background: ${({ theme }) => theme.bg5};
  width: 45vw;
  max-width: 450px;
  border-radius: 10px;
  padding: 20px;
  /* height:85vh; */
  max-height: 85vh;
  position: absolute;
  border: 1px solid #000000;
   box-shadow: inset 0px 2px 2px rgb(211 211 211 / 10%);
  left: 0;
  right: 0;
  animation: ${fadein} 0.3s linear forwards;
  transform: translateY(-50%);
  padding-bottom:20px;
  top:calc(50%);
  z-index: 2;
  margin:auto;
`

const StyledClose = styled(X)`
  :hover {
    cursor: pointer;
    filter:brightness(0.8);
  }
  `

const Line = styled.div`
height: 1px;
background: rgba(255, 255, 255, 0.15);
margin:${({ my }) => my} 0;
  `

const ConfirmBox = () => {
    return (<Wrapper>
        <RowBetween fontWeight="300" >
            <Type.LG  >Confirm Swap</Type.LG>
            <StyledClose stroke="white" onClick={() => setActive(false)} />
            <Line my="20px"></Line>

        </RowBetween>

    </Wrapper>);
}

export default ConfirmBox;