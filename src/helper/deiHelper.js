import BigNumber from "bignumber.js"
import { COLLATERAL_ADDRESS, COLLATERAL_POOL_ADDRESS, DEUS_ADDRESS } from "../constant/contracts"
import { isZero } from "../constant/number"
import { collateralToken } from "../constant/token"
import { ChainMap } from "../constant/web3"
import { TransactionState } from "../utils/constant"
import { CustomTransaction, getTransactionLink } from "../utils/explorers"
import { formatUnitAmount } from "../utils/utils"
import { getDeiContract, getDeiStakingContract, getHusdPoolContract, getProxyMinterContract, getZapContract } from "./contractHelpers"
import { getToWei } from "./formatBalance"
import { fetcher } from "./muonHelper"

const baseUrl = "https://oracle4.deus.finance/dei"

export const dollarDecimals = 6
export const collatUsdPrice = "1000000"

export const makeCostData = (deiPrice, collatRatio, poolBalance = null, ceiling = null) => {
    const dp = deiPrice ? `$${new BigNumber(deiPrice).toFixed(2)}` : null
    const cr = collatRatio !== null ? `${new BigNumber(collatRatio).toFixed(2)}%` : null
    const pc = poolBalance !== null && ceiling !== null ? formatUnitAmount(poolBalance) + ' / ' + formatUnitAmount(ceiling) : null
    const av = pc ? formatUnitAmount(new BigNumber(ceiling).minus(poolBalance)) : null
    return [{
        name: 'DEI PRICE',
        value: dp
    }, {
        name: 'COLLATERAL RATIO',
        value: cr
    }, {
        name: 'POOL BALANCE / CEILING',
        value: pc
    }, {
        name: 'AVAILABLE TO MINT',
        value: av
    }]
}

export const makeCostDataRedeem = (collatRatio, poolBalance) => {
    const cr = collatRatio !== null ? `${new BigNumber(collatRatio).toFixed(2)}%` : null
    const pb = poolBalance !== null ? `${formatUnitAmount(poolBalance)} HUSD` : null
    return [{
        name: 'COLLATERAL RATIO',
        value: cr
    }, {
        name: 'POOL BALANCE',
        value: pb
    }]
}

export const makeCostDataBuyBack = (deus_price, pool, buyBack, recollateralize, address, chainId = 4) => {
    const dp = deus_price !== null && !isNaN(deus_price) ? `$${new BigNumber(deus_price).toFixed(3)}` : null
    const p = pool ? pool : null
    const bb = buyBack !== null && !isNaN(buyBack) ? `${formatUnitAmount(buyBack)} HUSD` : null
    const rc = recollateralize !== null && !isNaN(recollateralize) ? `${formatUnitAmount(recollateralize)} DEUS` : null

    return [{
        name: 'EXCHANGE RATES',
        title1: 'HUSD: ',
        value1: '$1.000',
        title2: 'DEUS: ',
        value2: dp
    }, {
        name: 'AVAILABLE VALUE',
        title1: 'To Buyback: ',
        value1: bb,
        title2: 'To Recollateralize: ',
        value2: rc
    }, {
        name: 'POOL 🌊',
        value1: p,
        isLink: true,
        path: getTransactionLink(chainId, address)
    }]
}

//MULTICALL Array
export const getStakingData = (conf, account) => {
    if (!conf) return []
    return [
        {
            address: conf.stakingContract,
            name: "users",
            params: [account]
        },
        {
            address: conf.stakingContract,
            name: "pendingReward",
            params: [account]
        }
    ]
}
export const getStakingTokenData = (conf, account) => {
    if (!account) return []
    return [
        {
            address: conf.depositToken.address,
            name: "allowance",
            params: [account, conf.stakingContract]
        },
        {
            address: conf.depositToken.address,
            name: "balanceOf",
            params: [account]
        },
        {
            address: conf.depositToken.address,
            name: "balanceOf",
            params: [conf.stakingContract]
        }
    ]
}
export const getHusdPoolData = (chainId = ChainMap.RINKEBY, collat_usd_price, account) => {
    let calls = [
        {
            address: COLLATERAL_POOL_ADDRESS[chainId],
            name: 'collatDollarBalance',
            params: [collat_usd_price],
        },
        {
            address: COLLATERAL_POOL_ADDRESS[chainId],
            name: 'availableExcessCollatDV',
            params: [[collat_usd_price]]
        },
        {
            address: COLLATERAL_POOL_ADDRESS[chainId],
            name: 'pool_ceiling',
        },
        {
            address: COLLATERAL_POOL_ADDRESS[chainId],
            name: 'redemption_fee',
        },
        {
            address: COLLATERAL_POOL_ADDRESS[chainId],
            name: 'minting_fee',
        },
        {
            address: COLLATERAL_POOL_ADDRESS[chainId],
            name: 'buyback_fee',
        },
        {
            address: COLLATERAL_POOL_ADDRESS[chainId],
            name: 'recollat_fee',
        },
        {
            address: COLLATERAL_POOL_ADDRESS[chainId],
            name: 'recollateralizePaused',
        },
        {
            address: COLLATERAL_POOL_ADDRESS[chainId],
            name: 'buyBackPaused',
        },
        {
            address: COLLATERAL_POOL_ADDRESS[chainId],
            name: 'mintPaused',
        },
        {
            address: COLLATERAL_POOL_ADDRESS[chainId],
            name: 'redeemPaused',
        },
        {
            address: COLLATERAL_POOL_ADDRESS[chainId],
            name: 'bonus_rate',
        },
        {
            address: COLLATERAL_POOL_ADDRESS[chainId],
            name: 'redemption_delay',
        },
    ]
    if (account) {
        calls = [...calls,
        {
            address: COLLATERAL_POOL_ADDRESS[chainId],
            name: 'redeemDEUSBalances',
            params: [account]
        },
        {
            address: COLLATERAL_POOL_ADDRESS[chainId],
            name: 'redeemCollateralBalances',
            params: [account]
        }]
    }
    return calls
}

