import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Image } from 'rebass/styled-components';
import { MainWrapper, SwapWrapper } from '../../components/App/MuonSwap';
import TokenBox from '../../components/App/MuonSwap/TokenBox';
import SwapAction from '../../components/App/MuonSwap/SwapAction';
import SearchBox from '../../components/App/MuonSwap/SearchBox';
import RateBox from '../../components/App/MuonSwap/RateBox';
import { getSwapVsType } from '../../utils/utils';
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import { fromWei } from '../../helper/formatBalance';
import { useApprove } from '../../helper/useApprove';
import { useAllowance } from '../../helper/useAllowance';
import { useSwap } from '../../helper/useMuon';
import { MuonPreSaleTokens, muonToken } from '../../constant/token';
import { useAmountsOut, useAmountsIn } from '../../helper/useMuon';
import useChain from '../../helper/useChain';
import { getTokenAddr } from '../../utils/contracts';
import useTokenBalances from '../../helper/useTokenBalances';
import { useDebounce } from '../../helper/useDebounce';
import { useLocation } from 'react-router';
import { SEALED_ADDRESS } from '../../constant/contracts';
import RemainingCap from '../../components/App/MuonSwap/RemainingCap';

const Muon = () => {
    const [activeSearchBox, setActiveSearchBox] = useState(false)
    const [invert, setInvert] = useState(false)
    const [fastUpdate, setFastUpdate] = useState(0)
    const [escapedType, setEscapedType] = useState("from")
    const [fouceType, setFouceType] = useState("from")
    const [slipage, setSlipage] = useState(0)
    const [isApproved, setIsApproved] = useState(null)
    const [isPreApproved, setIsPreApproved] = useState(null)
    const [approveLoading, setApproveLoading] = useState(false)
    const { account } = useWeb3React()
    const validNetworks = [1, 4]
    const prices = {
        "sUniDE": {
            "decimals": 18,
            "address": "0x670431fcdaf39280dee488c6d8277b9865e22d08",
            "price": 396.6842284244552
        },
        "sUniDU": {
            "decimals": 18,
            "address": "0xb7b52c3523af9c237817a49d17e656283cc59678",
            "price": 351.9514979312108
        },
        "sUniDD": {
            "decimals": 18,
            "address": "0x2ede9cb92a6de0916889e5936b1aad0e99ddf242",
            "price": 63.51726092695345
        },
        "deus": {
            "decimals": 18,
            "address": "0x3b62F3820e0B035cc4aD602dECe6d796BC325325",
            "price": 5.167801720204601
        },
        "dea": {
            "decimals": 18,
            "address": "0x80aB141F324C3d6F2b18b030f1C4E95d4d658778",
            "price": 186.5775013135237
        },
        "bpt": {
            "decimals": 18,
            "address": "0x1Dc2948B6dB34E38291090B825518C1E8346938B",
            "price": 15.676459507534215
        },
        "sdeus": {
            "decimals": 18,
            "address": "0xc586aea83a96d57764a431b9f4e2e84844075a01",
            "price": 5.167801720204601
        },
        "sdea": {
            "decimals": 18,
            "address": "0xd8C33488B76D4a2C06D5cCB75574f10F6ccaC3D7",
            "price": 186.5775013135237
        },
        "dai": {
            "decimals": 18,
            "address": "0x6b175474e89094c44da98b954eedeac495271d0f",
            "price": 1
        },
        "usdc": {
            "decimals": 6,
            "address": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            "price": 1
        },
        "eth": {
            "decimals": 18,
            "address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
            "price": 2017.86
        },
        "wbtc": {
            "decimals": 8,
            "address": "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
            "price": 34428.11
        },
        "test": {
            "decimals": 18,
            "address": "0xf36db493Eb9EfDe843416c155E41aF7871864C81",
            "price": 10
        }
    }


    let SymbolMap = {
        "DEA": "dea",
        "DEUS": "deus",
        "ETH": "eth",
        "USDC": "usdc",
        "DAI": "dai",
        "wBTC": "wbtc",
        "sDEA": "sdea",
        "sDEUS": "sdeus",
        "sUniDE": "sUniDE",
        "sUniDD": "sUniDD",
        "sUniDU": "sUniDU",
        "BPT": "bpt",
        "TEST": "test",
    }

    const chainId = useChain(validNetworks)

    const search = useLocation().search;
    let inputCurrency = new URLSearchParams(search).get('inputCurrency')

    if (inputCurrency) inputCurrency = inputCurrency.toLowerCase()

    const tokens = useMemo(() => MuonPreSaleTokens.filter((token) => !token.chainId || token.chainId === chainId), [chainId])

    //eslint-disable-next-line
    const tokensMap = useMemo(() => (tokens.reduce((map, token) => (map[token.address.toLowerCase()] = { ...token, address: token.address.toLowerCase() }, map), {})
    ), [tokens])

    const tokenBalances = useTokenBalances(tokensMap, chainId)

    const [TokensMap, setTokensMap] = useState(tokenBalances)

    if (inputCurrency && !TokensMap[inputCurrency]) {
        inputCurrency = null
    }

    const DEA = getTokenAddr("dea", chainId).toLowerCase()

    let fromAddress = inputCurrency ? inputCurrency : DEA

    const [swapState, setSwapState] = useState({
        from: { ...TokensMap[fromAddress] },
        to: muonToken,
    })

    const [amountIn, setAmountIn] = useState("")
    const [amountOut, setAmountOut] = useState("")
    const debouncedAmountIn = useDebounce(amountIn, 500);
    const debouncedAmountOut = useDebounce(amountOut, 500);

    let allowance = useAllowance(swapState.from, SEALED_ADDRESS, chainId)

    useEffect(() => {
        if (fouceType === "from") {
            if (amountIn === "" || debouncedAmountIn === "") setAmountOut("")
        } else
            if (amountOut === "" || debouncedAmountOut === "") setAmountIn("")
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

    const fromPrice = prices[SymbolMap[swapState.from.symbol]].price
    const { getAmountsOut } = useAmountsOut(swapState.from, debouncedAmountIn, fouceType, chainId, fromPrice)
    const { getAmountsIn } = useAmountsIn(swapState.from, debouncedAmountOut, fouceType, chainId, fromPrice)
    const { onApprove } = useApprove(swapState.from, SEALED_ADDRESS, chainId)
    const { onSwap } = useSwap(swapState.from, swapState.to, amountIn, amountOut, slipage, chainId)

    useEffect(() => {
        const get = async () => {
            const result = await getAmountsOut()
            if (!result) return
            if (amountIn === "") setAmountOut("")
            else setAmountOut(fromWei(result, swapState.to.decimals))
        }
        if (getAmountsOut && fouceType == "from")
            get()
        //eslint-disable-next-line
    }, [getAmountsOut, amountIn])//replace multiple useState variables with useReducer

    useEffect(() => {
        const get = async () => {
            const result = await getAmountsIn()
            if (!result) return
            if (amountOut === "") setAmountIn("")
            else setAmountIn(fromWei(result, swapState.from.decimals))
        }
        if (getAmountsIn && fouceType == "to")
            get()
        //eslint-disable-next-line
    }, [getAmountsIn, amountOut])//replace multiple useState variables with useReducer



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
            <Image src="/img/swap/deus-muon.svg" my="15px" />

            <SwapWrapper>
                <TokenBox
                    type="from"
                    hasMax={true}
                    inputAmount={amountIn}
                    setInputAmount={setAmountIn}
                    setActive={showSearchBox}
                    currency={swapState.from}
                    TokensMap={TokensMap}
                    setFouceType={setFouceType}
                    fastUpdate={fastUpdate}
                />

                <Image src="/img/swap/single-arrow-black.svg" size="20px" my="15px" />

                <TokenBox
                    type="to"
                    title="To (estimated)"
                    inputAmount={amountOut}
                    setInputAmount={setAmountOut}
                    setActive={null}
                    setFouceType={setFouceType}
                    TokensMap={TokensMap}
                    currency={swapState.to}
                    fastUpdate={fastUpdate}
                />

                <RateBox state={swapState} amountIn={debouncedAmountIn} amountOut={amountOut} invert={invert} setInvert={setInvert} />

                <SwapAction
                    bgColor="bg_blue"
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
            <RemainingCap remindedAmount={1200} />



        </MainWrapper>
        {/* <div className='tut-left-wrap'>
            <SelectedNetworks />
        </div> */}
    </>);
}

export default Muon;