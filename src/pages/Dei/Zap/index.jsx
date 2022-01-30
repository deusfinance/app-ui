import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MainWrapper, SwapWrapper } from '../../../components/App/Swap';
import { ZapTokens, deiToken } from '../../../constant/token';
import { StakingConfig } from '../../../constant/staking';
import { Flex } from 'rebass';
import { CostBox } from '../../../components/App/Dei/CostBox';
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
import { useDebounce } from '../../../hooks/useDebounce';
import { ContentWrapper } from '../../../components/App/Dei';
import { useDeiUpdate, useZap, useAllowance, useGetAmountsOutZap } from '../../../hooks/useDei';
import { collatRatioState, husdPoolDataState, deiPricesState } from '../../../store/dei';
import { useRecoilValue } from 'recoil';
import { useLocation } from 'react-router-dom';
import { getCorrectChains } from '../../../constant/correctChain';
import { formatBalance3, getSwapVsType } from '../../../utils/utils';
import SearchBox from '../../../components/App/Swap/SearchBox';
import { ChainId } from '../../../constant/web3';
import { fromWei } from '../../../helper/formatBalance';
import { Chains } from '../../../components/App/Dei/Chains';
import DeusTokenBox from '../../../components/App/Dei/DeusTokenBox';
import DeiTokenBox from '../../../components/App/Dei/BuyDEUS';
import { DEI_COLLATERAL_ZAP, DEI_DEUS_ZAP, DEUS_NATIVE_ZAP } from '../../../constant/contracts';

