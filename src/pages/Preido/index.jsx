import React, { useCallback, useEffect, useState } from 'react';
import { Image } from 'rebass/styled-components';
import { MainWrapper, SwapWrapper, SwapArrow } from '../../components/App/MuonSwap';
import TokenBox from '../../components/App/MuonSwap/TokenBox';
import SwapAction from '../../components/App/Swap/SwapAction';
import RateBox from '../../components/App/MuonSwap/RateBox';
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import { useApprove } from '../../hooks/useApprove';
import { useAllowance } from '../../hooks/useAllowance';
import { deusToken, muonIouToken } from '../../constant/token';
import useChain from '../../hooks/useChain';
import { useDebounce } from '../../hooks/useDebounce';
import { Type } from '../../components/App/Text';
import { PRE_IDO_ADDRESS } from '../../constant/contracts';
import { useGetAmount, useSwap } from '../../hooks/usePreIdo';
import { fromWei } from '../../helper/formatBalance';

const BakktMigrator = () => {
    const [invert, setInvert] = useState(false)
    const [fastUpdate, setFastUpdate] = useState(0)
    const [isApproved, setIsApproved] = useState(null)
    const [isPreApproved, setIsPreApproved] = useState(null)
    const [approveLoading, setApproveLoading] = useState(false)
    const { account } = useWeb3React()
    const validNetworks = [137]
    const [focusType, setFocusType] = useState("from")

    const chainId = useChain(validNetworks)
    const contractAddress = PRE_IDO_ADDRESS[137]

    const [swapState, setSwapState] = useState({
        from: deusToken[137],
        to: muonIouToken,
    })

    const allowance = useAllowance(swapState.from, contractAddress, chainId)


    const [amountIn, setAmountIn] = useState("")
    const [amountOut, setAmountOut] = useState("")

    const [hotIn, setHotIn] = useState("")
    const debouncedAmountIn = useDebounce(amountIn, 500, hotIn);
    const debouncedAmountOut = useDebounce(amountOut, 500, hotIn);


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
    const { getAmountOut, getAmountIn } = useGetAmount(debouncedAmountIn, debouncedAmountOut, swapState.to, chainId)
    const { onSwap } = useSwap(debouncedAmountIn, debouncedAmountOut, swapState.to, swapState.from, chainId)

    useEffect(() => {
        const get = async () => {
            const amount = await getAmountOut()
            if (!amount) return
            if (amountIn === "") setAmountOut("")
            else setAmountOut(fromWei(amount[0]))
        }
        if (focusType === "from")
            get()
    }, [getAmountOut, focusType])//replace multiple useState variables with useReducer

    useEffect(() => {
        const get = async () => {
            const amount = await getAmountIn()
            if (!amount) return
            if (amountOut === "") setAmountIn("")
            else setAmountIn(fromWei(amount[0]))
        }

        if (focusType === "to")
            get()

    }, [getAmountIn, focusType])//replace multiple useState variables with useReducer


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
            const tx = await onSwap()
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
    }, [onSwap])


    return (<>

        <MainWrapper>
            <Type.XL fontWeight="300">MUON IOU</Type.XL>

            <SwapWrapper>
                <TokenBox
                    type="from"
                    hasMax={true}
                    inputAmount={focusType === "from" ? amountIn : debouncedAmountIn}
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
                    <Image src="/img/swap/swap-arrow-black.svg" size="20px" my="15px" />
                </SwapArrow>

                <TokenBox
                    type="to"
                    title="To (estimated)"
                    inputAmount={focusType === "to" ? amountOut : debouncedAmountOut}
                    setInputAmount={setAmountOut}
                    setActive={undefined}
                    TokensMap={null}
                    hasMax={true}
                    setFocusType={setFocusType}
                    currency={swapState.to}
                    fastUpdate={fastUpdate}
                />

                <RateBox state={swapState} amountIn={debouncedAmountIn} amountOut={debouncedAmountOut} invert={invert} setInvert={setInvert} />

                <SwapAction
                    text="SWAP"
                    // bgColor="bg_blue"
                    isPreApproved={isPreApproved}
                    validNetwork={137}
                    validNetworks={[137]}
                    isApproved={isApproved}
                    loading={approveLoading}
                    handleApprove={handleApprove}
                    handleSwap={handleSwap}
                    TokensMap={null}
                    swapState={swapState}
                    amountIn={debouncedAmountIn}
                    // amountOut={amountOut}
                    amountOut={debouncedAmountOut}
                />

            </SwapWrapper>
        </MainWrapper>
    </>);
}

export default BakktMigrator;