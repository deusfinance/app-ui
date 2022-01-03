import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Image } from 'rebass/styled-components';
import { MainWrapper, SwapWrapper } from '../../components/App/MuonSwap';
import TokenBox from '../../components/App/MuonSwap/TokenBox';
import SwapAction from '../../components/App/MuonSwap/SwapAction';
import SearchBox from '../../components/App/MuonSwap/SearchBox';
import RateBox from '../../components/App/MuonSwap/RateBox';
import { getSwapVsType } from '../../utils/utils';
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import { fromWei, RemoveTrailingZero } from '../../helper/formatBalance';
import { useApprove } from '../../hooks/useApprove';
import { useAllowance } from '../../hooks/useAllowance';
import { usePrices, useSwap, useUsedAmount } from '../../hooks/useMuon';
import { MuonPreSaleTokens, muonToken } from '../../constant/token';
import { useAmountsOut, useAmountsIn } from '../../hooks/useMuon';
import useChain from '../../hooks/useChain';
import useTokenBalances from '../../hooks/useTokenBalances';
import { useDebounce } from '../../hooks/useDebounce';
import { useLocation } from 'react-router';
import RemainingCap from '../../components/App/MuonSwap/RemainingCap';
import { getAllocation, SymbolMap, } from '../../helper/muonHelper';
import { isZero } from '../../constant/number';
import { getCorrectChains } from '../../constant/correctChain';
import { DEUS_ADDRESS, MUON_PRESALE_ADDRESS } from '../../constant/contracts';
import { ChainId } from '../../constant/web3';

