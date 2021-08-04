import React, { useMemo } from 'react'
import styled from 'styled-components'
import { makeCostDataRedeem } from '../../../helper/deiHelper'
import { useCollatDollarBalance, useRedemptionFee } from '../../../hooks/useDei'
import { useRecoilValue } from 'recoil';
import { collatRatioState } from '../../../store/dei';

export const MainWrapper = styled.div`
    font-family: 'Monument Grotesk';
    width: 100%;
    padding: 20px 25px;
    background: #0d0d0d;
    border: 1px solid #1c1c1c;
    border-radius: 10px;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 20px;
    margin-bottom: 18px;
    padding-top: 0;
    padding-bottom: 0;
    font-weight: 300;
`

export const FeeWrapper = styled.div`
    display: block;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 15px;
`

export const FeeTitle = styled.span`
    color: #0DB0F4;
`

export const FeePrice = styled.span`
    display: block;
`

const CostBox = () => {
    const collatRatio = useRecoilValue(collatRatioState)
    const redemptionFee = useRedemptionFee()
    const poolBalance = useCollatDollarBalance()
    const costs = makeCostDataRedeem(collatRatio, redemptionFee, poolBalance)

    return (
        useMemo(() => {
            return <MainWrapper>
                {costs.map((cost, index) => {
                    return <FeeWrapper key={index}>
                        <FeeTitle> {cost.name} </FeeTitle>
                        <FeePrice> {cost.value} </FeePrice>
                    </FeeWrapper>
                })}
            </MainWrapper>
        }, [costs])
    )
}

export default CostBox