import useWeb3, { useCrossWeb3 } from './useWeb3'
import { useEffect, useState, useCallback } from "react"
import { useWeb3React } from '@web3-react/core'
import useRefresh from './useRefresh'
import BigNumber from 'bignumber.js'
import { fromWei, getToWei, RemoveTrailingZero } from '../helper/formatBalance'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import HusdPoolAbi from '../config/abi/HusdPoolAbi.json'
import StakingDeiAbi from '../config/abi/StakingDeiAbi.json'
import ERC20Abi from '../config/abi/ERC20Abi.json'
import multicall from '../helper/multicall'
import { useERC20 } from './useContract'
import { ethers } from "ethers";
import { isZero, ZERO } from "../constant/number";
import {
    collatRatioState, deiPricesState, husdPoolDataState, availableRecollatState
} from '../store/dei'
import {
    makeDeiRequest, getDeiInfo, dollarDecimals, getHusdPoolData,
    redeem1to1Dei, redeemFractionalDei, redeemAlgorithmicDei, getClaimAll, mintFractional, mintAlgorithmic,
    buyBackDEUS, RecollateralizeDEI, getStakingData, getStakingTokenData, DeiDeposit, DeiWithdraw, SendWithToast, mint1t1DEI, collatUsdPrice
} from '../helper/deiHelper'
import { blockNumberState } from '../store/wallet'
import { formatBalance3 } from '../utils/utils'

export const useDeposit = (currency, amount, address, validChainId) => {
    const web3 = useWeb3()
    const { account, chainId } = useWeb3React()

    const handleDeposit = useCallback(async () => {
        if (validChainId && chainId !== validChainId) return false
        console.log(amount);
        const fn = DeiDeposit(currency, amount, address, web3)

        return await SendWithToast(fn, account, chainId, `Stake ${amount} ${currency.symbol}`)
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
        return await SendWithToast(fn, account, chainId, message)
    }, [currency, amount, address, validChainId, chainId, account, web3])
    return { onWithdraw: handleWithdraw }
}

export const useBuyBack = (fromCurrency, toCurrency, amountIn, amountOut, validChainId = 1) => {
    const web3 = useWeb3()
    const { account, chainId } = useWeb3React()
    const handleBuyBack = useCallback(async () => {
        if (validChainId && chainId !== validChainId) return false
        const result = await makeDeiRequest("/buyback")
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
        const result = await makeDeiRequest("/recollat")
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
        if (collatRatio === 100) {
            const result = await makeDeiRequest("/redeem-1to1")
            fn = redeem1to1Dei(
                getToWei(amountIn, fromCurrency.decimals).toFixed(0),
                result.collateral_price,
                result.expire_block,
                result.signature,
                chainId,
                web3,
            )
        } else if (collatRatio > 0) {
            const result = await makeDeiRequest("/redeem-fractional")
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
            const result = await makeDeiRequest("/redeem-algorithmic")
            fn = redeemAlgorithmicDei(
                result.deus_price,
                result.expire_block,
                result.signature,
                getToWei(amountIn, fromCurrency.decimals).toFixed(0),
                chainId,
                web3,
            )
        }
        return await SendWithToast(fn, account, chainId, `Redeem ${amountIn} ${fromCurrency.symbol}`)
    }, [fromCurrency, amountIn, account, chainId, collatRatio, validChainId, web3])

    return { onRedeem: handleRedeem }
}

export const useMint = (from1Currency, from2Currency, toCurrency, amountIn1, amountIn2, amountOut, collatRatio, validChainId) => {
    const web3 = useWeb3()
    const { account, chainId } = useWeb3React()

    const handleMint = useCallback(async () => {
        if (validChainId && chainId !== validChainId) return false
        let path = "/mint-algorithmic"
        let fn = null
        if (collatRatio === 100) {
            path = "/mint-1to1"
            const result = await makeDeiRequest(path)
            fn = mint1t1DEI(
                getToWei(amountIn1, from1Currency.decimals).toFixed(0),
                result.collateral_price,
                result.expire_block,
                result.signature,
                chainId,
                web3,
            )
        } else if (collatRatio > 0) {
            path = "/mint-fractional"
            const result = await makeDeiRequest(path)
            console.log(result.collateral_price);
            console.log(result.collateral_price);
            fn = mintFractional(
                getToWei(amountIn1, from1Currency.decimals).toFixed(0),
                getToWei(amountIn2, from2Currency.decimals).toFixed(0),
                result.collateral_price.toString(),
                result.deus_price,
                result.expire_block,
                result.signature,
                chainId,
                web3,
            )
        } else {
            const result = await makeDeiRequest(path)
            fn = mintAlgorithmic(
                getToWei(amountIn1, from1Currency.decimals).toFixed(0),
                result.deus_price,
                result.expire_block,
                result.signature,
                chainId,
                web3,
            )
        }
        return await SendWithToast(fn, account, chainId, `Mint ${amountOut} ${toCurrency.symbol}`)
    }, [from1Currency, from2Currency, toCurrency, amountIn1, amountIn2, amountOut, account, chainId, collatRatio, validChainId, web3])

    return { onMint: handleMint }
}




