import React, { useMemo } from 'react'
import styled from 'styled-components'
import { makeCostDataRedeem } from '../../../helper/deiHelper'
import { fromWei } from '../../../helper/formatBalance'
import { useCollatDollarBalance, useRefreshRatio, useCollatRatio } from '../../../hooks/useDei'

const MainWrapper = styled.div`
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

const FeeWrapper = styled.div`
    display: block;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 15px;
`

const FeeTitle = styled.span`
    color: #0DB0F4;
`

const FeePrice = styled.span`
    display: block;
`

const CostBox = () => {
    const collatRatio = useCollatRatio()
    const poolBalance = useCollatDollarBalance()

    const costs = makeCostDataRedeem(collatRatio, null, fromWei(poolBalance))

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