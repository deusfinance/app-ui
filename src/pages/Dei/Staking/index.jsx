import React from 'react';
import LinkBox from '../../../components/App/Dei/LinkBox'
import { CostBox } from '../../../components/App/Dei/CostBox'
import { Type } from '../../../components/App/Text';
import { useDeiUpdateRedeem } from '../../../hooks/useDei';
import Staking from '../../../components/App/Dei/Staking/Staking';
import { StakingConfig } from '../../../components/App/Dei/data';
import styled from 'styled-components';


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

    useDeiUpdateRedeem(4)
    return (<>
        <MainWrapper>
            <Type.XL fontWeight="300" mb="5">Staking</Type.XL>
            <StakingContainer>
                <Staking config={StakingConfig[0]} />
                <Staking config={StakingConfig[1]} />
            </StakingContainer>
        </MainWrapper>

        <div className='tut-left-wrap'>
            <LinkBox />
            <CostBox type={'redeem'} />
        </div>
    </>);
}

export default Dei;