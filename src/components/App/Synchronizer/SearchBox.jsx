import React, { useMemo } from 'react';
import styled, { keyframes } from 'styled-components'
import { Flex } from 'rebass/styled-components'
import { Type } from '../../App/Text';
import { RowBetween, RowFlat } from '../../App/Row';
import CircleToken from '../../../assets/images/circle-token.svg'
import { X } from 'react-feather'
import { StyledLogo } from '../Currency';
import { FlexCenter } from '../Container';
import FilterBox from './FilterBox';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { getTransactionLink } from '../../../utils/explorers';
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
  width: 90vw;
  max-width: 500px;
  border-radius: 10px;
  padding: 20px;
  height:85vh;
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

const TokenLogo = styled(FlexCenter)`
background: linear-gradient(90deg, #EA2C62 -0.01%, #0779E4 100.03%);
padding:3px;
border-radius:50%;
filter: drop-shadow(0px 0px 8px #0E77E1);
`

const Line = styled.div`
height: 1px;
background: rgba(255, 255, 255, 0.15);
margin:${({ my }) => my} 0;
  `

const TokenRow = styled(RowBetween)`
padding:0 15px;
    :hover{
        cursor:pointer;
        background : #292929
    }
`
const TokensWrap = styled.div`
    /* padding:25px 0; */
    overflow-y: auto;
    height: calc(100% - 200px);
    margin:0 -20px;
    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        box-shadow: inset 0 0 6px rgb(0 0 0 / 30%);
        background-color: #c4c4c4;
    }
    &::-webkit-scrollbar {
      width: 10px;
      height: 15px;
      background-color: transparent;
    }
`
const TokenWrap = styled(FlexCenter)`
    margin:7.5px 0;
  
`
const InputAmount = styled.input.attrs({
  type: "text",
  autocomplete: "off",
  autocorrect: "off",
  spellcheck: "false"
})`
    font-weight: 400;
   border: 1px solid ${({ theme }) => theme.border2};
    outline-style: none;
    border-radius:10px;
    padding: 0 15px;
    height:55px;
    width: 100%;
    margin:20px auto;
    margin-top:20px;
    font-size: ${({ fontSize }) => fontSize || "15px"};
    color: ${({ theme }) => theme.text1};
    background:  ${({ theme }) => theme.bg6};

`
export const Copy = styled.img`
  margin-left:7px;
  filter:brightness(0.5);
  &:hover{
   filter:brightness(1);
}
`


const SearchBox = ({ currencies, balances, escapedType, selectToken, chainId, active, setActive }) => {
  const Output = useMemo(() => {
    return currencies && <Wrapper>
      <RowBetween fontWeight="300" >
        <Type.LG  >Select an asset</Type.LG>
        <StyledClose stroke="white" onClick={() => setActive(false)} />
      </RowBetween>
      <InputAmount placeholder="Search symbol and name" />
      <Type.MD opacity="0.5"  >Filter</Type.MD>
      <FilterBox items={["sp500", "forex", "crypto", "asia"]} />
      <RowBetween mt="5px" opacity="0.5">
        <Type.MD >Asset name</Type.MD>
        <Type.MD >Balance</Type.MD>
      </RowBetween>
      <Line my="5px"></Line>
      <TokensWrap>
        {Object.values(currencies).filter(c => c.conducted).map((currency, id) => {
          return <TokenRow key={id} onClick={() => selectToken(currency, escapedType)}>
            <TokenWrap>
              <TokenLogo >
                <StyledLogo size="37px" bgColor="#ffffff" src={currency?.logo || CircleToken} alt={currency?.symbol || "token"} />
              </TokenLogo>
              <Flex style={{ flexDirection: "column", marginLeft: "15px" }}>
                <Type.LG fontWeight="300">{currency?.symbol}</Type.LG>
                <Type.SM style={{ marginTop: "3px", maxWidth: "150px" }}  >{currency?.name}</Type.SM>
              </Flex>
            </TokenWrap>

            <Flex style={{ flexDirection: "column", justifyContent: "center", marginLeft: "15px" }}>
              <RowFlat>
                <Type.MD style={{ marginLeft: "10px", marginBottom: "3px", opacity: "0.75" }} >{balances && balances[currency.long?.address] ? balances[currency.long?.address] : "0.00000000"} S
                </Type.MD>
                <CopyToClipboard text={getTransactionLink(chainId, currency.long?.address, "token")}
                  onCopy={() => console.log("copied")}>
                  <Copy src="/img/copy2.svg" />
                </CopyToClipboard>
              </RowFlat>
              <RowFlat mt="5px">
                <Type.MD style={{ marginLeft: "10px", marginTop: "3px", opacity: "0.75" }} >{balances && balances[currency.short?.address] ? balances[currency.short?.address] : "0.00000000"} L
                  <CopyToClipboard text={getTransactionLink(chainId, currency.short?.address, "token")}
                    onCopy={() => console.log("copied")}>
                    <Copy src="/img/copy2.svg" />
                  </CopyToClipboard>
                </Type.MD>
              </RowFlat>

            </Flex>

          </TokenRow>
        })}

      </TokensWrap>
    </Wrapper>
  }, [currencies, chainId, escapedType, balances, selectToken, setActive])

  return (active && Output);
}

export default SearchBox;