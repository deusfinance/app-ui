import React, { useState } from 'react';

import styled from 'styled-components'
import { Image } from 'rebass/styled-components';
import { FlexCenter } from '../../components/App/Container';
import { SwapWrapper, SwapArrow, } from '../../components/App/Swap';
import TokenBox from '../../components/App/Swap/TokenBox';
import SyncAction from '../../components/App/Synchronizer/SyncAction';
import SearchBox from '../../components/App/Synchronizer/SearchBox';
import { Base } from '../../components/App/Button';
import LongShort from '../../components/App/Synchronizer/LongShort';
import PriceBox from '../../components/App/Synchronizer/PriceBox';
import RemainingCap from '../../components/App/Synchronizer/RemainingCap';
import { ApproveTranaction } from '../../utils/explorers';
import { TransactionState } from '../../utils/constant';
import { dAmcTestToken } from '../../constant/token';
import { busdToken } from '../../services/stock';



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
    const [fromCurrency, setFromCurrency] = useState(busdToken)
    const [toCurrency, setToCurrency] = useState(dAmcTestToken)
    const [long, setLong] = useState(true)

    const changePosition = () => {
        setFromCurrency({ ...toCurrency, amount: "" })
        setToCurrency({ ...fromCurrency, amount: "" })
    }

    return (<>
        <SearchBox active={activeSearchBox} setActive={setActiveSearchBox} />
        <MainWrapper>
            <Title onClick={() => ApproveTranaction(TransactionState.LOADING, {
                hash: "0xe944437d0c622734341348acc91b31dbe53fca5b23ca5db17d813f9cc2e43f30",
                from: { logo: "/tokens/dea.svg", symbol: "dGME", amount: "0.0017165" },
                chainId: 3,
            })}>
                <Image src="/img/sync-logo.svg" alt="sync" height="45px" />
                <NetworkTitle>BSC Test</NetworkTitle>
            </Title>

            <SwapWrapper>
                <TokenBox
                    setActive={setActiveSearchBox}
                    hasMax={true}
                    currency={fromCurrency}
                />

                <SwapArrow onClick={changePosition}>
                    <Image src="/img/swap/swap-arrow.svg" size="20px" my="15px" />
                </SwapArrow>

                <TokenBox
                    title="To (estimated)"
                    setActive={setActiveSearchBox}
                    currency={toCurrency}
                />
                <LongShort setLong={setLong} isLong={long} />
                <PriceBox />

                <SyncAction
                    fromCurrency={fromCurrency}
                    validNetworks={[56]}
                    isPreApproved={true}
                    mt="20px" />

            </SwapWrapper>
            <RemainingCap />
        </MainWrapper >
    </>);
}

export default Sync2;