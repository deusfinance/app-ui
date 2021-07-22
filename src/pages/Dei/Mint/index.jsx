import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Image } from 'rebass/styled-components';
import { MainWrapper, SwapWrapper, SwapArrow } from '../../../components/App/Swap';
import TokenBox from '../../../components/App/Swap/TokenBox';
import SwapAction from '../../../components/App/Swap/SwapAction';
import SearchBox from '../../../components/App/Dei/SearchBox';
import RateBox from '../../../components/App/Swap/RateBox';
import SwapCard from '../../../components/App/Swap/SwapCard';
import { getSwapVsType } from '../../../utils/utils';
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import { fromWei } from '../../../helper/formatBalance';
import { useApprove } from '../../../helper/useApprove';
import { useAllowance } from '../../../helper/useAllowance';
import { useSwap } from '../../../helper/useSwap';
import { DEITokens, deiToken } from '../../../constant/token';
import { useGetAmountsOut } from '../../../helper/useGetAmountsOut';
import useChain from '../../../helper/useChain';
import { getContractAddr, getTokenAddr } from '../../../utils/contracts';
import useTokenBalances from '../../../helper/useTokenBalances';
import { useDebounce } from '../../../helper/useDebounce';
import { useLocation } from 'react-router';
import LinkBox from '../../../components/App/Dei/LinkBox'
import CostBox_v2 from '../../../components/App/Dei/CostBox_v2'
import RedeemedToken from '../../../components/App/Dei/RedeemedToken'
import { Type } from '../../../components/App/Text';
import styled from 'styled-components';

const PlusImg = styled.img`
    z-index: 1;
    position: relative;
    text-align: center;
    margin-top: -20px;

    ${({ theme }) => theme.mediaWidth.upToExtraSmall`
        margin-bottom: 5px;
        width: 23px;
        height: 23px;
    `}
`

