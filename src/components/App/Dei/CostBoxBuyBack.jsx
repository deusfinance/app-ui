import React, { useMemo } from 'react'
import styled from 'styled-components'
import { makeCostDataBuyBack } from '../../../helper/deiHelper'
import { MainWrapper, FeeWrapper, FeeTitle, FeePrice } from './CostBox'
import { useRecoilValue } from 'recoil';
import { deiPricesState, availableRecollatState, husdPoolDataState } from '../../../store/dei';
import { HUSD_POOL_ADDRESS } from '../../../constant/contracts';
import { ExternalLink } from '../Link';

const CostPriceTitle = styled.span`
    opacity: 0.55;
`

const IMG = <img src="/img/spinner.svg" width="20" height="20" alt="sp" />

function truncate(str, n = 10) {
    return (str.length > n) ? str.substr(0, 6) + '...' + str.substr(str.length - 4, str.length) : str;
};

export const CostBoxBuyBack = () => {
    const { availableExcessCollatDV } = useRecoilValue(husdPoolDataState)
    let availableBuyback = Math.max(availableExcessCollatDV, 0)
    let availableRecollat = Math.max(useRecoilValue(availableRecollatState), 0)
    let deiPrices = useRecoilValue(deiPricesState)
    let deus_price = null
    if (deiPrices) deus_price = deiPrices["deus_price"]
    let costs = makeCostDataBuyBack(deus_price, truncate(HUSD_POOL_ADDRESS[4]), availableBuyback, availableRecollat, HUSD_POOL_ADDRESS[4], 4)

    return (
        useMemo(() => {
            return <MainWrapper>
                {costs.map((cost, index) => {
                    return <FeeWrapper key={index}>
                        <FeeTitle> {cost.name} </FeeTitle>

                        <FeePrice>
                            <CostPriceTitle> {cost.title1} </CostPriceTitle>
                            {cost.isLink ? <ExternalLink href={cost.path}>{cost.value1 ? cost.value1 : IMG}</ExternalLink>
                                : <span> {cost.value1 ? cost.value1 : IMG} </span>
                            }
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