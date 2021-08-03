import React, { useMemo } from 'react'
import styled from 'styled-components'
import { makeCostData } from '../../../helper/deiHelper'
import { fromWei } from '../../../helper/formatBalance'
import { useCollatDollarBalance, useRefreshRatio } from '../../../hooks/useDei'

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

const CostBox_v2 = () => {

    const refreshRate = useRefreshRatio()
    const poolBalance = useCollatDollarBalance()
    const deiPrice = refreshRate ? refreshRate.dei_price : null

    const costs = makeCostData(fromWei(deiPrice, 6), poolBalance)

    return (
        useMemo(() => {
            return <MainWrapper>
                {costs.map((cost, index) => {
                    return <FeeWrapper key={index}>
                        <FeeTitle> {cost.name} </FeeTitle>
                        <FeePrice> {cost.value ? cost.value : <img src="/img/spinner.svg" width="20" height="20" alt="sp" />} </FeePrice>
                    </FeeWrapper>
                })}
            </MainWrapper>
        }, [costs])
    )
}

export default CostBox_v2