const Dei = () => {
    const [activeSearchBox, setActiveSearchBox] = useState(false)
    const [invert, setInvert] = useState(false)
    const [fastUpdate, setFastUpdate] = useState(0)
    const [escapedType, setEscapedType] = useState("from")
    const [slippage, setSlippage] = useState(0)
    const [isApproved, setIsApproved] = useState(null)
    const [isPreApproved, setIsPreApproved] = useState(null)
    const [approveLoading, setApproveLoading] = useState(false)
    const { account } = useWeb3React()
    const validNetworks = [1, 4]
    const chainId = useChain(validNetworks)
    const [isPair, setIsPair] = useState(false)

    const search = useLocation().search;
    let inputCurrency = new URLSearchParams(search).get('inputCurrency')
    let outputCurrency = new URLSearchParams(search).get('outputCurrency')

    inputCurrency = inputCurrency?.toLowerCase() === "eth" ? "0x" : inputCurrency
    outputCurrency = outputCurrency?.toLowerCase() === "eth" ? "0x" : outputCurrency

    const contractAddress = getContractAddr("multi_swap_contract", chainId)

    const tokens = useMemo(() => DEITokens.filter((token) => !token.chainId || token.chainId === chainId), [chainId])

    const tokensName = tokens.map(token => token.symbol.toLowerCase())

    //eslint-disable-next-line
    const tokensMap = {}
    // tokens.forEach(token => {

    // });

    const pairedTokens = []
    for (let i = 0; i < DEITokens.length; i++) {
        const t = DEITokens[i]
        if (t.pairID) {
            let j = i + 1
            for (; j < DEITokens.length; j++) {
                const tt = DEITokens[j]
                if (tt.pairID && t.pairID === tt.pairID) {
                    j++
                } else {
                    break
                }
            }
            pairedTokens.push(DEITokens.slice(i, j))
            i = j
        } else {
            pairedTokens.push([DEITokens[i]])
        }
    }

    for (let i = 0; i < tokens.length; i++) {
        const currToken = tokens[i]
        const { address, pairID } = currToken
        if (tokensMap[address]) tokensMap[address + pairID] = currToken
        else tokensMap[address] = currToken
    }

    // const tokensMap = useMemo(() => (tokens.reduce((map, token) => (map[token.address] = { ...token, address: token.address }, map), {})
    // ), [tokens])

    // const tokenBalances = useTokenBalances(tokensMap, chainId)
    const tokenBalances = tokensMap

    const [TokensMap, setTokensMap] = useState(tokenBalances)

    // if(isAddress())
    if (inputCurrency && tokensName.indexOf(inputCurrency.toLowerCase()) !== -1) {
        inputCurrency = getTokenAddr(inputCurrency.toLowerCase(), chainId)
    }

    if (outputCurrency && tokensName.indexOf(outputCurrency.toLowerCase()) !== -1) {
        outputCurrency = getTokenAddr(outputCurrency.toLowerCase(), chainId)
    }

    if (inputCurrency && !TokensMap[inputCurrency]) {
        inputCurrency = null
    }

    if (outputCurrency && !TokensMap[outputCurrency]) {
        outputCurrency = null
    }

    if (outputCurrency && inputCurrency && outputCurrency === inputCurrency) {
        outputCurrency = null
    }

    const deaContract = getTokenAddr("dea", chainId)

    let fromAddress = inputCurrency ? inputCurrency : "0x"

    let toAddress = outputCurrency ? outputCurrency : deaContract


    if (toAddress === fromAddress) {
        if (fromAddress === "0x") {
            if (!inputCurrency) {
                fromAddress = deaContract
            }
            else {
                toAddress = deaContract
            }
        }
        else if (fromAddress === deaContract) {
            if (!outputCurrency) {
                toAddress = "0x"
            }
            else {
                fromAddress = "0x"
            }
        }
    }

    const [swapState, setSwapState] = useState({
        from: { ...TokensMap[fromAddress] },
        to: deiToken,
    })

    const [hotIn, setHotIn] = useState("")
    const [amountIn, setAmountIn] = useState("")
    const [amountInPair, setAmountInPair] = useState("")
    const debouncedAmountIn = useDebounce(amountIn, 500, hotIn);
    const [amountOut, setAmountOut] = useState("")
    const [minAmountOut, setMinAmountOut] = useState("")
    const allowance = useAllowance(swapState.from, contractAddress, chainId)
    const [pairToken, setPairToken] = useState({})

    useEffect(() => {
        if (amountIn === "" || debouncedAmountIn === "") setAmountOut("")
    }, [amountIn, debouncedAmountIn]);

    useEffect(() => {
        setIsPreApproved(null)
        setIsApproved(null)
    }, [chainId, account, swapState.from]);

    // useEffect(() => {
    //     setIsPreApproved(null)
    //     setIsApproved(false)
    // }, [swapState.from])

    // useEffect(() => { //TODO balances
    //     setTokensMap(tokenBalances)
    // }, [tokenBalances])

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
        console.log("token", token)
        if (token.pairID) {
            setIsPair(true)
            let secondToken = DEITokens.filter(currToken => {
                return currToken.pairID === token.pairID && currToken.address !== token.address
            })[0]
            console.log("secondToken", secondToken)
            setPairToken(secondToken)
            setSwapState({ ...swapState, [type]: token })
            return
        }
        setIsPair(false)
        setSwapState({ ...swapState, [type]: token })
    }

    // const { getAmountsOut } = useGetAmountsOut(swapState.from, swapState.to, debouncedAmountIn, chainId)
    // const { getAmountsOut: getMinAmountOut } = useGetAmountsOut(swapState.from, swapState.to, 0.001, chainId)
    const { onApprove } = useApprove(swapState.from, contractAddress, chainId)
    const { onSwap } = useSwap(swapState.from, swapState.to, amountIn, amountOut, slippage, chainId)

    // useEffect(() => {
    //     const get = async () => {
    //         const amount = await getAmountsOut()
    //         // console.log("swap ", amount);
    //         if (amountIn === "") setAmountOut("")
    //         else setAmountOut(fromWei(amount, swapState.to.decimals))
    //     }
    //     get()

    //     //eslint-disable-next-line
    // }, [getAmountsOut, amountIn])//replace multiple useState variables with useReducer

    // useEffect(() => {
    //     const get = async () => {
    //         const amount = await getMinAmountOut()
    //         // console.log("min swap ", amount);
    //         setMinAmountOut(fromWei(amount, swapState.to.decimals))
    //     }
    //     get()

    //     //eslint-disable-next-line
    // }, [getMinAmountOut])//replace multiple useState variables with useReducer



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
            pairedTokens={pairedTokens}
            currencies={TokensMap}
            swapState={swapState}
            escapedType={escapedType}
            changeToken={changeToken}
            disableLoading={false}
            active={activeSearchBox}
            setActive={setActiveSearchBox} />

        <MainWrapper>
            <Type.XL fontWeight="300">Mint</Type.XL>
            <SwapWrapper style={{ marginTop: "25px", }}>
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

                {isPair && <PlusImg src="/img/dei/plus.svg" alt="plus" />}

                {isPair && <TokenBox
                    mt={"-21px"}
                    type="from"
                    hasMax={true}
                    inputAmount={amountInPair}
                    setInputAmount={setAmountInPair}
                    setActive={showSearchBox}
                    currency={pairToken}
                    TokensMap={TokensMap}
                    fastUpdate={fastUpdate}
                />}

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
                    bgColor={"grad_dei"}
                    text="MINT"
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

            <SwapCard title="Minting Fee" value="0.3%" />
        </MainWrapper>

        <div className='tut-left-wrap'>
            <LinkBox />
            <CostBox_v2 />
        </div>
    </>);
}

export default Dei;