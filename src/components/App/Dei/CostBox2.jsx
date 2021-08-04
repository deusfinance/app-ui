import React, { useMemo } from 'react'
import { costs2 as costs } from './data'
import styled from 'styled-components'
import { MainWrapper, FeeWrapper, FeeTitle, FeePrice } from './CostBox'

const CostPriceTitle = styled.span`
    opacity: 0.5;
`

const CostBox2 = () => {
    return (
        useMemo(() => {
            return <MainWrapper>
                {costs.map((cost, index) => {
                    return <FeeWrapper key={index}>
                        <FeeTitle> {cost.name} </FeeTitle>
                        <FeePrice> <CostPriceTitle> {cost.title1} </CostPriceTitle> <span> {cost.value1} </span> </FeePrice>
                        {cost.isTwoWay && <FeePrice> <CostPriceTitle> {cost.title2} </CostPriceTitle> <span> {cost.value2} </span> </FeePrice>}
                    </FeeWrapper>
                })}
            </MainWrapper>
        }, [])
    )
}

export default CostBox2