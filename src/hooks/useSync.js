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
            if (contract === null) setAllowance(ethers.constants.MaxUint256)
            else if (currency.stable && !SyncConfig.isStableApprove) setAllowance(ethers.constants.MaxUint256)
            else if (!currency.stable && !SyncConfig.isAssetApprove) setAllowance(ethers.constants.MaxUint256)
            else if (validChainId && chainId !== validChainId) setAllowance(ZERO)
            else {
                const alow = await contract.methods.allowance(account, contractAddress).call()
                setAllowance(new BigNumber(alow))
            }
        }
        if (account && tokenAddress) {
            setAllowance(new BigNumber(-1))
            fetchAllowance()
        }
    }, [account, contract, chainId, SyncConfig, contractAddress, tokenAddress, validChainId, currency, fastRefresh])

    return allowance
}


export const useSync = (fromCurrency, toCurrency, amountIn, amountOut, getSignatures, type, validChainId) => {
    const { account, chainId } = useWeb3React()

    const web3 = useWeb3()
    const handleSync = useCallback(async () => {
        try {
            if (validChainId && chainId !== validChainId) return false
            const oracles = await getSignatures()
            console.log("called handleSync", oracles)
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
    const getAmountsOut = useCallback(() => {
        const { fromPrice, toPrice, fee } = assetInfo
        if (!fromPrice || !toPrice || isZero(toPrice) || !from || !to) return "0"
        return getToWei(new BigNumber(fromPrice).times(debouncedAmountIn).times(1 - fee).div(toPrice), to.decimals)
        //eslint-disable-next-line
    }, [to, debouncedAmountIn, assetInfo])
    return { getAmountsOut }
}

export const useAmountsIn = (from, to, debouncedAmountOut, assetInfo) => {
    const getAmountsIn = useCallback(async () => {
        const { fromPrice, toPrice, fee } = assetInfo
        console.log("called here with ", fromPrice, toPrice);
        if (!fromPrice || !toPrice || isZero(fromPrice) || !from || !to) return "0"
        return getToWei(new BigNumber(toPrice).times(debouncedAmountOut).div(fromPrice).times(1 + fee), from.decimals)
        //eslint-disable-next-line
    }, [from, debouncedAmountOut, assetInfo])
    return { getAmountsIn }
}

