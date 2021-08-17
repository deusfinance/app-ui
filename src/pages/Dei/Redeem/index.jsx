import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Image } from 'rebass/styled-components';
import { MainWrapper, SwapWrapper } from '../../../components/App/Swap';
import TokenBox from '../../../components/App/Dei/TokenBox';
import SwapAction from '../../../components/App/Dei/SwapAction';
import SwapCard from '../../../components/App/Swap/SwapCard';
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import { useApprove } from '../../../hooks/useApprove';
import { useAllowance } from '../../../hooks/useAllowance';
import { DEITokens, deiToken } from '../../../constant/token';
import useChain from '../../../hooks/useChain';
import { useDebounce } from '../../../hooks/useDebounce';
import { HUSD_POOL_ADDRESS } from '../../../constant/contracts';
import LinkBox from '../../../components/App/Dei/LinkBox'
import { CostBox } from '../../../components/App/Dei/CostBox'
import RedeemedToken from '../../../components/App/Dei/RedeemedToken'
import { Type } from '../../../components/App/Text';
import { isZero } from '../../../constant/number';
import { collatRatioState, deiPricesState, husdPoolDataState } from '../../../store/dei';
import { useRecoilValue } from 'recoil';
import { useDeiUpdateRedeem, useRedeem } from '../../../hooks/useDei';
import { PlusImg } from '../../../components/App/Dei';
import { RemoveTrailingZero } from '../../../helper/formatBalance';
import { ContentWrapper } from '../../../components/App/Dei';

