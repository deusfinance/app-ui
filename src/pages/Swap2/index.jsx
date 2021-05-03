import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Image } from 'rebass/styled-components';
import { MainWrapper, SwapTitle, SwapWrapper, SwapArrow } from '../../components/App/Swap';
import TokenBox from '../../components/App/Swap/TokenBox';
import RouteBox from '../../components/App/Swap/RouteBox';
import SlippageTelorance from '../../components/App/Swap/SlippageTelorance';
import SwapAction from '../../components/App/Swap/SwapAction';
import SearchBox from '../../components/App/Swap/SearchBox';
import RateBox from '../../components/App/Swap/RateBox';
import PriceImpact from '../../components/App/Swap/PriceImpact';
import { getSwapVsType } from '../../utils/utils';
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import { fromWei } from '../../helper/formatBalance';
import { useApprove } from '../../helper/useApprove';
import { useAllowance } from '../../helper/useAllowance';
import { useSwap } from '../../helper/useSwap';
import { DefaultTokens } from '../../constant/token';
import { useGetAmountsOut } from '../../helper/useGetAmountsOut';
import useChain from '../../helper/useChain';
import { getContractAddr, getTokenAddr } from '../../utils/contracts';
import useTokenBalances from '../../helper/useTokenBalances';
import { useDebounce } from '../../helper/useDebounce';

const Swap2 = () => {
    const [activeSearchBox, setActiveSearchBox] = useState(false)
    const [invert, setInvert] = useState(false)
    const [fastUpdate, setFastUpdate] = useState(0)
    const [escapedType, setEscapedType] = useState("from")
    const [slipage, setSlipage] = useState(0.5)
    const [isApproved, setIsApproved] = useState(null)
    const [isPreApproved, setIsPreApproved] = useState(null)
    const [approveLoading, setApproveLoading] = useState(false)
    const { account } = useWeb3React()
    const validNetworks = [1, 4]
    const chainId = useChain(validNetworks)

    const contractAddress = getContractAddr("multi_swap_contract", chainId)

    const tokens = useMemo(() => DefaultTokens.filter((token) => !token.chainId || token.chainId === chainId), [chainId])

    //eslint-disable-next-line
    const tokensMap = useMemo(() => (tokens.reduce((map, token) => (map[token.address] = token, map), {})
    ), [tokens])

    const tokenBalances = useTokenBalances(tokensMap, chainId)

    const [TokensMap, setTokensMap] = useState(tokenBalances)

    const [swapState, setSwapState] = useState({
        from: { ...TokensMap["0x"] },
        to: { ...TokensMap[getTokenAddr("deus", chainId)] },
    })

    const [amountIn, setAmountIn] = useState("")
    const debouncedAmountIn = useDebounce(amountIn, 500);
    const [amountOut, setAmountOut] = useState("")
    const [minAmountOut, setMinAmountOut] = useState("")
    const allowance = useAllowance(swapState.from, contractAddress, chainId)

    useEffect(() => {
        if (amountIn === "" || debouncedAmountIn === "") setAmountOut("")
    }, [amountIn, debouncedAmountIn]);

    useEffect(() => {
        setIsPreApproved(null)
        setIsApproved(null)
    }, [chainId, account]);

    useEffect(() => {
        setIsPreApproved(null)
        setIsApproved(false)
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
                    // TokensMap[swapState.from.address].allowance = allowance
                    // setTokensMap(TokensMap)
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
    }, [allowance]) //isPreApproved ?


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

    const { getAmountsOut } = useGetAmountsOut(swapState.from, swapState.to, debouncedAmountIn, chainId)
    const { getAmountsOut: getMinAmountOut } = useGetAmountsOut(swapState.from, swapState.to, 0.001, chainId)
    const { onApprove } = useApprove(swapState.from, contractAddress, chainId)
    const { onSwap } = useSwap(swapState.from, swapState.to, amountIn, amountOut, slipage, chainId)

    useEffect(() => {
        const get = async () => {
            const amount = await getAmountsOut()
            console.log("swap ", amount);
            if (amountIn === "") setAmountOut("")
            else setAmountOut(fromWei(amount, swapState.to.decimals))
        }
        get()

        //eslint-disable-next-line
    }, [getAmountsOut, amountIn])//replace multiple useState variables with useReducer

    useEffect(() => {
        const get = async () => {
            const amount = await getMinAmountOut()
            console.log("min swap ", amount);
            setMinAmountOut(fromWei(amount, swapState.to.decimals))
        }
        get()

        //eslint-disable-next-line
    }, [getMinAmountOut])//replace multiple useState variables with useReducer



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
            disbaleLoading={false}
            active={activeSearchBox}
            setActive={setActiveSearchBox} />

        <MainWrapper>
            <SwapTitle className="title" >
                SWAP
            </SwapTitle>
            <SwapWrapper>
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
                <SwapArrow onClick={() => {
                    setSwapState({ from: swapState.to, to: swapState.from })
                    setAmountIn(amountOut)
                    setAmountOut("")
                }}>
                    <Image src="/img/swap/swap-arrow.svg" size="20px" my="15px" />
                </SwapArrow>

                <TokenBox
                    type="to"
                    inputAmount={amountOut}
                    setInputAmount={setAmountOut}
                    setActive={showSearchBox}
                    TokensMap={TokensMap}
                    currency={swapState.to}
                    fastUpdate={fastUpdate}
                />

                <RateBox state={swapState} amountIn={debouncedAmountIn} amountOut={amountOut} invert={invert} setInvert={setInvert} />

                <SwapAction
                    isPreApproved={isPreApproved}
                    validNetworks={[1, 4]}
                    isApproved={isApproved}
                    loading={approveLoading}
                    handleApprove={handleApprove}
                    handleSwap={handleSwap}
                    TokensMap={TokensMap}
                    swapState={swapState}
                    amountIn={amountIn}
                    amountOut={amountOut}
                />

            </SwapWrapper>

            <PriceImpact
                minAmountOut={minAmountOut}
                amountIn={debouncedAmountIn}
                amountOut={amountOut}
            />

            <RouteBox
                swapState={swapState}
                chainId={chainId}
                tokensMap={tokensMap}
            />

            <SlippageTelorance slipage={slipage} setSlipage={setSlipage} />
        </MainWrapper>
    </>);
}

export default Swap2;