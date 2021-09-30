import React from 'react';
import { Flex, Box } from 'rebass/styled-components';
import styled from 'styled-components';
import { formatBalance3 } from '../../../utils/utils';
// import useCrossTokenBalance from '../../../hooks/useCrossTokenBalance';
import { Type } from '../Text';

const PlusImg = styled.img`
    z-index: 10;
    position: absolute;
    text-align: center;
    margin-left: 135px;
    ${({ theme }) => theme.mediaWidth.upToSmall`
        display: none;
    `}
`

const PlusImgMid = styled.img`
    z-index: 1;
    position: absolute;
    text-align: center;
    margin-top: -16px;
    margin-left: -8px;
    ${({ theme }) => theme.mediaWidth.upToSmall`
        display: none;
    `}
`

// position: relative;
// height: 75px;
// width: 100 %;
// max - width: 180px;
// background: #272727;
// border: 1px solid #000000;
// border - radius: 15px;
// margin: 0;

const QuadBox = styled.div`
    margin: 25px 0;
    max-width: 324px;
    position: relative;
    ${({ theme }) => theme.mediaWidth.upToSmall`
        margin-right: 8px;
    `}
`

const DoubleBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
    margin-left: 20px;
`

const Wrapper = styled.div`
    position: relative;
    height: 100px;
    width: 100%;
    max-width: 180px;
    margin-top: ${({ mt }) => (mt && mt)};
    background: #272727;
    border: 1px solid #000000;
    border-radius: ${({ borderRadius }) => borderRadius || "15px"};
    margin: 0;
    ${({ theme }) => theme.mediaWidth.upToExtraSmall`
        font-size: 13px;
        height: 80px;
    `}
`

const TokenText = styled(Type.LG)`
    font-weight: 300;
        ${({ theme }) => theme.mediaWidth.upToSmall`
        font-size: 15px;
    `}
    ${({ theme }) => theme.mediaWidth.upToExtraSmall`
        font-size: 13px;
    `}
`

const MultipleBox = ({ title, currency, chainId, wrongNetwork, fastUpdate }) => {
    // const data = useCrossTokenBalance(currency?.address, chainId, fastUpdate)
    return (<div style={{ width: "100%" }}>

        <QuadBox>
            <DoubleBox>
                <Wrapper>
                    <Flex justifyContent="flex-start" marginTop="12px" marginLeft="12px" textAlign="left" >
                        <Box>
                            <TokenText fontWeigh={"300"} >
                                {formatBalance3(currency[0].balance)}
                            </TokenText>
                            <TokenText fontWeigh={"300"} style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
                                {currency[0].symbol}
                            </TokenText>
                        </Box>
                    </Flex>
                </Wrapper>

                {currency[1] && !currency[3] && <PlusImg src="/img/dei/plus.svg" alt="plus" />}

                {currency[1] && <Wrapper>
                    <Flex textAlign="right" justifyContent="flex-end" marginTop="12px" marginRight="12px" >
                        <Box>
                            <TokenText fontWeigh={"300"}>
                                {formatBalance3(currency[1].balance)}
                            </TokenText>
                            <TokenText fontWeigh={"300"} style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                                {currency[1].symbol}
                            </TokenText>
                        </Box>
                    </Flex>
                </Wrapper>}
            </DoubleBox>

            {currency[3] && <PlusImgMid src="/img/dei/plus.svg" alt="plus" />}

            <DoubleBox>
                {currency[2] && <Wrapper>
                    <Flex textAlign="left" justifyContent="flex-start" marginTop="12px" marginLeft="12px" >
                        <Box>
                            <TokenText fontWeigh={"300"}>
                                {formatBalance3(currency[2].balance)}
                            </TokenText>
                            <TokenText fontWeigh={"300"} style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
                                {currency[2].symbol}
                            </TokenText>
                        </Box>
                    </Flex>
                </Wrapper>}

                {currency[3] && !currency[3] && <PlusImg src="/img/dei/plus.svg" alt="plus" />}

                {currency[3] && <Wrapper>
                    <Flex textAlign="right" justifyContent="flex-end" marginTop="12px" marginRight="12px" >
                        <Box>
                            <TokenText fontWeigh={"300"}>
                                {formatBalance3(currency[3].balance)}
                            </TokenText>
                            <TokenText fontWeigh={"300"} style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                                {currency[3].symbol}
                            </TokenText>
                        </Box>
                    </Flex>
                </Wrapper>}
            </DoubleBox>
        </QuadBox>
    </div >
    );
}

export default MultipleBox;