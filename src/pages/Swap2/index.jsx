import React, { useState } from 'react';
import styled from 'styled-components'
import { Image } from 'rebass/styled-components';

import { StyleSwapBase, SwapTitle, StyleTitles, SwapArrow } from '../../components/App/Swap';
import TokenBox from '../../components/App/Swap/TokenBox';
import RouteBox from '../../components/App/Swap/RouteBox';
import { FlexCenter } from '../../components/App/Container';
import { Type } from '../../components/App/Text';
import SlippageTelorance from '../../components/App/Swap/SlippageTelorance';
import SwapAction from '../../components/App/Swap/SwapAction';
import SearchBox from '../../components/App/Swap/SearchBox';


const MainWrapper = styled.div`
   padding-top: 60px;
   text-align:center;
`
const SwapWrapper = styled.div`
${StyleSwapBase}
border-color:#000;
padding:20px 15px;
margin-top:30px;
`

const PriceImpact = styled(FlexCenter)`
    ${StyleSwapBase}
    ${StyleTitles}
    justify-content:space-between;
    height:50px;
    margin-top:-1px; 
    padding:0 20px;
`


const Swap2 = () => {
    const [activeSearchBox, setActiveSearchBox] = useState(false)

    return (<>
        <SearchBox active={activeSearchBox} setActive={setActiveSearchBox} />
        <MainWrapper>
            <SwapTitle class="title"> SWAP</SwapTitle>
            <SwapWrapper>
                <TokenBox
                    setActive={setActiveSearchBox}
                    hasMax={true}
                    currency={{ logo: "/tokens/dea.svg", symbol: "dea", balance: "35.284456129464577913" }}
                />
                <SwapArrow >
                    <Image src="/img/swap/swap-arrow.svg" size="20px" my="15px" />
                </SwapArrow>

                <TokenBox
                    setActive={setActiveSearchBox}
                    currency={{ logo: "/tokens/deus.svg", symbol: "deus", balance: "95.284456129464577913" }}
                />
                <SwapAction isPreApproved={false} />
            </SwapWrapper>
            <PriceImpact>
                <Type.SM className="title">Price Impact</Type.SM>
                <Type.SM >{"<"}0.005 %</Type.SM>
            </PriceImpact>
            <RouteBox />
            <SlippageTelorance />


        </MainWrapper></>);
}

export default Swap2;