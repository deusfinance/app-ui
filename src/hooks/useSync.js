import { sync } from '../helper/syncHelper'
import useWeb3 from './useWeb3'
import { isZero } from '../constant/number'
import BigNumber from 'bignumber.js'
import { getToWei } from '../helper/formatBalance'
import { useWeb3React } from "@web3-react/core"
import { useEffect, useState, useCallback } from "react"
import useRefresh from "./useRefresh";
import { useERC20 } from './useContract'
import { ethers } from "ethers";
import { ZERO } from "../constant/number";
import { SyncData } from '../constant/synchronizer'

export const useAllowance = (currency, contractAddress, validChainId) => {
    const [allowance, setAllowance] = useState(new BigNumber(-1))
    const { account, chainId } = useWeb3React()
    const { fastRefresh } = useRefresh()
    const { address: tokenAddress } = currency
    const contract = useERC20(tokenAddress)
    const SyncConfig = SyncData[validChainId]

    useEffect(() => {
        const fetchAllowance = async () => {
            if (currency.stable && !SyncConfig.isStableApprovable) setAllowance(ethers.constants.MaxUint256)
            if (!currency.stable && !SyncConfig.isAssetApprovable) setAllowance(ethers.constants.MaxUint256)
            if (contract === null) setAllowance(ethers.constants.MaxUint256)
            if (validChainId && chainId !== validChainId) setAllowance(ZERO)
            else {
                const res = await contract.methods.allowance(account, contractAddress).call()
                setAllowance(new BigNumber(res))
            }
        }
        if (account && tokenAddress) {
            setAllowance(new BigNumber(-1))
            fetchAllowance()
        }
    }, [account, contract, chainId, contractAddress, tokenAddress, validChainId, currency, fastRefresh])

    return allowance
}


export const useSync = (fromCurrency, toCurrency, amountIn, amountOut, getSignatures, type, validChainId) => {
    const { account, chainId } = useWeb3React()

    const web3 = useWeb3()
    const handleSync = useCallback(async () => {
        try {
            if (validChainId && chainId !== validChainId) return false
            const chooseCurrency = type === "sell" ? fromCurrency : toCurrency
            const oracles = await getSignatures()
            // console.log(oracles)
            // const oracles = Signature.map(Signature => Signature[chooseCurrency.address])
            const requiredSignature = 2
            const tx = await sync(
                fromCurrency,
                toCurrency,
                amountIn,
                amountOut,
                oracles,
                type,
                requiredSignature,
                account,
                chainId,
                web3,
            )
            return tx
        } catch (e) {
            console.log(e);
            return false
        }
    }, [account, chainId, validChainId, fromCurrency, toCurrency, amountIn, type, amountOut, getSignatures, web3])
    return { onSync: handleSync }
}

export const useAmountsOut = (from, to, debouncedAmountIn, assetInfo) => {
    const { fromPrice, toPrice, fee } = assetInfo
    const getAmountsOut = useCallback(() => {
        if (!fromPrice || isZero(toPrice)) return ""
        return getToWei(new BigNumber(fromPrice).times(debouncedAmountIn).times(1 - fee).div(toPrice), to.decimals)
    }, [to, from, debouncedAmountIn, assetInfo])
    return { getAmountsOut }
}

export const useAmountsIn = (from, to, debouncedAmountOut, assetInfo) => {
    const { fromPrice, toPrice, fee } = assetInfo
    const getAmountsIn = useCallback(async () => {
        if (!fromPrice || isZero(toPrice)) return ""
        return getToWei(new BigNumber(toPrice).times(debouncedAmountOut).div(fromPrice).times(1 + fee), to.decimals)
    }, [to, from, debouncedAmountOut, assetInfo])
    return { getAmountsIn }
}

