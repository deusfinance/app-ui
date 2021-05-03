import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Flex, Box, Image } from 'rebass/styled-components';
import styled from 'styled-components';
import { InputAmount } from '.';
import { getBalanceNumber } from '../../../helper/formatBalance';
import useTokenBalance from '../../../helper/useTokenBalance';
import { formatBalance2 } from '../../../utils/utils';
import { ButtonMax } from '../Button';
import CurrencyLogo from '../Currency';
import { Type } from '../Text';

const Wrapper = styled.div`
    position: relative;
    height: ${({ height }) => (height || "90px")};
    width: ${({ width }) => (width || "100%")};
    background: ${({ theme }) => theme.border1};
    border: 2px solid #000000;
    padding:0 15px;
    border-radius: ${({ borderRadius }) => borderRadius || "15px"};
`
const TokenInfo = styled(Flex)`
align-items:center;
&:hover{
  filter:brightness(0.8)  
}
`

const TokenBox = ({ hasMax, title, currency, inputAmount = "", setInputAmount, type, setActive, TokensMap, wrongNetwork, fastUpdate }) => {
    const [onMax, setOnMax] = useState(false)
    const data = useTokenBalance(currency?.address, fastUpdate)
    const [balance, setBalance] = useState(wrongNetwork ? "0" : data)

    useEffect(() => {
        setBalance(data ? getBalanceNumber(data, currency?.decimals) : TokensMap[currency.address]?.balance ? TokensMap[currency.address]?.balance : "0")
        if (TokensMap[currency.address])
            TokensMap[currency.address].balance = getBalanceNumber(data, currency?.decimals)

    }, [data, currency, wrongNetwork, TokensMap])

    useEffect(() => {
        if (inputAmount === balance) {
            setOnMax(true)
        } else {
            setOnMax(false)
        }
    }, [inputAmount, balance])


    return (<Wrapper>
        <Flex
            p="10px 0"
            justifyContent={"space-between"}
        >
            <Box>
                <Type.SM color={'secodery'}>
                    {title || "From"}
                </Type.SM>
            </Box>
            <Box>
                <Type.SM color={'secodery'}>
                    Balance: {formatBalance2(balance)}
                </Type.SM>
            </Box>
        </Flex>

        <Flex
            justifyContent="space-between"
            alignItems="center"
            mt="5px"
            style={{
                cursor: "pointer"
            }}
        >
            <InputAmount placeholder="0.0" value={isNaN(inputAmount) ? "" : inputAmount} onChange={(e) => setInputAmount(e.currentTarget.value)} />

            {hasMax && !onMax && <ButtonMax width={"40px"}
                onClick={() => setInputAmount(balance)}>
                MAX
            </ButtonMax>}

            <TokenInfo onClick={() => setActive(true, type)}>
                <CurrencyLogo
                    style={{ verticalAlign: "middle" }}
                    currency={currency}
                    size={"25px"}
                />
                <Type.LG color="text1" ml="7px" mr="9px">{currency?.symbol}</Type.LG>
                <Image src="/img/select.svg" size="10px" />
            </TokenInfo>
        </Flex>



    </Wrapper>);
}

export default TokenBox;