export const useStakingInfo = (conf, validChainId) => {
    const web3 = useCrossWeb3(validChainId)
    const { account, chainId } = useWeb3React()
    const { fastRefresh } = useRefresh()
    const [res, setRes] = useState(conf)

    useEffect(() => {
        const get = async () => {
            const mul = await multicall(web3, StakingDeiAbi, getStakingData(conf, account), chainId)
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
        }
        if (web3 && account) {
            get()
        }
    }, [conf, fastRefresh, account, chainId, web3])
    return res
}

export const useTokenInfo = (conf, validChainId) => {
    const web3 = useCrossWeb3(validChainId)
    const { account, chainId } = useWeb3React()
    const { fastRefresh } = useRefresh()

    const [res, setRes] = useState(conf)
    useEffect(() => {
        const get = async () => {
            const mul = await multicall(web3, ERC20Abi, getStakingTokenData(conf, account), chainId)
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
        }
        if (web3 && account && conf) {
            get()
        }
    }, [conf, fastRefresh, account, chainId, web3])
    return res
}

export const useAvailableRecollat = (validChainId) => {
    const web3 = useCrossWeb3(validChainId)

    const { slowRefresh } = useRefresh()
    const setAvailableRecollat = useSetRecoilState(availableRecollatState)

    useEffect(() => {
        const get = async () => {
            const dei_info_result = await getDeiInfo(web3, validChainId)
            let { "0": dei_total_supply, "1": global_collateral_ratio, "2": global_collat_value } = dei_info_result
            let effective_collateral_ratio = (global_collat_value * (1e6)) / dei_total_supply;
            let available_recollat = global_collateral_ratio * dei_total_supply - (dei_total_supply * effective_collateral_ratio) / (1e6)
            setAvailableRecollat(available_recollat)
        }
        get()
    }, [setAvailableRecollat, slowRefresh, validChainId, web3])
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
    const forceRefresh = useRedemptionDelay()
    const setHusdPoolData = useSetRecoilState(husdPoolDataState)

    useEffect(() => {
        const get = async () => {

            const mul = await multicall(web3, HusdPoolAbi, getHusdPoolData(validChainId, collatUsdPrice, account), validChainId)

            const [
                collatDollarBalance,
                availableExcessCollatDV,
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
                availableExcessCollatDV: new BigNumber(availableExcessCollatDV).toFixed(0),
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
                redeemCollateralBalances: account ? fromWei(redeemCollateralBalances, 6) : "0",
            }
            setHusdPoolData({ ...updateState })
        }
        get()
    }, [setHusdPoolData, slowRefresh, forceRefresh, web3, account, validChainId, chainId])
}

export const useCollatRatio = (validChainId) => {
    const web3 = useCrossWeb3(validChainId)
    const { slowRefresh } = useRefresh()
    const setCollatRatio = useSetRecoilState(collatRatioState)

    useEffect(() => {
        const get = async () => {
            const cr = await getDeiInfo(web3, validChainId)
            setCollatRatio(new BigNumber(fromWei(cr[1], dollarDecimals)).times(100).toNumber())
        }
        get()
    }, [slowRefresh, web3, setCollatRatio])
}

export const useDeiUpdate = (validChainId) => {
    useCollatRatio(validChainId)
    useDeiPrices()
    useHusdPoolData(validChainId)
}

export const useDeiUpdateRedeem = (validChainId) => {
    useCollatRatio(validChainId)
    useDeiPrices()
    useHusdPoolData(validChainId)
}

export const useDeiUpdateBuyBack = (validChainId) => {
    useDeiPrices()
    useAvailableRecollat(validChainId)
    useHusdPoolData(validChainId)

}

export const useDeiPrices = () => {
    const { slowRefresh } = useRefresh()
    const setRefreshRatio = useSetRecoilState(deiPricesState)
    useEffect(() => {
        const get = async () => {
            try {
                const result = await makeDeiRequest("/price")
                setRefreshRatio(result)
            } catch (error) {
                console.log(error);
            }
        }
        get()
    }, [slowRefresh, setRefreshRatio])
}

export const useAllowance = (currency, contractAddress, validChainId) => {
    const [allowance, setAllowance] = useState(new BigNumber(-1))
    const { account, chainId } = useWeb3React()
    const { fastRefresh } = useRefresh()
    const { address: tokenAddress } = currency
    const contract = useERC20(tokenAddress)

    useEffect(() => {
        const fetchAllowance = async () => {
            if (!tokenAddress) return setAllowance(ZERO)
            if (validChainId && chainId !== validChainId) setAllowance(ZERO)
            if (contract === null) setAllowance(ethers.constants.MaxUint256)
            else if (currency.allowance) { setAllowance(currency.allowance) }
            else {
                const res = await contract.methods.allowance(account, contractAddress).call()
                setAllowance(new BigNumber(res))
            }
        }
        if (account && tokenAddress) {
            fetchAllowance()
        }
    }, [account, contract, chainId, contractAddress, tokenAddress, validChainId, currency, fastRefresh])

    return allowance
}
