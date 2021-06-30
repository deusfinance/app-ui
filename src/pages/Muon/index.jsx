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
import { getContractAddr } from '../../utils/contracts';
import useTokenBalances from '../../helper/useTokenBalances';
import { useDebounce } from '../../helper/useDebounce';
import { useLocation } from 'react-router';
import RemainingCap from '../../components/App/MuonSwap/RemainingCap';
import { getAllocation, } from '../../helper/muonHelper';
import { isZero } from '../../constant/number';

const Muon = () => {
    const [activeSearchBox, setActiveSearchBox] = useState(false)
    const contractAddress = getContractAddr("muon_presale", 4)

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
    const validNetworks = [4]
    const prices = usePrices()

    let SymbolMap = {
        "DEA": "dea",
        "DEUS": "deus",
        "ETH": "eth",
        "USDC": "usdc",
        "DAI": "dai",
        "wBTC": "wbtc",
        "sDEA": "sdea",
        "sDEUS": "sdeus",
        "sUniDE": "sUniDE",
        "sUniDD": "sUniDD",
        "sUniDU": "sUniDU",
        "BPT": "bpt",
        "TEST": "test",
    }

    const chainId = useChain(validNetworks)

    const search = useLocation().search;
    let inputCurrency = new URLSearchParams(search).get('inputCurrency')

    if (inputCurrency) inputCurrency = inputCurrency.toLowerCase()

    const tokens = useMemo(() => MuonPreSaleTokens.filter((token) => !token.chainId || token.chainId === chainId), [chainId])

    //eslint-disable-next-line
    const tokensMap = useMemo(() => (tokens.reduce((map, token) => (map[token.address.toLowerCase()] = { ...token, address: token.address.toLowerCase() }, map), {})
    ), [tokens])



    const tokenBalances = useTokenBalances(tokensMap, chainId)

    const [TokensMap, setTokensMap] = useState(tokensMap)

    if (inputCurrency && !TokensMap[inputCurrency]) {
        inputCurrency = null
    }

    // const DEA = getTokenAddr("dea", chainId).toLowerCase()
    const DEA = "0xb9b5ffc3e1404e3bb7352e656316d6c5ce6940a1"

    let fromAddress = inputCurrency ? inputCurrency : DEA

    const [swapState, setSwapState] = useState({
        from: { ...TokensMap[fromAddress] },
        to: muonToken,
    })

    const [amountIn, setAmountIn] = useState("")
    const [amountOut, setAmountOut] = useState("")
    const debouncedAmountIn = useDebounce(amountIn, 500);
    const debouncedAmountOut = useDebounce(amountOut, 500);
    const usedAmount = useUsedAmount()
    let allowance = useAllowance(swapState.from, contractAddress, chainId)

    useEffect(() => {
        if (fouceType === "from") {
            if (amountIn === "" || debouncedAmountIn === "") setAmountOut("")
        } else
            if (amountOut === "" || debouncedAmountOut === "") setAmountIn("")
    }, [amountIn, debouncedAmountIn, debouncedAmountOut, fouceType, amountOut]);

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

    const fromSymbol = SymbolMap[swapState.from.symbol]
    const fromPrice = prices ? prices[fromSymbol].price : 0
    const { getAmountsOut } = useAmountsOut(swapState.from, debouncedAmountIn, fouceType, chainId, fromPrice)
    const { getAmountsIn } = useAmountsIn(swapState.from, debouncedAmountOut, fouceType, chainId, fromPrice)
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
                // const key = Object.keys(allocations).find(key => key.toLowerCase() === defaultWallet.toLowerCase())
                // if (key)
                //     setMaxAllocation(allocations[key])
                // else
                //     setAllocation(0)
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
        //eslint-disable-next-line
    }, [getAmountsOut, amountIn])//replace multiple useState variables with useReducer

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
            // const muonNode = await handleGetSign(debouncedAmountIn)
            // console.log(muonNode);

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