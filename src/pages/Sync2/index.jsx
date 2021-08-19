import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components'
import { Image } from 'rebass/styled-components';
import BigNumber from 'bignumber.js';
import { FlexCenter } from '../../components/App/Container';
import { SwapArrow, } from '../../components/App/Swap';
import TokenBox from '../../components/App/Swap/TokenBox';
import SyncAction from '../../components/App/Sync/SyncAction';
import SearchBox from '../../components/App/Synchronizer/SearchBox';
import { Base } from '../../components/App/Button';
import LongShort from '../../components/App/Synchronizer/LongShort';
import RateBox from '../../components/App/Synchronizer/RateBox';
import RemainingCap from '../../components/App/Synchronizer/RemainingCap';
import { SyncData } from '../../constant/synchronizer';
import { useDebounce } from '../../hooks/useDebounce';
import { useWeb3React } from '@web3-react/core';
import useAssetBalances from '../../hooks/useAssetBalances';
import useCrossAssetBalances from '../../hooks/useCrossAssetBalances';
import Row, { RowBetween, RowCenter } from '../../components/App/Row';
import { useOracleFetch } from '../../utils/SyncUtils';
import { getCorrectChains } from '../../constant/correctChain';
import { useLocation } from 'react-router-dom';
import { useSync, useAmountsIn, useAmountsOut, useAllowance } from '../../hooks/useSync';
import { useApprove } from '../../hooks/useApprove';
import { isZero } from '../../constant/number';
import { fromWei, RemoveTrailingZero } from '../../helper/formatBalance';
import { ChainMap, NameChainMap } from '../../constant/web3';
import { createPriceUrls, createSignaturesUrls } from '../../helper/syncHelper'
import { Type } from '../../components/App/Text';
import SelectBox from '../../components/App/Sync/SelectBox';
import useChain from '../../hooks/useChain';

const MainWrapper = styled.div`
   margin-top: 100px;
   text-align:center;
`

const Title = styled(FlexCenter)`
    display: inline-flex;
    font-family:"Monument Grotesk Semi";
`

const TopWrap = styled(FlexCenter)`
    overflow:hidden;
    align-items: flex-start;
    height: 84px;
    color:#fff;
    /* background: linear-gradient(269deg,#2ab7ca,#50e3c2); */
    /* padding: 22px 22px 16px 18px; */
`

const SwapWrapper = styled.div`
    background: ${({ theme }) => theme.bg3};
    border: 1px solid ${({ theme }) => theme.border1};
    border-radius: 15px;
    text-align:center;
    margin:auto;
    overflow:hidden;
    width:100%;
    max-width:500px;
    border-color:#000;
    padding:20px 15px;
    margin-top:30px;
`

export const NetworkTitle = styled(Base)`
  display:inline-flex;
  height:35px;
  color: ${({ theme }) => theme.text1};
  background: ${({ theme }) => theme.text1_2};
  border: 1px solid ${({ theme }) => theme.text1};
  padding:0 8px;
  font-size: 25px;
`

