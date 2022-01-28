import React from 'react';
import LinkBox from '../../../components/App/Dei/LinkBox'
import { CostBox } from '../../../components/App/Dei/CostBox'
import { Type } from '../../../components/App/Text';
import { useDeiUpdate, useAPY } from '../../../hooks/useDei';
import { useWeb3React } from '@web3-react/core';
import Staking from '../../../components/App/Dei/Staking/Staking';
import { StakingConfig } from '../../../constant/staking';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { getCorrectChains } from '../../../constant/correctChain';
import { Chains } from '../../../components/App/Dei/Chains';
import LpTokens from '../../../components/App/Dei/LpTokens';
import BuyDEUS from '../../../components/App/Dei/BuyDEUS';
import { ChainId } from '../../../constant/web3';

const StakingContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    text-align: center;
    margin: auto;
    width: calc(100% - 540px);
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

const EmptyTextWrapper = styled.div`
    margin-top: 120px;
`

const Dei = () => {
    const location = useLocation()
    const { account, chainId } = useWeb3React()
    const validChains = getCorrectChains(location.pathname)
    const currChain = chainId && validChains.indexOf(chainId) !== -1 ? chainId : ChainId.FTM
    const dynamicApy = useAPY(currChain)
    useDeiUpdate(currChain)

    return (<>
        <MainWrapper>
            <Type.XL fontWeight="300" mb="3">Farms</Type.XL>
            <Type.MD fontWeight="300" mb="4" opacity="0.5">Stake LP tokens to earn.</Type.MD>
            {StakingConfig[currChain] &&
                <StakingContainer>
                    {StakingConfig[currChain].map((staking) => {
                        return <Staking key={staking.apyKey} config={staking} chainId={currChain} apyValue={dynamicApy[staking.apyKey]} />
                    })}
                </StakingContainer>}
            {!StakingConfig[currChain] && account && <EmptyTextWrapper>
                <Type.LG fontWeight="300" mb="3" opacity="0.6">Not available on this chain</Type.LG>
                <Type.MD fontWeight="250" mb="4" opacity="0.4">(Switch to ETH or POLYGON)</Type.MD>
            </EmptyTextWrapper>
            }
        </MainWrapper>

        <div className='tut-left-wrap'>
            <LinkBox />
            <CostBox type={'redeem'} chainId={currChain} />
        </div>

        <div className='tut-right-wrap'>
            {StakingConfig[currChain] && <LpTokens chainId={currChain} />}
            <BuyDEUS />
            <Chains validChainId={currChain} validNetworks={validChains} />
        </div>
    </>);
}

export default Dei;