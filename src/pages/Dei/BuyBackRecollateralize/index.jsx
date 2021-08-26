import SwapCard from '../../../components/App/Swap/SwapCard';
import LinkBox from '../../../components/App/Dei/LinkBox'
import { CostBoxBuyBack } from '../../../components/App/Dei/CostBoxBuyBack'
import { Type } from '../../../components/App/Text';
import styled from 'styled-components';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Image } from 'rebass/styled-components';
import { SwapWrapper } from '../../../components/App/Swap';
import TokenBox from '../../../components/App/Dei/TokenBox';
import SwapAction from '../../../components/App/Swap/SwapAction';
import RateBox from '../../../components/App/Swap/RateBox';
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import { useApprove } from '../../../hooks/useApprove';
import useChain from '../../../hooks/useChain';
import { useDebounce } from '../../../hooks/useDebounce';
import { DEITokens } from '../../../constant/token';
import { useBuyBack, useRecollat } from '../../../hooks/useDei';
import { useRecoilValue } from 'recoil';
import InfoBox from '../../../components/App/Dei/InfoBox';
import { RemoveTrailingZero } from '../../../helper/formatBalance';
import { ContentWrapper } from '../../../components/App/Dei';
import { useDeiUpdateBuyBack, useAllowance } from '../../../hooks/useDei';
import { availableRecollatState, deiPricesState, husdPoolDataState } from '../../../store/dei';
import { HUSD_POOL_ADDRESS } from '../../../constant/contracts';
import { useLocation } from 'react-router-dom';
import { getCorrectChains } from '../../../constant/correctChain';


const TopWrap = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    ${({ theme }) => theme.mediaWidth.upToExtraLarge`
        flex-direction: column;
    `}
`

const FakeWrapper = styled.div`
    flex: 0.75;
`

const MainWrapper = styled.div`
    flex: 1;
    padding-top: 60px;
    padding-bottom: 30px;
    text-align: center;
