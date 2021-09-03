import React from 'react';
import { Image } from 'rebass/styled-components';
import styled from 'styled-components';
import { FlexCenter } from '../Container';
import CurrencyLogo from '../Currency';
import { Type } from '../Text';

const Wrapper = styled(FlexCenter)`
    position: relative;
    height: 185px;
    width: 100%;
    max-width: 230px;
    
    margin-top: ${({ mt }) => (mt && mt)};
    background: ${({ theme }) => theme.border1};
    border: 2px solid #000000;
    border-radius: ${({ borderRadius }) => borderRadius || "15px"};
`
const TokenInfo = styled(FlexCenter)`
    position: absolute;
    bottom:20px;
    margin:auto;
    left:0;
    right:0;
    cursor:${({ active }) => active ? "pointer" : "default"};
    &:hover{
        filter:${({ active }) => active && "brightness(0.8)"};
    }
`

const ZapBox = ({ currency, inputAmount = "", type, setActive, TokensMap, chainId, wrongNetwork, fastUpdate, mt }) => {

    return (<Wrapper mt={mt}>

        <CurrencyLogo
            style={{ verticalAlign: "middle", position: "absolute", top: "55px", marginLeft: "-20px", zIndex: "1", padding: "5px" }}
            currency={currency}
            size={"40px"}
            bgColor="#000000"
        />

        <CurrencyLogo
            style={{ verticalAlign: "middle", position: "absolute", marginTop: "-15px", marginRight: "-30px", padding: "5px" }}
            currency={currency}
            size={"40px"}
            bgColor="#000000"
        />

        <TokenInfo onClick={setActive ? () => setActive(true, type) : undefined} active={setActive ? true : false}>
            <Type.XL fontWeight="300" color="text1" ml="10px" mr="9px">{"DEI + DEUS"}</Type.XL>
            {setActive && <Image src="/img/select.svg" size="10px" />}
        </TokenInfo>

    </Wrapper>);
}

export default ZapBox;