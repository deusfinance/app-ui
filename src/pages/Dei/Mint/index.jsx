import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MainWrapper, SwapWrapper } from '../../../components/App/Swap';
import { DEITokens, deiToken } from '../../../constant/token';
import { CostBox } from '../../../components/App/Dei/CostBox';
import SwapCard from '../../../components/App/Swap/SwapCard';
import LinkBox from '../../../components/App/Dei/LinkBox'
import { Type } from '../../../components/App/Text';
import { Image } from 'rebass/styled-components';
import TokenBox from '../../../components/App/Dei/TokenBox';
import SwapAction from '../../../components/App/Dei/SwapAction';
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import { useApprove } from '../../../hooks/useApprove';
import { useAllowance } from '../../../hooks/useDei';
import useChain from '../../../hooks/useChain';
import { useDebounce } from '../../../hooks/useDebounce';
import { DEI_POOL_ADDRESS } from '../../../constant/contracts';
import { ContentWrapper, PlusImg } from '../../../components/App/Dei';
import { useDeiUpdate, useMint } from '../../../hooks/useDei';
import { collatRatioState, deiPricesState, husdPoolDataState } from '../../../store/dei';
import { useRecoilValue } from 'recoil';
import { RemoveTrailingZero } from '../../../helper/formatBalance';