`

const msg = "There is currently no excess value to conduct buybacks."
const msg2 = "The protocol is properly collateralized."

const Dei = () => {
    const location = useLocation()
    const validNetworks = getCorrectChains(location.pathname)
    const chainId = useChain(validNetworks)
    useDeiUpdateBuyBack(chainId);

    const deiPrices = useRecoilValue(deiPricesState)
    const {
        bonus_rate: bonusRate,
        buyback_fee: buyBackFee,
        recollat_fee: recollatFee,
        availableExcessCollatDV,
        buyBackPaused,
        recollateralizePaused
    } = useRecoilValue(husdPoolDataState)

    let availableBuyback = Math.max(availableExcessCollatDV, 0)
    let availableRecollat = Math.max(useRecoilValue(availableRecollatState), 0)
    const [focusType, setFocusType] = useState("from")
    const [invert, setInvert] = useState(false)
    const [fastUpdate, setFastUpdate] = useState(0)
    const [isApproved, setIsApproved] = useState(null)
    const [isPreApproved, setIsPreApproved] = useState(null)
    const [approveLoading, setApproveLoading] = useState(false)
    const { account } = useWeb3React()
    const contractAddress = HUSD_POOL_ADDRESS[chainId]

    const tokens = useMemo(() => DEITokens.filter((token) => !token.chainId || token.chainId === chainId), [chainId])
    const tokensMap = {}

    for (let i = 0; i < tokens.length; i++) {
        const currToken = tokens[i]
        const { address, pairID } = currToken
        if (tokensMap[address]) tokensMap[address + pairID] = currToken
        else tokensMap[address] = currToken
    }

    const TokensMap = tokensMap
    let primaryToken = tokens.filter(token => token.symbol === "DEUS")[0]
    let secondaryToken = tokens.filter(token => token.symbol === "HUSD")[0]
    const swapState = { from: secondaryToken, to: primaryToken }
    const [amountIn1, setAmountIn1] = useState("")
    const [amountIn2, setAmountIn2] = useState("")
    const debouncedAmountIn = useDebounce(amountIn1, 500);
    const [amountOut1, setAmountOut1] = useState("")
    const [amountOut2, setAmountOut2] = useState("")
    const allowance = useAllowance(swapState.from, contractAddress, chainId)

    useEffect(() => {
        if (amountIn1 === "" || debouncedAmountIn === "") setAmountOut1("")
    }, [amountIn1, debouncedAmountIn]);

    useEffect(() => {
        if (amountIn2 === "" || debouncedAmountIn === "") setAmountOut2("")
    }, [amountIn2, debouncedAmountIn]);

    useEffect(() => {
        setIsPreApproved(null)
        setIsApproved(null)
    }, [chainId, account, swapState.from]);


    const getAmountsTokens1 = (in1, out1) => {
        if (deiPrices) {
            const { collateral_price, deus_price } = deiPrices

            let amountIn1 = ""
            let amountOut1 = ""
            if (in1) {
                amountIn1 = in1
                amountOut1 = RemoveTrailingZero(new BigNumber(in1).times(deus_price).div(collateral_price).times(1 - (buyBackFee / 1e6)).toFixed(18))
            } if (out1) {
                amountIn1 = RemoveTrailingZero(new BigNumber(out1).div(deus_price).times(collateral_price).div(1 - (buyBackFee / 1e6)).toFixed(18))
                amountOut1 = out1
            }
            setAmountIn1(amountIn1)
            setAmountOut1(amountOut1)
        }
    }

    useEffect(() => {
        if (focusType === "from") {
            getAmountsTokens1(amountIn1, null)
        } if (focusType === "to") {
            getAmountsTokens1(null, amountOut1)
        }
    }, [amountIn1, amountOut1, focusType, recollatFee, deiPrices]);// eslint-disable-line


    useEffect(() => {
        if (focusType === "from") {
            getAmountsTokens2(amountIn2, null)
        } if (focusType === "to") {
            getAmountsTokens2(null, amountOut2)
        }
    }, [amountIn2, amountOut2, recollatFee, deiPrices, focusType]);// eslint-disable-line

    const getAmountsTokens2 = (in1, out1) => {
        if (deiPrices) {
            const { collateral_price, deus_price } = deiPrices

            let amountIn1 = ""
            let amountOut1 = ""
            if (in1) {
                amountIn1 = in1
                amountOut1 = RemoveTrailingZero(new BigNumber(in1).div(deus_price).times(collateral_price).times(1 - (recollatFee / 1e6)).plus(bonusRate).toFixed(18))
            } if (out1) {
                amountIn1 = RemoveTrailingZero(new BigNumber(out1).minus(bonusRate).times(deus_price).div(collateral_price).div(1 - (recollatFee / 1e6)).toFixed(18))
                amountOut1 = out1
            }
            setAmountIn2(amountIn1)
            setAmountOut2(amountOut1)
        }
    }

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
    }, [allowance]) //isPreApproved ?

    let targetToken = useMemo(() => {
        if (availableBuyback !== null) return availableBuyback > 0 ? swapState.from : swapState.to
    }, [availableBuyback, swapState])

    const { onApprove } = useApprove(targetToken, contractAddress, chainId)
    const { onBuyBack } = useBuyBack(swapState.to, swapState.from, amountIn1, amountOut1, chainId)
    const { onRecollat } = useRecollat(swapState.from, swapState.to, amountIn2, amountOut2, chainId)

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

    const handleSwap1 = useCallback(async () => {
        try {
            const tx = await onBuyBack()
            if (tx.status) {
                console.log("BuyBack did");
                setAmountIn1("")
                setFastUpdate(fastUpdate => fastUpdate + 1)
            } else {
                console.log("BuyBack Failed");
            }
        } catch (e) {
            console.error(e)
        }
    }, [onBuyBack])

    const handleSwap2 = useCallback(async () => {
        try {
            const tx = await onRecollat()
            if (tx.status) {
                console.log("Recollat did");
                setAmountIn2("")
                setFastUpdate(fastUpdate => fastUpdate + 1)
            } else {
                console.log("Recollat failed");
            }
        } catch (e) {
            console.error(e)
        }
    }, [onRecollat])

    return (<>
        <TopWrap>
            <FakeWrapper></FakeWrapper>

            <MainWrapper>
                <ContentWrapper deactivated={buyBackPaused || !availableBuyback}>
                    <Type.XL fontWeight="300">Buyback</Type.XL>
                    <SwapWrapper style={{ marginTop: "25px" }}>
                        <TokenBox
                            type="from"
                            hasMax={true}
                            setFocusType={setFocusType}
                            focusType="from"
                            inputAmount={amountIn1}
                            setInputAmount={setAmountIn1}
                            setActive={null}
                            currency={swapState.to}
                            TokensMap={TokensMap}
                            fastUpdate={fastUpdate}
                            chainId={chainId}
                        />

                        <Image src="/img/swap/single-arrow.svg" size="20px" my="15px" />

                        <TokenBox
                            type="to"
                            title="To (estimated)"
                            setFocusType={setFocusType}
                            focusType="to"
                            inputAmount={amountOut1}
                            setInputAmount={setAmountOut1}
                            setActive={null}
                            TokensMap={TokensMap}
                            currency={swapState.from}
                            fastUpdate={fastUpdate}
                            chainId={chainId}
                        />

                        <RateBox state={swapState} amountIn={debouncedAmountIn} amountOut={amountOut1} invert={invert} setInvert={setInvert} />

                        <SwapAction
                            bgColor={"grad_dei"}
                            text="BUYBACK"
                            isPreApproved={isPreApproved}
                            validNetworks={validNetworks}
                            isApproved={isApproved}
                            loading={approveLoading}
                            handleApprove={handleApprove}
                            handleSwap={handleSwap1}
                            TokensMap={TokensMap}
                            swapState={swapState}
                            amountIn={amountIn1}
                            amountOut={amountOut1}
                        />

                    </SwapWrapper>

                    <SwapCard title="BuyBack Fee" value={buyBackFee ? `${buyBackFee / 10000} %` : null} />
                </ContentWrapper>

                {!availableBuyback && <InfoBox title={msg} />}
            </MainWrapper>

            <MainWrapper>
                <ContentWrapper deactivated={recollateralizePaused || !availableRecollat}>
                    <Type.XL fontWeight="300">Recollateralize</Type.XL>
                    <SwapWrapper style={{ marginTop: "25px", }}>
                        <TokenBox
                            type="from"
                            hasMax={true}
                            setFocusType={setFocusType}
                            focusType="from"
                            inputAmount={amountIn2}
                            setInputAmount={setAmountIn2}
                            setActive={null}
                            currency={swapState.from}
                            TokensMap={TokensMap}
                            fastUpdate={fastUpdate}
                            chainId={chainId}
                        />

                        <Image src="/img/swap/single-arrow.svg" size="20px" my="15px" />

                        <TokenBox
                            type="to"
                            title="To (estimated)"
                            setFocusType={setFocusType}
                            focusType="to"
                            inputAmount={amountOut2}
                            setInputAmount={setAmountOut2}
                            setActive={null}
                            TokensMap={TokensMap}
                            currency={swapState.to}
                            fastUpdate={fastUpdate}
                            chainId={chainId}
                        />

                        <RateBox state={swapState} amountIn={debouncedAmountIn} amountOut={amountOut2} invert={invert} setInvert={setInvert} />

                        <SwapAction
                            bgColor={"grad_dei"}
                            text="RECOLLATERALIZE"
                            isPreApproved={isPreApproved}
                            validNetworks={validNetworks}
                            isApproved={isApproved}
                            loading={approveLoading}
                            handleApprove={handleApprove}
                            handleSwap={handleSwap2}
                            TokensMap={TokensMap}
                            swapState={swapState}
                            amountIn={amountIn2}
                            amountOut={amountOut2}
                        />

                    </SwapWrapper>

                    <SwapCard title="Recollateralize Fee" value={recollatFee ? `${recollatFee / 10000} %` : null} />
                </ContentWrapper>

                {!availableRecollat && <InfoBox title={msg2} />}
            </MainWrapper>
            <FakeWrapper></FakeWrapper>
        </TopWrap>

        <div className='tut-left-wrap'>
            <LinkBox />
            <CostBoxBuyBack />
        </div>
    </>);
}

export default Dei;