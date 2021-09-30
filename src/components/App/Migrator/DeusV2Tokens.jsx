import React from 'react';
import styled from 'styled-components';
import { formatBalance3 } from '../../../utils/utils';
import { Type } from '../Text';

export const MainWrapper = styled.div`
   width: 95%;
   max-width: 300px;
   background: #0D0D0D;
   ${({ theme }) => theme.mediaWidth.upToExtraSmall`
        max-width: 160px;
    `}
`

export const TokensContainer = styled.div`
    padding: 15px 0;
    ${({ theme }) => theme.mediaWidth.upToSmall`
        margin-left: 8px;
        margin-right: 8px;
    `}
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
    border: 1px solid  ${({ active }) => active ? "#FFFFFF" : "transparent"};
    border-radius: 15px;
    width: 250px;
    height: 100px;
    &:hover{
        filter: ${({ active }) => active ? "brightness(1)" : "brightness(1.5)"};
    }
    ${({ theme }) => theme.mediaWidth.upToSmall`
        max-width: 200px;
    `}
    ${({ theme }) => theme.mediaWidth.upToExtraSmall`
        max-width: 130px;
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

const TokenTextTitle = styled(Type.MD)`
    font-weight: 300;
        ${({ theme }) => theme.mediaWidth.upToSmall`
        font-size: 13px;
    `}
    ${({ theme }) => theme.mediaWidth.upToExtraSmall`
        font-size: 11px;
    `}
`


const DeusV2Tokens = ({ config, toggleId, active }) => {
    const { id, tokens } = config
    const activeToken = active?.targetToken
    return (<MainWrapper>
        <TokensContainer>
            {tokens.to.map((token, index) => {
                const active = token.symbol === activeToken
                return <Token key={token.symbol} active={active} onClick={() => toggleId(id, false, token.symbol, index)}>
                    {token.isDU ? <>
                        <TokenText fontWeight="300" color={active ? "#000000" : "#49565B"}>{formatBalance3(token.amountDEUS)}</TokenText>
                        <TokenTextTitle fontWeight="300" mt="0.5" color={active ? "#075A7A   " : "#49565B"}>DEUS</TokenTextTitle>
                        <div style={{ width: "70%", height: "1px", margin: "1px 0", background: "#1e2b30" }} />
                        <TokenText fontWeight="300" color={active ? "#000000" : "#49565B"}>{formatBalance3(token.amountUSDC)}</TokenText>
                        <TokenTextTitle fontWeight="300" mt="0.5" color={active ? "#075A7A   " : "#49565B"}>USDC</TokenTextTitle>
                    </> :
                        <>
                            <TokenText fontWeight="300" color={active ? "#000000" : "#49565B"}>{formatBalance3(token.amount)}</TokenText>
                            <TokenTextTitle fontWeight="300" mt="0.5" color={active ? "#075A7A   " : "#49565B"}>{token.symbol}</TokenTextTitle>
                        </>}
                </Token>
            })}

        </TokensContainer>
    </MainWrapper>);
}

export default DeusV2Tokens;