const Zap = () => {
    const location = useLocation()
    const { account, chainId } = useWeb3React()
    const deiPrices = useRecoilValue(deiPricesState)
    const tempChain = null
    const userChain = tempChain ? tempChain : chainId
    const validChains = getCorrectChains(location.pathname)
    const currChain = userChain && validChains.indexOf(userChain) !== -1 ? userChain : ChainId.ETH //TODO
    useDeiUpdate(currChain)

    const search = useLocation().search;
    const queryParams = {
        lp: new URLSearchParams(search).get('lp')?.toLowerCase(),
    }

    const collatRatio = useRecoilValue(collatRatioState)
    const { minting_fee: mintingFee, mintPaused } = useRecoilValue(husdPoolDataState)
    const [fastUpdate, setFastUpdate] = useState(0)
    const [isApproved, setIsApproved] = useState(null)
    const [approveLoading, setApproveLoading] = useState(false)
    const [swapLoading, setSwapLoading] = useState(false)
    const [escapedType, setEscapedType] = useState("from")
    const [activeSearchBox, setActiveSearchBox] = useState(false)
    const [activeStakingList, setActiveStakingList] = useState(false)
    const availableStaking = StakingConfig[currChain].filter(item => item.zapperContract !== null)
    const resultLp = queryParams.lp ? availableStaking.filter(staking => staking.title.toLowerCase() === queryParams.lp) : []
    const lpIndex = resultLp.length > 0 ? resultLp[0].id : 0
    const currStakingInfo = availableStaking[lpIndex]
    const [stakingInfo, setStakingInfo] = useState(currStakingInfo)
    const contractAddress = stakingInfo.zapperContract
    const [slippage, setSlippage] = useState(0.5)
    const [amountOutParams, setAmountOutParams] = useState(null)
    const PrimaryTokens = useMemo(() => currChain ? ZapTokens[currChain].filter((token) => !token.pairID) : [], [currChain])
    const tokens = useMemo(() => PrimaryTokens.filter((token) => !(chainId === 1 && stakingInfo.id === 2 && (token.symbol === "DEI" || token.symbol === "DEUS"))), [PrimaryTokens, chainId, stakingInfo.id])

    //eslint-disable-next-line
    const tokensMap = useMemo(() => (tokens.reduce((map, token) => (map[token.address] = { ...token, address: token.address }, map), {})
    ), [tokens])

    useEffect(() => {
        setSwapState({
            from: tokens[1],
            to: deiToken[currChain]
        })
    }, [tokens, currChain])

    // change zapper contract when chainId changed
    useEffect(() => {
        setStakingInfo(currStakingInfo)
    }, [currStakingInfo])

    useEffect(() => {
        if (contractAddress === DEI_COLLATERAL_ZAP[ChainId.FTM])
            setSlippage(1)
        else
            setSlippage(0.5)
    }, [setSlippage, currChain, contractAddress])

    const balances = useTokenBalances(tokensMap, currChain)

    const TokensMap = tokensMap
    const [swapState, setSwapState] = useState({
        from: tokens[1],
        to: deiToken[currChain],
    })

    const [, setFocusType] = useState("from1")
    const [amountIn, setAmountIn] = useState("")
    const debouncedAmountIn = useDebounce(amountIn, 1000);
    const [amountOut, setAmountOut] = useState("")
    const [percentage, setPercentage] = useState("")

    const allowance = useAllowance(swapState.from, contractAddress, currChain, fastUpdate)

    useEffect(() => {
        if (amountIn === "" || debouncedAmountIn === "") {
            setAmountOut("")
            setAmountOutParams(null)
        }
    }, [amountIn, debouncedAmountIn]);

    useEffect(() => {
        // setIsPreApproved(null)
        setIsApproved(null)
    }, [currChain, account, swapState.from]);

    useEffect(() => {
        if (allowance.gt(0)) {
            setIsApproved(true)
        } else {
            setIsApproved(false)
        }
        //eslint-disable-next-line 
    }, [allowance]) //isPreApproved ?

    const { onApprove } = useApprove(swapState.from, contractAddress, currChain)
    const { onZap } = useZap(swapState.from, stakingInfo, debouncedAmountIn, slippage, amountOut, amountOutParams, currChain)
    const { getAmountsOut } = useGetAmountsOutZap(swapState.from, contractAddress, amountIn, debouncedAmountIn, deiPrices, chainId)

    useEffect(() => {
        const get = async () => {
            const result = await getAmountsOut()

            if (result === "") {
                setAmountOut("")
                setAmountOutParams(null)
                setPercentage("")
            }
            else {
                if (contractAddress === DEI_DEUS_ZAP[chainId]) {
                    setAmountOutParams([result.percentage, result.lp, result.usdcForMintAmount, result.deusNeededAmount])
                    setAmountOut(result.lp)
                    setPercentage(fromWei(result.percentage, 4))
                } else if (contractAddress === DEUS_NATIVE_ZAP[chainId]) {
                    setAmountOutParams([result.percentage, result.lp, result.usdcForMintAmount, result.deusNeededAmount, result.swapAmount])
                    setAmountOut(result.lp)
                    setPercentage(fromWei(result.percentage, 4))
                } else {
                    setAmountOutParams([result.percentage, result.lp, result.usdcForMintAmount, result.deusNeededAmount, result.swapAmount, result.useMinter])
                    setAmountOut(result.lp)
                    setPercentage(fromWei(result.percentage, 4))
                }
            }
        }
        get()

        //eslint-disable-next-line
    }, [getAmountsOut, amountIn])//replace multiple useState variables with useReducer


    const handleApprove = useCallback(async () => {
        try {
            setApproveLoading(true)
            const tx = await onApprove()
            if (tx.status) {
                console.log("Approved");
                setFastUpdate(fastUpdate => fastUpdate + 1)
                // setIsApproved(new BigNumber(tx.events.Approval.raw.data, 16).gt(0))
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
                // console.log("swap did");
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
        setAmountOut("")
        setPercentage("")
        setAmountOutParams(null)
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

        <MainWrapper >
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
                    <Flex justifyContent="space-between" fontWeight="400" fontSize="12.5px" padding="0 10px" mt="15px" >
                        <p style={{ opacity: "0.75" }}>Share of Pool</p>
                        <p>{formatBalance3(percentage, 4)} %</p>
                    </Flex>
                    <SwapAction
                        bgColor={"grad_dei"}
                        text="ZAP"
                        isPreApproved={true}
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
                        debouncedAmountIn={debouncedAmountIn}
                        amountOut={amountOut}
                        isMint={true}
                    />

                </SwapWrapper>

                <SlippageTolerance slippage={slippage} setSlippage={setSlippage} bgColor={"grad_dei"} style={{ maxWidth: "560px" }} />
            </ContentWrapper>
        </MainWrapper>

        <div className='tut-left-wrap'>
            <LinkBox />
            <CostBox type={'mint'} chainId={currChain} />
        </div>

        <div className='tut-right-wrap'>
            <DeusTokenBox />
            <DeiTokenBox />
            <Chains validChainId={chainId} validNetworks={validChains} />
        </div>
    </>);
}

export default Zap;
