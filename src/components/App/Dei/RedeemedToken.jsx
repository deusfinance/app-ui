import React from 'react';
import styled from 'styled-components'
import DefaultLogo from '../../.../../../assets/images/empty-token.svg'
import { Flex, Button as RebassButton, Text } from 'rebass/styled-components';

const SmallWrapper = styled.div`
    padding:0 20px;
    width: 560px;
    background: #0D0D0D;
    border: 1px solid #1C1C1C;
    border-radius: 15px;
    min-height: 85px;
    text-align:center;
    margin: 0 auto;
    width:100%;
    max-width:500px;
`

const MyText = styled(Text)`
    margin-top: 20px;
    box-sizing: border-box;
    font-size: 12px;
    opacity: 0.75;
    display: flex;
`

const TextWrapper = styled(Text)`
  color: ${({ color, theme }) => (theme)[color]};
  font-size: 20px;
  opacity: 0.75;
`

const NumberWrapper = styled(Text)`
  color: ${({ color, theme }) => (theme)[color]};
  opacity: 0.75;
  font-size: 16px;
  margin-left: auto;
`

const TokenInfo = styled(Flex)`
    margin: 20px auto;
    align-items:center;
    background-color: #0D0D0D;
`

const StyledLogo = styled.img`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: ${({ size }) => size};
  vertical-align: "middle";
`

function CurrencyLogo({
  symbol,
  logo,
  size = '25px',
}) {
  return <StyledLogo size={size} src={logo || DefaultLogo} alt={`${symbol ?? 'token'} logo`} />
}

const Base = styled(RebassButton)`
  padding: ${({ padding }) => (padding ? padding : '0')};
  width: ${({ width }) => (width && width)};
  height: ${({ height }) => (height && height)};
  font-family: Monument Grotesk;
  font-weight: 400;
  text-align: center;
  border-radius: 6px;
  border-radius: ${({ borderRadius }) => borderRadius && borderRadius};
  outline: none;
  border: 0;
  color: ${({ theme }) => theme.text1};
  text-decoration: none;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: center;
  cursor:${({ active }) => active && "pointer"};
  position: relative;
  z-index: 1;
  transition: all 0.35s;
  &:disabled {
    cursor: auto;
  }
  > * {
    user-select: none;
  }
`

const ButtonSync = styled(Base).attrs({
  width: "100%",
  height: "36px",
  borderRadius: "10px",
  marginBottom: "20px",
})`
  font-size:20px;
`

const ButtonSyncDeactive = styled(ButtonSync)`
    box-shadow: none;
    font-family:"Monument Grotesk Semi";
    background: ${({ theme, bgColor }) => bgColor ? theme[bgColor] : theme.sync_dactive};
    color: ${({ theme, color }) => color ? theme[color] : "#8d8d8d"};
    cursor: default;
`

const ButtonSyncActive = styled(ButtonSync)`
  background: ${({ theme }) => theme.sync_active};
  font-size: 25px;
  &:hover{
    filter:${({ active }) => active && "brightness(1.2)"};
  }
`

const ButtonSwap = styled(ButtonSyncActive)`
  background: ${({ theme, bgColor }) => bgColor ? theme[bgColor] : theme.grad3};
  color: ${({ theme }) => theme.text1_2};
  font-size:${({ fontSize }) => fontSize || "20px"};
`

const RedeemedToken = ({ title, currencies }) => {
  return (
    <SmallWrapper>
      <MyText> {title} </MyText>
      {currencies.map(({ symbol, logo, index }) => {
        return <TokenInfo key={index + logo}>
          <CurrencyLogo symbol={symbol} logo={logo} />
          <TextWrapper color="text1" ml="7px" mr="9px">{symbol}</TextWrapper>

          <NumberWrapper color="text1" ml="7px" mr="9px"> 344,342.23244 </NumberWrapper>
        </TokenInfo>
      })}

      <ButtonSwap active={true} bgColor={"grad_dei"} onClick={null}> CLAIM ALL </ButtonSwap>

    </SmallWrapper>
  );
}

export default RedeemedToken
