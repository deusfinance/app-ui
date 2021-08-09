import React from 'react';
import styled from 'styled-components'

const Wrapper = styled.div`
    display: flex;
    color:#fff;
    height: 40px;
    background: ${({ theme }) => theme.grad_dei};
    font-size: 13px;
    padding: 1px;
    margin: 16px auto;
    border-radius: 6px;
    overflow: hidden;
    width: 88%;
`

const ButtonAction = styled.div`
    align-items: center;
    cursor: pointer;
    overflow: hidden;
    display: flex;
    border-radius: 0 6px 6px 0;
    flex: 1 1;
    justify-content: center;
    height: 100%;
    background-color: #111111;
    transition: all 0.25s;
    :hover{
        background-color: transparent;
        color: #000000;
    }
`
const Amount = styled.div`
    align-items: center;
    display: flex;
    flex: 1 1;
    border-radius: 6px 0 0 6px;
    border-right: 2px solid #242424;
    justify-content: center;
    height: 100%;
    background-color: #111111;
    transition: all 0.25s;
    cursor: default;
`
const ClaimButton = ({ actionTitle, onAction = undefined, amount }) => {
    return (<Wrapper>
        <Amount>{amount} DEUS claimable</Amount>
        <ButtonAction onClick={onAction}>{actionTitle}</ButtonAction>
    </Wrapper>);
}

export default ClaimButton;