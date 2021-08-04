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
import { useApprove } from '../../../hooks/useApprove';
import { useAllowance } from '../../../hooks/useAllowance';
import { useSwap } from '../../../hooks/useSwap';
import { DEITokens, deiToken } from '../../../constant/token';
import { useGetAmountsOut } from '../../../hooks/useGetAmountsOut';
import useChain from '../../../hooks/useChain';
import { getContractAddr, getTokenAddr } from '../../../utils/contracts';
import useTokenBalances from '../../../hooks/useTokenBalances';
import { useDebounce } from '../../../hooks/useDebounce';
import { useLocation } from 'react-router';
import LinkBox from '../../../components/App/Dei/LinkBox'
import CostBox from '../../../components/App/Dei/CostBox'
import RedeemedToken from '../../../components/App/Dei/RedeemedToken'
import { Type } from '../../../components/App/Text';
import styled from 'styled-components';
import { isZero } from '../../../constant/number';

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
    const [redeemAmount, setRedeemAmount] = useState(0)

    const search = useLocation().search;
    let inputCurrency = new URLSearchParams(search).get('inputCurrency')
    let outputCurrency = new URLSearchParams(search).get('outputCurrency')

    inputCurrency = inputCurrency?.toLowerCase() === "eth" ? "0x" : inputCurrency
    outputCurrency = outputCurrency?.toLowerCase() === "eth" ? "0x" : outputCurrency

    const contractAddress = getContractAddr("multi_swap_contract", chainId)

    const tokens = useMemo(() => DEITokens.filter((token) => !token.chainId || token.chainId === chainId), [chainId])

    const tokensName = tokens.map(token => token.symbol.toLowerCase())

    const tokensMap = {}
    const pairedTokens = []
    for (let i = 0; i < DEITokens.length; i++) {
        const t = DEITokens[i]
        if (t.pairID) {
            let j = i + 1
            for (; j < DEITokens.length; j++) {
                const tt = DEITokens[j]
                if (tt.pairID && t.pairID === tt.pairID) {
                    j++
                    continue
                }
                break
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

    const deusContract = getTokenAddr("dea", chainId) + "1"
    let fromAddress = inputCurrency ? inputCurrency : "0x"

    let toAddress = outputCurrency ? outputCurrency : deusContract


    if (toAddress === fromAddress) {
        if (fromAddress === "0x") {
            if (!inputCurrency) {
                fromAddress = deusContract
            }
            else {
                toAddress = deusContract
            }
        }
        else if (fromAddress === deusContract) {
            if (!outputCurrency) {
                toAddress = "0x"
            }
            else {
                fromAddress = "0x"
            }
        }
    }

    let secondaryToken = DEITokens.filter(token => token.symbol === "HUSD P")[0]
    const [swapState, setSwapState] = useState({
        from: deiToken,
        to: secondaryToken,
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

    // useEffect(() => { TODO: balances
    //     setTokensMap(tokenBalances)
    // }, [tokenBalances])

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
        <MainWrapper>
            <Type.XL fontWeight="300">Redeem</Type.XL>
            <SwapWrapper style={{ marginTop: "25px", }}>
                <TokenBox
                    type="from"
                    inputAmount={amountIn}
                    hasMax={true}
                    setInputAmount={setAmountIn}
                    setActive={null}
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

                {<PlusImg src="/img/dei/plus.svg" alt="plus" />}

                {<TokenBox
                    mt={"-21px"}
                    type="to"
                    title="To (estimated)"
                    inputAmount={amountInPair}
                    setInputAmount={setAmountInPair}
                    setActive={null}
                    currency={pairToken}
                    TokensMap={TokensMap}
                    fastUpdate={fastUpdate}
                />}

                <RateBox state={swapState} amountIn={debouncedAmountIn} amountOut={amountOut} invert={invert} setInvert={setInvert} />

                <SwapAction
                    bgColor={"grad_dei"}
                    text="REDEEM"
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

            {isZero(redeemAmount) && <RedeemedToken
                title="Redeemed Token ready for claim"
                currencies={[swapState.to, pairToken]}
            />}

        </MainWrapper>

        <div className='tut-left-wrap'>
            <LinkBox />
            <CostBox />
        </div>
    </>);
}

export default Dei;