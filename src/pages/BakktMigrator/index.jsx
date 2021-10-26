import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Image } from 'rebass/styled-components';
import { MainWrapper, SwapWrapper, SwapArrow } from '../../components/App/MuonSwap';
import TokenBox from '../../components/App/MuonSwap/TokenBox';
import SwapAction from '../../components/App/Swap/SwapAction';
import RateBox from '../../components/App/MuonSwap/RateBox';
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import { fromWei } from '../../helper/formatBalance';
import { useApprove } from '../../hooks/useApprove';
import { useAllowance } from '../../hooks/useAllowance';
import { useSwap } from '../../hooks/useSwap';
import { bakktToken, dBakktToken, DefaultTokens } from '../../constant/token';
import { useGetAmountsOut } from '../../hooks/useGetAmountsOut';
import useChain from '../../hooks/useChain';
import { getContractAddr } from '../../utils/contracts';
import { useDebounce } from '../../hooks/useDebounce';
import { Type } from '../../components/App/Text';
import { useMigrate, useRatio } from '../../hooks/useBakkt';

const BakktMigrator = () => {
    const [invert, setInvert] = useState(false)
    const [fastUpdate, setFastUpdate] = useState(0)
    const [isApproved, setIsApproved] = useState(null)
    const [isPreApproved, setIsPreApproved] = useState(null)
    const [approveLoading, setApproveLoading] = useState(false)
    const { account } = useWeb3React()
    const validNetworks = [1]
    const [focusType, setFocusType] = useState("from")

    const chainId = useChain(validNetworks)

    const contractAddress = "0x702ed7074b2ee71896d386efaf78e1ddc221e34e"

    // const tokens = useMemo(() => DefaultTokens.filter((token) => !token.chainId || token.chainId === chainId), [chainId])

    const [swapState, setSwapState] = useState({
        from: bakktToken,
        to: dBakktToken,
    })

    const [hotIn, setHotIn] = useState("")
    const [amountIn, setAmountIn] = useState("")
    const debouncedAmountIn = useDebounce(amountIn, 500, hotIn);
    const [amountOut, setAmountOut] = useState("")
    const allowance = useAllowance(swapState.from, contractAddress, chainId)

    useEffect(() => {
        if (amountIn === "" || debouncedAmountIn === "") setAmountOut("")
    }, [amountIn, debouncedAmountIn]);

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
    const { onMigrate } = useMigrate(debouncedAmountIn, amountOut, swapState.from, chainId, fastUpdate)
    const ratio = useRatio()

    useEffect(() => {
        const get = async () => {
            // const amount = await getAmountsOut()
            // console.log("swap ", amount);
            if (amountIn === "") setAmountOut("")
            else setAmountOut(new BigNumber(ratio).times(debouncedAmountIn))
        }
        get()
        //eslint-disable-next-line
    }, [debouncedAmountIn])//replace multiple useState variables with useReducer


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
            const tx = await onMigrate()
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
    }, [onMigrate])


    return (<>

        <MainWrapper>
            <Type.XL fontWeight="300">BAKKT Migrator</Type.XL>

            <SwapWrapper>
                <TokenBox
                    type="from"
                    hasMax={true}
                    inputAmount={amountIn}
                    setInputAmount={setAmountIn}
                    setActive={undefined}
                    currency={swapState.from}
                    setFocusType={setFocusType}
                    fastUpdate={fastUpdate}
                />
                <SwapArrow onClick={() => {
                    setAmountIn(amountOut)
                    setHotIn(amountOut)
                    setSwapState({ from: swapState.to, to: swapState.from })
                    setAmountOut("")
                }}>
                    <Image src="/img/swap/swap-arrow.svg" size="20px" my="15px" />
                </SwapArrow>

                <TokenBox
                    type="to"
                    title="To (estimated)"
                    inputAmount={amountOut}
                    setInputAmount={setAmountOut}
                    setActive={undefined}
                    TokensMap={null}
                    setFocusType={setFocusType}
                    currency={swapState.to}
                    fastUpdate={fastUpdate}
                />

                <RateBox state={swapState} amountIn={debouncedAmountIn} amountOut={amountOut} invert={invert} setInvert={setInvert} />

                <SwapAction
                    text="MIGRATE"
                    bgColor="bg_blue"
                    isPreApproved={isPreApproved}
                    validNetworks={[1]}
                    isApproved={isApproved}
                    loading={approveLoading}
                    handleApprove={handleApprove}
                    handleSwap={handleSwap}
                    TokensMap={null}
                    swapState={swapState}
                    amountIn={amountIn}
                    amountOut={amountOut}
                />

            </SwapWrapper>
        </MainWrapper>
    </>);
}

export default BakktMigrator;