const Muon = () => {
    const [activeSearchBox, setActiveSearchBox] = useState(false)
    const [invert, setInvert] = useState(false)
    const [maxAllocation, setMaxAllocation] = useState(0)
    const [allocation, setAllocation] = useState(0)
    const [fastUpdate, setFastUpdate] = useState(0)
    const [escapedType,] = useState("from")
    const [focusType, setFocusType] = useState("from")
    const [isApproved, setIsApproved] = useState(null)
    const [isPreApproved, setIsPreApproved] = useState(null)
    const [approveLoading, setApproveLoading] = useState(false)
    const [swapLoading, setSwapLoading] = useState(false)
    const { account } = useWeb3React()
    const location = useLocation()
    const validNetworks = getCorrectChains(location.pathname)
    const prices = usePrices()
    const chainId = useChain(validNetworks)
    const contractAddress = MUON_PRESALE_ADDRESS[chainId]
    const search = useLocation().search;
    let inputCurrency = new URLSearchParams(search).get('inputCurrency')
    const tokens = useMemo(() => MuonPreSaleTokens.filter((token) => !token.chainId || token.chainId === chainId), [chainId])
    //eslint-disable-next-line
    const tokensMap = useMemo(() => (tokens.reduce((map, token) => (map[token.address] = { ...token, address: token.address }, map), {})
    ), [tokens])

    const tokenBalances = useTokenBalances(tokensMap, chainId)
    const [TokensMap, setTokensMap] = useState(tokensMap)

    if (inputCurrency && !TokensMap[inputCurrency]) {
        inputCurrency = null
    }

    let DEA = DEUS_ADDRESS[ChainId.MATIC]
    // if (chainId !== 1)
    // if (chainId === 97) {
    // DEA = "0x4Ef4E0b448AC75b7285c334e215d384E7227A2E6"
    // }

    let fromAddress = inputCurrency ? inputCurrency : DEA

    const [swapState, setSwapState] = useState({
        from: { ...TokensMap[fromAddress] },
        to: muonToken,
    })

    const [amountIn, setAmountIn] = useState("")
    const [amountOut, setAmountOut] = useState("")
    const debouncedAmountIn = useDebounce(amountIn, 500);
    const debouncedAmountOut = useDebounce(amountOut, 500);
    const usedAmount = useUsedAmount(chainId)
    let allowance = useAllowance(swapState.from, contractAddress, chainId)

    useEffect(() => {
        if (focusType === "from") {
            if (amountIn === "" || debouncedAmountIn === "") setAmountOut("")
        } else
            if (amountOut === "" || debouncedAmountOut === "") setAmountIn("")
    }, [amountIn, debouncedAmountIn, debouncedAmountOut, focusType, amountOut]);

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);
    }, [])

    useEffect(() => {
        setIsPreApproved(null)
        setIsApproved(null)
    }, [chainId, account, swapState.from]);

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

    //eslint-disable-next-line 
    // const showSearchBox = (active = false, type) => {
    //     setEscapedType(type)
    //     setActiveSearchBox(active)
    // }

    const changeToken = (token, type) => {
        setActiveSearchBox(false)
        setAmountIn("")
        const vsType = getSwapVsType(type)
        if (swapState[vsType].symbol === token.symbol) {
            return setSwapState({ ...swapState, [type]: token, [vsType]: swapState[type] })
        }
        setSwapState({ ...swapState, [type]: token })
    }

    const swapCallback = (tx) => {
        if (tx.status) {
            console.log("swap did");
            setAmountIn("")
            setFastUpdate(fastUpdate => fastUpdate + 1)
        } else {
            console.log("Swap Failed");
        }
    }


    const fromSymbol = SymbolMap[swapState.from.symbol]
    const fromPrice = prices && prices[fromSymbol] ? prices[fromSymbol].price : 0
    const { getAmountsOut } = useAmountsOut(debouncedAmountIn, fromPrice)
    const { getAmountsIn } = useAmountsIn(swapState.from, debouncedAmountOut, fromPrice)
    const { onApprove } = useApprove(swapState.from, contractAddress, chainId)
    const { onSwap } = useSwap(swapState.from, swapState.to, amountIn, amountOut, fromSymbol, debouncedAmountIn, chainId, swapCallback)

    useEffect(() => {
        if (maxAllocation && usedAmount)
            setAllocation(maxAllocation - usedAmount)
    }, [usedAmount, maxAllocation])


    useEffect(() => {
        const gets = async () => {
            try {
                const allocations = await getAllocation()
                const userAllocationAmount = allocations[account]
                if (userAllocationAmount) {
                    setMaxAllocation(userAllocationAmount)
                } else {
                    setMaxAllocation(0)
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (account) {
            gets()
        }
    }, [account])

    useEffect(() => {
        const get = async () => {
            const result = getAmountsOut()
            if (!result) return
            if (amountIn === "" || isZero(amountIn)) setAmountOut("")
            else setAmountOut(RemoveTrailingZero(fromWei(result, swapState.to.decimals), swapState.to.decimals))
        }
        if (getAmountsOut && focusType === "from")
            get()
    }, [getAmountsOut, amountIn, focusType, swapState.to])//replace multiple useState variables with useReducer

    useEffect(() => {
        const get = async () => {
            const result = await getAmountsIn()
            if (!result) return
            if (amountOut === "" || isZero(amountOut)) setAmountIn("")
            else setAmountIn(RemoveTrailingZero(fromWei(result, swapState.from.decimals), swapState.from.decimals))
        }
        if (getAmountsIn && focusType === "to")
            get()
        //eslint-disable-next-line
    }, [getAmountsIn, amountOut])//replace multiple useState variables with useReducer



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
        setSwapLoading(true)
        try {
            await onSwap()
            setSwapLoading(false)
        } catch (e) {
            console.error(e)
            setSwapLoading(false)
        }
    }, [onSwap])

    useEffect(() => {
        const blurPop = "blured"
        if (!activeSearchBox) {
            document.getElementById("blur-pop").classList.remove(blurPop)
        } else {
            document.getElementById("blur-pop").classList.add(blurPop)
        }
    }, [activeSearchBox])


    const escFunction = (event) => {
        if (event.keyCode === 27) {
            setActiveSearchBox(false)
        }
    }

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

            <Image src="/img/swap/deus-muon.svg" my="15px" />

            <SwapWrapper>
                <TokenBox
                    type="from"
                    hasMax={true}
                    inputAmount={amountIn}
                    setInputAmount={setAmountIn}
                    setActive={undefined}
                    currency={swapState.from}
                    TokensMap={TokensMap}
                    setFocusType={setFocusType}
                    allocation={allocation}
                    price={fromPrice}
                    fastUpdate={fastUpdate}
                />

                <Image src="/img/swap/single-arrow-black.svg" size="20px" my="15px" />

                <TokenBox
                    type="to"
                    title="To (estimated)"
                    inputAmount={amountOut}
                    setInputAmount={setAmountOut}
                    setActive={null}
                    setFocusType={setFocusType}
                    TokensMap={TokensMap}
                    currency={swapState.to}
                    fastUpdate={fastUpdate}
                />

                <RateBox state={swapState} amountIn={debouncedAmountIn} amountOut={amountOut} invert={invert} setInvert={setInvert} />

                <SwapAction
                    bgColor="bg_blue"
                    isPreApproved={isPreApproved}
                    validNetworks={validNetworks}
                    isApproved={isApproved}
                    loading={approveLoading}
                    swapLoading={swapLoading}
                    handleApprove={handleApprove}
                    handleSwap={handleSwap}
                    TokensMap={TokensMap}
                    swapState={swapState}
                    amountIn={amountIn}
                    amountInDollar={amountIn * fromPrice}
                    allocation={allocation}
                    amountOut={amountOut}
                />

            </SwapWrapper>
            <RemainingCap remindedAmount={allocation} />

        </MainWrapper>

    </>);
}

export default Muon;