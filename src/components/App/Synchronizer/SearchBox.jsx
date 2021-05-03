import React from 'react';
import styled, { keyframes } from 'styled-components'
import { Flex } from 'rebass/styled-components'
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
&:hover{
  transform:scale(1.1);
}
`

const currencies = [
  { symbol: "TSLA", logo: "/img/ticker/TSLA.png" },
  { symbol: "GOOGL", logo: "/img/ticker/GOOGL.png" },
]



const SearchBox = ({ currencies1, currency2, active, setActive }) => {
  return (active &&
    <Wrapper>
      <RowBetween fontWeight="300" >
        <Type.LG  >Select an asset</Type.LG>
        <StyledClose stroke="white" onClick={() => setActive(false)} />
      </RowBetween>
      <InputAmount placeholder="Search symbol and name" />
      <Type.MD opacity="0.5"  >Filter</Type.MD>
      <ul className="unstyled centered" style={{ listStyleType: "none", margin: "10px 0 20px 0 ", }}>
        {["sp500", "forex", "crypto", "asia",].map(i => <li style={{
          display: "inline-block",
          marginRight: "15px",
          marginBottom: "3px",
        }}>
          <input className="styled-checkbox" id="styled-checkbox-1" type="checkbox" value="value1"
            style={{
              background: "rgba(91, 204, 189, 0.14902)",
              border: "1px solid #FFFFFF",
              borderRadius: "2px"
            }}
          />
          <label for="styled-checkbox-1" style={{
            marginLeft: "4px",
            fontSize: "15px"
          }}>{i}</label>
        </li>)}

      </ul>
      <RowBetween mt="5px" opacity="0.5">
        <Type.MD >Asset name</Type.MD>
        <Type.MD >Balance</Type.MD>
      </RowBetween>
      <Line my="5px"></Line>
      <TokensWrap>
        {currencies.map((currency, id) => (
          <TokenRow id={id}>
            <TokenWrap>
              <TokenLogo >
                <StyledLogo size="37px" src={currency?.logo || CircleToken} alt={currency?.symbol || "token"} />
              </TokenLogo>
              <Flex style={{ flexDirection: "column", marginLeft: "15px" }}>
                <Type.XL fontWeight="300">{currency?.symbol}</Type.XL>
                <Type.MD style={{ marginTop: "3px" }}  >{"apple inc"}</Type.MD>
              </Flex>

            </TokenWrap>
            <Flex style={{ flexDirection: "column", justifyContent: "center", marginLeft: "15px" }}>
              <Type.LG style={{ marginLeft: "10px", opacity: "0.75" }} >{currency?.balance || "0.00000000 L"} <Copy src="/img/copy2.svg" /> </Type.LG>
              <Type.LG style={{ marginLeft: "10px", opacity: "0.75" }} >{currency?.balance || "0.00000000 S"} <Copy src="/img/copy2.svg" />  </Type.LG>
            </Flex>

          </TokenRow>
        ))}

      </TokensWrap>
    </Wrapper>
  );
}

export default SearchBox;