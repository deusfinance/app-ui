import React, { useState, useEffect } from 'react';
import { Flex, Box, Image } from 'rebass/styled-components';
import styled from 'styled-components';
// import useCrossTokenBalance from '../../../hooks/useCrossTokenBalance';
import { Type } from '../Text';

export const MainWrapper = styled.div`
   width: 95%;
   max-width: 315px;
   background: #0D0D0D;
`

// export const Container = styled.div`
//     width: 250px;
//     height: 100px;


// `


export const TokensContainer = styled.div`
padding: 15px 0;
`

export const Token = styled.div`
    display: flex;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin:10px auto;
    font-size: 20px;
    color: rgba(255, 255, 255, 0.25);
     background: rgba(15, 180, 244, 0.1);
   border-radius: 15px;
    border-radius: 15px;
    /* padding:0 20px; */
    width: 250px;
    height: 100px;
`

const NewDEUS = ({ title, currency, chainId, wrongNetwork, fastUpdate }) => {

    return (<MainWrapper>
        <TokensContainer>
            <Token>
                <Type.LG>342.23</Type.LG>
                <Type.MD>DEUS</Type.MD>
            </Token>

            <Token>
                <Type.LG>342.23</Type.LG>
                <Type.MD>DEUS-USDC LP</Type.MD>
            </Token>

        </TokensContainer>
    </MainWrapper>);
}

export default NewDEUS;