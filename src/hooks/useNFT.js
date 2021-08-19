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
import {} from '../store/dei'
import { makeHash } from '../helper/NFTHelper'
import { blockNumberState } from '../store/wallet'
import { formatBalance3 } from '../utils/utils'

export const useSwap = (fromCurrency, amountIn, validChainId = 1) => {
    const web3 = useWeb3()
    const { account, chainId } = useWeb3React()

    const handleSwap = useCallback(async () => {
        makeHash(getToWei(amountIn, fromCurrency.decimals).toFixed(0),)
    }, [fromCurrency, amountIn, validChainId, account, chainId, web3])

    return { onSwap: handleSwap }
}
