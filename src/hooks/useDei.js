import useWeb3, { useCrossWeb3 } from './useWeb3'
import { useEffect, useState, useCallback } from "react"
import { useWeb3React } from '@web3-react/core'
import useRefresh from './useRefresh'
import BigNumber from 'bignumber.js'
import { fromWei, getToWei, RemoveTrailingZero } from '../helper/formatBalance'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import HusdPoolAbi from '../config/abi/HusdPoolAbi.json'
import StakingDeiAbi from '../config/abi/StakingDeiAbi.json'
import SspAbi from '../config/abi/SspAbi.json'
import SspOracleAbi from '../config/abi/SspOracleAbi.json'
import ERC20Abi from '../config/abi/ERC20Abi.json'
import multicall from '../helper/multicall'
import { useCrossERC20 } from './useContract'
import { ethers } from "ethers";
import { isZero, ZERO } from "../constant/number";
import { deiPricesState, husdPoolDataState, depositAmountState, sspDataState } from '../store/dei'
import {
    makeDeiRequest, getHusdPoolData,
    redeem1to1Dei, redeemFractionalDei, redeemAlgorithmicDei, getClaimAll, mintFractional, mintAlgorithmic,
    buyBackDEUS, RecollateralizeDEI, getStakingData, getStakingTokenData, DeiDeposit, DeiWithdraw, SendWithToast,
    mint1t1DEI, collatUsdPrice, zapIn, getZapAmountsOut, mintDeiSSP, mintDeiSSPWithOracle, getSspData
} from '../helper/deiHelper'
import { blockNumberState } from '../store/wallet'
import { formatBalance3 } from '../utils/utils'
import { collateralToken } from '../constant/token'
import { COLLATERAL_ADDRESS, MINT_PATH, SSP_ADDRESS } from '../constant/contracts'
import { getDeusSwapContract, getNewProxyMinterContract } from '../helper/contractHelpers'
import { ChainId, isSupportEIP1559 } from '../constant/web3'
import { DEI_COLLATERAL_ZAP } from '../constant/contracts';
import { ToastTransaction } from '../utils/explorers'

export const useZap = (currency, stakingInfo, amountIn, slippage, amountOut, amountOutParams, validChainId) => {
    const web3 = useWeb3()
    const { account, chainId } = useWeb3React()

    const handleZap = useCallback(async () => {
        if ((validChainId && chainId !== validChainId) || !currency) return false

        const amountInToWei = getToWei(amountIn, currency.decimals).toFixed(0)
        // const minLpAmountToWei = getToWei(minLpAmount, 18).toFixed(0)
        const minLpAmountToWei = new BigNumber(amountOut).multipliedBy((100 - Number(slippage)) / 100).toFixed(0, 1)
        // const minLpAmountToWei = "0"
        try {
            let path = "/mint-fractional"
            const result = await makeDeiRequest(path, validChainId)

            const fn = zapIn(currency, stakingInfo.zapperContract, amountInToWei, minLpAmountToWei, result, amountOutParams, false, web3, chainId)
            const payload = await getGasData(web3, fn, validChainId, account)
            if (currency.address === "0x") { payload.value = amountInToWei }
            return await SendWithToast(fn, account, chainId, `Zap ${amountIn} ${currency.symbol} to ${stakingInfo?.title} `, payload)
        } catch (error) {
            console.log(error);
        }
    }, [currency, stakingInfo, amountIn, amountOut, amountOutParams, validChainId, chainId, account, web3, slippage])
    return { onZap: handleZap }
}

