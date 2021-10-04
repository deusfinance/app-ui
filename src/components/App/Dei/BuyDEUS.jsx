import React, { useMemo } from 'react'
import styled from 'styled-components'
import { ExternalLink } from '../Link';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { addToken } from '../../../utils/addTokens';
import { deiToken, DEITokens, ZapTokens } from '../../../constant/token';


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
    &.uni:hover{
        color: #f62d8d;
    }
    &.quick:hover{
        color: #6db7ff;
    }
    a{
        display: flex;
        align-items: center;
    }
`

const DeiTokenBox = () => {
    const deusToken = DEITokens[1][1]
    const deiToken = ZapTokens[1][0]
    return (
        useMemo(() => {
            return <MainWrapper>
                <EachUrl className="uni" >
                    <ExternalLink textDecoration="none" href={`https://app.uniswap.org/#/swap?use=V2&outputCurrency=${deusToken.address}&inputCurrency=${deiToken.address}`}> Buy  <img src="/tokens/deus.svg" style={{ width: "20px", marginLeft: "4px", marginRight: "2px" }} />DEUS on  Uniswap <img src="/img/uniswap.png" style={{ width: "20px", marginLeft: "4px" }} /></ExternalLink>
                </EachUrl>
                <EachUrl className="quick">
                    <ExternalLink textDecoration="none" href={`https://quickswap.exchange/#/swap?outputCurrency=${deusToken.address}&inputCurrency=${deiToken.address}`}> Buy <img src="/tokens/deus.svg" style={{ width: "20px", marginLeft: "4px", marginRight: "2px", }} />DEUS on QuickSwap <img src="/img/quickswap.png" style={{ width: "20px", marginLeft: "4px", borderRadius: "50%" }} /></ExternalLink>
                </EachUrl>

            </MainWrapper>
        }, [])
    )
}

export default DeiTokenBox