import React from 'react';
import { MainWrapper } from '../../../components/App/Swap';
import LinkBox from '../../../components/App/Dei/LinkBox'
import { CostBox } from '../../../components/App/Dei/CostBox'
import { Type } from '../../../components/App/Text';
import { useDeiUpdateRedeem } from '../../../hooks/useDei';
import Staking from '../../../components/App/Dei/Staking/Staking';
import { StakingConfig } from '../../../components/App/Dei/data';

const Dei = () => {
    useDeiUpdateRedeem(4)
    return (<>
        <MainWrapper>
            <Type.XL fontWeight="300" mb="5">Staking</Type.XL>
            <Staking config={StakingConfig[0]} />
            <Staking config={StakingConfig[1]} />
        </MainWrapper>

        <div className='tut-left-wrap'>
            <LinkBox />
            <CostBox type={'redeem'} />
        </div>
    </>);
}

export default Dei;