export const useGetAmountsOutZap = (currency, zapperContract, amountIn, debouncedAmountIn, result, validChainId) => {
    const web3 = useWeb3()

    const handleGetAmountOut = useCallback(async () => {
        if (!validChainId || !currency || !amountIn || amountIn === "" || isZero(amountIn) || !zapperContract || debouncedAmountIn !== amountIn) return ""
        const amountInToWei = getToWei(amountIn, currency.decimals).toFixed(0)
        try {
            // let result = null
            // let path = "/mint-fractional"
            // result = await makeDeiRequest(path, validChainId)
            let useMinter = false

            let amount = await getZapAmountsOut(
                currency,
                amountInToWei,
                zapperContract,
                result,
                web3,
                validChainId,
            )

            if (zapperContract === DEI_COLLATERAL_ZAP[ChainId.FTM]) {
                const amountWithMint = await getZapAmountsOut(
                    currency,
                    amountInToWei,
                    zapperContract,
                    result,
                    web3,
                    validChainId,
                    true,
                )

                if (amount.lp <= 1.03 * amountWithMint.lp) {
                    amount = amountWithMint
                    useMinter = true
                }
            }

            return { ...amount, useMinter }
        } catch (e) {
            console.log(e);
            return false
        }

    }, [currency, result, zapperContract, amountIn, debouncedAmountIn, validChainId, web3])
    return { getAmountsOut: handleGetAmountOut }
}

export const useDeposit = (currency, amount, address, validChainId) => {
    const web3 = useWeb3()
    const { account, chainId } = useWeb3React()

    const handleDeposit = useCallback(async () => {
        if (validChainId && chainId !== validChainId) return false
        console.log(amount);
        const fn = DeiDeposit(currency, amount, address, web3)
        const payload = await getGasData(web3, fn, validChainId, account)
        return await SendWithToast(fn, account, chainId, `Stake ${amount} ${currency.symbol}`, payload)
    }, [currency, amount, address, validChainId, chainId, account, web3])
    return { onDeposit: handleDeposit }
}

export const useWithdraw = (currency, amount, address, validChainId) => {
    const web3 = useWeb3()

    const { account, chainId } = useWeb3React()
    const handleWithdraw = useCallback(async () => {
        if (validChainId && chainId !== validChainId) return false
        const fn = DeiWithdraw(currency, amount, address, web3)
        const message = isZero(amount) ? `Claim DEUS` : `Withdraw ${amount} ${currency.symbol}`
        const payload = await getGasData(web3, fn, validChainId, account)
        return await SendWithToast(fn, account, chainId, message, payload)
    }, [currency, amount, address, validChainId, chainId, account, web3])
    return { onWithdraw: handleWithdraw }
}

export const useBuyBack = (fromCurrency, toCurrency, amountIn, amountOut, validChainId = 1) => {
    const web3 = useWeb3()
    const { account, chainId } = useWeb3React()
    const handleBuyBack = useCallback(async () => {
        if (validChainId && chainId !== validChainId) return false
        const result = await makeDeiRequest("/buyback", validChainId)
        const fn = buyBackDEUS(
            getToWei(amountIn, fromCurrency.decimals).toFixed(0),
            result.deus_price,
            result.expire_block,
            result.signature,
            collatUsdPrice,
            account,
            chainId,
            web3,
        )
        return await SendWithToast(fn, account, chainId, `BuyBack ${amountIn} ${fromCurrency.symbol} for ${amountOut} ${toCurrency.symbol}`)

    }, [fromCurrency, toCurrency, amountIn, amountOut, validChainId, account, chainId, web3])

    return { onBuyBack: handleBuyBack }
}

export const useRecollat = (fromCurrency, toCurrency, amountIn, amountOut, validChainId = 1) => {
    const web3 = useWeb3()
    const { account, chainId } = useWeb3React()

    const handleRecollat = useCallback(async () => {
        if (validChainId && chainId !== validChainId) return false
        const result = await makeDeiRequest("/recollat", validChainId)
        const fn = RecollateralizeDEI(
            result.collateral_price,
            result.deus_price,
            result.expire_block,
            result.signature,
            getToWei(amountIn, fromCurrency.decimals).toFixed(0),
            collatUsdPrice,
            account,
            chainId,
            web3,
        )

        return await SendWithToast(fn, account, chainId, `Recollat ${amountIn} ${fromCurrency.symbol} for ${amountOut} ${toCurrency.symbol}`)

    }, [fromCurrency, toCurrency, amountIn, amountOut, validChainId, account, chainId, web3])

    return { onRecollat: handleRecollat }
}

