import React from 'react';
import styled from 'styled-components'
import { StyleSwapBase, StyleTitles } from '.';
import { FlexCenter } from '../Container';
import { Type } from '../Text';


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

const RouteBox = () => {
    return (<Wrapper>
        <Type.SM className="title" >Route</Type.SM>
        <WrapTokens>
            <RouteToken>
                <WrapToken><TokenLogo className="icon" src="/tokens/eth-logo.svg" alt="eth" /> <Type.MD>ETH</Type.MD></WrapToken>
            </RouteToken>
            <RouteToken><WrapSwapPlace  ><PlaceLogo src="img/swap/d-swap.svg" alt="uni" /><img src="img/swap/right-arrow.svg" alt="arrow" /></WrapSwapPlace><WrapToken className="token-wrap"><TokenLogo className="icon" src="/tokens/deus.svg" alt="deus" /><div className="symbol">DEUS</div></WrapToken></RouteToken><div className="route-token"></div>
        </WrapTokens>
    </Wrapper>
    );
}

export default RouteBox;