import React from 'react';
import { Type } from '../../Text';
import styled from 'styled-components'
import ClaimButton from './ClaimButton';

const Wrapper = styled.div`
    display: inline-block;
    vertical-align: middle;
    font-family: Monument Grotesk;
    font-weight: 400;
    color: #ffffff;
    min-height: 350px;
    max-width: 450px;
    width: 100%;
    background: #0d0d0d;
    border-radius: 7px;
    box-shadow: 0px 0px 13px 1px #9be0fb;
`
const ActionWrap = styled.div`
    display: flex;
    justify-content: space-between;
    color: #fffefe;
`

const ActionContainer = styled.div`
    width: 49.8%;
    border-radius: 0;
    color:#fff;
    font-size: 18px;
    align-items: center;
    display: flex;
    justify-content: center;
    height: 48px;
    cursor: pointer;
    background: ${({ theme }) => theme.grad_dei};
    padding: 2px;
`
const Action = styled.div`
    width:100%;
    border-radius: 0;
    height: 100%;
    background: #111111;
    color:#fff;
    font-size: 18px;
    align-items: center;
    display: flex;
    justify-content: center;
    cursor: pointer;
    :hover{
        color: #111111;
        background: transparent;
    }
    padding: 2px;
`
const Staking = ({ title }) => {
    return (
        <Wrapper>
            <ActionWrap>
                <ActionContainer style={{ borderRadius: "6px 0 0 0" }}>
                    <Action style={{ borderRadius: "6px 0 0 0" }}>Mint</Action>
                </ActionContainer>
                <ActionContainer style={{ borderRadius: " 0  6px 0 0" }}>
                    <Action style={{ borderRadius: "0  6px 0 0" }}>Stake Here</Action>
                </ActionContainer>
            </ActionWrap>
            <Type.XXL mb="4" mt="4">DEI-HUSD-LP</Type.XXL>
            <Type.LG mt="3" mb="3">0.00% APY</Type.LG>
            <Type.MD mt="2" mb="4" >you own 0.01% of the pool</Type.MD>
            <ClaimButton actionTitle="claim" symbol="DEUS" amountTitle="claimable" amount="21.05487" />
            <ClaimButton actionTitle="withdraw & claim" symbol="DEI-HUSD-LP" amountTitle="deposited" amount="200.098" />
        </Wrapper>
    );
}
export default Staking