//TODO
export const useClaimAll = (validChainId = 4) => {
    const web3 = useWeb3()
    const { account, chainId } = useWeb3React()

    const handleClaimAll = useCallback(async () => {
        if (validChainId && chainId !== validChainId) return false
        const tx = await getClaimAll(account, web3, chainId)
        return tx
    }, [account, chainId, validChainId, web3])
    return { onClaimAll: handleClaimAll }
}

export const useRedeem = (fromCurrency, to1Currency, to2Currency, amountIn, amountOut1, amountOut2, collatRatio, validChainId = 1) => {
    const web3 = useWeb3()
    const { account, chainId } = useWeb3React()

    const handleRedeem = useCallback(async () => {
        if (validChainId && chainId !== validChainId) return false
        let fn = null
        let result = null
        if (collatRatio === 100) {
            result = await makeDeiRequest("/redeem-1to1", validChainId)
            fn = redeem1to1Dei(
                getToWei(amountIn, fromCurrency.decimals).toFixed(0),
                result.collateral_price,
                result.expire_block,
                result.signature,
                chainId,
                web3,
            )
        } else if (collatRatio > 0) {
            result = await makeDeiRequest("/redeem-fractional", validChainId)
            if (result.status === "ERROR") {
                ToastTransaction("info", "Redeem Failed.", result.message)
                return
            }
            fn = redeemFractionalDei(
                result.collateral_price,
                result.deus_price,
                result.expire_block,
                result.signature,
                getToWei(amountIn, fromCurrency.decimals).toFixed(0),
                chainId,
                web3,
            )
        } else {
            result = await makeDeiRequest("/redeem-algorithmic", validChainId)
            fn = redeemAlgorithmicDei(
                result.deus_price,
                result.expire_block,
                result.signature,
                getToWei(amountIn, fromCurrency.decimals).toFixed(0),
                chainId,
                web3,
            )
        }
        const payload = await getGasData(web3, fn, validChainId, account)
        return await SendWithToast(fn, account, chainId, `Redeem ${amountIn} ${fromCurrency.symbol}`, payload)
    }, [fromCurrency, amountIn, account, chainId, collatRatio, validChainId, web3])

    return { onRedeem: handleRedeem }
}

