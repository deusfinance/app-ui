import React from 'react';
import LinkBox from '../../../components/App/Dei/LinkBox'
import { CostBox } from '../../../components/App/Dei/CostBox'
import { Type } from '../../../components/App/Text';
import { useDeiUpdateRedeem } from '../../../hooks/useDei';
import Staking from '../../../components/App/Dei/Staking/Staking';
import { StakingConfig } from '../../../constant/staking';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { getCorrectChains } from '../../../constant/correctChain';
import useChain from '../../../hooks/useChain';



const StakingContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    @media screen and (max-width: 1600px) {
        flex-direction: column;
        align-items:center;
        width: 100%;
    }
`

const MainWrapper = styled.div`
    padding: 10px;
    padding-top: 60px;
    padding-bottom: 30px;

    text-align: center;
`

const Dei = () => {
    const location = useLocation()
    const validNetworks = getCorrectChains(location.pathname)
    const chainId = useChain(validNetworks)
    useDeiUpdateRedeem(chainId)

    return (<>
        <MainWrapper>
            <Type.XL fontWeight="300" mb="3">Farms</Type.XL>
            <Type.MD fontWeight="300" mb="4" opacity="0.5">Stake LP tokens to earn.</Type.MD>
            <StakingContainer>
                <Staking config={StakingConfig[chainId][0]} chainId={chainId} />
                <Staking config={StakingConfig[chainId][1]} chainId={chainId} />
            </StakingContainer>
        </MainWrapper>

        <div className='tut-left-wrap'>
            <LinkBox />
            <CostBox type={'redeem'} chainId={chainId} />
        </div>
    </>);
}

export default Dei;