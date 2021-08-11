import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Image } from 'rebass/styled-components';
import { MainWrapper, SwapWrapper } from '../../../components/App/Swap';
import TokenBox from '../../../components/App/Dei/TokenBox';
import SwapAction from '../../../components/App/Dei/SwapAction';
import RateBox from '../../../components/App/Swap/RateBox';
import SwapCard from '../../../components/App/Swap/SwapCard';
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import { useApprove } from '../../../hooks/useApprove';
import { useAllowance } from '../../../hooks/useAllowance';
import { DEITokens, deiToken } from '../../../constant/token';
import useChain from '../../../hooks/useChain';
import { useDebounce } from '../../../hooks/useDebounce';
import { DEI_POOL_ADDRESS } from '../../../constant/contracts';
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
import Staking from '../../../components/App/Dei/Staking/Staking';
import { StakingConfig } from '../../../components/App/Dei/data';

const Dei = () => {
    useDeiUpdateRedeem()
    const collatRatio = useRecoilValue(collatRatioState)
    const deiPrices = useRecoilValue(deiPricesState)
    const { redemption_fee: redemptionFee, redeemPaused } = useRecoilValue(husdPoolDataState)

    const [invert, setInvert] = useState(false)
    const [fastUpdate, setFastUpdate] = useState(0)
    const [isApproved, setIsApproved] = useState(null)
    const [isPreApproved, setIsPreApproved] = useState(null)
    const [approveLoading, setApproveLoading] = useState(false)
    const { account } = useWeb3React()
    const validNetworks = [1, 4]
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

    const TokensMap = tokensMap

    let secondaryToken = DEITokens.filter(token => token.symbol === "HUSD P")[0]
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
        setIsPreApproved(null)
        setIsApproved(null)
    }, [chainId, account, swapState.from]);






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
            <Type.XL fontWeight="300" mb="5">Staking</Type.XL>
            <Staking config={StakingConfig[0]} />
        </MainWrapper>

        <div className='tut-left-wrap'>
            <LinkBox />
            <CostBox type={'redeem'} />
        </div>
    </>);
}

export default Dei;