import React, { useMemo } from 'react'
import styled from 'styled-components'
import { makeCostDataBuyBack } from '../../../helper/deiHelper'
import { MainWrapper, FeeWrapper, FeeTitle, FeePrice } from './CostBox'
import { useRecoilValue } from 'recoil';
import { deiPricesState, availableRecollatState, husdPoolDataState } from '../../../store/dei';
import { COLLATERAL_POOL_ADDRESS } from '../../../constant/contracts';
import { ExternalLink } from '../Link';

const CostPriceTitle = styled.span`
    opacity: 0.55;
`

const IMG = <img src="/img/spinner.svg" width="20" height="20" alt="sp" />

function truncate(str, n = 10) {
    return (str.length > n) ? str.substr(0, 6) + '...' + str.substr(str.length - 4, str.length) : str;
};

export const CostBoxBuyBack = ({ chainId }) => {
    const { availableExcessCollatDV } = useRecoilValue(husdPoolDataState)
    let availableBuyback = Math.max(availableExcessCollatDV, 0)
    let availableRecollat = Math.max(useRecoilValue(availableRecollatState), 0)
    let deiInfo = useRecoilValue(deiPricesState)
    let deus_price = null
    let dei_price = null
    if (deiInfo) deus_price = deiInfo["deus_price"]
    if (deiInfo) dei_price = deiInfo["dei_price"]
    let costs = makeCostDataBuyBack(deus_price, dei_price, truncate(COLLATERAL_POOL_ADDRESS[chainId]), availableBuyback, availableRecollat, COLLATERAL_POOL_ADDRESS[chainId], chainId)

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