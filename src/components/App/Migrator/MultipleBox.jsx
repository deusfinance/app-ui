import React, { useState, useEffect } from 'react';
import { Flex, Box, Image } from 'rebass/styled-components';
import styled from 'styled-components';
// import useCrossTokenBalance from '../../../hooks/useCrossTokenBalance';
import { Type } from '../Text';

const PlusImg = styled.img`
    z-index: 10;
    position: absolute;
    text-align: center;
    margin-left: 135px;
    /* ${({ theme }) => theme.mediaWidth.upToExtraSmall`
        margin-bottom: 5px;
        width: 23px;
        height: 23px;
    `} */
`

const PlusImgMid = styled.img`
    z-index: 1;
    position: absolute;
    text-align: center;
    margin-top: -16px;
    margin-left: -8px;
    /* ${({ theme }) => theme.mediaWidth.upToExtraSmall`
        margin-bottom: 5px;
        width: 23px;
        height: 23px;
    `} */
`

const QuadBox = styled.div`
    margin: 25px 0;
    max-width: 324px;
    position: relative;
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
    max-width: 160px;
    margin-top: ${({ mt }) => (mt && mt)};
    background: ${({ theme }) => theme.border1};
    border: 1px solid #000000;
    border-radius: ${({ borderRadius }) => borderRadius || "15px"};
    margin: 0;
`

const MultipleBox = ({ title, currency, chainId, wrongNetwork, fastUpdate }) => {
    // const data = useCrossTokenBalance(currency?.address, chainId, fastUpdate)

    return (<div style={{ width: "100%" }}>

        <QuadBox>
            <DoubleBox>
                <Wrapper>
                    <Flex justifyContent="flex-start" marginTop="12px" marginLeft="12px" >
                        <Box>
                            <Type.LG style={{ textAlign: "left" }}>
                                {currency[0].balance}
                            </Type.LG>
                            <Type.LG style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
                                {currency[0].symbol}
                            </Type.LG>
                        </Box>
                    </Flex>
                </Wrapper>

                {currency[1] && !currency[3] && <PlusImg src="/img/dei/plus.svg" alt="plus" />}

                {currency[1] && <Wrapper>
                    <Flex justifyContent="flex-end" marginTop="12px" marginRight="12px" >
                        <Box>
                            <Type.LG>
                                {currency[1].balance}
                            </Type.LG>
                            <Type.LG style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                                {currency[1].symbol}
                            </Type.LG>
                        </Box>
                    </Flex>
                </Wrapper>}
            </DoubleBox>

            {currency[3] && <PlusImgMid src="/img/dei/plus.svg" alt="plus" />}

            <DoubleBox>
                {currency[2] && <Wrapper>
                    <Flex justifyContent="flex-start" marginTop="12px" marginLeft="12px" >
                        <Box>
                            <Type.LG>
                                {currency[2].balance}
                            </Type.LG>
                            <Type.LG style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
                                {currency[2].symbol}
                            </Type.LG>
                        </Box>
                    </Flex>
                </Wrapper>}

                {currency[3] && !currency[3] && <PlusImg src="/img/dei/plus.svg" alt="plus" />}

                {currency[3] && <Wrapper>
                    <Flex justifyContent="flex-end" marginTop="12px" marginRight="12px" >
                        <Box>
                            <Type.LG>
                                {currency[3].balance}
                            </Type.LG>
                            <Type.LG style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                                {currency[3].symbol}
                            </Type.LG>
                        </Box>
                    </Flex>
                </Wrapper>}
            </DoubleBox>
        </QuadBox>
    </div>
    );
}

export default MultipleBox;