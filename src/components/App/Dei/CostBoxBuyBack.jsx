import React, { useMemo } from 'react'
import styled from 'styled-components'
import { makeCostDataBuyBack } from '../../../helper/deiHelper'
import { MainWrapper, FeeWrapper, FeeTitle, FeePrice } from './CostBox'
import { useRecoilValue } from 'recoil';
import { deiPricesState, availableBuybackState, availableRecollatState } from '../../../store/dei';
import { useWeb3React } from '@web3-react/core'

const CostPriceTitle = styled.span`
    opacity: 0.55;
`

const IMG = <img src="/img/spinner.svg" width="20" height="20" alt="sp" />

function truncate(str, n = 10) {
    return (str.length > n) ? str.substr(0, 6) + '...' + str.substr(str.length - 4, str.length) : str;
};

export const CostBoxBuyBack = () => {
    let availableBuyback = Math.max(useRecoilValue(availableBuybackState), 0)
    let availableRecollat = Math.max(useRecoilValue(availableRecollatState), 0)
    let deiPrices = useRecoilValue(deiPricesState)
    let deus_price = null
    if (deiPrices) deus_price = deiPrices["deus_price"]
    const { account } = useWeb3React()
    let costs = makeCostDataBuyBack(deus_price, truncate(account), availableBuyback, availableRecollat)

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