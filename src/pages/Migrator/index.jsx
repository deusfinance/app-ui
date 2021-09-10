import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Image } from 'rebass/styled-components';
import { MainWrapper, SwapWrapper, SwapTitle } from '../../components/App/Swap';
import TokenBox from '../../components/App/Swap/TokenBox';
import SlippageTolerance from '../../components/App/Swap/SlippageTolerance';
import SwapAction from '../../components/App/Swap/SwapAction';
import SearchBox from '../../components/App/Swap/SearchBox';
import RateBox from '../../components/App/Swap/RateBox';
import { getSwapVsType } from '../../utils/utils';
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import { fromWei } from '../../helper/formatBalance';
import { useApprove } from '../../hooks/useApprove';
import { useSwap } from "../../hooks/useMigrator";
import { SealedTokens, MainTokens } from '../../constant/token';
import useTokenBalances from '../../hooks/useTokenBalances';
import { useDebounce } from '../../hooks/useDebounce';
import { useLocation } from 'react-router';
// import { MMDToken } from "../../constant/token";
import { LOCKER_ADDRESS } from "../../constant/contracts";
import { useAllowance } from "../../hooks/useAllowance";
import styled from 'styled-components';
import SelectBox from '../../components/App/Migrator/SelectBox';
import { ChainMap, NameChainMap } from '../../constant/web3';
import { getCorrectChains } from '../../constant/correctChain';
import { Type } from '../../components/App/Text';
import MigrateStep from '../../components/App/Migrator/MigrateStep';

