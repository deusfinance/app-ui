import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MainWrapper, SwapWrapper } from '../../../components/App/Swap';
import { DEITokens, deiToken } from '../../../constant/token';
import { CostBox } from '../../../components/App/Dei/CostBox';
import SwapCard from '../../../components/App/Swap/SwapCard';
import SlippageTolerance from '../../../components/App/Swap/SlippageTolerance';
import LinkBox from '../../../components/App/Dei/LinkBox'
import { Type } from '../../../components/App/Text';
import { Image } from 'rebass/styled-components';
import TokenBox from '../../../components/App/Dei/TokenBox';
import SwapAction from '../../../components/App/Dei/SwapAction';
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import { useApprove } from '../../../hooks/useApprove';
import useChain from '../../../hooks/useChain';
import { useDebounce } from '../../../hooks/useDebounce';
import { COLLATERAL_POOL_ADDRESS, PROXY_MINT_ADDRESS } from '../../../constant/contracts';
import { ContentWrapper, PlusImg } from '../../../components/App/Dei';
import { useDeiUpdate, useMint, useAllowance } from '../../../hooks/useDei';
import { collatRatioState, deiPricesState, husdPoolDataState } from '../../../store/dei';
import { useRecoilValue } from 'recoil';
import { fromWei, RemoveTrailingZero } from '../../../helper/formatBalance';
import { useLocation } from 'react-router-dom';
import { getCorrectChains } from '../../../constant/correctChain';
import { isProxyMinter, getAmountOutProxy } from '../../../helper/deiHelper';
import { getSwapVsType } from '../../../utils/utils';
import SearchBox from '../../../components/App/Dei/SearchBox';
import { useCrossWeb3 } from '../../../hooks/useWeb3';
import useTokenBalances from '../../../hooks/useTokenBalances';

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
    const [activeSearchBox, setActiveSearchBox] = useState(false)
    const [slippage, setSlippage] = useState(0.5)
    const contractAddress = useMemo(() => proxy ? PROXY_MINT_ADDRESS[chainId] : COLLATERAL_POOL_ADDRESS[chainId], [chainId, proxy])
    const tokens = useMemo(() => chainId ? DEITokens[chainId]
        .filter((token) => !token.pairID || (token.pairID && ((collatRatio > 0 && collatRatio < 100)))) : []
        , [chainId, collatRatio])
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
        from: {},
        to: deiToken[chainId],
    })

    const [focusType, setFocusType] = useState("from1")
    const [amountIn, setAmountIn] = useState("")
    const [amountInPair, setAmountInPair] = useState("")
    const [amountOut, setAmountOut] = useState("")
    const debouncedAmountIn = useDebounce(amountIn, 1000);
    const debouncedAmountOut = useDebounce(amountOut, 1000);
    const [pairToken, setPairToken] = useState({ address: null })

    const allowance = useAllowance(swapState.from, contractAddress, chainId)
    const allowancePairToken = useAllowance(pairToken, contractAddress, chainId)

    useEffect(() => {
        console.log("called", focusType);
        if (amountIn === "" && focusType === "from1") {
            setAmountOut("")
            setAmountInPair("")
        }
        if (amountIn === "" && focusType === "from2") {
            setAmountOut("")
            setAmountIn("")
        }

    }, [amountIn, focusType]);

    useEffect(() => {
        if (focusType === "from1") {
            getAmountsTokens(debouncedAmountIn, null, null)
        }
        if (focusType === "from2") {
            console.log(amountInPair);
            getAmountsTokens(null, amountInPair, null)
        }
        if (focusType === "to") {
            getAmountsTokens(null, null, debouncedAmountOut)
        }
    }, [debouncedAmountIn, amountInPair, debouncedAmountOut, mintingFee, deiPrices]);// eslint-disable-line


    const getAmountsTokens = async (in1, in2, out) => {

        if (deiPrices) {
            const { collateral_price, deus_price } = deiPrices

            const in1Unit = collatRatio === 0 ? deus_price : collateral_price
            const in2Unit = deus_price

            let amountOut = ""
            let amountIn1 = ""
            let amountIn2 = ""
            if (!proxy) {
                if (in1) {
                    amountIn1 = in1
                    amountIn2 = (collatRatio > 0 && collatRatio < 100) ? RemoveTrailingZero(new BigNumber(amountIn1).times(in1Unit).times(100 - collatRatio).div(collatRatio).div(in2Unit), pairToken.decimals) : 0
                    amountOut = RemoveTrailingZero(new BigNumber(amountIn1).times(in1Unit).plus(new BigNumber(amountIn2).times(in2Unit)).times(1 - (mintingFee / 100)), swapState.to.decimals)
                } else if (in2) {
                    amountIn2 = in2
                    amountIn1 = RemoveTrailingZero(new BigNumber(amountIn2).times(in2Unit).times(collatRatio).div(100 - collatRatio).div(in1Unit), swapState.from.decimals)
                    amountOut = RemoveTrailingZero(new BigNumber(amountIn1).times(in1Unit).plus(new BigNumber(amountIn2).times(in2Unit)).times(1 - (mintingFee / 100)), swapState.to.decimals)
                } if (out) {
                    amountOut = out
                    amountIn1 = RemoveTrailingZero(new BigNumber(out).div(1 - (mintingFee / 100)).times(collatRatio).div(100).div(in1Unit), swapState.from.decimals, BigNumber.ROUND_DOWN)
                    amountIn2 = RemoveTrailingZero(new BigNumber(out).div(1 - (mintingFee / 100)).times(100 - collatRatio).div(100).div(in2Unit), pairToken.decimals, BigNumber.ROUND_UP)
                }
            } else {
                amountOut = out
                const amountOutProxy = await getAmountOutProxy(swapState.from, amountOut, deus_price, collateral_price, web3, chainId)
                amountIn1 = amountOutProxy ? fromWei(amountOutProxy, swapState.from.decimals) : ""
            }
            setAmountIn(amountIn1)
            setAmountInPair(amountIn2)
            setAmountOut(amountOut)
        }
    }

    useEffect(() => {
        const changeFromTokens = () => {
            let primaryToken = null
            setIsPair(false)
            if (collatRatio === 100) {
                primaryToken = tokens[0]
            } else if (collatRatio > 0 && collatRatio < 100) {
                primaryToken = tokens[2]
                let secondToken = tokens[3]
                setIsPair(true)
                setPairToken(secondToken)
            } else if (collatRatio === 0) {
                primaryToken = tokens[1]
            }
            setSwapState({ ...swapState, from: primaryToken })

        }
        if (collatRatio != null) changeFromTokens()
    }, [collatRatio]);// eslint-disable-line

    useEffect(() => {
        // setIsPreApproved(null)
        setIsApproved(null)
    }, [chainId, account, isPair, swapState.from, contractAddress]);

    useEffect(() => {
        setProxy(isProxyMinter(swapState.from, isPair, collatRatio, chainId))
    }, [swapState.from, isPair, chainId, collatRatio])


    useEffect(() => {
        console.log("focusType : ", focusType);
    }, [focusType])

    useEffect(() => {

        if (allowance.gt(0) && (isPair ? allowancePairToken.gt(0) : true)) {
            setIsApproved(true)
            // console.log("come 1");
        } else {
            setIsApproved(false)
            // console.log("come 2");
        }

        //eslint-disable-next-line 
    }, [allowance, allowancePairToken, isApproved, proxy, isPair, contractAddress]) //isPreApproved ?



    let targetToken = useMemo(() => {
        if (pairToken && allowance.gt(0) && !allowancePairToken.gt(0)) {
            return pairToken
        }
        return swapState.from
    }, [pairToken, allowance, allowancePairToken, swapState.from])


    const { onApprove } = useApprove(targetToken, contractAddress, chainId)
    const { onMint } = useMint(swapState.from, pairToken, swapState.to, amountIn, amountInPair, amountOut, collatRatio, slippage, proxy, chainId)

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
            let secondToken = tokens.filter(currToken => {
                return currToken.pairID === token.pairID && currToken.address !== token.address
            })[0]
            console.log(secondToken);
            setPairToken(secondToken)
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
                <Type.XL fontWeight="300">Mint</Type.XL>
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
                        disabled={proxy}
                        fastUpdate={fastUpdate}
                        chainId={chainId}
                    />

                    {isPair && <div>
                        <PlusImg src="/img/dei/plus.svg" alt="plus" />
                        <TokenBox
                            mt={"-21px"}
                            type="from"
                            setFocusType={setFocusType}
                            focusType="from2"
                            hasMax={true}
                            inputAmount={amountInPair}
                            setInputAmount={setAmountInPair}
                            setActive={null}
                            currency={pairToken}
                            TokensMap={TokensMap}
                            fastUpdate={fastUpdate}
                            chainId={chainId}
                        />
                    </div>}

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
                    />

                    {/* <RateBox state={swapState} amountIn={debouncedAmountIn} amountOut={amountOut} invert={invert} setInvert={setInvert} /> */}

                    <SwapAction
                        bgColor={"grad_dei"}
                        text="MINT"
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
                    />

                </SwapWrapper>

                <SlippageTolerance slippage={slippage} setSlippage={setSlippage} bgColor={"grad_dei"} />
                <SwapCard title="Minter Contract" value={proxy === null ? "..." : proxy ? "Proxy" : "Collateral Pool"} />
                <SwapCard title="Minting Fee" value={mintingFee ? `${mintingFee} %` : ""} />
            </ContentWrapper>
        </MainWrapper>

        <div className='tut-left-wrap'>
            <LinkBox />
            <CostBox type={'mint'} chainId={chainId} />
        </div>
    </>);
}

export default Dei;
