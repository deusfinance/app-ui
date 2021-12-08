import React, { useMemo } from 'react'
import styled from 'styled-components'
import { makeCostDataRedeem, makeCostData } from '../../../helper/deiHelper'
import { useRecoilValue } from 'recoil';
import { collatRatioState, deiPricesState } from '../../../store/dei';
import { husdPoolDataState } from '../../../store/dei'
import { ChainId } from '../../../constant/web3';

export const MainWrapper = styled.div`
    font-family: 'Monument Grotesk';
    width: 100%;
    padding: 15px 25px;
    background: #0d0d0d;
    border: 1px solid #1c1c1c;
    border-radius: 10px;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 18px;
    margin-bottom: 10px;
    padding-top: 0;
    padding-bottom: 0;
    font-weight: 300;
`

export const FeeWrapper = styled.div`
    display: block;
    margin-top: 15px;
    margin-bottom: 15px;
    font-size: 15px;
`

export const FeeTitle = styled.span`
    color: #0DB0F4;
`

export const FeePrice = styled.div`
    display: flex;
    align-items: center;
    height: 18px;
    ${({ theme }) => theme.mediaWidth.upToSmall`
      justify-content: center;
    `}
`

export const CostBox = ({ type, chainId }) => {

    const deusPrices = useRecoilValue(deiPricesState)
    const deiPrice = deusPrices ? deusPrices.dei_price : null
    const collatRatio = useRecoilValue(collatRatioState)
    const { pool_ceiling: poolCeiling, collatDollarBalance: poolBalance } = useRecoilValue(husdPoolDataState)
    let costs = null
    if (type === 'mint') costs = makeCostData(deiPrice, collatRatio, poolBalance, poolCeiling, chainId === ChainId.BSC ? 18 : 6)
    else if (type === 'redeem') costs = makeCostDataRedeem(collatRatio, poolBalance, chainId)

    return (
        useMemo(() => {
            return <MainWrapper>
                {costs.map((cost, index) => {
                    return <FeeWrapper key={index}>
                        <FeeTitle> {cost.name} </FeeTitle>
                        <FeePrice> {cost.value !== null ? cost.value : <img src="/img/spinner.svg" width="20" height="20" alt="sp" />} </FeePrice>
                    </FeeWrapper>
                })}
            </MainWrapper>
        }, [costs])
    )
}