const Dei = () => {
    useDeiUpdate()
    const collatRatio = useRecoilValue(collatRatioState)
    const { minting_fee: mintingFee, mintPaused } = useRecoilValue(husdPoolDataState)
    const deiPrices = useRecoilValue(deiPricesState)
    const [fastUpdate, setFastUpdate] = useState(0)
    const [isApproved, setIsApproved] = useState(null)
    const [isPreApproved, setIsPreApproved] = useState(null)
    const [approveLoading, setApproveLoading] = useState(false)
    const { account } = useWeb3React()
    const validNetworks = [4, 1]
    const chainId = useChain(validNetworks)
    const [isPair, setIsPair] = useState(false)
    const contractAddress = DEI_POOL_ADDRESS[chainId]

    const tokens = useMemo(() => DEITokens.filter((token) => !token.chainId || token.chainId === chainId), [chainId])
    const tokensMap = {}

    for (let i = 0; i < tokens.length; i++) {
        const currToken = tokens[i]
        const { address, pairID } = currToken
        if (tokensMap[address]) tokensMap[address + pairID] = currToken
        else tokensMap[address] = currToken
    }

    // const tokenBalances = tokensMap
    // const [TokensMap, setTokensMap] = useState(tokenBalances)

    const TokensMap = tokensMap
    const [swapState, setSwapState] = useState({
        from: '',
        to: deiToken,
    })

    const [focusType, setFocusType] = useState("from1")
    const [amountIn, setAmountIn] = useState("")
    const [amountInPair, setAmountInPair] = useState("")
    const debouncedAmountIn = useDebounce(amountIn, 500);
    const [amountOut, setAmountOut] = useState("")
    const [pairToken, setPairToken] = useState({ address: null })
    const allowance = useAllowance(swapState.from, contractAddress, chainId)
    const allowancePairToken = useAllowance(pairToken, contractAddress, chainId)

    useEffect(() => {
        if (amountIn === "" || debouncedAmountIn === "") setAmountOut("")
    }, [amountIn, debouncedAmountIn]);

    useEffect(() => {
        if (focusType === "from1") {
            getAmountsTokens(amountIn, null, null)
        }
        if (focusType === "from2") {
            console.log(amountInPair);
            getAmountsTokens(null, amountInPair, null)
        }
        if (focusType === "to") {
            getAmountsTokens(null, null, amountOut)
        }
    }, [amountIn, amountInPair, amountOut, mintingFee, deiPrices]);// eslint-disable-line


    const getAmountsTokens = (in1, in2, out) => {
        if (deiPrices) {
            const { collateral_price, deus_price } = deiPrices
            const in1Unit = collatRatio === 0 ? deus_price : collateral_price
            const in2Unit = deus_price

            let amountOut = ""
            let amountIn1 = ""
            let amountIn2 = ""
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
                amountIn1 = RemoveTrailingZero(new BigNumber(out).times(1 + (mintingFee / 100)).times(collatRatio).div(100).div(in1Unit), swapState.from.decimals)
                amountIn2 = RemoveTrailingZero(new BigNumber(out).times(1 + (mintingFee / 100)).times(100 - collatRatio).div(100).div(in2Unit), pairToken.decimals)
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
                primaryToken = DEITokens.filter(token => token.symbol === "HUSD")[0]
            } else if (collatRatio > 0 && collatRatio < 100) {
                primaryToken = DEITokens.filter(token => token.symbol === "HUSD P")[0]
                let secondToken = DEITokens.filter(currToken => {
                    return currToken.pairID === primaryToken.pairID && currToken.address !== primaryToken.address
                })[0]
                setIsPair(true)
                setPairToken(secondToken)
            } else if (collatRatio === 0) {
                primaryToken = DEITokens.filter(token => token.symbol === "DEUS")[0]
            }
            setSwapState({ ...swapState, from: primaryToken })
        }
        if (collatRatio != null) changeFromTokens()
    }, [collatRatio]);// eslint-disable-line


    useEffect(() => {
        setIsPreApproved(null)
        setIsApproved(null)
    }, [chainId, account, swapState.from]);

    useEffect(() => {
        if (isPreApproved == null) {
            if (allowance.toString() === "-1" || (isPair ? allowancePairToken.toString() === "-1" : false)) {
                setIsPreApproved(null) //doNothing
            } else {
                if (allowance.gt(0) && (isPair ? allowancePairToken.gt(0) : true)) {
                    setIsPreApproved(true)

                } else {
                    setIsPreApproved(false)
                }
            }
        } else {
            if (allowance.gt(0) && (isPair ? allowancePairToken.gt(0) : true)) {
                setIsApproved(true)

            }
        }
        //eslint-disable-next-line 
    }, [allowance, allowancePairToken, isPair]) //isPreApproved ?



    let targetToken = useMemo(() => {
        if (pairToken && allowance.gt(0) && !allowancePairToken.gt(0)) {
            return pairToken
        }
        return swapState.from
    }, [pairToken, allowance, allowancePairToken, swapState.from])

    const { onApprove } = useApprove(targetToken, contractAddress, chainId)
    const { onMint } = useMint(swapState.from, pairToken, swapState.to, amountIn, amountInPair, amountOut, collatRatio, chainId)

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
            const tx = await onMint()
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
    }, [onMint])


    // TODO: loader animation --> needs to fix at the end
    if (collatRatio === null || mintingFee === null) {
        return (<div className="loader-wrap">
            {<img className="loader" src={process.env.PUBLIC_URL + "/img/loading.png"} alt="loader" />}
        </div>)
    }

    return (<>
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
                        setActive={null}
                        currency={swapState.from}
                        TokensMap={TokensMap}
                        fastUpdate={fastUpdate}
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
                    />

                    {/* <RateBox state={swapState} amountIn={debouncedAmountIn} amountOut={amountOut} invert={invert} setInvert={setInvert} /> */}

                    <SwapAction
                        bgColor={"grad_dei"}
                        text="MINT"
                        isPreApproved={isPreApproved}
                        validNetworks={validNetworks}
                        isApproved={isApproved}
                        targetToken={targetToken}
                        loading={approveLoading}
                        handleApprove={handleApprove}
                        handleSwap={handleSwap}
                        TokensMap={TokensMap}
                        swapState={swapState}
                        amountIn={amountIn}
                        amountOut={amountOut}
                    />

                </SwapWrapper>

                <SwapCard title="Minting Fee" value={mintingFee ? `${mintingFee} %` : ""} />
            </ContentWrapper>
        </MainWrapper>

        <div className='tut-left-wrap'>
            <LinkBox />
            <CostBox type={'mint'} />
        </div>
    </>);
}

export default Dei;
