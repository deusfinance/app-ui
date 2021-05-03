import React, { useMemo } from 'react';
import styled from 'styled-components'
import { StyleSwapBase, StyleTitles } from '.';
import { FlexCenter } from '../Container';
import { Type } from '../Text';
import path from '../../../constant/path.json'
import pathTest from '../../../constant/pathTest.json'
import { DeusPath, Weth, WethRinkeby } from '../../../constant/token';

const Wrapper = styled(FlexCenter)`
    ${StyleSwapBase}
    ${StyleTitles}
    margin-top:-1px;
    justify-content:space-between;
    padding:0 20px;
    position:relative;
    .title{
        position:absolute;
        left:20px;
        }
`
const WrapTokens = styled.div`
    text-align: center;
    width: 100%;
    font-family:"Monument Grotesk";
    display: inline-block;
    padding: 10px 50px;
    margin: 0 auto;
`
const RouteToken = styled.div`
    padding: 5px 0;
    display: inline-flex;
    vertical-align: middle;
    align-items: center;
`
const WrapToken = styled.div`
    display: inline-flex;
    align-items: center;
`
const WrapSwapPlace = styled.div`
    margin-left: 12px;
    display: inline-flex;
    align-items: center;
`

const TokenLogo = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 20px;
  margin-left:15px;
  margin-right:5px;

`
const PlaceLogo = styled.img`
  margin-left:5px;
  margin-right:5px;
`

const RouteBox = ({ swapState, tokensMap, chainId }) => {

    const fromSymbol = swapState.from.symbol?.toLowerCase()
    const toSymbol = swapState.to.symbol?.toLowerCase()
    const AllTokens = useMemo(() => {
        const tokens = { ...tokensMap }
        const currWeth = chainId === 4 ? WethRinkeby : Weth
        tokens[currWeth.address] = currWeth
        return tokens
    }, [tokensMap, chainId])
    const currPath = chainId === 4 ? pathTest : path
    const routes = currPath[fromSymbol][toSymbol]

    return (<Wrapper>
        <Type.SM className="title" >Route</Type.SM>
        <WrapTokens>
            {routes &&
                routes.map((route, index) => {
                    const token = AllTokens[route]
                    if (index === 0)
                        return <RouteToken key={index}>
                            <WrapToken>
                                <TokenLogo className="icon" src={token?.logo} alt={token?.symbol} /> <Type.MD>{token?.symbol}</Type.MD>
                            </WrapToken>
                        </RouteToken>
                    else {
                        return <RouteToken key={index}>
                            <WrapSwapPlace >
                                {DeusPath[AllTokens[routes[index - 1]].symbol.toLowerCase()] && DeusPath[AllTokens[routes[index - 1]].symbol.toLowerCase()][AllTokens[routes[index]].symbol.toLowerCase()]
                                    ? <PlaceLogo src="img/swap/d-swap.svg" alt="deus swap" />
                                    : <PlaceLogo src="img/swap/uni.svg" alt="uni swap" />
                                }
                                <img src="img/swap/right-arrow.svg" alt="arrow" />
                            </WrapSwapPlace>
                            <WrapToken className="token-wrap">
                                <TokenLogo className="icon" src={token?.logo} alt={token?.symbol} /><Type.MD>{token?.symbol}</Type.MD>
                            </WrapToken>
                        </RouteToken>
                    }
                })
            }
        </WrapTokens>
    </Wrapper>
    );
}

export default RouteBox;