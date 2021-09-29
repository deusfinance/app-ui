import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MainWrapper, SwapWrapper } from '../../../components/App/Swap';
import { DEITokens, deiToken } from '../../../constant/token';
import { StakingConfig } from '../../../constant/staking';
import { CostBox } from '../../../components/App/Dei/CostBox';
import SwapCard from '../../../components/App/Swap/SwapCard';
import SlippageTolerance from '../../../components/App/Swap/SlippageTolerance';
import LinkBox from '../../../components/App/Dei/LinkBox'
import { Type } from '../../../components/App/Text';
import { Image } from 'rebass/styled-components';
import { ZapContainer } from '../../../components/App/Dei/Zap';
import ZapBox from '../../../components/App/Dei/ZapBox';
import ZapStakingBox from '../../../components/App/Dei/ZapStakingBox';
import SwapAction from '../../../components/App/Dei/SwapAction';
import { useWeb3React } from '@web3-react/core';
import { useApprove } from '../../../hooks/useApprove';
import useTokenBalances from '../../../hooks/useTokenBalances';
import useChain from '../../../hooks/useChain';
import { useDebounce } from '../../../hooks/useDebounce';
import { ContentWrapper } from '../../../components/App/Dei';
import { useDeiUpdate, useZap, useAllowance } from '../../../hooks/useDei';
import { collatRatioState, husdPoolDataState } from '../../../store/dei';
import { useRecoilValue } from 'recoil';
import { useLocation } from 'react-router-dom';
import { getCorrectChains } from '../../../constant/correctChain';
import { getSwapVsType } from '../../../utils/utils';
import SearchBox from '../../../components/App/Swap/SearchBox';
import { ChainId } from '../../../constant/web3';

