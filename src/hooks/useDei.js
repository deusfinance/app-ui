import useWeb3 from './useWeb3'
import { useEffect, useState, useCallback } from "react"
import { useWeb3React } from '@web3-react/core'
import { getCollatDollarBalance, getCollatRatio, makeDeiRequest, mintDei, getDeiInfo, 
    getPoolCeiling, dollarDecimals, getRedemptionFee, getMintingFee } from '../helper/deiHelper'
import useRefresh from './useRefresh'
import BigNumber from 'bignumber.js'
import { fromWei } from '../helper/formatBalance'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { collatRatioState } from '../store/dei'

export const useMint = (from1Currency, from2Currency, toCurrency, amountIn1, amountIn2, amountOut, fromSymbol, validChainId = 1, callback) => {
    const { account, chainId } = useWeb3React()
    const web3 = useWeb3()

    const handleSwap = useCallback(async () => {
    }, [from1Currency, from2Currency, toCurrency, amountIn1, amountIn2, amountOut, account, chainId, fromSymbol, validChainId, callback, web3])

    return { onSwap: handleSwap }
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
    const [redemptionFee, setRedemptionFee] = useState(null)

    useEffect(() => {
        const get = async () => {
            const rf = await getRedemptionFee(web3, chainId)
            setRedemptionFee(rf)
        }
        get()
    }, [slowRefresh, account, chainId])
    return redemptionFee
}

export const useMintingFee = () => {
    const web3 = useWeb3()
    const { account, chainId } = useWeb3React()

    const { slowRefresh } = useRefresh()
    const [mintingFee, setMintingFee] = useState(null)

    useEffect(() => {
        const get = async () => {
            const mf = await getMintingFee(web3, chainId)
            setMintingFee(mf)
        }
        get()
    }, [slowRefresh, account, chainId])
    return mintingFee
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