export const useMint = (from1Currency, from2Currency, toCurrency, amountIn1, amountIn2, amountOut, collatRatio, slippage, proxy, ssp, amountOutParams, validChainId) => {
    const web3 = useWeb3()
    const { account, chainId } = useWeb3React()

    const handleMint = useCallback(async () => {
        if (validChainId && chainId !== validChainId) return false
        if (!from1Currency || !toCurrency || !amountIn1 || !amountOut) return
        const amount1toWei = getToWei(amountIn1, from1Currency.decimals).toFixed(0)
        const amountOutToWei = getToWei(amountOut, toCurrency.decimals).toFixed(0)
        const minAmountOutToWei = getToWei(amountOut, toCurrency.decimals).times(1 - (slippage / 100)).toFixed(0)

        let path = "/mint-algorithmic"
        let fn = null

        if (ssp) {
            if (validChainId !== ChainId.FTM) {
                path = "/ssp"
                const result = await makeDeiRequest(path, validChainId)
                fn = mintDeiSSPWithOracle(amount1toWei, result, chainId, web3)
            } else {
                fn = mintDeiSSP(amount1toWei, chainId, web3)
            }
        }
        else if (!proxy) {
            if (collatRatio === 100) {
                path = "/mint-1to1"
                const result = await makeDeiRequest(path, validChainId)
                fn = mint1t1DEI(
                    amount1toWei,
                    result.collateral_price,
                    result.expire_block,
                    result.signature,
                    chainId,
                    web3,
                )
            } else if (collatRatio > 0) {
                path = "/mint-fractional"
                const result = await makeDeiRequest(path, validChainId)
                if (result.status === "ERROR") {
                    ToastTransaction("info", "Mint Failed.", result.message)
                    return
                }
                const amount2toWei = getToWei(amountIn2, from2Currency.decimals).toFixed(0)
                fn = mintFractional(
                    amount1toWei,
                    amount2toWei,
                    result.collateral_price.toString(),
                    result.deus_price,
                    result.expire_block,
                    result.signature,
                    chainId,
                    web3,
                )
            } else {
                const result = await makeDeiRequest(path, validChainId)
                fn = mintAlgorithmic(
                    amount1toWei,
                    result.deus_price,
                    result.expire_block,
                    result.signature,
                    chainId,
                    web3,
                )
            }
        } else {
            path = "/mint-fractional"
            try {
                const result = await makeDeiRequest(path, validChainId)
                if (result.status === "ERROR") {
                    ToastTransaction("info", "Mint Failed.", result.message)
                    return
                }
                const { collateral_price, deus_price, expire_block, signature } = result
                const erc20Path = MINT_PATH[chainId][from1Currency.symbol]
                let method = ""
                let proxyTuple = []
                if (amountOutParams.length > 0 && amountOutParams[0] === amountOutToWei)
                    proxyTuple = [
                        amount1toWei,
                        minAmountOutToWei,
                        deus_price,
                        collateral_price,
                        amountOutParams[1],
                        amountOutParams[2],
                        expire_block,
                        [signature]
                    ]
                let param = [proxyTuple]

                if (chainId === ChainId.FTM) {
                    if (from1Currency.address === "0x") {
                        method = "Nativecoin2DEI"
                        param.push(erc20Path)
                    } else if (from1Currency.address === COLLATERAL_ADDRESS[chainId]) {
                        method = "USDC2DEI"
                    } else {
                        if (!erc20Path) {
                            console.error("INVALID PATH with ", from1Currency)
                            return
                        }
                        method = "ERC202DEI"
                        param.push(erc20Path)
                    }
                } else {
                    if (from1Currency.address === "0x") {
                        method = "Nativecoin2DEI"
                        param.push(erc20Path)
                    } else if (from1Currency.address === COLLATERAL_ADDRESS[chainId]) {
                        method = "USDC2DEI"
                    } else {
                        if (!erc20Path) {
                            console.error("INVALID PATH with ", from1Currency)
                            return
                        }
                        method = "ERC202DEI"
                        param.push(erc20Path)
                    }
                }

                console.log(method, param);
                fn = getNewProxyMinterContract(web3, chainId).methods[method](...param)

            } catch (error) {
                console.log(error);
            }
        }
        const payload = await getGasData(web3, fn, validChainId, account)
        if (from1Currency.address === "0x") { payload.value = amount1toWei }

        try {
            return await SendWithToast(fn, account, chainId, `Mint ${amountOut} ${toCurrency.symbol}`, payload)
        } catch (error) {
            console.log(error);
        }
    }, [from1Currency, from2Currency, toCurrency, amountIn1, amountIn2, amountOut, collatRatio, slippage, proxy, ssp, amountOutParams, account, chainId, validChainId, web3])

    return { onMint: handleMint }
}