//WRITE FUNCTIONS
export const SendWithToast = (fn, account, chainId, message, payload = {}) => {
    if (!fn) return
    let hash = null
    const value = payload.value ? { value: payload.value } : {}
    const customSend = { from: account, ...value }
    return fn
        .send(customSend)
        .once('transactionHash', (tx) => {
            hash = tx
            CustomTransaction(TransactionState.LOADING, {
                hash,
                chainId: chainId,
                message: message,
            })
        })
        .once('receipt', () => CustomTransaction(TransactionState.SUCCESS, {
            hash,
            chainId: chainId,
            message: message,
        }))
        .once('error', () => CustomTransaction(TransactionState.FAILED, {
            hash,
            chainId: chainId,
            message: message,
        }))
}

export const DeiDeposit = (depositedToken, amount, address, web3) => {
    console.log(getToWei(amount, depositedToken.decimals).toFixed(0));
    return getDeiStakingContract(web3, address)
        .methods
        .deposit(getToWei(amount, depositedToken.decimals).toFixed(0))
}

export const DeiWithdraw = (withdrawToken, amount, address, web3) => {
    return getDeiStakingContract(web3, address)
        .methods
        .withdraw(getToWei(amount, withdrawToken.decimals).toFixed(0))
}

export const buyBackDEUS = (amountIn, deus_price, expire_block, signature, pool_collateral_price = "0", account, chainId, web3) => {
    return getHusdPoolContract(web3, chainId)
        .methods
        .buyBackDEUS(amountIn, [pool_collateral_price], deus_price, expire_block, [signature])
}

export const RecollateralizeDEI = (collateral_price, deus_price, expire_block, signature, amountIn, pool_collateral_price, account, chainId, web3) => {
    return getHusdPoolContract(web3, chainId)
        .methods
        .recollateralizeDEI([amountIn, pool_collateral_price, [collateral_price], deus_price, expire_block, [signature]])
}


//Proxy Mint
export const nativeCoinToDei = (amountIn, collateral_price, deus_price, expire_block, signature, transferResidual = false, path, min_amount_out, chainId, web3) => {
    return getProxyMinterContract(web3, chainId)
        .methods
        .nativeCoinToDei(collateral_price, deus_price, expire_block, [signature], transferResidual, path, min_amount_out)
}

export const ERC20ToDei = (erc20amount, collateral_price, deus_price, expire_block, signature, transferResidual = false, path, min_amount_out, chainId, web3) => {
    return getProxyMinterContract(web3, chainId)
        .methods
        .ERC20ToDei(erc20amount, collateral_price, deus_price, expire_block, [signature], transferResidual, path, min_amount_out)
}

export const collateralToDei = (collateral_amount, collateral_price, deus_price, expire_block, signature, transferResidual = false, min_amount_out, chainId, web3) => {
    return getProxyMinterContract(web3, chainId)
        .methods
        .collateralToDei(collateral_amount, collateral_price, deus_price, expire_block, [signature], transferResidual, min_amount_out)
}

export const DeusToDei = (deus_amount, collateral_price, deus_price, expire_block, signature, transferResidual = false, min_amount_out, chainId, web3) => {
    return getProxyMinterContract(web3, chainId)
        .methods
        .DeusToDei(deus_amount, collateral_price, deus_price, expire_block, [signature], transferResidual, min_amount_out)
}


//HUSD MINT
export const mint1t1DEI = (collateral_amount, collateral_price, expire_block, signature, chainId, web3) => {
    return getHusdPoolContract(web3, chainId)
        .methods
        .mint1t1DEI(collateral_amount, collateral_price, expire_block, [signature])
}

