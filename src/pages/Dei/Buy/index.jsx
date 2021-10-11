import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MainWrapper, SwapWrapper } from '../../../components/App/Swap';
import { DEITokens, deusToken } from '../../../constant/token';
import { CostBox } from '../../../components/App/Dei/CostBox';
import SlippageTolerance from '../../../components/App/Swap/SlippageTolerance';
import LinkBox from '../../../components/App/Dei/LinkBox'
import { Type } from '../../../components/App/Text';
import { Image } from 'rebass/styled-components';
import TokenBox from '../../../components/App/Dei/TokenBox';
import SwapAction from '../../../components/App/Dei/SwapAction';
import { useWeb3React } from '@web3-react/core';
import { useApprove } from '../../../hooks/useApprove';
import useChain from '../../../hooks/useChain';
import { useDebounce } from '../../../hooks/useDebounce';
import { DEUS_ADDRESS, DEUS_SWAP_ADDRESS } from '../../../constant/contracts';
import { ContentWrapper } from '../../../components/App/Dei';
import { useDeiUpdate, useAllowance, useSwap } from '../../../hooks/useDei';
import { collatRatioState, deiPricesState, husdPoolDataState } from '../../../store/dei';
import { useRecoilValue } from 'recoil';
import { fromWei } from '../../../helper/formatBalance';
import { useLocation } from 'react-router-dom';
import { getCorrectChains } from '../../../constant/correctChain';
import { isProxyMinter, getAmountOutDeusSwap } from '../../../helper/deiHelper';
import { getSwapVsType } from '../../../utils/utils';
import SearchBox from '../../../components/App/Dei/SearchBox';
import { useCrossWeb3 } from '../../../hooks/useWeb3';
import useTokenBalances from '../../../hooks/useTokenBalances';
import { Chains } from '../../../components/App/Dei/Chains';
import DeusTokenBox from '../../../components/App/Dei/DeusTokenBox';
import DeiTokenBox from '../../../components/App/Dei/BuyDEUS';
import RateBox from '../../../components/App/Swap/RateBox';

