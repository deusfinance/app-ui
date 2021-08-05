import useWeb3 from './useWeb3'
import { useEffect, useState, useCallback } from "react"
import { useWeb3React } from '@web3-react/core'
import useRefresh from './useRefresh'
import BigNumber from 'bignumber.js'
import { fromWei, getToWei } from '../helper/formatBalance'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { collatRatioState, deiPricesState, husdPoolDataState, mintingFeeState, redemptionFeeState } from '../store/dei'
import {
    getCollatDollarBalance, getCollatRatio, makeDeiRequest, mintDei, getDeiInfo,
    getPoolCeiling, dollarDecimals, getRedemptionFee, getMintingFee, getRecollatFee,
    getBuyBackFee, getHusdPoolData, collatDei
} from '../helper/deiHelper'
import HusdPoolAbi from '../config/abi/HusdPoolAbi.json'
import multicall from '../helper/multicall'


export const useRedeem = (fromCurrency, to1Currency, to2Currency, amountIn, amountOut1, amountOut2, collatRatio, validChainId = 1) => {
    const { account, chainId } = useWeb3React()
    const web3 = useWeb3()

    const handleRedeem = useCallback(async () => {
        if (validChainId && chainId !== validChainId) return false
        const result = await makeDeiRequest("/redeem-1to1")
        const { collateral_price, expire_block, signature } = result

        const tx = await collatDei(
            getToWei(amountIn, fromCurrency.decimals),
            "0",
            collateral_price.toString(),
            expire_block.toString(),
            signature,
            account,
            chainId,
            web3,
        )
        return tx
    }, [fromCurrency, to1Currency, to2Currency, amountIn, amountOut1, amountOut2, account, chainId, collatRatio, validChainId, web3])

    return { onRedeem: handleRedeem }
}

export const useMint = (from1Currency, from2Currency, toCurrency, amountIn1, amountIn2, amountOut, collatRatio, validChainId = 1) => {
    const { account, chainId } = useWeb3React()
    const web3 = useWeb3()

    const handleMint = useCallback(async () => {
        if (validChainId && chainId !== validChainId) return false
        const result = await makeDeiRequest("/mint-1to1")
        const { collateral_price, expire_block, signature } = result

        const tx = await mintDei(
            getToWei(amountIn1, from1Currency.decimals),
            "0",
            collateral_price.toString(),
            expire_block.toString(),
            signature,
            account,
            chainId,
            web3,
        )
        return tx
    }, [from1Currency, from2Currency, toCurrency, amountIn1, amountIn2, amountOut, account, chainId, collatRatio, validChainId, web3])

    return { onMint: handleMint }
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
    const [buyBackFee, setBuyBackFee] = useState(null)

    useEffect(() => {
        const get = async () => {
            const bf = await getBuyBackFee(web3, chainId)
            setBuyBackFee(bf)
        }
        get()
    }, [slowRefresh, account, chainId])
    return buyBackFee ? `${buyBackFee / 10000} %` : null
}

export const useRecollatFee = () => {
    const web3 = useWeb3()
    const { account, chainId } = useWeb3React()

    const { slowRefresh } = useRefresh()
    const [recollatFee, setRecollatFee] = useState(null)

    useEffect(() => {
        const get = async () => {
            const rf = await getRecollatFee(web3, chainId)
            setRecollatFee(rf)
        }
        get()
    }, [slowRefresh, account, chainId])
    return recollatFee ? `${recollatFee / 10000} %` : null
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
    const { slowRefresh } = useRefresh()
    const web3 = useWeb3()
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
    const web3 = useWeb3()
    const collatRatio = useRecoilValue(collatRatioState)

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
