import React, { useMemo } from 'react'
import styled from 'styled-components'
import { ExternalLink } from '../Link';
import { DEITokens } from '../../../constant/token';

const MainWrapper = styled.div`
    font-family: 'Monument Grotesk';
    width: 100%;
    padding: 5px 20px;
    background: #0d0d0d;
    border: 1px solid #1c1c1c;
    border-radius: 10px;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 20px;
    margin-bottom: 10px;
    font-weight: 300;
`


const EachUrl = styled.span`
    cursor: pointer;
    display: block;
    font-size: 15px;
    margin:10px 0;
    font-weight: 300;
    &.spirit:hover{
        color: #52d784;
        opacity: 1;
    }
    &.solidly:hover{
        color: #58ecff;
        opacity: 1;
    }
    &.solidly{
        opacity: 0.85;
    }
    a{
        display: flex;
        align-items: center;
    }
`

const DeiTokenBox = () => {
    const deusToken = DEITokens[1][1]
    return (
        useMemo(() => {
            return <MainWrapper>
                <EachUrl className="solidly" >
                    <ExternalLink textDecoration="none" href={`https://solidly.vision/swap`}> Buy  <img src="/tokens/deus.svg" style={{ width: "20px", marginLeft: "4px", marginRight: "2px" }} alt="deus" />DEUS on  Solidly <img src="/img/Solidly.svg" style={{ width: "20px", marginLeft: "4px" }} alt="solidly" /></ExternalLink>
                </EachUrl>
                <EachUrl className="spirit" >
                    <ExternalLink textDecoration="none" href={`https://swap.spiritswap.finance/#/exchange/swap/FTM/${deusToken.address}`}> Buy  <img src="/tokens/deus.svg" style={{ width: "20px", marginLeft: "4px", marginRight: "2px" }} alt="deus" />DEUS on  SpiritSwap <img src="/img/spirit.png" style={{ width: "20px", marginLeft: "4px" }} alt="uniswap" /></ExternalLink>
                </EachUrl>

            </MainWrapper>
        }, [deusToken])
    )
}

export default DeiTokenBox
