import React, { useMemo } from 'react'
import styled from 'styled-components'
import { makeCostDataBuyBack } from '../../../helper/deiHelper'
import { MainWrapper, FeeWrapper, FeeTitle, FeePrice } from './CostBox'

const CostPriceTitle = styled.span`
    opacity: 0.5;
`

export const CostBoxBuyBack = () => {

    const costs = makeCostDataBuyBack("....")

    return (
        useMemo(() => {
            return <MainWrapper>
                {costs.map((cost, index) => {
                    return <FeeWrapper key={index}>
                        <FeeTitle> {cost.name} </FeeTitle>

                        <FeePrice> 
                            <CostPriceTitle> {cost.title1} </CostPriceTitle> 
                            <span> {cost.value1} </span> 
                        </FeePrice>

                        {cost.title2 && cost.value2 && <FeePrice>
                            <CostPriceTitle> {cost.title2} </CostPriceTitle>
                            <span> {cost.value2} </span> 
                        </FeePrice>}
                        
                    </FeeWrapper>
                })}
            </MainWrapper>
        }, [])
    )
}