export const useSwap = (from1Currency, toCurrency, amountIn1, amountOut, collatRatio, slippage, proxy, amountOutParams, validChainId) => {
    const web3 = useWeb3()
    const { account, chainId } = useWeb3React()

    const handleMint = useCallback(async () => {

        if (validChainId && chainId !== validChainId) return false
        if (!from1Currency || !toCurrency || !amountIn1 || !amountOut) return

        const amount1toWei = getToWei(amountIn1, from1Currency.decimals).toFixed(0)
        const amountOutToWei = getToWei(amountOut, toCurrency.decimals).toFixed(0)
        const minAmountOutToWei = getToWei(amountOut, toCurrency.decimals).times(1 - (slippage / 100)).toFixed(0)

        let fn = null

        let path = "/mint-fractional"
        try {
            const result = await makeDeiRequest(path, validChainId)
            if (result.status === "ERROR") {
                ToastTransaction("info", "Swap Failed.", result.message)
                return
            }
            const { collateral_price, deus_price, expire_block, signature } = result
            const erc20Path = MINT_PATH[chainId][from1Currency.symbol]
            let method = ""
            let proxyTuple = []

            if (!!amountOutParams && amountOutParams[0] === amountOutToWei)
                proxyTuple = [
                    amount1toWei,
                    minAmountOutToWei,
                    deus_price,
                    collateral_price,
                    amountOutParams[1],
                    amountOutParams[2],
                    expire_block,
                    [signature]
                ]
            let param = [proxyTuple]

            if (from1Currency.address === "0x") {
                method = "Nativecoin2DEUS"
                param.push(erc20Path)
            }
            else if (from1Currency.address === COLLATERAL_ADDRESS[chainId]) {
                method = "USDC2DEUS"
            }

            else {
                if (!erc20Path) {
                    console.error("INVALID PATH with ", from1Currency)
                    return
                }
                method = "ERC202DEUS"
                param.push(erc20Path)
            }
            console.log(method, param);
            fn = getDeusSwapContract(web3, chainId).methods[method](...param)

        } catch (error) {
            console.log(error);
        }
        const payload = await getGasData(web3, fn, validChainId, account)
        if (from1Currency.address === "0x") { payload.value = amount1toWei }

        try {
            return await SendWithToast(fn, account, chainId, `Mint ${amountOut} ${toCurrency.symbol}`, payload)
        } catch (error) {
            console.log(error);
        }
    }, [from1Currency, toCurrency, amountIn1, amountOut, slippage, amountOutParams, account, chainId, validChainId, web3])

    return { onMint: handleMint }
}


export const useAPY = (validChainId) => {
    const { mediumRefresh } = useRefresh()
    const [apy, setApy] = useState({})

    useEffect(() => {
        setApy({})
    }, [validChainId])

    useEffect(() => {
        const get = async () => {
            try {
                const apy = await makeDeiRequest("/apy", validChainId)
                const apyValue = apy ? apy : {}
                setApy(apyValue)
            } catch (error) {
                console.log("useAPY ", error);
            }
        }
        if (validChainId)
            get()
    }, [mediumRefresh, setApy, validChainId])

    return apy
}

export const useDepositAmount = (validChainId) => {
    const { slowRefresh } = useRefresh()
    const setDepositAmount = useSetRecoilState(depositAmountState)

    useEffect(() => {
        const get = async () => {
            try {
                const result = await makeDeiRequest("/info", validChainId)
                setDepositAmount(result.staked_amount)
            } catch (error) {
                console.log("useDepositAmount ", error);
            }
        }
        get()
    }, [slowRefresh, validChainId, setDepositAmount])
}

export const getGasData = async (web3, fn, chainId, account) => {
    const payload = {}
    try {
        if (fn) {
            const estimateGas = await fn.estimateGas({ from: account })
            payload.estimateGas = new BigNumber(estimateGas * 1.2).toFixed(0)
        }
        const gasPrice = await web3.eth.getGasPrice()
        payload.gasPrice = Number(gasPrice)

        const block = await web3.eth.getBlock("pending")

        if (isSupportEIP1559[chainId]) {
            payload.baseFeePerGas = Number(block.baseFeePerGas || 0) //just use gasPrice if current chain dont support eip1559
            payload.maxFeePerGas = new BigNumber(Math.max(payload.gasPrice, payload.baseFeePerGas) * 1.2).toFixed(0)
            if (chainId === ChainId.MATIC) {
                payload.maxPriorityFeePerGas = Math.max(29000000000, Number(payload.maxFeePerGas) - payload.baseFeePerGas)
            }
        }
    } catch (error) {
        console.log("error happened in getGasData", error);
    }
    return payload
}

export const useStakingInfo = (conf, validChainId) => {
    const web3 = useCrossWeb3(validChainId)
    const { account, chainId } = useWeb3React()
    const { fastRefresh } = useRefresh()
    const [res, setRes] = useState(conf)

    useEffect(() => {
        const get = async () => {
            try {
                const mul = await multicall(web3, StakingDeiAbi, getStakingData(conf, account), validChainId)
                const [
                    users,
                    pendingReward
                ] = mul
                const { depositAmount, paidReward } = users

                setRes({
                    ...conf,
                    depositAmount: RemoveTrailingZero(fromWei(depositAmount["_hex"], 18), 18),
                    paidReward: RemoveTrailingZero(fromWei(paidReward["_hex"], 18), 18),
                    pendingReward: formatBalance3(fromWei(pendingReward, 18), 6),
                })
            } catch (error) {
                console.log("useStakingInfo ", error);
            }

        }
        if (web3 && account) {
            get()
        }
    }, [conf, fastRefresh, account, chainId, validChainId, web3])
    return res
}

