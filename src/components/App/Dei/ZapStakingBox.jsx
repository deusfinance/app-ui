import React, { useState, useEffect } from 'react';
import { Flex, Box, Image } from 'rebass/styled-components';
import styled from 'styled-components';
import { getFullDisplayBalance } from '../../../helper/formatBalance';
import useCrossTokenBalance from '../../../hooks/useCrossTokenBalance';
import { formatBalance3 } from '../../../utils/utils';
import { ButtonMax } from '../Button';
import { FlexCenter } from '../Container';
import CurrencyLogo from '../Currency';
import { InputAmount } from '../Swap';
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


const ZapBox = ({ hasMax, title, currency, inputAmount = "", setInputAmount, setFocusType, focusType, type, setActive, TokensMap, chainId, wrongNetwork, fastUpdate, mt }) => {
    const [onMax, setOnMax] = useState(false)
    const data = useCrossTokenBalance(currency?.address, chainId, fastUpdate)
    const [balance, setBalance] = useState(wrongNetwork ? "0" : data)

    useEffect(() => {
        const getBalance = () => {
            setBalance(data ? getFullDisplayBalance(data, currency?.decimals) : TokensMap[currency.address]?.balance ? TokensMap[currency.address]?.balance : "0")
        }

        if (currency) {
            getBalance()
        }

    }, [data, currency, wrongNetwork, TokensMap])

    useEffect(() => {
        if (inputAmount === balance) {
            setOnMax(true)
        } else {
            setOnMax(false)
        }
    }, [inputAmount, balance])


    return (<Wrapper mt={mt}>

        <CurrencyLogo
            style={{ verticalAlign: "middle", position: "absolute", top: "55px", zIndex: "1", padding: "5px" }}
            currency={currency}
            size={"40px"}
            bgColor="#000000"
        />

        <CurrencyLogo
            style={{ verticalAlign: "middle", position: "absolute", marginTop: "-15px", marginRight: "-50px", padding: "5px" }}
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