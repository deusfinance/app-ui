import React, { useState, useEffect } from 'react';
import { Flex, Box, Image } from 'rebass/styled-components';
import styled from 'styled-components';
import { getFullDisplayBalance } from '../../../helper/formatBalance';
import useCrossTokenBalance from '../../../hooks/useCrossTokenBalance';
import { formatBalance3 } from '../../../utils/utils';
import { ButtonMax } from '../Button';
import CurrencyLogo from '../Currency';
import { InputAmount } from '../Swap';
import { Type } from '../Text';

const Wrapper = styled.div`
    position: relative;
    height: 185px;
    width: 100%;
    max-width: 230px;
    margin-top: ${({ mt }) => (mt && mt)};
    background: ${({ theme }) => theme.border1};
    border: 2px solid #000000;
    border-radius: ${({ borderRadius }) => borderRadius || "15px"};
`
const TokenInfo = styled.div`
    padding:20px 20px;
    padding-bottom: 12px;
    
    cursor:${({ active }) => active ? "pointer" : "default"};
    border-bottom: 1px solid #0D0D0D;
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

        <TokenInfo onClick={setActive ? () => setActive(true, type) : undefined} active={setActive ? true : false}>
            <Flex justifyContent="space-between" alignItems="center" paddingRight="25px" paddingLeft="13">
                <Flex alignItems="center" >
                    <CurrencyLogo
                        style={{ verticalAlign: "middle" }}
                        currency={currency}
                        size={"25px"}
                    />
                    <Type.XL fontWeight="300" color="text1" ml="10px" mr="9px">{currency?.symbol}</Type.XL>
                </Flex>
                {setActive && <Image src="/img/select.svg" size="10px" />}
            </Flex>


        </TokenInfo>

        <Flex justifyContent="flex-end" marginTop="37px" marginRight="12px" marginBottom="6px" >
            <Box>
                <Type.SM color={'secondary'}>
                    Balance: {formatBalance3(balance)}
                </Type.SM>
            </Box>
        </Flex>

        <Flex
            justifyContent="space-between"
            alignItems="center"
            mt="5px"
            backgroundColor="#0D0D0D"
            height="50px"
            margin="0 10px"
            marginBottom="12px"
            padding="0 8px"
            style={{ borderRadius: "10px" }}
        >
            <InputAmount fontSize="20px" placeholder="0.0" min="0" value={isNaN(inputAmount) ? "" : inputAmount} onChange={(e) => {
                setFocusType(focusType)
                setInputAmount(e.currentTarget.value)
            }} />

            {hasMax && !onMax && <ButtonMax width={"40px"}
                onClick={() => setInputAmount(balance)}>
                MAX
            </ButtonMax>}
        </Flex>

    </Wrapper>);
}

export default ZapBox;