const Sync2 = () => {
    const location = useLocation()
    const { account, chainId } = useWeb3React()
    const validChains = getCorrectChains(location.pathname)
    const currChain = chainId && validChains.indexOf(chainId) !== -1 ? chainId : ChainMap.BSC
    const [SyncChainId, setSyncChainId] = useState(currChain)
    const [isApproved, setIsApproved] = useState(null)
    const [isPreApproved, setIsPreApproved] = useState(null)
    const [approveLoading, setApproveLoading] = useState(false)
    const oracle = SyncData[SyncChainId]
    const { stableCoin: stableToken } = oracle
    const stableCoin = { ...stableToken, stable: true }
    const [fromCurrency, setFromCurrency] = useState({ ...stableCoin, stable: true })
    const [invert, setInvert] = useState(false)
    const [isLong, setLong] = useState(true)
    const [position, setPosition] = useState("buy")
    const [assetInfo, setAssetInfo] = useState({ fromPrice: null, toPrice: null, fee: 0 })
    const [priceResult, setPriceResult] = useState({})

    const [activeSearchBox, setActiveSearchBox] = useState(false)
    const [escapedType, setEscapedType] = useState("from")

    const [toCurrency, setToCurrency] = useState()
    const [amountIn, setAmountIn] = useState("")
    const debouncedAmountIn = useDebounce(amountIn, 500);
    const [amountOut, setAmountOut] = useState("")
    const debouncedAmountOut = useDebounce(amountOut, 500);
    const [stocks, setStocks] = useState(null)
    const [conducted, setConducted] = useState(null)
    const [loading, setLoading] = useState(true);
    const [loadingCap, setLoadingCAP] = useState(false);

    const [focusType, setFocusType] = useState("from")
    const getConducted = useOracleFetch(oracle.conducted, {})
    const getPrices = useOracleFetch(oracle.prices)
    const getStocks = useOracleFetch(oracle.registrar)
    const balances = useCrossAssetBalances(conducted, SyncChainId)
    const allowance = useAllowance(fromCurrency, oracle.contract, SyncChainId)

    useEffect(() => {
        if (focusType === "from") {
            if (amountIn === "" || debouncedAmountIn === "") setAmountOut("")
        } else
            if (amountOut === "" || debouncedAmountOut === "") setAmountIn("")
    }, [amountIn, debouncedAmountIn, debouncedAmountOut, focusType, amountOut]);


    useEffect(() => {
        setFromCurrency({ ...stableCoin, stable: true })
        setToCurrency(null)
        setAmountIn("")
        setAmountOut("")
    }, [SyncChainId])

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

    useEffect(() => {
        setIsPreApproved(null)
        setIsApproved(null)
    }, [chainId, account, fromCurrency.symbol]);

    const changePosition = () => {
        setFromCurrency({ ...toCurrency, amount: "" })
        setToCurrency({ ...fromCurrency, amount: "" })
    }

    const getData = useCallback(() => {
        setLoading(true);
        getConducted().then((res) => {
            setConducted({ ...res[0], chainId: SyncChainId })
            getStocks().then((res) => {
                setStocks(res[0])
                setLoading(false);
            })
        })
    }, [getStocks, getConducted, getPrices]);

    useEffect(() => {
        getData();
    }, [getData]);

    //sync
    //approve
    //confirmBox

    useEffect(() => {
        if (fromCurrency && toCurrency) {
            if (position === "buy") {
                const currency = isLong ? { ...toCurrency, address: toCurrency.long.address, symbol: toCurrency.long_symbol } : { ...toCurrency, address: toCurrency.short.address, symbol: toCurrency.short_symbol }
                setToCurrency({ ...currency })
            } else {
                const currency = isLong ? { ...fromCurrency, address: fromCurrency.long.address, symbol: fromCurrency.long_symbol } : { ...fromCurrency, address: fromCurrency.short.address, symbol: fromCurrency.short_symbol }
                setFromCurrency({ ...currency })
            }
        }
    }, [isLong, position])

    useEffect(() => {
        if (fromCurrency && toCurrency) {
            if (fromCurrency.stable) {
                setPosition("buy")
            }
            if (toCurrency.stable) {
                setPosition("sell")
            }
        }
    }, [fromCurrency, toCurrency])

    useEffect(() => { //adding chain and type wrap
        if (conducted && stocks) {
            conducted.tokens.map(async (token) => {
                if (!stocks[token.id]) {
                    console.log(token.id, " there isn't in registrar");
                    return
                }
                stocks[token.id].decimals = 18
                stocks[token.id].chainId = SyncChainId
                stocks[token.id].conducted = true
                stocks[token.id].isAsset = true
                stocks[token.id].long = { address: token.long }
                stocks[token.id].short = { address: token.short }
            })
        }
        setStocks(stocks)
    }, [conducted, stocks, account])//eslint-disable-line

    const showSearchBox = (active = false, type) => {
        setEscapedType(type)
        setActiveSearchBox(active)
    }

    const selectToken = (token, type) => {
        token.address = isLong ? token.long.address : token.short.address
        token.symbol = isLong ? token.long_symbol : token.short_symbol
        if (type === "from") {
            setFromCurrency(token)
            setToCurrency(stableCoin)
        }
        if (type === "to") {
            setToCurrency(token)
            setFromCurrency(stableCoin)
        }
        setActiveSearchBox(false)
    }

    const targetCurrency = position === "buy" ? toCurrency : fromCurrency
    const priceSymbol = targetCurrency && targetCurrency.long_symbol?.substring(1)

    const signaturesRequestUrl = useMemo(() => {
        if (!priceSymbol || !NameChainMap[SyncChainId]) return
        const network = NameChainMap[SyncChainId]
        const position_type = isLong ? "long" : "short"
        return createSignaturesUrls(oracle.signatures, priceSymbol, network, position_type, position)
    }, [priceSymbol, NameChainMap[SyncChainId], isLong, position])

    const priceURLs = useMemo(() => {
        const network = NameChainMap[SyncChainId]
        if (!priceSymbol || !NameChainMap[SyncChainId]) return
        return createPriceUrls(oracle.prices, priceSymbol, network)
    }, [priceSymbol, SyncChainId])

    const getSignatures = useOracleFetch(signaturesRequestUrl)

    const getSinglePrice = useOracleFetch(priceURLs)


    useEffect(() => {
        if (priceSymbol) {
            getSinglePrice().then(prices => {
                setPriceResult({ ...prices[0] })
            })
        }
    }, [getSinglePrice])


    useEffect(() => {
        if (priceResult) {
            const position_type = isLong ? "long_price" : "short_price"
            const price = priceResult && priceResult["status"] == "open" ? priceResult[position_type] : 0
            const assetPrice = { price: price, fee: 0.01 }
            if (price !== null) {
                if (position === "buy") {
                    assetInfo.fromPrice = 1
                    assetInfo.toPrice = assetPrice.price
                    assetInfo.fee = assetPrice.fee
                } else {
                    assetInfo.fromPrice = assetPrice.price
                    assetInfo.fee = assetPrice.fee
                    assetInfo.toPrice = 1
                }
                setAssetInfo({ ...assetInfo })
            }
        }
    }, [isLong, priceResult])

    const { getAmountsOut } = useAmountsOut(fromCurrency, toCurrency, debouncedAmountIn, assetInfo)
    const { getAmountsIn } = useAmountsIn(fromCurrency, toCurrency, debouncedAmountOut, assetInfo)
    const { onSync } = useSync(fromCurrency, toCurrency, amountIn, amountOut, getSignatures, position, SyncChainId)
    const { onApprove } = useApprove(fromCurrency, oracle.contract, SyncChainId)

    useEffect(() => {
        const get = async () => {
            const result = getAmountsOut()
            if (result === null || !toCurrency) return
            if (amountIn === "" || isZero(amountIn)) setAmountOut("")
            else setAmountOut(RemoveTrailingZero(fromWei(result, toCurrency.decimals), toCurrency.decimals))
        }
        if (getAmountsOut && focusType === "from") {
            get()
        }

    }, [getAmountsOut, amountIn, focusType, fromCurrency, toCurrency])//replace multiple useState variables with useReducer

    useEffect(() => {
        const get = async () => {
            const result = await getAmountsIn()
            if (result === null || !fromCurrency) return
            if (amountOut === "" || isZero(amountOut)) setAmountIn("")
            else setAmountIn(RemoveTrailingZero(fromWei(result, fromCurrency.decimals), fromCurrency.decimals))
        }
        if (getAmountsIn && focusType === "to") {
            get()
        }
        //eslint-disable-next-line
    }, [getAmountsIn, amountOut, focusType, fromCurrency, toCurrency])//replace multiple useState variables with useReducer

    // console.log(allowance.toString());
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


    const handleSync = useCallback(async () => {
        try {
            const tx = await onSync()
            if (tx.status) {
                console.log("Sync did");
            } else {
                console.log("Sync Failed");
            }
            setAmountIn("")
            setAmountOut("")
        } catch (e) {
            console.error(e)
        }
    }, [onSync])

    if (loading || loadingCap) {
        return (<div className="loader-wrap">
            {<img className="loader" src={process.env.PUBLIC_URL + "/img/loading.png"} alt="loader" />}
        </div>)
    }

    return (<>

        <SearchBox
            chainId={SyncChainId}
            escapedType={escapedType}
            currencies={stocks}
            active={activeSearchBox}
            selectToken={selectToken}
            balances={balances}
            setActive={setActiveSearchBox} />

        <MainWrapper>
            {/* <Title>
                <div style={{ display: "flex", justifyContent: "flex-start", flexDirection: "column" }}>
                    <NetworkTitle>
                        <RowCenter >
                            <img src={process.env.PUBLIC_URL + "/img/chains/bsc.png"} style={{ width: "25px", height: "25px", marginRight: "5px" }} alt="DEUS" />
                            {NameChainMap[SyncChainId]}
                        </RowCenter>
                    </NetworkTitle>
                </div>
            </Title> */}

            <SwapWrapper>
                <TopWrap>
                    <RowBetween >
                        <Row width={"unset"}>
                            <Image src="/img/sync-logo.svg" alt="sync" height="35px" style={{ marginRight: "7px" }} />
                            <Type.XL style={{ color: "#fff" }} >SYNTHETICS</Type.XL>
                        </Row>

                        <Row alignItems={"center"} justifyContent={"flex-end"} width={"unset"}>
                            <Type.MD style={{ color: "#fff", marginRight: "5px" }} >NETWORK: </Type.MD>
                            <SelectBox setCurrRow={setSyncChainId} currRow={SyncChainId} />
                        </Row>
                    </RowBetween>
                </TopWrap>
                <TokenBox
                    type="from"
                    setActive={showSearchBox}
                    TokensMap={balances}
                    hasMax={true}
                    inputAmount={amountIn}
                    setInputAmount={setAmountIn}
                    setFocusType={setFocusType}
                    currency={fromCurrency}
                />

                <SwapArrow onClick={changePosition}>
                    <Image src="/img/swap/swap-arrow.svg" size="20px" my="15px" />
                </SwapArrow>

                <TokenBox
                    type="to"
                    title="To (estimated)"
                    inputAmount={amountOut}
                    TokensMap={balances}
                    setInputAmount={setAmountOut}
                    setActive={showSearchBox}
                    setFocusType={setFocusType}
                    currency={toCurrency}
                />

                <LongShort setLong={setLong} isLong={isLong} />

                <RateBox
                    currencies={{ from: fromCurrency, to: toCurrency || { symbol: "dAsset" } }}
                    marketPrice={priceResult && priceResult["status"] == "open" ? priceResult["long_price"] : "(CLOSED)"}
                    amountIn={amountIn}
                    amountOut={amountOut}
                    setInvert={setInvert}
                    invert={invert} />

                <SyncAction
                    amountIn={amountIn}
                    amountOut={amountOut}
                    handleSync={handleSync}
                    TokensMap={balances}
                    fromCurrency={fromCurrency}
                    validNetwork={SyncChainId}
                    isPreApproved={isPreApproved}
                    isApproved={isApproved}
                    loading={approveLoading}
                    handleApprove={handleApprove}
                    mt="20px" />

            </SwapWrapper>
            {/* <RemainingCap /> */}
        </MainWrapper >
    </>);
}

export default Sync2;