const Dei = () => {
    const validNetworks = [4]
    const chainId = useChain(validNetworks)
    useDeiUpdateRedeem(chainId)

    const collatRatio = useRecoilValue(collatRatioState)
    const deiPrices = useRecoilValue(deiPricesState)
    const { redemption_fee: redemptionFee, redeemPaused } = useRecoilValue(husdPoolDataState)
    const [fastUpdate, setFastUpdate] = useState(0)
    const [isApproved, setIsApproved] = useState(null)
    const [isPreApproved, setIsPreApproved] = useState(null)
    const [approveLoading, setApproveLoading] = useState(false)
    const { account } = useWeb3React()

    const [isPair, setIsPair] = useState(false)
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

    let secondaryToken = DEITokens[2]
    const [swapState, setSwapState] = useState({
        from: deiToken,
        to: secondaryToken,
    })

    const [focusType, setFocusType] = useState("from1")
    const [amountIn, setAmountIn] = useState("")
    const [amountOutPair, setAmountOutPair] = useState("")
    const debouncedAmountIn = useDebounce(amountIn, 500);
    const [amountOut, setAmountOut] = useState("")
    const allowance = useAllowance(swapState.from, contractAddress, chainId)
    const [pairToken, setPairToken] = useState({})

    useEffect(() => {
        if (amountIn === "" || debouncedAmountIn === "") setAmountOut("")
    }, [amountIn, debouncedAmountIn]);

    useEffect(() => {
        setIsPreApproved(null)
        setIsApproved(null)
    }, [chainId, account, swapState.from]);

    useEffect(() => {
        if (focusType === "from") {
            getAmountsTokens(amountIn, null, null)
        } if (focusType === "to1") {
            getAmountsTokens(null, amountOut, null)
        } if (focusType === "to2") {
            getAmountsTokens(null, null, amountOutPair)
        }
    }, [amountIn, amountOut, amountOutPair, redemptionFee, focusType, deiPrices]);// eslint-disable-line

    const getAmountsTokens = (in1, out1, out2) => {
        if (deiPrices) {
            const { collateral_price, deus_price } = deiPrices

            let amountIn1 = ""
            let amountOut1 = ""
            let amountOut2 = ""
            if (in1) {
                amountIn1 = in1
                amountOut1 = RemoveTrailingZero(new BigNumber(amountIn1).times(collateral_price).div(100).times(collatRatio).times(1 - (redemptionFee / 100)).toFixed(18))
                amountOut2 = RemoveTrailingZero(new BigNumber(amountIn1).times(100 - collatRatio).div(100).div(deus_price).toFixed(18))
            } if (out1) {
                amountIn1 = RemoveTrailingZero(new BigNumber(out1).div(collateral_price).times(100).div(collatRatio).div(1 - (redemptionFee / 100)).toFixed(18))
                amountOut1 = out1
                amountOut2 = RemoveTrailingZero(new BigNumber(out1).div(collateral_price).div(collatRatio).div(1 - (redemptionFee / 100)).times(100 - collatRatio).div(deus_price).toFixed(18))
            } if (out2) {
                amountIn1 = RemoveTrailingZero(new BigNumber(out2).times(100).times(deus_price).div(100 - collatRatio).toFixed(18))
                amountOut1 = RemoveTrailingZero(new BigNumber(out2).times(collateral_price).times(collatRatio).times(1 - (redemptionFee / 100)).div(100 - collatRatio).times(deus_price).toFixed(18))
                amountOut2 = out2
            }
            setAmountIn(amountIn1)
            setAmountOut(amountOut1)
            setAmountOutPair(amountOut2)
        }
    }

    useEffect(() => {
        const changeToTokens = () => {
            let primaryToken = null
            setIsPair(false)
            if (collatRatio === 100) {
                primaryToken = DEITokens[0]
            } else if (collatRatio > 0 && collatRatio < 100) {
                primaryToken = DEITokens[2]
                let secondToken = DEITokens[3]
                setIsPair(true)
                setPairToken(secondToken)
            } else if (isZero(collatRatio)) {
                primaryToken = DEITokens[1]
            }
            setSwapState({ ...swapState, to: primaryToken })
        }
        if (collatRatio !== null) changeToTokens()
    }, [collatRatio]);// eslint-disable-line

    useEffect(() => {
        const token = swapState.to
        setIsPair(false)
        if (swapState?.to?.pairID) {
            setIsPair(true)
            let secondToken = DEITokens.filter(currToken => {
                return currToken.pairID === token.pairID && currToken.address !== token.address
            })[0]
            setPairToken(secondToken)
        }
    }, [swapState])

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

    const { onApprove } = useApprove(swapState.from, contractAddress, chainId)
    const { onRedeem } = useRedeem(swapState.from, swapState.to, pairToken, amountIn, amountOut, amountOutPair, collatRatio, chainId)

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
            const tx = await onRedeem()
            if (tx.status) {
                console.log("Redeem did");
                setAmountIn("")
                setFastUpdate(fastUpdate => fastUpdate + 1)
            } else {
                console.log("Redeem Failed");
            }
        } catch (e) {
            console.error(e)
        }
    }, [onRedeem])

    return (<>
        <MainWrapper>
            <ContentWrapper deactivated={redeemPaused}>
                <Type.XL fontWeight="300">Redeem</Type.XL>
                <SwapWrapper style={{ marginTop: "25px", }}>
                    <TokenBox
                        type="from"
                        setFocusType={setFocusType}
                        focusType="from"
                        hasMax={true}
                        inputAmount={amountIn}
                        setInputAmount={setAmountIn}
                        setActive={null}
                        currency={swapState.from}
                        TokensMap={TokensMap}
                        fastUpdate={fastUpdate}
                    />

                    <Image src="/img/swap/single-arrow.svg" size="20px" my="15px" />

                    <TokenBox
                        type="to"
                        setFocusType={setFocusType}
                        focusType="to1"
                        title="To (estimated)"
                        inputAmount={amountOut}
                        setInputAmount={setAmountOut}
                        setActive={null}
                        TokensMap={TokensMap}
                        currency={swapState.to}
                        fastUpdate={fastUpdate}
                    />

                    {isPair && <div>
                        <PlusImg src="/img/dei/plus.svg" alt="plus" />
                        <TokenBox
                            mt={"-21px"}
                            type="to"
                            setFocusType={setFocusType}
                            focusType="to2"
                            title="To (estimated)"
                            inputAmount={amountOutPair}
                            setInputAmount={setAmountOutPair}
                            setActive={null}
                            currency={pairToken}
                            TokensMap={TokensMap}
                            fastUpdate={fastUpdate}
                        />
                    </div>}

                    <SwapAction
                        bgColor={"grad_dei"}
                        text="REDEEM"
                        isPreApproved={isPreApproved}
                        validNetworks={[1, 4]}
                        isApproved={isApproved}
                        targetToken={swapState.from}
                        loading={approveLoading}
                        handleApprove={handleApprove}
                        handleSwap={handleSwap}
                        TokensMap={TokensMap}
                        swapState={swapState}
                        amountIn={amountIn}
                        amountOut={amountOut}
                    />

                </SwapWrapper>

                <SwapCard title="Redemption Fee" value={redemptionFee ? `${redemptionFee} %` : ""} />

                <RedeemedToken
                    title="Redeemed Token ready for claim"
                    currencies={[secondaryToken, pairToken]}
                />

            </ContentWrapper>
        </MainWrapper>

        <div className='tut-left-wrap'>
            <LinkBox />
            <CostBox type={'redeem'} />
        </div>
    </>);
}

export default Dei;