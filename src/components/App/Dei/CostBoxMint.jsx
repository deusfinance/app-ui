import React, { useMemo } from 'react'
import { makeCostData } from '../../../helper/deiHelper'
import { useCollatDollarBalance, useRefreshRatio, usePoolCeilingBalance } from '../../../hooks/useDei'
import { useRecoilValue } from 'recoil';
import { collatRatioState } from '../../../store/dei';
import { MainWrapper, FeeWrapper, FeeTitle, FeePrice } from './CostBoxRedeem'

export const CostBoxMint = () => {
    const refreshRate = useRefreshRatio()
    const deiPrice = refreshRate ? refreshRate.dei_price : null
    const collatRatio = useRecoilValue(collatRatioState)
    const poolBalance = useCollatDollarBalance()
    const poolCeiling = usePoolCeilingBalance()
    const costs = makeCostData(deiPrice, collatRatio, poolBalance, poolCeiling)

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