export const useTokenInfo = (conf, validChainId) => {
    const web3 = useCrossWeb3(validChainId)
    const { account, chainId } = useWeb3React()
    const { fastRefresh } = useRefresh()
    const [res, setRes] = useState(conf)
    useEffect(() => {
        const get = async () => {
            try {
                const mul = await multicall(web3, ERC20Abi, getStakingTokenData(conf, account), validChainId)

                const [
                    allowance,
                    depositTokenWalletBalance,
                    totalDepositBalance
                ] = mul
                setRes({
                    ...conf,
                    allowance: new BigNumber(allowance),
                    depositTokenWalletBalance: fromWei(depositTokenWalletBalance),
                    totalDepositBalance: fromWei(totalDepositBalance),
                })
            } catch (error) {
                console.log("useTokenInfo ", error);

            }

        }
        if (web3 && account && conf) {
            get()
        }
    }, [conf, fastRefresh, account, chainId, validChainId, web3])
    return res
}


export const useRedemptionDelay = () => {
    const poolData = useRecoilValue(husdPoolDataState)
    const { redemption_delay } = poolData
    const blockNumber = useRecoilValue(blockNumberState)
    const [forceRefresh, setForceRefresh] = useState(0)

    useEffect(() => {
        if (blockNumber % redemption_delay === 0) {
            setForceRefresh(f => f + 1)
        }
    }, [blockNumber, redemption_delay])

    return forceRefresh
}

export const useHusdPoolData = (validChainId) => {
    const web3 = useCrossWeb3(validChainId)
    const { account, chainId } = useWeb3React()
    const { slowRefresh } = useRefresh()
    const setHusdPoolData = useSetRecoilState(husdPoolDataState)

    useEffect(() => {
        const get = async () => {

            try {
                const mul = await multicall(web3, HusdPoolAbi, getHusdPoolData(validChainId, collatUsdPrice, account), validChainId)

                const [
                    collatDollarBalance,
                    // availableExcessCollatDV,
                    pool_ceiling,
                    redemption_fee,
                    minting_fee,
                    buyback_fee,
                    recollat_fee,
                    recollateralizePaused,
                    buyBackPaused,
                    mintPaused,
                    redeemPaused,
                    bonus_rate,
                    redemption_delay,
                    redeemDEUSBalances,
                    redeemCollateralBalances,
                ] = mul
                const updateState = {
                    collatDollarBalance: fromWei(collatDollarBalance, 18),
                    // availableExcessCollatDV: new BigNumber(availableExcessCollatDV).div(1e18).toFixed(),
                    pool_ceiling: fromWei(pool_ceiling, 6),
                    redemption_fee: new BigNumber(redemption_fee).div(10000).toNumber(),
                    minting_fee: new BigNumber(minting_fee).div(10000).toNumber(),
                    buyback_fee: new BigNumber(buyback_fee).toNumber(),
                    recollat_fee: new BigNumber(recollat_fee).toNumber(),
                    bonus_rate: new BigNumber(bonus_rate).toNumber(),
                    redemption_delay: new BigNumber(redemption_delay).toNumber(),
                    redeemPaused: redeemPaused[0],
                    mintPaused: mintPaused[0],
                    buyBackPaused: buyBackPaused[0],
                    recollateralizePaused: recollateralizePaused[0],
                    redeemDEUSBalances: account ? fromWei(redeemDEUSBalances, 18) : "0",
                    redeemCollateralBalances: account ? fromWei(redeemCollateralBalances, collateralToken[validChainId]?.decimals) : "0",
                }
                setHusdPoolData({ ...updateState })
            } catch (error) {
                console.log("useHusdPoolData ", error);
            }

        }
        get()
    }, [setHusdPoolData, slowRefresh, web3, account, validChainId, chainId]) //TODO forceRefresh
}

