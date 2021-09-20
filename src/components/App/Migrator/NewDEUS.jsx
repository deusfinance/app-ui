import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Type } from '../Text';

export const MainWrapper = styled.div`
   width: 95%;
   max-width: 315px;
   background: #0D0D0D;
`


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
    background: ${({ active }) => active ? "#0FB4F4" : "#0d1e25"};
    cursor: ${({ active }) => active ? "default" : "pointer"};
    border-radius: 15px;
    width: 250px;
    height: 100px;
    &:hover{
        filter: ${({ active }) => active ? "brightness(1)" : "brightness(1.5)"};
    }

`

const NewDEUS = ({ tokens = [], activeToken }) => {
    return (<MainWrapper>
        <TokensContainer>
            {tokens.map(token => {
                const active = token.symbol === activeToken

                return <Token key={token.symbol} active={active}>
                    <Type.LG color={active ? "#000000" : "#49565B"}>{token.amount}</Type.LG>
                    <Type.MD mt="1" color={active ? "#075A7A   " : "#49565B"}>{token.symbol}</Type.MD>
                </Token>
            })}

        </TokensContainer>
    </MainWrapper>);
}

export default NewDEUS;