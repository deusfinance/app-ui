import BigNumber from "bignumber.js"
import { COLLATERAL_ADDRESS, COLLATERAL_POOL_ADDRESS, DEI_ADDRESS, DEI_COLLATERAL_ZAP, DEI_DEUS_ZAP, DEUS_ADDRESS, MINT_PATH } from "../constant/contracts"
import { isZero } from "../constant/number"
import { collateralToken } from "../constant/token"
import { ChainId } from "../constant/web3"
import { TransactionState } from "../utils/constant"
import { CustomTransaction, getTransactionLink } from "../utils/explorers"
import { fetcher, formatUnitAmount } from "../utils/utils"
import { getDeiContract, getDeiStakingContract, getCollateralPoolContract, getZapContract, getNewProxyMinterContract, getDeusSwapContract } from "./contractHelpers"
import { getToWei } from "./formatBalance"

const baseUrl = "https://oracle4.deus.finance/dei"

export const dollarDecimals = 6
export const collatUsdPrice = "1000000"
const LENGTH_COLLAT = {}

const COLLAT_PRICE = {
    [ChainId.BSC_TESTNET]: "1000000000000000000",
    [ChainId.BSC]: "1000000000000000000",
}

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

export const makeCostDataRedeem = (collatRatio, poolBalance, chainId) => {
    const cToken = collateralToken[chainId]
    const cr = collatRatio !== null ? `${new BigNumber(collatRatio).toFixed(2)}%` : null
    const pb = poolBalance !== null ? `${formatUnitAmount(poolBalance)} ${cToken.symbol}` : null
    return [{
        name: 'COLLATERAL RATIO',
        value: cr
    }, {
        name: 'POOL BALANCE',
        value: pb
    }]
}