export const useSSPData = (validChainId, oracleResponse) => {
    const web3 = useCrossWeb3(validChainId)
    const { account, chainId } = useWeb3React()
    const { fastRefresh } = useRefresh()
    const setSspData = useSetRecoilState(sspDataState)

    useEffect(() => {
        const get = async () => {

            try {
                const validABI = ChainId.FTM === validChainId ? SspAbi : SspOracleAbi
                const mul = await multicall(web3, validABI, getSspData(validChainId, oracleResponse), validChainId)

                const [
                    lowerBound,
                    topBound,
                    leftMintableDei,
                ] = mul
                const updateState = {
                    lowerBound: fromWei(lowerBound, collateralToken[validChainId].decimals),
                    topBound: fromWei(topBound, collateralToken[validChainId].decimals),
                    leftMintableDei: fromWei(leftMintableDei, 18),
                }
                setSspData({ ...updateState })
            } catch (error) {
                console.log("useSSPData ", error);
            }

        }
        if (SSP_ADDRESS[validChainId]) {
            get()
        } else {
            setSspData({})
        }
    }, [setSspData, oracleResponse, fastRefresh, web3, account, validChainId, chainId]) //TODO forceRefresh
}


export const useCollatRatio = () => {
    // const setCollatRatio = useSetRecoilState(collatRatioState)
    // setCollatRatio(80)
}


export const useDeiUpdate = (validChainId) => {
    useCollatRatio(validChainId)
    useDeiPrices(validChainId)
    useHusdPoolData(validChainId)
    useDepositAmount(validChainId)
}

export const useDeiUpdateBuyBack = (validChainId) => {
    useDeiPrices(validChainId)
    useHusdPoolData(validChainId)
}

export const useDeiPrices = (validChainId) => {
    const { fastRefresh } = useRefresh()
    const setRefreshRatio = useSetRecoilState(deiPricesState)
    useEffect(() => {
        const get = async () => {
            try {
                const result = await makeDeiRequest("/price", validChainId)//TODO
                setRefreshRatio(result)
            } catch (error) {
                console.log("useDeiPrices ", error);
            }
        }
        get()
    }, [fastRefresh, validChainId, setRefreshRatio])
}

export const useAllowance = (currency, contractAddress, validChainId, fastUpdate) => {
    const [allowance, setAllowance] = useState(new BigNumber(-1))
    const { account, chainId } = useWeb3React()
    const web3 = useCrossWeb3(validChainId)
    const { fastRefresh } = useRefresh()
    const { address: tokenAddress } = currency
    const contract = useCrossERC20(tokenAddress, web3)

    useEffect(() => {
        const fetchAllowance = async () => {
            if (!tokenAddress || contractAddress === undefined) return setAllowance(ZERO)
            if (currency.chainId && currency.chainId !== validChainId) return setAllowance(ZERO)
            if (validChainId && chainId !== validChainId) setAllowance(ZERO)
            if (contract === null) setAllowance(ethers.constants.MaxUint256)
            else if (currency.allowance) { setAllowance(currency.allowance) }
            else {
                try {
                    const res = await contract.methods.allowance(account, contractAddress).call()
                    setAllowance(new BigNumber(res))
                } catch (error) {
                    console.log("useAllowance ", currency, contractAddress, validChainId, error);
                }
            }
        }
        if (account && tokenAddress) {
            fetchAllowance()
        }
    }, [account, contract, chainId, contractAddress, tokenAddress, validChainId, currency, fastRefresh, fastUpdate])

    return allowance
}

/* const formatOutput = (data) => {
    console.log(data);
    const numBlocks = 1
    let blocks = []
    for (let i = 0; i < numBlocks; i++) {
        blocks.push({
            blockNumber: Number(data.oldestBlock) + i,
            reward: data.reward[i].map(r => Math.round(Number(r) / 10 ** 9)),
            baseFeePerGas: Math.round(Number(data.baseFeePerGas[i]) / 10 ** 9),
            gasUsedRatio: data.gasUsedRatio[i],
        })
    }
    return blocks;
} */

