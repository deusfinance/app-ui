import React, { useMemo } from 'react'
import { fees } from './data'
import styled from 'styled-components'

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
    padding-top: 0;
    padding-bottom: 0;
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

const Fees = () => {
    return (
        useMemo(() => {
            return <MainWrapper>
                {fees.map((fee, index) => {
                    return <FeeWrapper key={index}>
                        <FeeTitle> {fee.name} </FeeTitle>
                        <FeePrice> {fee.value} </FeePrice>
                    </FeeWrapper>
                })}
            </MainWrapper>
        }, [fees])
    )
}

export default Fees