export const makeCostDataBuyBack = (deus_price, dei_price, pool, buyBack, recollateralize, address, chainId) => {
    if (!chainId) return []
    const cToken = collateralToken[chainId]
    const deusPrice = deus_price !== null && !isNaN(deus_price) ? `$${new BigNumber(deus_price).toFixed(3)}` : null
    const deiPrice = dei_price !== null && !isNaN(dei_price) ? `$${new BigNumber(dei_price).toFixed(3)}` : null
    const p = pool ? pool : null
    const bb = buyBack !== null && !isNaN(buyBack) ? `${formatUnitAmount(buyBack)} DEUS` : null
    const rc = recollateralize !== null && !isNaN(recollateralize) ? `${formatUnitAmount(recollateralize)} ${cToken.symbol}` : null

    return [{
        name: 'EXCHANGE RATES',
        title1: cToken.symbol,
        value1: deiPrice,
        title2: 'DEUS: ',
        value2: deusPrice
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
export const getHusdPoolData = (chainId = ChainId.ETH, collat_usd_price, account) => {
    const LEN = LENGTH_COLLAT[chainId] ?? 3
    let collaterals = []
    for (let i = 0; i < LEN; i++) {
        collaterals.push(COLLAT_PRICE[chainId] ?? collat_usd_price);
    }
    
    let calls = [
        {
            address: COLLATERAL_POOL_ADDRESS[chainId],
            name: 'collatDollarBalance',
            params: [COLLAT_PRICE[chainId] ?? collat_usd_price],
        },
        {
            address: COLLATERAL_POOL_ADDRESS[chainId],
            name: 'availableExcessCollatDV',
            params: [collaterals]
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
    return getCollateralPoolContract(web3, chainId)
        .methods
        .buyBackDEUS(amountIn, [pool_collateral_price], deus_price, expire_block, [signature])
}

export const RecollateralizeDEI = (collateral_price, deus_price, expire_block, signature, amountIn, pool_collateral_price, account, chainId, web3) => {
    return getCollateralPoolContract(web3, chainId)
        .methods
        .recollateralizeDEI([amountIn, pool_collateral_price, [collateral_price], deus_price, expire_block, [signature]])
}

//HUSD MINT
export const mint1t1DEI = (collateral_amount, collateral_price, expire_block, signature, chainId, web3) => {
    return getCollateralPoolContract(web3, chainId)
        .methods
        .mint1t1DEI(collateral_amount, collateral_price, expire_block, [signature])
}

export const mintFractional = (collateral_amount, deus_amount, collateral_price, deus_current_price, expireBlock, signature, chainId, web3) => {
    return getCollateralPoolContract(web3, chainId)
        .methods
        .mintFractionalDEI(collateral_amount, deus_amount, collateral_price, deus_current_price, expireBlock, [signature])
}

export const mintAlgorithmic = (deus_amount_d18, deus_current_price, expire_block, signature, chainId, web3) => {
    return getCollateralPoolContract(web3, chainId)
        .methods
        .mintAlgorithmicDEI(deus_amount_d18, deus_current_price, expire_block, [signature])
}

export const redeem1to1Dei = (amountIn, collateral_price, expire_block, signature, chainId, web3) => {
    return getCollateralPoolContract(web3, chainId)
        .methods
        .redeem1t1DEI(amountIn, collateral_price, expire_block, [signature])
}

export const redeemFractionalDei = (collateral_price, deus_price, expire_block, signature, amountIn, chainId, web3) => {
    return getCollateralPoolContract(web3, chainId)
        .methods
        .redeemFractionalDEI(amountIn, collateral_price, deus_price, expire_block, [signature])
}

export const redeemAlgorithmicDei = (deus_price, expire_block, signature, amountIn, chainId, web3) => {
    return getCollateralPoolContract(web3, chainId)
        .methods
        .redeemAlgorithmicDEI(amountIn, deus_price, expire_block, [signature])
}

export const getClaimAll = async (account, web3, chainId = ChainId.ETH) => {
    return getCollateralPoolContract(web3, chainId)
        .methods
        .collectRedemption()
        .send({ from: account })
}

//READ FUNCTIONS
export const getDeiInfo = async (web3, chainId = ChainId.ETH, collat_usd_price = collatUsdPrice) => {
    const LEN = LENGTH_COLLAT[chainId] ?? 3
    let collaterals = []
    for (let i = 0; i < LEN; i++) {
        // console.log(COLLAT_PRICE[chainId], collat_usd_price);
        collaterals.push(COLLAT_PRICE[chainId] ?? collat_usd_price);
    }

    return getDeiContract(web3, chainId)
        .methods
        .dei_info(collaterals)
        .call()
}


export const makeDeiRequest = async (path, chainId = 4) => {

    return fetcher(baseUrl + path + `?chainId=${chainId}`)
}

export const isProxyMinter = (token, isPair, collatRatio, chainId) => {
    if (!token || !token.symbol || collatRatio === null) return null
    if ((collatRatio === 100 && token.symbol === collateralToken[chainId]?.symbol && !isPair) ||
        (collatRatio === 0 && token.symbol === "DEUS" && !isPair) ||
        (collatRatio > 0 && collatRatio < 100 && isPair)) return false
    return true
}


export const getAmountOutDeusSwap = async (fromCurrency, amountIn, deus_price, collateral_price, web3, chainId) => {
    //getERC202DEIInputs
    if (!fromCurrency || !amountIn || isZero(amountIn) || deus_price === undefined) return ""
    const amountInToWei = getToWei(amountIn, fromCurrency.decimals).toFixed(0)
    const collateralPriceWei = getToWei(collateral_price, 6).toFixed(0)
    const deusPriceWei = getToWei(deus_price, 6).toFixed(0)
    let method = ""
    let params = [amountInToWei, deusPriceWei, collateralPriceWei]
    console.log(chainId, amountInToWei);

    const erc20Path = MINT_PATH[chainId][fromCurrency.symbol]

    if (fromCurrency.address === COLLATERAL_ADDRESS[chainId]) {
        method = "getUSDC2DEUSInputs"
    } else {
        method = "getERC202DEUSInputs"
        if (!erc20Path) {
            console.error("INVALID PATH with ", fromCurrency)
            return
        }
        params.push(erc20Path)
    }
    console.log(method, params);
    return getDeusSwapContract(web3, chainId).methods[method](...params).call()
}

export const getAmountOutProxy = async (fromCurrency, amountIn, deus_price, collateral_price, web3, chainId) => {
    //getERC202DEIInputs
    if (!fromCurrency || !amountIn || isZero(amountIn) || deus_price === undefined) return ""
    const amountInToWei = getToWei(amountIn, fromCurrency.decimals).toFixed(0)
    const collateralPriceWei = getToWei(collateral_price, 6).toFixed(0)
    const deusPriceWei = getToWei(deus_price, 6).toFixed(0)
    let method = ""
    let params = [amountInToWei, deusPriceWei, collateralPriceWei]
    console.log(chainId, amountInToWei);

    const erc20Path = MINT_PATH[chainId][fromCurrency.symbol]

    if (fromCurrency.address === COLLATERAL_ADDRESS[chainId]) {
        method = "getUSDC2DEIInputs"
    } else {
        method = "getERC202DEIInputs"
        if (!erc20Path) {
            console.error("INVALID PATH with ", fromCurrency)
            return
        }
        params.push(erc20Path)
    }
    console.log(method, params);
    return getNewProxyMinterContract(web3, chainId).methods[method](...params).call()
}


export const getZapAmountsOut = async (currency, amountInToWei, zapperAddress, result, web3, chainId) => {
    const erc20Path = MINT_PATH[chainId][currency.symbol]

    if (zapperAddress === DEI_COLLATERAL_ZAP[chainId]) {
        if (currency.address === COLLATERAL_ADDRESS[chainId]) {
            console.log("getAmountOutLPCollateral ", zapperAddress, amountInToWei);
            return getZapContract(web3, zapperAddress, chainId)
                .methods
                .getAmountOutLPCollateral(amountInToWei).call()
        } else if (currency.address === DEUS_ADDRESS[chainId]) {
            console.log("getAmountOutLPDEUS ", amountInToWei);
            return getZapContract(web3, zapperAddress, chainId)
                .methods
                .getAmountOutLPDEUS(amountInToWei, [...erc20Path]).call()
        } else if (currency.address === DEI_ADDRESS[chainId]) {
            console.log("getAmountOutLPDEI haaa", amountInToWei, zapperAddress);
            return getZapContract(web3, zapperAddress, chainId)
                .methods
                .getAmountOutLPDEI(amountInToWei).call()
        }
        return getZapContract(web3, zapperAddress, chainId)
            .methods
            .getAmountOutLPERC20ORNativecoin(amountInToWei, [...erc20Path]).call()
    }

    if (currency.address === DEUS_ADDRESS[chainId]) {
        console.log("getAmountOutLPDEUS ", amountInToWei);
        return getZapContract(web3, zapperAddress, chainId)
            .methods
            .getAmountOutLPDEUS(amountInToWei).call()
    } else if (currency.address === DEI_ADDRESS[chainId]) {
        console.log("getAmountOutLPDEI ", amountInToWei, zapperAddress);
        return getZapContract(web3, zapperAddress, chainId)
            .methods
            .getAmountOutLPDEI(amountInToWei).call()
    }
    console.log("getAmountOutLPERC20ORNativecoin ", amountInToWei, result.deus_price, result.collateral_price, erc20Path);
    return getZapContract(web3, zapperAddress, chainId)
        .methods
        .getAmountOutLPERC20ORNativecoin(amountInToWei, result.deus_price, result.collateral_price, erc20Path).call() // TODO  VALUE:AVAX?
}


export const zapIn = (currency, zapperAddress, amountIn, minLpAmount, result, amountOutParams, transferResidual, web3, chainId) => {
    const erc20Path = MINT_PATH[chainId][currency.symbol]
    const { collateral_price, deus_price, expire_block, signature } = result

    let proxyTuple = []
    if (amountOutParams.length > 0)
        proxyTuple = [
            amountIn,
            minLpAmount,
            deus_price,
            collateral_price,
            amountOutParams[2],
            amountOutParams[3],
            expire_block,
            [signature]
        ]


    if (zapperAddress === DEI_DEUS_ZAP[chainId]) {
        if (currency.address === "0x") {
            console.log("zapInNativecoin ", amountIn, minLpAmount, transferResidual);
            return getZapContract(web3, zapperAddress, chainId)
                .methods
                .zapInNativecoin(proxyTuple, minLpAmount, erc20Path, transferResidual) // TODO  VALUE:AVAX?
        }
        else if (currency.address === DEUS_ADDRESS[chainId]) {

            console.log("zapInDEUS ", amountIn, minLpAmount, transferResidual);
            return getZapContract(web3, zapperAddress, chainId)
                .methods
                .zapInDEUS(amountIn, minLpAmount, transferResidual)
        }
        else if (currency.address === DEI_ADDRESS[chainId]) {
            console.log("zapInDEI ", amountIn, minLpAmount, transferResidual);
            return getZapContract(web3, zapperAddress, chainId)
                .methods
                .zapInDEI(amountIn, minLpAmount, transferResidual)
        }
        return getZapContract(web3, zapperAddress, chainId)
            .methods
            .zapInERC20(proxyTuple, amountIn, minLpAmount, erc20Path, transferResidual)

    } else {
        if (currency.address === "0x") {
            console.log(erc20Path, minLpAmount, transferResidual);
            return getZapContract(web3, zapperAddress, chainId)
                .methods
                .zapInNativecoin(erc20Path, minLpAmount, transferResidual) // TODO  VALUE:AVAX?
        }
        else if (currency.address === COLLATERAL_ADDRESS[chainId]) {
            console.log("zapInCollateral ", amountIn, minLpAmount, transferResidual);
            return getZapContract(web3, zapperAddress, chainId)
                .methods
                .zapInCollateral(amountIn, minLpAmount, transferResidual)
        }
        else if (currency.address === DEUS_ADDRESS[chainId]) {
            console.log("zapInDEUS ", amountIn, minLpAmount, transferResidual, erc20Path);
            return getZapContract(web3, zapperAddress, chainId)
                .methods
                .zapInDEUS(amountIn, minLpAmount, transferResidual, erc20Path)
        }
        else if (currency.address === DEI_ADDRESS[chainId]) {
            console.log("zapInDEI ", amountIn, minLpAmount, transferResidual);
            return getZapContract(web3, zapperAddress, chainId)
                .methods
                .zapInDEI(amountIn, minLpAmount, transferResidual)
        }
        console.log(erc20Path, amountIn, minLpAmount, transferResidual);
        return getZapContract(web3, zapperAddress, chainId)
            .methods
            .zapInERC20(erc20Path, amountIn, minLpAmount, erc20Path, transferResidual)
    }
}