const Zap = () => {
    const location = useLocation()
    const { account, chainId } = useWeb3React()
    const tempChain = null
    const userChain = tempChain ? tempChain : chainId
    const validChains = getCorrectChains(location.pathname)
    const currChain = userChain && validChains.indexOf(userChain) !== -1 ? userChain : ChainId.RINKEBY //TODO
    // console.log(currChain);
    // const chainId = useChain(validNetworks)
    // console.log(chainId);
    useDeiUpdate(currChain)
    const collatRatio = useRecoilValue(collatRatioState)
    const { minting_fee: mintingFee, mintPaused } = useRecoilValue(husdPoolDataState)
    const [fastUpdate, setFastUpdate] = useState(0)
    const [isApproved, setIsApproved] = useState(null)
    const [isPreApproved, setIsPreApproved] = useState(null)
    const [approveLoading, setApproveLoading] = useState(false)
    const [swapLoading, setSwapLoading] = useState(false)
    const [escapedType, setEscapedType] = useState("from")
    const [activeSearchBox, setActiveSearchBox] = useState(false)
    const [activeStakingList, setActiveStakingList] = useState(false)
    const availableStaking = StakingConfig[currChain]
    const [stakingInfo, setStakingInfo] = useState(availableStaking[0])
    const contractAddress = stakingInfo.zapperContract
    const [slippage, setSlippage] = useState(0.5)

    const tokens = useMemo(() => currChain ? DEITokens[currChain].filter((token) => !token.pairID) : [], [currChain])
    useEffect(() => {
        setSwapState({
            from: tokens[0],
            to: deiToken[currChain]
        })
    }, [tokens])
    //eslint-disable-next-line
    const tokensMap = useMemo(() => (tokens.reduce((map, token) => (map[token.address] = { ...token, address: token.address }, map), {})
    ), [tokens])

    const balances = useTokenBalances(tokensMap, currChain)

    const TokensMap = tokensMap
    const [swapState, setSwapState] = useState({
        from: tokens[0],
        to: deiToken[currChain],
    })

    const [, setFocusType] = useState("from1")
    const [amountIn, setAmountIn] = useState("")
    const debouncedAmountIn = useDebounce(amountIn, 500);
    const [amountOut, setAmountOut] = useState("")

    const allowance = useAllowance(swapState.from, contractAddress, currChain)

    useEffect(() => {
        if (amountIn === "" || debouncedAmountIn === "") setAmountOut("")
    }, [amountIn, debouncedAmountIn]);

    useEffect(() => {
        setIsPreApproved(null)
        setIsApproved(null)
    }, [currChain, account, swapState.from]);

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

    const { onApprove } = useApprove(swapState.from, contractAddress, currChain)
    const { onZap } = useZap(swapState.from, stakingInfo, amountIn, 0, currChain)

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
            const tx = await onZap()
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
    }, [onZap])

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

    // TODO: loader animation --> needs to fix at the end
    if (!swapState.from.address || collatRatio === null || mintingFee === null) {
        return (<div className="loader-wrap">
            {<img className="loader" src={process.env.PUBLIC_URL + "/img/loading.png"} alt="loader" />}
        </div>)
    }

    return (<>

        <SearchBox
            account={account}
            currencies={balances}
            swapState={swapState}
            escapedType={escapedType}
            changeToken={changeToken}
            disableLoading={false}
            active={activeSearchBox}
            setActive={setActiveSearchBox} />


        <MainWrapper>
            <ContentWrapper deactivated={mintPaused}>
                <Type.XL fontWeight="300">Zap</Type.XL>
                <SwapWrapper style={{ marginTop: "25px", maxWidth: "560px" }}>
                    <Type.MD fontWeight="300" mt="10px" mb="30px" opacity="0.5"> Zap your tokens into LP tokens and stake with one click.</Type.MD>
                    <ZapContainer>
                        <ZapBox
                            type="from"
                            setFocusType={setFocusType}
                            focusType="from1"
                            hasMax={true}
                            inputAmount={amountIn}
                            setInputAmount={setAmountIn}
                            setActive={showSearchBox}
                            currency={swapState.from}
                            TokensMap={TokensMap}
                            fastUpdate={fastUpdate}
                            chainId={currChain}
                        />

                        <Image src="/img/dei/zap.svg" alt="zap" mx="23px" my="15px" height="39px" weight="21px" />

                        <ZapStakingBox
                            type="to"
                            title="To (estimated)"
                            activeStakingList={activeStakingList}
                            availableStaking={availableStaking}
                            setStakingInfo={setStakingInfo}
                            stakingInfo={stakingInfo}
                            setFocusType={setFocusType}
                            focusType="to"
                            inputAmount={amountOut}
                            setInputAmount={setAmountOut}
                            setActive={setActiveStakingList}
                            TokensMap={TokensMap}
                            currency={swapState.to}
                            fastUpdate={fastUpdate}
                            chainId={currChain}
                        />
                    </ZapContainer>

                    {/* <RateBox state={swapState} amountIn={debouncedAmountIn} amountOut={amountOut} invert={invert} setInvert={setInvert} /> */}

                    <SwapAction
                        bgColor={"grad_dei"}
                        text="ZAP"
                        isPreApproved={isPreApproved}
                        isApproved={isApproved}
                        validNetworks={validChains}
                        targetToken={swapState.from}
                        loading={approveLoading}
                        swapLoading={swapLoading}
                        handleApprove={handleApprove}
                        handleSwap={handleSwap}
                        TokensMap={TokensMap}
                        swapState={swapState}
                        amountIn={amountIn}
                        amountOut={amountOut}
                    />

                </SwapWrapper>

                <SlippageTolerance slippage={slippage} setSlippage={setSlippage} bgColor={"grad_dei"} style={{ maxWidth: "560px" }} />
                <SwapCard title="Zapping Fee" value={mintingFee ? `${mintingFee} %` : ""} style={{ maxWidth: "560px" }} />
            </ContentWrapper>
        </MainWrapper>

        <div className='tut-left-wrap'>
            <LinkBox />
            <CostBox type={'mint'} chainId={currChain} />
        </div>
    </>);
}

export default Zap;
