import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Image } from 'rebass/styled-components';
import { MainWrapper, SwapWrapper, SwapTitle } from '../../components/App/Swap';
import TokenBox from '../../components/App/Swap/TokenBox';
import SlippageTelorance from '../../components/App/Swap/SlippageTelorance';
import SwapAction from '../../components/App/Swap/SwapAction';
import SearchBox from '../../components/App/Swap/SearchBox';
import RateBox from '../../components/App/Swap/RateBox';
import { getSwapVsType } from '../../utils/utils';
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import { fromWei } from '../../helper/formatBalance';
import { useApprove } from '../../helper/useApprove';
import { useSealedAllowance } from '../../helper/useSealed';
import { useSwap } from '../../helper/useSealed';
import { SealedTokens, sdeaToken } from '../../constant/token';
import { useSealedGetAmountsOut } from '../../helper/useSealed';
import useChain from '../../helper/useChain';
import { getContractAddr, getTokenAddr } from '../../utils/contracts';
import useTokenBalances from '../../helper/useTokenBalances';
import { useDebounce } from '../../helper/useDebounce';
import { useLocation } from 'react-router';

const Sealed = () => {
    const [activeSearchBox, setActiveSearchBox] = useState(false)
    const [bptPayload, setBptPayload] = useState([])
    const [invert, setInvert] = useState(false)
    const [fastUpdate, setFastUpdate] = useState(0)
    const [escapedType, setEscapedType] = useState("from")
    const [slipage, setSlipage] = useState(0.5)
    const [isApproved, setIsApproved] = useState(null)
    const [isPreApproved, setIsPreApproved] = useState(null)
    const [approveLoading, setApproveLoading] = useState(false)
    const { account } = useWeb3React()
    const validNetworks = [1, 4]
    const chainId = useChain(validNetworks)

    const search = useLocation().search;
    let inputCurrency = new URLSearchParams(search).get('inputCurrency')

    if (inputCurrency) inputCurrency = inputCurrency.toLowerCase()

    const contractAddress = getContractAddr("multi_swap_contract", chainId)

    const tokens = useMemo(() => SealedTokens.filter((token) => !token.chainId || token.chainId === chainId), [chainId])

    //eslint-disable-next-line
    const tokensMap = useMemo(() => (tokens.reduce((map, token) => (map[token.address.toLowerCase()] = { ...token, address: token.address.toLowerCase() }, map), {})
    ), [tokens])

    const tokenBalances = useTokenBalances(tokensMap, chainId)

    const [TokensMap, setTokensMap] = useState(tokenBalances)

    if (inputCurrency && !TokensMap[inputCurrency]) {
        inputCurrency = null
    }

    // const sdeaContract = getTokenAddr("sand_dea", chainId).toLowerCase()
    const sUniDD = getTokenAddr("sand_deus_dea", chainId).toLowerCase()

    let fromAddress = inputCurrency ? inputCurrency : sUniDD

    const [swapState, setSwapState] = useState({
        from: { ...TokensMap[fromAddress] },
        to: sdeaToken,
    })

    const [amountIn, setAmountIn] = useState("")
    const debouncedAmountIn = useDebounce(amountIn, 500);
    const [amountOut, setAmountOut] = useState("")
    const allowance = useSealedAllowance(swapState.from, contractAddress, chainId)

    useEffect(() => {
        if (amountIn === "" || debouncedAmountIn === "") setAmountOut("")
    }, [amountIn, debouncedAmountIn]);

    useEffect(() => {
        setIsPreApproved(null)
        setIsApproved(null)
    }, [chainId, account]);

    useEffect(() => {
        setIsPreApproved(null)
        setIsApproved(null)
    }, [swapState.from])

    useEffect(() => {
        setTokensMap(tokenBalances)
    }, [tokenBalances])

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
    }, [allowance, isPreApproved]) //isPreApproved ?


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

    const { getAmountsOut } = useSealedGetAmountsOut(swapState.from, debouncedAmountIn, chainId)
    const { onApprove } = useApprove(swapState.from, contractAddress, chainId)
    const { onSwap } = useSwap(swapState.from, swapState.to, amountIn, amountOut, slipage, chainId, bptPayload)

    useEffect(() => {
        const get = async () => {
            const result = await getAmountsOut()
            if (result.payload) {
                setBptPayload(result.payload)
            }
            if (amountIn === "") setAmountOut("")
            else setAmountOut(fromWei(result.amountOut, swapState.to.decimals))
        }
        get()

        //eslint-disable-next-line
    }, [getAmountsOut, amountIn])//replace multiple useState variables with useReducer



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
        <SearchBox
            account={account}
            currencies={TokensMap}
            swapState={swapState}
            escapedType={escapedType}
            changeToken={changeToken}
            disbaleLoading={false}
            active={activeSearchBox}
            setActive={setActiveSearchBox} />

        <MainWrapper>
            <SwapTitle active={false} bgColor="grad4" m="auto">SEALED SWAP</SwapTitle>
            <SwapWrapper>
                <TokenBox
                    type="from"
                    hasMax={true}
                    inputAmount={amountIn}
                    setInputAmount={setAmountIn}
                    setActive={showSearchBox}
                    currency={swapState.from}
                    TokensMap={TokensMap}
                    fastUpdate={fastUpdate}
                />

                <Image src="/img/swap/single-arrow.svg" size="20px" my="15px" />

                <TokenBox
                    type="to"
                    title="To (estimated)"
                    inputAmount={amountOut}
                    setInputAmount={setAmountOut}
                    setActive={null}
                    TokensMap={TokensMap}
                    currency={swapState.to}
                    fastUpdate={fastUpdate}
                />

                <RateBox state={swapState} amountIn={debouncedAmountIn} amountOut={amountOut} invert={invert} setInvert={setInvert} />

                <SwapAction
                    bgColor="grad4"
                    isPreApproved={isPreApproved}
                    validNetworks={[1, 4]}
                    isApproved={isApproved}
                    loading={approveLoading}
                    handleApprove={handleApprove}
                    handleSwap={handleSwap}
                    TokensMap={TokensMap}
                    swapState={swapState}
                    amountIn={amountIn}
                    amountOut={amountOut}
                />

            </SwapWrapper>

            {/* <PriceImpact
                minAmountOut={minAmountOut}
                amountIn={debouncedAmountIn}
                amountOut={amountOut}
            /> */}


            <SlippageTelorance slipage={slipage} setSlipage={setSlipage} bgColor="grad4" />
        </MainWrapper>
        {/* <div className='tut-left-wrap'>
            <SelectedNetworks />
        </div> */}
    </>);
}

export default Sealed;