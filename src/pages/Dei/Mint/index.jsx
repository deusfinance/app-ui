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
import RateBox from '../../../components/App/Swap/RateBox';
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import { useApprove } from '../../../hooks/useApprove';
import { useAllowance } from '../../../hooks/useDei';
// import { useGetAmountsOut } from '../../../hooks/useGetAmountsOut';
import useChain from '../../../hooks/useChain';
import { getTokenAddr } from '../../../utils/contracts';
// import useTokenBalances from '../../../hooks/useTokenBalances';
import { useDebounce } from '../../../hooks/useDebounce';
import { DEI_POOL_ADDRESS } from '../../../constant/contracts';
import { PlusImg } from '../../../components/App/Dei';
import { useDeiUpdate, useGetAmountsOut, useMint, useMintingFee } from '../../../hooks/useDei';
import { isZero } from '../../../constant/number';
import { collatRatioState, deiPricesState, husdPoolDataState, mintingFeeState } from '../../../store/dei';
import { useRecoilValue } from 'recoil';
import { RemoveTrailingZero } from '../../../helper/formatBalance';

const Dei = () => {
    useDeiUpdate()
    const collatRatio = useRecoilValue(collatRatioState)
    const mintingFee = useRecoilValue(mintingFeeState)
    const deiPrices = useRecoilValue(deiPricesState)
    const husdPoolData = useRecoilValue(husdPoolDataState)

    const [invert, setInvert] = useState(false)
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

    const tokenBalances = tokensMap
    const [TokensMap, setTokensMap] = useState(tokenBalances)

    const [swapState, setSwapState] = useState({
        from: '',
        to: deiToken,
    })

    const [focusType, setFocusType] = useState("from1")
    const [hotIn, setHotIn] = useState("")
    const [amountIn, setAmountIn] = useState("")
    const [amountInPair, setAmountInPair] = useState("")
    const debouncedAmountIn = useDebounce(amountIn, 500, hotIn);
    const [amountOut, setAmountOut] = useState("")
    const [pairToken, setPairToken] = useState({ address: null })
    const allowance = useAllowance(swapState.from, contractAddress, chainId)
    const allowancePairToken = useAllowance(pairToken, contractAddress, chainId)

    useEffect(() => {
        if (amountIn === "" || debouncedAmountIn === "") setAmountOut("")
    }, [amountIn, debouncedAmountIn]);

    useEffect(() => {
        setIsPreApproved(null)
        setIsApproved(null)
    }, [chainId, account, swapState.from]);

    useEffect(() => {
        if (deiPrices) {
            const { collateral_price, dei_price, deus_price } = deiPrices
            if (focusType === "from1") {
                if (isPair) {
                    const amount = new BigNumber(amountIn).times(collateral_price).times(100 - collatRatio).div(collatRatio).div(deus_price).toFixed(18)
                    setAmountInPair(amount)
                }
                const amount = new BigNumber(amountIn).times(collateral_price).times(100).div(collatRatio).times(1 - (mintingFee / 100)).toFixed(18)
                setAmountOut(RemoveTrailingZero(amount))
            }
        }
    }, [amountIn, mintingFee, deiPrices]);


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
            } else if (isZero(collatRatio)) {
                primaryToken = DEITokens.filter(token => token.symbol === "DEUS")[0]
            }
            setSwapState({ ...swapState, from: primaryToken })
        }
        if (collatRatio) changeFromTokens()
    }, [collatRatio]);

    // useEffect(() => {
    //     setIsPreApproved(null)
    //     setIsApproved(false)
    // }, [swapState.from])

    // TODO: balances
    // useEffect(() => {
    //     setTokensMap(tokenBalances)
    // }, [tokenBalances])

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



    // const { getAmountsOut } = useGetAmountsOut(swapState.from, swapState.to, debouncedAmountIn, chainId)
    // const { getAmountsOut: getMinAmountOut } = useGetAmountsOut(swapState.from, swapState.to, 0.001, chainId)
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
    if (!collatRatio) {
        return (<div className="loader-wrap">
            {<img className="loader" src={process.env.PUBLIC_URL + "/img/loading.png"} alt="loader" />}
        </div>)
    }

    return (<>
        <MainWrapper>
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
        </MainWrapper>

        <div className='tut-left-wrap'>
            <LinkBox />
            <CostBox type={'mint'} />
        </div>
    </>);
}

export default Dei;
