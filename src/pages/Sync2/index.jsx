import React, { useState } from 'react';

import styled from 'styled-components'
import { Image } from 'rebass/styled-components';
import { ToastContainer } from 'react-toastify';
import { FlexCenter } from '../../components/App/Container';
import { StyleSwapBase } from '../../components/App/Swap';
import { SwapWrapper, SwapArrow, PriceImpact } from '../../components/App/Swap';
import TokenBox from '../../components/App/Swap/TokenBox';
import { Type } from '../../components/App/Text';
import SyncAction from '../../components/App/Synchronizer/SyncAction';
import SearchBox from '../../components/App/Synchronizer/SearchBox';

import { Base } from '../../components/App/Button';
import LongShort from '../../components/App/Synchronizer/LongShort';
import PriceBox from '../../components/App/Synchronizer/PriceBox';
import { SwapTranaction } from '../../utils/explorers';
import { TransactionState } from '../../utils/constant';


const MainWrapper = styled.div`
   margin-top: 100px;
   text-align:center;
`

const Title = styled(FlexCenter)`
    display: inline-flex;
    font-family:"Monument Grotesk Semi";
`


export const NetworkTitle = styled(Base)`
  display:inline-flex;
  height:35px;
  color: ${({ theme }) => theme.text1};
  background: ${({ theme }) => theme.text1_2};
  border: 1px solid ${({ theme }) => theme.text1};
  margin-left:10px;
  padding:0 8px;
  font-size: 25px;
`

const Sync2 = () => {
    const [activeSearchBox, setActiveSearchBox] = useState(false)

    return (<>
        <SearchBox active={activeSearchBox} setActive={setActiveSearchBox} />

        <MainWrapper>
            <Title>
                <Image src="/img/sync-logo.svg" alt="sync" height="45px" />
                <NetworkTitle>xDAI</NetworkTitle>
            </Title>
            <SwapWrapper>
                <TokenBox
                    setActive={setActiveSearchBox}
                    hasMax={true}
                    currency={{ logo: "/tokens/dea.svg", symbol: "dea", balance: "35.284456129464577913" }}
                />
                <SwapArrow onClick={() => SwapTranaction(TransactionState.LOADING, {
                    hash: "0xe944437d0c622734341348acc91b31dbe53fca5b23ca5db17d813f9cc2e43f30",
                    from: { logo: "/tokens/dea.svg", symbol: "dGME", amount: "0.0017165" },
                    to: { logo: "/tokens/dea.svg", symbol: "xDAI", amount: "1" },
                    chainId: 97,
                })}>
                    <Image src="/img/swap/swap-arrow.svg" size="20px" my="15px" />
                </SwapArrow>

                <TokenBox
                    setActive={setActiveSearchBox}
                    currency={{ logo: "/tokens/deus.svg", symbol: "deus", balance: "95.284456129464577913" }}
                />
                <LongShort />
                <PriceBox />

                <SyncAction isPreApproved={true} mt="20px" />

            </SwapWrapper>
        </MainWrapper >
    </>);
}

export default Sync2;