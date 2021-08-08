import useWeb3 from './useWeb3'
import { useEffect, useState, useCallback } from "react"
import { useWeb3React } from '@web3-react/core'
import useRefresh from './useRefresh'
import BigNumber from 'bignumber.js'
import { fromWei, getToWei } from '../helper/formatBalance'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import HusdPoolAbi from '../config/abi/HusdPoolAbi.json'
import multicall from '../helper/multicall'
import { useERC20 } from './useContract'
import { ethers } from "ethers";
import { ZERO } from "../constant/number";
import {
    collatRatioState, deiPricesState, husdPoolDataState, mintingFeeState, redemptionFeeState,
    redeemDEUSBalancesState, redeemCollateralBalancesState, availableBuybackState, availableRecollatState,
    buyBackFeeState, recollatFeeState
} from '../store/dei'
import {
    getCollatDollarBalance, getCollatRatio, makeDeiRequest, mintDei, getDeiInfo,
    getPoolCeiling, dollarDecimals, getRedemptionFee, getMintingFee, getRecollatFee,
    getBuyBackFee, getHusdPoolData, redeem1to1Dei, redeemFractionalDei, redeemAlgorithmicDei,
    getRedeemDEUSBalances, getRedeemCollateralBalances, getClaimAll, mintFractional, mintAlgorithmic,
    getAvailableBuyback, getBuyBackPaused, getRecollateralizePaused, getMintPaused, getRedeemPaused,
    buyBackDEUS, RecollateralizeDEI, getBonusRate
} from '../helper/deiHelper'



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
            getToWei(amountIn, fromCurrency.decimals),
            "0",
            account,
            chainId,
            web3,
        )
    }, [fromCurrency, toCurrency, amountIn, amountOut, validChainId, account, chainId, web3])

    return { onRecollat: handleRecollat }
}


export const useRecollateralizePaused = () => {
    const web3 = useWeb3()
    const { account, chainId } = useWeb3React()

    const { slowRefresh } = useRefresh()
    const [recollateralizePaused, setRecollateralizePaused] = useState(null)

    useEffect(() => {
        const get = async () => {
            const res = await getRecollateralizePaused(web3, chainId)
            setRecollateralizePaused(res)
        }
        get()
    }, [slowRefresh, account, chainId])
    return recollateralizePaused
}

export const useBuyBackPaused = () => {
    const web3 = useWeb3()
    const { account, chainId } = useWeb3React()

    const { slowRefresh } = useRefresh()
    const [buyBackPaused, setBuyBackPaused] = useState(null)

    useEffect(() => {
        const get = async () => {
            const res = await getBuyBackPaused(web3, chainId)
            setBuyBackPaused(res)
        }
        get()
    }, [slowRefresh, account, chainId])
    return buyBackPaused
}

export const useMintPaused = () => {
    const web3 = useWeb3()
    const { account, chainId } = useWeb3React()

    const { slowRefresh } = useRefresh()
    const [mintPaused, setMintPaused] = useState(null)

    useEffect(() => {
        const get = async () => {
            const res = await getMintPaused(web3, chainId)
            setMintPaused(res)
        }
        get()
    }, [slowRefresh, account, chainId])
    return mintPaused
}

export const useRedeemPaused = () => {
    const web3 = useWeb3()
    const { account, chainId } = useWeb3React()

    const { slowRefresh } = useRefresh()
    const [redeemPaused, setRedeemPaused] = useState(null)

    useEffect(() => {
        const get = async () => {
            const res = await getRedeemPaused(web3, chainId)
            setRedeemPaused(res)
        }
        get()
    }, [slowRefresh, account, chainId])
    return redeemPaused
}

export const useBonusRate = () => {
    const web3 = useWeb3()
    const { account, chainId } = useWeb3React()

    const { slowRefresh } = useRefresh()
    const [bonusRate, setBonusRate] = useState(null)

    useEffect(() => {
        const get = async () => {
            const res = await getBonusRate(web3, chainId)
            setBonusRate(res)
        }
        get()
    }, [slowRefresh, account, chainId])
    return bonusRate
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


export const useBalances = () => {
    const web3 = useWeb3()
    const { account, chainId } = useWeb3React()

    const { rapidRefresh } = useRefresh()
    const setRedeemDEUSBalances = useSetRecoilState(redeemDEUSBalancesState)
    const setRedeemCollateralBalances = useSetRecoilState(redeemCollateralBalancesState)

    useEffect(() => {
        const get = async () => {
            const DEUSBalance = await getRedeemDEUSBalances(account, web3, chainId)
            const collateralBalance = await getRedeemCollateralBalances(account, web3, chainId)
            setRedeemDEUSBalances(fromWei(DEUSBalance, 18))
            setRedeemCollateralBalances(fromWei(collateralBalance, 6))
        }
        get()
    }, [rapidRefresh, account, chainId])
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
                1000000,
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
            "0",
            result.collateral_price,
            result.expire_block,
            result.signature,
            account,
            chainId,
            web3,
        )

        // const tx = await mintDei(
        //     getToWei(amountIn1, from1Currency.decimals),
        //     "0",
        //     result.collateral_price,
        //     result.expire_block,
        //     result.signature,
        //     account,
        //     chainId,
        //     web3,
        // )
        // return tx
    }, [from1Currency, from2Currency, toCurrency, amountIn1, amountIn2, amountOut, account, chainId, collatRatio, validChainId, web3])

    return { onMint: handleMint }
}


