import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components'
import { Box } from 'rebass/styled-components'
import { Type } from '../../App/Text';
import { RowBetween } from '../../App/Row';
import CircleToken from '../../../assets/images/circle-token.svg'
import { X } from 'react-feather'
import { StyledLogo } from '../Currency';
import { FlexCenter } from '../Container';

const fadein = keyframes`
  from {
    opacity:0;

  }
  to {
    opacity:1;
  }
`;


const Wrapper = styled.div`
  background: ${({ theme }) => theme.bg5};
  width: 50vw;
  max-width: 500px;
  border-radius: 10px;
  padding: 20px;
  max-height:600px;
  height:85vh;
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

const TokenRow = styled(RowBetween)`
padding:0 20px;
    :hover{
        cursor:pointer;
        background : #292929
    }
`
const TokensWrap = styled.div`
    /* padding:25px 0; */
    margin:0 -20px;
`
const TokenWrap = styled(FlexCenter)`
    margin:7.5px 0;
  
`

const currencies = [
  { symbol: "DEA", logo: "/tokens/dea.svg" },
  { symbol: "DEUS", logo: "/tokens/deus.svg" },
  { symbol: "ETH", logo: "/tokens/eth-logo.svg" },
]

const SearchBox = ({ currencies1, currency2, active, setActive }) => {
  return (active &&
    <Wrapper>
      <RowBetween fontWeight="300" >
        <Type.LG  >Select a Token</Type.LG>
        <StyledClose stroke="white" onClick={() => setActive(false)} />
      </RowBetween>
      <Line my="20px"></Line>
      <RowBetween mt="5px" opacity="0.5">
        <Type.MD >Token</Type.MD>
        <Type.MD >Balance</Type.MD>
      </RowBetween>
      <Line my="5px"></Line>
      <TokensWrap>
        {currencies.map((currency, id) => (
          <TokenRow id={id}>
            <TokenWrap>
              <StyledLogo size="40px" src={currency?.logo || CircleToken} alt={currency?.symbol || "token"} />
              <Type.LG style={{ marginLeft: "10px" }} >{currency?.symbol}</Type.LG>
            </TokenWrap>
            <Type.LG style={{ marginLeft: "10px", opacity: "0.75" }} >{currency?.balance || 0}</Type.LG>
          </TokenRow>
        ))}

      </TokensWrap>
    </Wrapper>
  );
}

export default SearchBox;