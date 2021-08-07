import React, { useMemo } from 'react'
import styled from 'styled-components'
import { makeCostDataBuyBack } from '../../../helper/deiHelper'
import { MainWrapper, FeeWrapper, FeeTitle, FeePrice } from './CostBox'
import { useAvailableBuyback, useAvailableRecollat } from '../../../hooks/useDei'

const CostPriceTitle = styled.span`
    opacity: 0.55;
`

const IMG = <img src="/img/spinner.svg" width="20" height="20" alt="sp" />

export const CostBoxBuyBack = () => {
    let availableBuyback = Math.max(useAvailableBuyback(), 0)
    let availableRecollat = Math.max(useAvailableRecollat(), 0)
    let costs = makeCostDataBuyBack("....", availableBuyback, availableRecollat)

    return (
        useMemo(() => {
            return <MainWrapper>
                {costs.map((cost, index) => {
                    return <FeeWrapper key={index}>
                        <FeeTitle> {cost.name} </FeeTitle>

                        <FeePrice> 
                            <CostPriceTitle> {cost.title1} </CostPriceTitle> 
                            <span> {cost.value1 ? cost.value1 : IMG} </span>
                        </FeePrice>

                        {cost.title2 && <FeePrice>
                            <CostPriceTitle> {cost.title2} </CostPriceTitle>
                            <span> {cost.value2 ? cost.value2 : IMG} </span>
                        </FeePrice>}
                        
                    </FeeWrapper>
                })}
            </MainWrapper>
        }, [costs])
    )
}