export const useAvailableBuyback = () => {
    const web3 = useWeb3()
    const { account, chainId } = useWeb3React()

    const { slowRefresh } = useRefresh()
    const setAvailableBuyback = useSetRecoilState(availableBuybackState)

    useEffect(() => {
        const get = async () => {
            const bb = await getAvailableBuyback(web3, chainId)
            setAvailableBuyback(bb)
        }
        get()
    }, [slowRefresh, account, chainId])
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


export const useHusdPoolData = () => {
    const web3 = useWeb3()
    const { account, chainId } = useWeb3React()

    const { slowRefresh } = useRefresh()
    const setHusdPoolData = useSetRecoilState(husdPoolDataState)

    useEffect(() => {
        const get = async () => {
            const mul = await multicall(web3, HusdPoolAbi, getHusdPoolData(), chainId)
            const [
                collatDollarBalance,
                pool_ceiling,
                redemption_fee,
                minting_fee,
                buyback_fee,
                recollat_fee,
            ] = mul

            setHusdPoolData({
                collatDollarBalance: new BigNumber(collatDollarBalance).div(10000).toNumber(),
                pool_ceiling: new BigNumber(pool_ceiling).div(10000).toNumber(),
                redemption_fee: new BigNumber(redemption_fee).div(10000).toNumber(),
                minting_fee: new BigNumber(minting_fee).div(10000).toNumber(),
                buyback_fee: new BigNumber(buyback_fee).div(10000).toNumber(),
                recollat_fee: new BigNumber(recollat_fee).div(10000).toNumber(),
            })
        }
        get()
    }, [slowRefresh, account, chainId])
}


export const useCollatDollarBalance = () => {
    const web3 = useWeb3()
    const { account, chainId } = useWeb3React()

    const { slowRefresh } = useRefresh()
    const [collatDollar, setCollatDollar] = useState(null)

    useEffect(() => {
        const get = async () => {
            const cd = await getCollatDollarBalance(web3, chainId)
            setCollatDollar(cd)
        }
        get()
    }, [slowRefresh, account, chainId])
    return collatDollar
}

export const usePoolCeilingBalance = () => {
    const web3 = useWeb3()
    const { account, chainId } = useWeb3React()

    const { slowRefresh } = useRefresh()
    const [poolCeiling, setPoolCeiling] = useState(null)

    useEffect(() => {
        const get = async () => {
            const pc = await getPoolCeiling(web3, chainId)
            setPoolCeiling(pc)
        }
        get()
    }, [slowRefresh, account, chainId])
    return poolCeiling
}

export const useRedemptionFee = () => {
    const web3 = useWeb3()
    const { account, chainId } = useWeb3React()

    const { slowRefresh } = useRefresh()
    const setRedemptionFee = useSetRecoilState(redemptionFeeState)

    useEffect(() => {
        const get = async () => {
            const rf = await getRedemptionFee(web3, chainId)
            setRedemptionFee(rf / 10000)
        }
        get()
    }, [slowRefresh, account, chainId])
}

export const useMintingFee = () => {
    const web3 = useWeb3()
    const { account, chainId } = useWeb3React()

    const { slowRefresh } = useRefresh()
    const setMintingFee = useSetRecoilState(mintingFeeState)

    useEffect(() => {
        const get = async () => {
            const mf = await getMintingFee(web3, chainId)
            setMintingFee(mf / 10000)
        }
        get()
    }, [slowRefresh, account, chainId])
}

export const useBuyBackFee = () => {
    const web3 = useWeb3()
    const { account, chainId } = useWeb3React()

    const { slowRefresh } = useRefresh()
    const setBuyBackFee = useSetRecoilState(buyBackFeeState)

    useEffect(() => {
        const get = async () => {
            const bf = await getBuyBackFee(web3, chainId)
            setBuyBackFee(bf)
        }
        get()
    }, [slowRefresh, account, chainId])
}

export const useRecollatFee = () => {
    const web3 = useWeb3()
    const { account, chainId } = useWeb3React()

    const { slowRefresh } = useRefresh()
    const setRecollatFee = useSetRecoilState(recollatFeeState)

    useEffect(() => {
        const get = async () => {
            const rf = await getRecollatFee(web3, chainId)
            setRecollatFee(rf)
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
    useMintingFee()
    useRedemptionFee()
    useHusdPoolData()
}

export const useDeiUpdateRedeem = () => {
    useCollatRatio()
    useDeiPrices()
    useRedemptionFee()
    useHusdPoolData()
    useBalances()
}

export const useDeiUpdateBuyBack = () => {
    useDeiPrices()
    useAvailableBuyback()
    useAvailableRecollat()
    useBuyBackFee()
    useRecollatFee()
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


export const useGetAmountsOut = (from1, from2, amount) => {
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