export const mintFractional = (collateral_amount, deus_amount, collateral_price, deus_current_price, expireBlock, signature, chainId, web3) => {
    return getHusdPoolContract(web3, chainId)
        .methods
        .mintFractionalDEI(collateral_amount, deus_amount, collateral_price, deus_current_price, expireBlock, [signature])
}

export const mintAlgorithmic = (deus_amount_d18, deus_current_price, expire_block, signature, chainId, web3) => {
    return getHusdPoolContract(web3, chainId)
        .methods
        .mintAlgorithmicDEI(deus_amount_d18, deus_current_price, expire_block, [signature])
}

export const redeem1to1Dei = (amountIn, collateral_price, expire_block, signature, chainId, web3) => {
    return getHusdPoolContract(web3, chainId)
        .methods
        .redeem1t1DEI(amountIn, collateral_price, expire_block, [signature])
}

export const redeemFractionalDei = (collateral_price, deus_price, expire_block, signature, amountIn, chainId, web3) => {
    return getHusdPoolContract(web3, chainId)
        .methods
        .redeemFractionalDEI(amountIn, collateral_price, deus_price, expire_block, [signature])
}

export const redeemAlgorithmicDei = (deus_price, expire_block, signature, amountIn, chainId, web3) => {
    return getHusdPoolContract(web3, chainId)
        .methods
        .redeemAlgorithmicDEI(amountIn, deus_price, expire_block, [signature])
}

export const getClaimAll = async (account, web3, chainId = ChainMap.RINKEBY) => {
    return getHusdPoolContract(web3, chainId)
        .methods
        .collectRedemption()
        .send({ from: account })
}


//READ FUNCTIONS
export const getDeiInfo = async (web3, chainId = ChainMap.RINKEBY, collat_usd_price = collatUsdPrice) => {
    return getDeiContract(web3, chainId)
        .methods
        .dei_info([collat_usd_price])
        .call()
}


export const makeDeiRequest = async (path) => {
    return fetcher(baseUrl + path)
}

export const isProxyMinter = (token, isPair, collatRatio, chainId) => {
    if (!token || collatRatio === null) return null
    if ((collatRatio === 100 && token.symbol === collateralToken[chainId]?.symbol && !isPair) ||
        (collatRatio === 0 && token.symbol === "DEUS" && !isPair) ||
        (collatRatio > 0 && collatRatio < 100 && isPair)) return false
    return true
}

export const mintPath = {
    HT: ["0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f", "0xa71edc38d189767582c38a3145b5873052c3e47a", "0x0298c2b32eae4da002a15f36fdf7615bea3da047"],
    USDT: ["0xa71edc38d189767582c38a3145b5873052c3e47a", "0x0298c2b32eae4da002a15f36fdf7615bea3da047"]
}

export const getAmountOutProxy = async (fromCurrency, amountIn, deus_price, web3, chainId) => {
    if (!fromCurrency || !amountIn || isZero(amountIn) || deus_price === undefined) return ""
    const amountInToWei = getToWei(amountIn, fromCurrency.decimals).toFixed(0)
    const deusPriceWei = getToWei(deus_price, 6).toFixed(0)
    let method = ""
    let params = [amountInToWei, deusPriceWei]
    const erc20Path = mintPath[fromCurrency.symbol]

    if (fromCurrency.address === "0x") {
        method = "getAmountsOutNativeCoinToDei"
        params.push(erc20Path)
    }
    else if (fromCurrency.address === COLLATERAL_ADDRESS[chainId]) {
        method = "getAmountsOutCollateralToDei"
    }
    else if (fromCurrency.address === DEUS_ADDRESS[chainId]) {
        method = "getAmountsOutDeusToDei"
    }
    else {
        method = "getAmountsOutERC20ToDei"
        if (!erc20Path) {
            console.error("INVALID PATH with ", fromCurrency)
            return
        }
        params.push(erc20Path)
    }
    return getProxyMinterContract(web3, chainId).methods[method](...params).call()
}

export const zapIn = (currency, staking, amountIn, minLpAmount, transferResidual, web3, chainId) => {
    const erc20Path = mintPath[currency.symbol]

    if (currency.address === "0x")
        return getZapContract(web3, chainId)
            .methods
            .zapInNativecoin(erc20Path, minLpAmount, transferResidual) // TODO  VALUE:AVAX?

    else if (currency.address === COLLATERAL_ADDRESS[chainId])
        return getZapContract(web3, chainId)
            .methods
            .zapInCollateral(amountIn, minLpAmount, transferResidual)

    return getZapContract(web3, chainId)
        .methods
        .zapInERC20(erc20Path, amountIn, minLpAmount, transferResidual)
}
