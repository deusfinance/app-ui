import React, { useState } from 'react';
import styled from 'styled-components'
import { Type } from '../../components/App/Text';
import MultipleBox from '../../components/App/Migrator/MultipleBox';
import MigrateBox from '../../components/App/Migrator/MigrateBox';
import SwapAction from '../../components/App/Dei/SwapAction';
import { Image } from 'rebass/styled-components';
import TokenBox from '../../components/App/Swap/TokenBox';
import SlippageTolerance from '../../components/App/Swap/SlippageTolerance';
import SearchBox from '../../components/App/Swap/SearchBox';
import RateBox from '../../components/App/Swap/RateBox';
import { getSwapVsType } from '../../utils/utils';
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import { fromWei } from '../../helper/formatBalance';
import { useApprove } from '../../hooks/useApprove';
import { useSwap } from "../../hooks/useDei";
import { SealedTokens, MainTokens } from '../../constant/token';
import useTokenBalances from '../../hooks/useTokenBalances';
import { useDebounce } from '../../hooks/useDebounce';
import { useLocation } from 'react-router';
import { LOCKER_ADDRESS } from "../../constant/contracts";
import { useAllowance } from "../../hooks/useAllowance";
import SelectBox from '../../components/App/Migrator/SelectBox';
import { ChainId, NameChainId } from '../../constant/web3';
import { getCorrectChains } from '../../constant/correctChain';
import NewDEUS from '../../components/App/Migrator/NewDEUS';

export const MainWrapper = styled.div`
   padding-top: 60px;
   padding-bottom: 30px;
   text-align:center;
   max-width: 95%;
   margin:auto;
`


export const Container = styled.div`
   margin-top: 60px;
   max-width: 845px;
   width: 100%;
   /* display: flex;
   flex-wrap: wrap; */
   background: linear-gradient(180deg, #18191D 0%, #18191D 100%);
   /* border: 1px solid #000000; */
   border-radius: 15px 15px 0px 0px;
`

export const Title = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 12px;
   height: 70px;
   border: 1px solid #000000;
`

export const TokensContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 22px;
   height: 70px;
   border: 1px solid #000000;
`

export const Token = styled.div`
    background: #272727;
    border: 1px solid #000000;
    box-sizing: border-box;
    border-radius: 15px;
    width: 160px;
    height: 100px;
`

const Migrator = () => {
    const { account, chainId } = useWeb3React()
    const [activeSearchBox, setActiveSearchBox] = useState(false)
    const [bptPayload, setBptPayload] = useState([])
    const [invert, setInvert] = useState(false)
    const [fastUpdate, setFastUpdate] = useState(0)
    const [escapedType, setEscapedType] = useState("from")
    const [slippage, setSlippage] = useState(0.5)
    const [isApproved, setIsApproved] = useState(null)
    const [isPreApproved, setIsPreApproved] = useState(null)
    const [approveLoading, setApproveLoading] = useState(false)
    const contractAddress = "";

    const location = useLocation()
    const search = useLocation().search;
    const queryParams = {
        network: new URLSearchParams(search).get('network')?.toUpperCase(),
        symbol: new URLSearchParams(search).get('symbol')?.toUpperCase(),
        position: new URLSearchParams(search).get('position')?.toUpperCase(),
        type: new URLSearchParams(search).get('type')?.toUpperCase(),
    }
    const tempChain = queryParams.network && ChainId[queryParams.network] ? ChainId[queryParams.network] : null
    const userChain = tempChain ? tempChain : chainId
    const validChains = getCorrectChains(location.pathname)
    const currChain = userChain && validChains.indexOf(userChain) !== -1 ? userChain : ChainId.ETH
    const [SyncChainId, setSyncChainId] = useState(currChain)

    const [swapState, setSwapState] = useState([
        { symbol: "DEA", balance: "342.23" },
        { symbol: "sDEA", balance: "342.23" },
        { symbol: "DEA", balance: "342.23" },
        { symbol: "sDEA", balance: "342.23" },
    ])

    return (<MainWrapper>
        <Type.XXL fontWeight="300">Migrator</Type.XXL>
        <div style={{ display: "flex", width: "100%", alignItems: "center", margin: "auto", justifyContent: "center" }}>
            <Container>
                <Title>
                    <div style={{ display: 'flex', justifyContent: "flex-start", alignItems: "center" }}>
                        <svg style={{ margin: "0 10px" }} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="20" height="20" rx="3" fill="#CECECE" />
                        </svg>
                        <Type.LG color={'secondary'} fontWeight="300">Migrate From: </Type.LG>
                        <Type.LG style={{ marginLeft: "5px" }} fontWeight="300"> DEA / sDEA </Type.LG>
                    </div>

                    <div style={{ display: 'flex', justifyContent: "center", width: "315px", textAlign: "center" }}>

                        <Type.LG color={'secondary'} fontWeight="300">To: </Type.LG>
                        <Type.LG fontWeight="300" style={{ marginLeft: "5px" }}> DEUS V2 </Type.LG>

                    </div>

                    {/* <div>&#8594;</div> */}

                </Title>


                <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <MultipleBox
                        currency={swapState}
                        fastUpdate={fastUpdate}
                    />
                    <NewDEUS />

                </div>
                {/* <div>.</div> */}
            </Container>
            {/* <NewDEUS /> */}
        </div>
        <Image src="/img/swap/single-arrow.svg" size="20px" my="15px" />

        {/* style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start" }} */}

        <div >
            <MigrateBox
                title="Select Destination Network"
                SyncChainId={SyncChainId}
                setSyncChainId={setSyncChainId}
            ></MigrateBox>
            {/* <SwapAction
                bgColor={"grad_dei"}
                text="Migrate"
                isPreApproved={true}
                isApproved={isApproved}
                validNetworks={validNetworks}
                targetToken={targetToken}
                loading={approveLoading}
                swapLoading={swapLoading}
                handleApprove={handleApprove}
                handleSwap={handleSwap}
                TokensMap={TokensMap}
                swapState={swapState}
                amountIn={amountIn}
                amountOut={amountOut}
                isMint={true}
            /> */}
        </div>
    </MainWrapper>);
}

export default Migrator;