const SwapNetwork = styled.div`
    margin-left: 14px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 20px;
    font-size: 12px;
    font-weight: 400;
`;

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
    const contractAddress = LOCKER_ADDRESS[chainId];

    const location = useLocation()
    const search = useLocation().search;
    const queryParams = {
        network: new URLSearchParams(search).get('network')?.toUpperCase(),
        symbol: new URLSearchParams(search).get('symbol')?.toUpperCase(),
        position: new URLSearchParams(search).get('position')?.toUpperCase(),
        type: new URLSearchParams(search).get('type')?.toUpperCase(),
    }
    const tempChain = queryParams.network && ChainMap[queryParams.network] ? ChainMap[queryParams.network] : null
    const userChain = tempChain ? tempChain : chainId
    const validChains = getCorrectChains(location.pathname)
    const currChain = userChain && validChains.indexOf(userChain) !== -1 ? userChain : ChainMap.ETH
    const [SyncChainId, setSyncChainId] = useState(currChain)


    let inputCurrency = new URLSearchParams(search).get('inputCurrency')

    const tokens = useMemo(() => SealedTokens.filter((token) => !token.chainId || token.chainId === chainId), [chainId])

    //eslint-disable-next-line
    const tokensMap = useMemo(() => (tokens.reduce((map, token) => (map[token.address] = { ...token, address: token.address }, map), {})
    ), [tokens])

    const tokenBalances = useTokenBalances(tokensMap, chainId)

    const [TokensMap, setTokensMap] = useState(tokenBalances)

    if (inputCurrency && !TokensMap[inputCurrency]) {
        inputCurrency = null
    }

    const sUniDD = SealedTokens.find(token => token.symbol === 'sUniDD')

    const [swapState, setSwapState] = useState({
        from: sUniDD,
        to: MainTokens[0],
    })

    // const allowance = useAllowance(swapState.to, contractAddress, chainId);
    const allowance = new BigNumber(-1)

    const [amountIn, setAmountIn] = useState("")
    const debouncedAmountIn = useDebounce(amountIn, 500);
    const [amountOut, setAmountOut] = useState("")

    useEffect(() => {
        if (amountIn === "" || debouncedAmountIn === "") setAmountOut("")
    }, [amountIn, debouncedAmountIn]);

    useEffect(() => {
        setIsPreApproved(null)
        setIsApproved(null)
    }, [chainId, account]);

    useEffect(() => {
        setIsPreApproved(null)
        setIsApproved(null)
    }, [swapState.from])

    useEffect(() => {
        setTokensMap(tokenBalances)
    }, [tokenBalances])

    useEffect(() => {
        if (isPreApproved == null) {
            if (allowance.toString() === "-1") {
                setIsPreApproved(null) //doNothing
            } else {
                if (allowance.gt(0)) {
                    setIsPreApproved(true)
                } else {
                    setIsPreApproved(false)
                }
            }
        } else {
            if (allowance.gt(0)) {
                setIsApproved(true)
            }
        }
        //eslint-disable-next-line 
    }, [allowance, isPreApproved]) //isPreApproved ?


    const showSearchBox = (active = false, type) => {
        setEscapedType(type)
        setActiveSearchBox(active)
    }

    const changeToken = (token, type) => {
        setActiveSearchBox(false)
        setAmountIn("")
        const vsType = getSwapVsType(type)

        if (swapState[vsType].symbol === token.symbol) {
            return setSwapState({ ...swapState, [type]: token, [vsType]: swapState[type] })
        }
        setSwapState({ ...swapState, [type]: token })
    }

    // const { getAmountsOut } = useSealedGetAmountsOut(swapState.from, debouncedAmountIn, chainId)
    // const { onApprove } = useApprove(swapState.from, SEALED_ADDRESS, chainId)
    // const { onSwap } = useSwap(swapState.from, swapState.to, amountIn, amountOut, slippage, chainId, bptPayload)
    const { onApprove } = useApprove(swapState.to, contractAddress, chainId);
    const { onSwap } = useSwap(swapState.to, amountIn, chainId);

    // useEffect(() => {
    //     const get = async () => {
    //         const result = await getAmountsOut()
    //         if (result.payload) {
    //             setBptPayload(result.payload)
    //         }
    //         if (amountIn === "") setAmountOut("")
    //         else setAmountOut(fromWei(result.amountOut, swapState.to.decimals))
    //     }
    //     if (amountIn !== "")
    //         get()

    //     //eslint-disable-next-line
    // }, [getAmountsOut, amountIn])//replace multiple useState variables with useReducer



    const handleApprove = useCallback(async () => {
        try {
            setApproveLoading(true)
            const tx = await onApprove()
            if (tx.status) {
                setIsApproved(new BigNumber(tx.events.Approval.raw.data, 16).gt(0))
            } else {
                console.log("Approved Failed");
            }
            setApproveLoading(false)

        } catch (e) {
            setApproveLoading(false)
            console.error(e)
        }
    }, [onApprove])


    const handleSwap = useCallback(async () => {
        try {
            const tx = await onSwap()
            if (tx.status) {
                console.log("swap did");
                setAmountIn("")
                setFastUpdate(fastUpdate => fastUpdate + 1)
            } else {
                console.log("Swap Failed");
            }
        } catch (e) {
            console.error(e)
        }
    }, [onSwap])

    return (<>
        <SearchBox
            account={account}
            currencies={TokensMap}
            swapState={swapState}
            escapedType={escapedType}
            changeToken={changeToken}
            disableLoading={false}
            active={activeSearchBox}
            setActive={setActiveSearchBox} />

        <MainWrapper>
            <Type.XL fontWeight="300"> Migrate </Type.XL>

            <SwapWrapper>
                <SwapNetwork>
                    <span style={{ opacity: "0.5" }}> Choose Chain to Migrate to </span>
                    <SelectBox currRow={SyncChainId} setCurrRow={setSyncChainId} />
                </SwapNetwork>

                <TokenBox
                    type="from"
                    hasMax={true}
                    inputAmount={amountIn}
                    setInputAmount={setAmountIn}
                    setActive={showSearchBox}
                    currency={swapState.from}
                    TokensMap={TokensMap}
                    fastUpdate={fastUpdate}
                />

                <Image src="/img/swap/single-arrow.svg" size="20px" my="15px" />

                <TokenBox
                    type="to"
                    title="To (estimated)"
                    inputAmount={amountOut}
                    setInputAmount={setAmountOut}
                    setActive={null}
                    TokensMap={TokensMap}
                    currency={swapState.to}
                    fastUpdate={fastUpdate}
                />

                {<RateBox state={swapState} amountIn={debouncedAmountIn} amountOut={amountOut} invert={invert} setInvert={setInvert} />}

                <SwapAction
                    text="MIGRATE"
                    bgColor={"grad_dei"}
                    isPreApproved={isPreApproved}
                    validNetworks={validChains}
                    isApproved={isApproved}
                    loading={approveLoading}
                    handleApprove={handleApprove}
                    handleSwap={handleSwap}
                    TokensMap={TokensMap}
                    swapState={swapState}
                    amountIn={amountIn}
                    amountOut={amountOut}
                />

                <MigrateStep bgColor={"grad_dei"} />

            </SwapWrapper>

            {/* <PriceImpact
                minAmountOut={minAmountOut}
                amountIn={debouncedAmountIn}
                amountOut={amountOut}
            /> */}

            {/* <SlippageTolerance slippage={slippage} setSlippage={setSlippage} bgColor={"grad_dei"}/> */}
        </MainWrapper>
        {/* <div className='tut-left-wrap'>
            <SelectedNetworks />
        </div> */}
    </>);
}

export default Migrator;