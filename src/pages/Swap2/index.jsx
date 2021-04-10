import React, { useState } from 'react';
import { Image } from 'rebass/styled-components';
import { MainWrapper, SwapTitle, SwapWrapper, SwapArrow, PriceImpact } from '../../components/App/Swap';
import TokenBox from '../../components/App/Swap/TokenBox';
import RouteBox from '../../components/App/Swap/RouteBox';
import { Type } from '../../components/App/Text';
import SlippageTelorance from '../../components/App/Swap/SlippageTelorance';
import SwapAction from '../../components/App/Swap/SwapAction';
import SearchBox from '../../components/App/Swap/SearchBox';
import PriceBox from '../../components/App/Swap/PriceBox';


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
                    currency={{ logo: "/tokens/eth-logo.svg", symbol: "eth", balance: "35.284456129464577913" }}
                />
                <SwapArrow >
                    <Image src="/img/swap/swap-arrow.svg" size="20px" my="15px" />
                </SwapArrow>

                <TokenBox
                    setActive={setActiveSearchBox}
                    currency={{ logo: "/tokens/deus.svg", symbol: "deus", balance: "95.284456129464577913" }}
                />
                <PriceBox />
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