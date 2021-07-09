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
import { fromWei } from '../../helper/formatBalance';
import { useApprove } from '../../helper/useApprove';
import { useAllowance } from '../../helper/useAllowance';
import { usePrices, useSwap, useUsedAmount } from '../../helper/useMuon';
import { MuonPreSaleTokens, muonToken } from '../../constant/token';
import { useAmountsOut, useAmountsIn } from '../../helper/useMuon';
import useChain from '../../helper/useChain';
import { getContractAddr, getTokenAddr } from '../../utils/contracts';
import useTokenBalances from '../../helper/useTokenBalances';
import { useDebounce } from '../../helper/useDebounce';
import { useLocation } from 'react-router';
import RemainingCap from '../../components/App/MuonSwap/RemainingCap';
import { getAllocation, SymbolMap, } from '../../helper/muonHelper';
import { isZero } from '../../constant/number';

const Muon = () => {
    const [activeSearchBox, setActiveSearchBox] = useState(false)
    const [invert, setInvert] = useState(false)
    const [maxAllocation, setMaxAllocation] = useState(0)
    const [allocation, setAllocation] = useState(0)
    const [fastUpdate, setFastUpdate] = useState(0)
    const [escapedType, setEscapedType] = useState("from")
    const [fouceType, setFouceType] = useState("from")
    const [isApproved, setIsApproved] = useState(null)
    const [isPreApproved, setIsPreApproved] = useState(null)
    const [approveLoading, setApproveLoading] = useState(false)
    const { account } = useWeb3React()
    const validNetworks = [1, 4]
    const prices = usePrices()
    const chainId = useChain(validNetworks)
    const contractAddress = getContractAddr("muon_presale", chainId)
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

    let DEA = getTokenAddr("dea", chainId)
    if (chainId === 4)
        DEA = "0x"

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
        if (fouceType === "from") {
            if (amountIn === "" || debouncedAmountIn === "") setAmountOut("")
        } else
            if (amountOut === "" || debouncedAmountOut === "") setAmountIn("")
    }, [amountIn, debouncedAmountIn, debouncedAmountOut, fouceType, amountOut]);

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

    const fromSymbol = SymbolMap[swapState.from.symbol]
    const fromPrice = prices && prices[fromSymbol] ? prices[fromSymbol].price : 0
    const { getAmountsOut } = useAmountsOut(debouncedAmountIn, fromPrice)
    const { getAmountsIn } = useAmountsIn(swapState.from, debouncedAmountOut, fromPrice)
    const { onApprove } = useApprove(swapState.from, contractAddress, chainId)
    const { onSwap } = useSwap(swapState.from, swapState.to, amountIn, amountOut, fromSymbol, debouncedAmountIn, chainId)

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
            else setAmountOut(fromWei(result, swapState.to.decimals))
        }
        if (getAmountsOut && fouceType === "from")
            get()
    }, [getAmountsOut, amountIn, fouceType, swapState.to])//replace multiple useState variables with useReducer

    useEffect(() => {
        const get = async () => {
            const result = await getAmountsIn()
            if (!result) return
            if (amountOut === "" || isZero(amountOut)) setAmountIn("")
            else setAmountIn(fromWei(result, swapState.from.decimals))
        }
        if (getAmountsIn && fouceType === "to")
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
            disbaleLoading={false}
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
                    setActive={showSearchBox}
                    currency={swapState.from}
                    TokensMap={TokensMap}
                    setFouceType={setFouceType}
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
                    setFouceType={setFouceType}
                    TokensMap={TokensMap}
                    currency={swapState.to}
                    fastUpdate={fastUpdate}
                />

                <RateBox state={swapState} amountIn={debouncedAmountIn} amountOut={amountOut} invert={invert} setInvert={setInvert} />

                <SwapAction
                    bgColor="bg_blue"
                    isPreApproved={isPreApproved}
                    validNetworks={[1, 4]}
                    isApproved={isApproved}
                    loading={approveLoading}
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
        {/* <div className='tut-left-wrap'>
            <SelectedNetworks />
        </div> */}
    </>);
}

export default Muon;