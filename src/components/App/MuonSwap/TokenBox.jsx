import BigNumber from 'bignumber.js';
import React, { useEffect, useState } from 'react';
import { Flex, Box, Image } from 'rebass/styled-components';
import styled from 'styled-components';
import { InputAmount } from '.';
import { isGt, isZero } from '../../../constant/number';
import { getFullDisplayBalance } from '../../../helper/formatBalance';
import useTokenBalance from '../../../helper/useTokenBalance';
import { formatBalance3 } from '../../../utils/utils';
import { ButtonMax } from '../Button';
import CurrencyLogo from '../Currency';
import { Type } from '../Text';

const Wrapper = styled.div`
    position: relative;
    height: ${({ height }) => (height || "90px")};
    width: ${({ width }) => (width || "100%")};
    background: ${({ theme }) => theme.bg8};
    border: 2px solid #000000;
    padding:0 15px;
    border-radius: ${({ borderRadius }) => borderRadius || "15px"};
`
const TokenInfo = styled(Flex)`
    align-items:center;
    cursor:${({ active }) => active ? "pointer" : "default"};
    &:hover{
        filter:${({ active }) => active && "brightness(0.8)"};
    }
`

const TokenBox = ({ hasMax, title, currency, inputAmount = "", setInputAmount, type, setActive, TokensMap, wrongNetwork, fastUpdate, setFocusType, price, allocation }) => {
    const [onMax, setOnMax] = useState(false)
    const data = useTokenBalance(currency?.address, fastUpdate)
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

    return (<Wrapper>
        <Flex
            p="10px 0"
            justifyContent={"space-between"}
        >
            <Box>
                <Type.SM color="#000" opacity="0.5">
                    {title || "From"}
                </Type.SM>
            </Box>
            <Box>
                <Type.SM color="#000" opacity="0.5" >
                    Balance: {formatBalance3(balance)}
                </Type.SM>
            </Box>
        </Flex>

        <Flex
            justifyContent="space-between"
            alignItems="center"
            mt="5px"
        >
            <InputAmount placeholder="0.0" min="0" value={isNaN(inputAmount) ? "" : inputAmount} onChange={(e) => {
                setInputAmount(e.currentTarget.value)
                setFocusType(type)
            }} />

            {hasMax && !onMax && !isZero(balance) && <ButtonMax width={"40px"}
                active={true}
                style={{ color: "#000000", borderColor: "#000000" }}
                onClick={() => {
                    if (!isGt(allocation, 0))
                        setInputAmount(balance)
                    else {
                        let estimation = 1;
                        if (price !== 1) {
                            estimation = 0.995
                        }
                        const balanceInDollar = new BigNumber(balance).times(price).times(estimation)
                        const maxBalance = balanceInDollar.gt(allocation) ? new BigNumber(allocation).times(estimation).div(price).toFixed(currency?.decimals, BigNumber.ROUND_DOWN) : balance
                        setInputAmount(maxBalance)
                    }
                }}>
                MAX
            </ButtonMax>}

            <TokenInfo onClick={setActive ? () => setActive(true, type) : undefined} active={setActive ? true : false}>
                <CurrencyLogo
                    style={{ verticalAlign: "middle" }}
                    currency={currency}
                    size={"25px"}
                />
                <Type.LG color="text1_2" ml="7px" mr="9px">{currency?.symbol}</Type.LG>
                {setActive && <Image src="/img/select-black.svg" size="10px" />}
            </TokenInfo>
        </Flex>



    </Wrapper >);
}

export default TokenBox;