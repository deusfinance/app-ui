import useWeb3 from './useWeb3'
import { useEffect, useState, useCallback } from "react"
import { useWeb3React } from '@web3-react/core'
import useRefresh from './useRefresh'
import BigNumber from 'bignumber.js'
import { fromWei, getToWei } from '../helper/formatBalance'
import { useSetRecoilState } from 'recoil';
import HusdPoolAbi from '../config/abi/HusdPoolAbi.json'
import multicall from '../helper/multicall'
import { useERC20 } from './useContract'
import { ethers } from "ethers";
import { ZERO } from "../constant/number";
import {
    collatRatioState, deiPricesState, husdPoolDataState, availableRecollatState, redeemBalances
} from '../store/dei'
import {
    getCollatRatio, makeDeiRequest, mintDei, getDeiInfo, dollarDecimals, getBuyBackFee, getHusdPoolData, 
    redeem1to1Dei, redeemFractionalDei, redeemAlgorithmicDei, getClaimAll, mintFractional, mintAlgorithmic,
    buyBackDEUS, RecollateralizeDEI
} from '../helper/deiHelper'
import { ChainMap } from '../constant/web3'


export const useBuyBack = (fromCurrency, toCurrency, amountIn, amountOut, validChainId = 1) => {
    const web3 = useWeb3()
    const { account, chainId } = useWeb3React()

    const handleBuyBack = useCallback(async () => {
        if (validChainId && chainId !== validChainId) return false

        const result = await makeDeiRequest("/buyback")
        return await buyBackDEUS(
            getToWei(amountIn, fromCurrency.decimals),
            result.collateral_price,
            result.deus_price,
            result.expire_block,
            result.signature,
            "0",
            account,
            chainId,
            web3,
        )
    }, [fromCurrency, toCurrency, amountIn, amountOut, validChainId, account, chainId, web3])

    return { onBuyBack: handleBuyBack }
}

export const useRecollat = (fromCurrency, toCurrency, amountIn, amountOut, validChainId = 1) => {
    const web3 = useWeb3()
    const { account, chainId } = useWeb3React()

    const handleRecollat = useCallback(async () => {
        if (validChainId && chainId !== validChainId) return false

        const result = await makeDeiRequest("/recollat")
        return await RecollateralizeDEI(
            result.collateral_price,
            result.deus_price,
            result.expire_block,
            result.signature,
            getToWei(amountIn, fromCurrency.decimals).toString(),
            "0",
            account,
            chainId,
            web3,
        )
    }, [fromCurrency, toCurrency, amountIn, amountOut, validChainId, account, chainId, web3])

    return { onRecollat: handleRecollat }
}

export const useClaimAll = (validChainId = 1) => {
    const web3 = useWeb3()
    const { account, chainId } = useWeb3React()

    const handleClaimAll = useCallback(async () => {
        if (validChainId && chainId !== validChainId) return false
        const tx = await getClaimAll(account, web3, chainId)
        return tx
    }, [account, chainId, web3])
    return { onClaimAll: handleClaimAll }
}

export const useRedeem = (fromCurrency, to1Currency, to2Currency, amountIn, amountOut1, amountOut2, collatRatio, validChainId = 1) => {
    const web3 = useWeb3()
    const { account, chainId } = useWeb3React()

    const handleRedeem = useCallback(async () => {
        if (validChainId && chainId !== validChainId) return false

        if (collatRatio === 100) {
            const result = await makeDeiRequest("/redeem-1to1")
            return await redeem1to1Dei(
                getToWei(amountIn, fromCurrency.decimals),
                "0",
                result.collateral_price,
                result.expire_block,
                result.signature,
                account,
                chainId,
                web3,
            )
        } else if (collatRatio > 0) {
            const result = await makeDeiRequest("/redeem-fractional")
            return await redeemFractionalDei(
                result.collateral_price,
                result.deus_price,
                result.expire_block,
                result.signature,
                getToWei(amountIn, fromCurrency.decimals),
                "0",
                "0",
                account,
                chainId,
                web3,
            )
        } else {
            const result = await makeDeiRequest("/redeem-algorithmic")
            return await redeemAlgorithmicDei(
                result.deus_price,
                result.expire_block,
                result.signature,
                getToWei(amountIn, fromCurrency.decimals),
                "0",
                account,
                chainId,
                web3,
            )
        }
    }, [fromCurrency, to1Currency, to2Currency, amountIn, amountOut1, amountOut2, account, chainId, collatRatio, validChainId, web3])

    return { onRedeem: handleRedeem }
}

export const useMint = (from1Currency, from2Currency, toCurrency, amountIn1, amountIn2, amountOut, collatRatio, validChainId = 1) => {
    const web3 = useWeb3()
    const { account, chainId } = useWeb3React()

    const handleMint = useCallback(async () => {
        if (validChainId && chainId !== validChainId) return false
        let path = "/mint-algorithmic"

        if (collatRatio === 100) {
            path = "/mint-1to1"
            const result = await makeDeiRequest(path)
            return await mintDei(
                getToWei(amountIn1, from1Currency.decimals),
                "0",
                result.collateral_price,
                result.expire_block,
                result.signature,
                account,
                chainId,
                web3,
            )
        } else if (collatRatio > 0) {
            path = "/mint-fractional"
            const result = await makeDeiRequest(path)
            return await mintFractional(
                result.collateral_price,
                result.deus_price,
                result.expire_block,
                result.signature,
                getToWei(amountIn1, from1Currency.decimals),
                getToWei(amountIn2, from2Currency.decimals),
                "0",
                account,
                chainId,
                web3,
            )
        }

        const result = await makeDeiRequest(path)
        return await mintAlgorithmic(
            getToWei(amountIn1, from1Currency.decimals),
            result.deus_price,
            "0",
            result.expire_block,
            result.signature,
            account,
            chainId,
            web3,
        )

    }, [from1Currency, from2Currency, toCurrency, amountIn1, amountIn2, amountOut, account, chainId, collatRatio, validChainId, web3])

    return { onMint: handleMint }
}