const Dei = () => {
    const location = useLocation()
    const validNetworks = getCorrectChains(location.pathname)
    const chainId = useChain(validNetworks)
    useDeiUpdate(chainId)
    const collatRatio = useRecoilValue(collatRatioState)
    const web3 = useCrossWeb3(chainId)
    const { minting_fee: mintingFee, mintPaused } = useRecoilValue(husdPoolDataState)
    const deiPrices = useRecoilValue(deiPricesState)
    const [fastUpdate, setFastUpdate] = useState(0)
    const [proxy, setProxy] = useState(null)
    const [isApproved, setIsApproved] = useState(null)
    const [approveLoading, setApproveLoading] = useState(false)
    const [swapLoading, setSwapLoading] = useState(false)
    const { account } = useWeb3React()
    const [escapedType, setEscapedType] = useState("from")
    const [isPair, setIsPair] = useState(false)
    const [invert, setInvert] = useState(false)
    const [activeSearchBox, setActiveSearchBox] = useState(false)
    const [slippage, setSlippage] = useState(0.5)
    const [amountOutParams, setAmountOutParams] = useState([])
    const contractAddress = useMemo(() => DEUS_SWAP_ADDRESS[chainId], [chainId])

    const tokens = useMemo(() => chainId ? DEITokens[chainId]
        .filter((token) => (!token.pairID && token.address !== DEUS_ADDRESS[chainId])) : []
        , [chainId])
    const pairedTokens = useMemo(() => {
        let pTokens = []
        for (let i = 0; i < tokens.length; i++) {
            const t = tokens[i]
            if (t.pairID) {
                pTokens.push(tokens.slice(i, i + 2))
                i++
            } else {
                pTokens.push([tokens[i]])
            }
        }
        return pTokens
    }, [tokens])


    //eslint-disable-next-line
    const tokensMap = useMemo(() => (tokens.reduce((map, token) => (map[token.address] = { ...token, address: token.address }, map), {})
    ), [tokens])

    const balances = useTokenBalances(tokensMap, chainId)

    const TokensMap = balances

    useEffect(() => {
        for (let i = 0; i < tokens.length; i++) {
            const currToken = tokens[i]
            const { address, pairID } = currToken
            if (tokensMap[address]) tokensMap[address + pairID] = currToken
            else tokensMap[address] = currToken
        }
    }, [tokens, tokensMap])

    const [swapState, setSwapState] = useState({
        from: tokens[0],
        to: deusToken[chainId],
    })

    const [focusType, setFocusType] = useState("from1")
    const [amountIn, setAmountIn] = useState("")
    const [amountInPair, setAmountInPair] = useState("")
    const [amountOut, setAmountOut] = useState("")
    const debouncedAmountIn = useDebounce(amountIn, 1000);
    const debouncedAmountOut = useDebounce(amountOut, 1000);

    const allowance = useAllowance(swapState.from, contractAddress, chainId)

    useEffect(() => {
        // console.log("called", focusType);
        if (amountIn === "" && focusType === "from1") {
            setAmountOut("")
            setAmountInPair("")
        }
        if (amountOut === "" && focusType === "to") {
            setAmountInPair("")
            setAmountIn("")
        }

    }, [amountIn, amountOut, amountInPair, focusType]);

    useEffect(() => {
        if (focusType === "from1" && amountIn !== "" && debouncedAmountIn === amountIn) {
            getAmountsTokens(debouncedAmountIn, null, null)
        }
        // if (focusType === "to" && amountOut !== "" && debouncedAmountOut === amountOut) {
        //     getAmountsTokens(null, null, debouncedAmountOut)
        // }
    }, [debouncedAmountIn, amountInPair, debouncedAmountOut, mintingFee, deiPrices]);// eslint-disable-line


    const getAmountsTokens = async (in1, out) => {

        if (deiPrices) {
            const { collateral_price, deus_price } = deiPrices

            let amountOut = ""
            let amountIn1 = ""

            amountIn1 = in1
            const amountOutProxy = await getAmountOutDeusSwap(swapState.from, amountIn1, deus_price, collateral_price, web3, chainId)
            console.log(amountOutProxy);
            setAmountOutParams([amountOutProxy[0], amountOutProxy[1], amountOutProxy[2]])
            amountOut = amountOutProxy ? fromWei(amountOutProxy[0], swapState.to.decimals) : ""
            setAmountIn(amountIn1)
            setAmountOut(amountOut)
        }
    }

    // useEffect(() => {
    //     const changeFromTokens = () => {
    //         let primaryToken = null
    //         setIsPair(false)
    //         if (collatRatio === 100) {
    //             primaryToken = tokens[0]
    //         } else if (collatRatio > 0 && collatRatio < 100) {
    //             primaryToken = tokens[1]
    //             let secondToken = tokens[2]
    //             setIsPair(true)
    //             setPairToken(secondToken)
    //         } else if (collatRatio === 0) {
    //             primaryToken = tokens[1]
    //         }

    //         setSwapState({ to: deiToken[chainId], from: primaryToken })

    //     }
    //     if (collatRatio != null) changeFromTokens()
    // }, [collatRatio, tokens, chainId]);// eslint-disable-line

    useEffect(() => {
        setSwapState({ from: tokens[0], to: deusToken[chainId] })
        setAmountIn("")
        setAmountOut("")
        setAmountOutParams([])
    }, [tokens, chainId]);// eslint-disable-line




    useEffect(() => {
        // setIsPreApproved(null)
        setIsApproved(null)
    }, [chainId, account, isPair, swapState.from, contractAddress]);

    useEffect(() => {

        if (allowance.gt(0)) {
            setIsApproved(true)
        } else {
            setIsApproved(false)
        }

        //eslint-disable-next-line 
    }, [allowance, isApproved, proxy, isPair, contractAddress]) //isPreApproved ?





    const { onApprove } = useApprove(swapState.from, contractAddress, chainId)
    const { onMint } = useSwap(swapState.from, swapState.to, amountIn, amountOut, collatRatio, slippage, proxy, amountOutParams, chainId)

    const handleApprove = useCallback(async () => {
        try {
            setApproveLoading(true)
            const tx = await onApprove()
            if (tx.status) {
                console.log("Approved");
            } else {
                console.log("Approve Failed");

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
            const tx = await onMint()
            setSwapLoading(false)
            if (tx.status) {
                console.log("swap did");
                setAmountIn("")
                setAmountInPair("")
                setAmountOut("")
                setAmountOutParams([])
                setFastUpdate(fastUpdate => fastUpdate + 1)
            } else {
                console.log("Swap Failed");
            }
        } catch (e) {
            console.error(e)
            setSwapLoading(false)
        }
    }, [onMint])

    const showSearchBox = (active = false, type) => {
        setEscapedType(type)
        setActiveSearchBox(active)
    }

    const changeToken = (token, type) => {
        setActiveSearchBox(false)
        setAmountIn("")
        setAmountInPair("")

        if (type === "from") {
            setProxy(isProxyMinter(token, isPair, collatRatio, chainId))
        }

        const vsType = getSwapVsType(type)

        if (swapState[vsType].symbol === token.symbol) {
            return setSwapState({ ...swapState, [type]: token, [vsType]: swapState[type] })
        }
        if (token.pairID) {
            setIsPair(true)

            setSwapState({ ...swapState, [type]: token })
            return
        }
        setIsPair(false)
        setSwapState({ ...swapState, [type]: token })
    }

    // TODO: loader animation --> needs to fix at the end

    if (!swapState.from.address || collatRatio === null || mintingFee === null) {
        return (<div className="loader-wrap">
            {<img className="loader" src={process.env.PUBLIC_URL + "/img/loading.png"} alt="loader" />}
        </div>)
    }

    return (<>

        <SearchBox
            account={account}
            pairedTokens={pairedTokens}
            currencies={TokensMap}
            swapState={swapState}
            escapedType={escapedType}
            changeToken={changeToken}
            disableLoading={false}
            active={activeSearchBox}
            setActive={setActiveSearchBox} />


        <MainWrapper>
            <ContentWrapper deactivated={mintPaused}>
                <Type.XL fontWeight="300">DEUS swap</Type.XL>
                <SwapWrapper style={{ marginTop: "25px", }}>
                    <TokenBox
                        type="from"
                        setFocusType={setFocusType}
                        focusType="from1"
                        hasMax={true}
                        inputAmount={amountIn}
                        setInputAmount={setAmountIn}
                        setActive={showSearchBox}
                        currency={swapState.from}
                        TokensMap={TokensMap}
                        // disabledTitle="Please enter the desired DEI amount"
                        fastUpdate={fastUpdate}
                        chainId={chainId}
                    // proxy={proxy}
                    // placeHolder={""}
                    />



                    <Image src="/img/swap/single-arrow.svg" size="20px" my="15px" />

                    <TokenBox
                        type="to"
                        title="To (estimated)"
                        setFocusType={setFocusType}
                        focusType="to"
                        inputAmount={amountOut}
                        setInputAmount={setAmountOut}
                        setActive={null}
                        TokensMap={TokensMap}
                        currency={swapState.to}
                        fastUpdate={fastUpdate}
                        chainId={chainId}
                        hasMax={!proxy}
                        disabled={proxy}

                    // proxy={proxy}
                    // placeHolder={"ENTER AMOUNT"}
                    />

                    <RateBox state={swapState} amountIn={debouncedAmountIn} amountOut={amountOut} invert={invert} setInvert={setInvert} />

                    <SwapAction
                        bgColor={"grad_dei"}
                        text="SWAP"
                        isPreApproved={true}
                        isApproved={isApproved}
                        validNetworks={validNetworks}
                        targetToken={swapState.from}
                        loading={approveLoading}
                        swapLoading={swapLoading}
                        handleApprove={handleApprove}
                        handleSwap={handleSwap}
                        TokensMap={TokensMap}
                        swapState={swapState}
                        amountIn={amountIn}
                        amountOut={amountOut}
                        isMint={true}
                    />

                </SwapWrapper>

                <SlippageTolerance slippage={slippage} setSlippage={setSlippage} bgColor={"grad_dei"} />
                {/* <SwapCard title="Minting Fee" value={mintingFee ? `${mintingFee} %` : ""} /> */}
            </ContentWrapper>
        </MainWrapper>

        <div className='tut-left-wrap'>
            <LinkBox />
            <CostBox type={'mint'} chainId={chainId} />
        </div>

        <div className='tut-right-wrap'>
            <DeusTokenBox />
            <DeiTokenBox />
            <Chains validChainId={chainId} validNetworks={validNetworks} />
        </div>
    </>);
}

export default Dei;
