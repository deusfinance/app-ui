import { formatUnits } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';
import React, { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Flex, Box, Image } from 'rebass/styled-components';
import styled from 'styled-components';
import useSWR from 'swr';
import { InputAmount } from '.';
import { tokenABI } from '../../../utils/abis';
import { fetcher, formatBalance2 } from '../../../utils/utils';
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

const TokenBox = ({ hasMax, currency, type, setActive }) => {
    const [inputAmount, setInputAmount] = useState("")
    const [onMax, setOnMax] = useState(false)

    const { account, library } = useWeb3React()
    const { data, mutate } = useSWR([currency?.address, 'balanceOf', account], {
        fetcher: fetcher(library, tokenABI),
    })
    const [balance, setBalance] = useState(data)

    useEffect(() => {
        setBalance(data ? formatUnits(data, currency?.decimals) : null)
    }, [data])

    useEffect(() => {
        if (inputAmount === balance) {
            setOnMax(true)
        } else {
            setOnMax(false)
        }
    }, [inputAmount])

    return (<Wrapper  >
        <Flex
            p="10px 0"
            justifyContent={"space-between"}
        >
            <Box>
                <Type.SM color={'secodery'}>
                    From
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
            <InputAmount placeholder="0.0" value={inputAmount} onChange={(e) => setInputAmount(e.currentTarget.value)} />

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
                <Type.XL color="text1" ml="7px" mr="9px">{currency.symbol.toUpperCase()}</Type.XL>
                <Image src="/img/select.svg" size="10px" />
            </TokenInfo>
        </Flex>



    </Wrapper>);
}

export default TokenBox;