export const useAvailableRecollat = () => {
    const web3 = useWeb3()
    const { account, chainId } = useWeb3React()

    const { slowRefresh } = useRefresh()
    const setAvailableRecollat = useSetRecoilState(availableRecollatState)

    useEffect(() => {
        const get = async () => {
            const dei_info_result = await getDeiInfo(web3, chainId)
            let { "0": dei_total_supply, "1": global_collateral_ratio, "2": global_collat_value } = dei_info_result
            let effective_collateral_ratio = (global_collat_value * (1e6)) / dei_total_supply;
            let available_recollat = global_collateral_ratio * dei_total_supply - (dei_total_supply * effective_collateral_ratio) / (1e6)
            setAvailableRecollat(available_recollat)
        }
        get()
    }, [slowRefresh, account, chainId])
}

//Add block timer counter effect
export const useRedeemBalances = () => {
    const web3 = useWeb3()
    const { account, chainId } = useWeb3React()

    const { slowRefresh } = useRefresh()
    const setRedeemBalances = useSetRecoilState(redeemBalances)

    useEffect(() => {
        const get = async () => {
            const mul = await multicall(web3, HusdPoolAbi, getHusdPoolData(ChainMap.RINKEBY, 1000000, account), chainId)
            const [
                redeemDEUSBalances,
                redeemCollateralBalances,
            ] = mul

            const updateState = {
                redeemDEUSBalances: fromWei(redeemDEUSBalances, 18),
                redeemCollateralBalances: fromWei(redeemCollateralBalances, 6),
            }
            setRedeemBalances({ ...updateState })
        }
        get()
    }, [slowRefresh, account, chainId])
}

export const useHusdPoolData = () => {
    const web3 = useWeb3()
    const { account, chainId } = useWeb3React()

    const { slowRefresh } = useRefresh()
    const setHusdPoolData = useSetRecoilState(husdPoolDataState)

    useEffect(() => {
        const get = async () => {
            const mul = await multicall(web3, HusdPoolAbi, getHusdPoolData(ChainMap.RINKEBY, 1000000, account), chainId)
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
            ] = mul

            const updateState = {
                collatDollarBalance: new BigNumber(collatDollarBalance).toNumber(),
                availableExcessCollatDV: new BigNumber(availableExcessCollatDV).toFixed(0),
                pool_ceiling: new BigNumber(pool_ceiling).toNumber(),
                redemption_fee: new BigNumber(redemption_fee).div(10000).toNumber(),
                minting_fee: new BigNumber(minting_fee).div(10000).toNumber(),
                buyback_fee: new BigNumber(buyback_fee).toNumber(),
                recollat_fee: new BigNumber(recollat_fee).toNumber(),
                bonus_rate: new BigNumber(bonus_rate).toNumber(),
                redeemPaused: redeemPaused[0],
                mintPaused: mintPaused[0],
                buyBackPaused: buyBackPaused[0],
                recollateralizePaused: recollateralizePaused[0],
            }
            setHusdPoolData({ ...updateState })
        }
        get()
    }, [slowRefresh, account, chainId])
}

export const useCollatRatio = () => {
    const web3 = useWeb3()

    const { slowRefresh } = useRefresh()
    const setCollatRatio = useSetRecoilState(collatRatioState)

    useEffect(() => {
        const get = async () => {
            const cr = await getCollatRatio(web3)
            setCollatRatio(new BigNumber(fromWei(cr[1], dollarDecimals)).times(100).toNumber())
        }
        get()
    }, [slowRefresh])
}

export const useDeiUpdate = () => {
    useCollatRatio()
    useDeiPrices()
    useHusdPoolData()
}

export const useDeiUpdateRedeem = () => {
    useCollatRatio()
    useDeiPrices()
    useHusdPoolData()
    useRedeemBalances()
}

export const useDeiUpdateBuyBack = () => {
    useDeiPrices()
    useAvailableRecollat()
    useHusdPoolData()

}

export const useRefreshRatio = () => {
    const { slowRefresh } = useRefresh()
    const [refreshRatio, setRefreshRatio] = useState(null)
    useEffect(() => {
        const get = async () => {
            try {
                const result = await makeDeiRequest("/refresh-ratio")
                setRefreshRatio(result)
            } catch (error) {
                console.log(error);
            }
        }
        get()
    }, [slowRefresh])
    return refreshRatio
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
    }, [slowRefresh])
}

export const useDeiInfo = () => {
    const web3 = useWeb3()

    const { slowRefresh } = useRefresh()
    const [DeiInfo, setDeiInfo] = useState(null)
    useEffect(() => {
        const get = async () => {
            try {
                const result = await makeDeiRequest("/refresh-ratio")
                setDeiInfo(result)
            } catch (error) {
                console.log(error);
            }
        }
        get()
    }, [slowRefresh])

    return DeiInfo
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
