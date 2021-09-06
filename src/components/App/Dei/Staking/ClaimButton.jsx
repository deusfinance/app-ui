import React from 'react';
import styled from 'styled-components'
import { formatBalance3 } from '../../../../utils/utils';

const Wrapper = styled.div`
    display: flex;
    color:#fff;
    min-height: 40px;
    background: ${({ theme }) => theme.grad_dei};
    font-size: 13px;
    padding: 1px;
    margin: 16px auto;
    border-radius: 6px;
    overflow: hidden;
    width: 90%;
`

const ButtonAction = styled.div`
    align-items: center;
    cursor: pointer;
    overflow: hidden;
    display: flex;
    border-radius: 0 6px 6px 0;
    width: 150px;
    justify-content: center;
    /* height: 100%; */
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
    /* height: 100%; */
    background-color: #111111;
    transition: all 0.25s;
    cursor: default;
`
const ClaimButton = ({ actionTitle, onAction = undefined, symbol, amount, amountTitle }) => {
    return (<Wrapper>
        <Amount>{formatBalance3(amount, 8)} {symbol} {amountTitle}</Amount>
        <ButtonAction onClick={onAction}>{actionTitle}</ButtonAction>
    </Wrapper>);
}

export default ClaimButton;