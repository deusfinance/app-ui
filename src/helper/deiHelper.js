import BigNumber from "bignumber.js"
import { COLLATERAL_ADDRESS, COLLATERAL_POOL_ADDRESS, DEI_ADDRESS, DEI_COLLATERAL_ZAP, DEI_DEUS_ZAP, DEUS_ADDRESS, MINT_PATH, TO_NATIVE_PATH, DEUS_NATIVE_ZAP, SSP_ADDRESS, SSP_COLLATERAL_ADDRESS, PROXY_MINT_ADDRESS, SSPV4_ADDRESS } from "../constant/contracts"
import { isZero, TEN } from "../constant/number"
import { collateralToken } from "../constant/token"
import { ChainId } from "../constant/web3"
import { TransactionState } from "../constant/web3"
import { CustomTransaction, getTransactionLink } from "../utils/explorers"
import { fetcher, formatUnitAmount } from "../utils/utils"
import {
    getDeiContract,
    getDeiStakingContract,
    getCollateralPoolContract,
    getZapContract,
    getNewProxyMinterContract,
    getDeusSwapContract,
    getSSPContract,
    getSSPV4Contract,
    getUsdcTwapOracleContract
} from "./contractHelpers"
import { getToWei } from "./formatBalance"

const baseUrl = "https://oracle4.deus.finance/dei"

export const dollarDecimals = 6
export const collatUsdPrice = "1000000"
const LENGTH_COLLAT = {
    [ChainId.ETH]: 4,
    [ChainId.BSC]: 4,
    [ChainId.FTM]: 6,
    [ChainId.MATIC]: 5,
    [ChainId.METIS]: 2,
    [ChainId.ARBITRUM]: 2,
}

const COLLAT_PRICE = {
    [ChainId.BSC_TESTNET]: "1000000000000000000",
    [ChainId.BSC]: "1000000000000000000",
}

export const makeCostData = (deiPrice, collatRatio, poolBalance = null, ceiling = null, depositAmount = 0, decimals = 6) => {
    const dp = deiPrice ? `$${new BigNumber(deiPrice).toFixed(2)}` : null
    const cr = collatRatio !== null ? `${new BigNumber(collatRatio).toFixed(2)}%` : null
    const poolBalanceValue = new BigNumber(poolBalance).div(TEN.pow(decimals - 6))
    const pc = poolBalance !== null && ceiling !== null ? formatUnitAmount(new BigNumber.sum(poolBalanceValue, new BigNumber(depositAmount)).toString()) + ' / ' + formatUnitAmount(new BigNumber(ceiling).div(TEN.pow(decimals - 6))) : null
    const av = pc ? formatUnitAmount(new BigNumber(ceiling).minus(poolBalance).div(TEN.pow(decimals - 6))) : null

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

export const makeCostDataRedeem = (collatRatio, poolBalance, chainId = ChainId.ETH, depositAmount = 0, decimals = 6) => {
    const cToken = collateralToken[chainId] ? collateralToken[chainId] : collateralToken[ChainId.ETH]
    const cr = collatRatio !== null ? `${new BigNumber(collatRatio).toFixed(2)}%` : null
    const poolBalanceValue = new BigNumber(poolBalance).div(TEN.pow(decimals - 6))
    const pb = poolBalance !== null ? `${formatUnitAmount(new BigNumber.sum(poolBalanceValue, new BigNumber(depositAmount)).toString())} ${cToken?.symbol}` : null
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
    const rc = recollateralize !== null && !isNaN(recollateralize) ? `${formatUnitAmount(recollateralize)} ${cToken?.symbol}` : null

    return [{
        name: 'EXCHANGE RATES',
        title1: cToken?.symbol,
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
export const getSspData = (chainId = ChainId.FTM, oracleResponse) => {
    if (!SSP_ADDRESS[chainId]) return []
    if (chainId !== ChainId.FTM && !oracleResponse?.deus_price) return []
    const leftMintableParams = chainId !== ChainId.FTM ? { params: [getToWei(oracleResponse.deus_price, 6).toFixed(0)] } : {}

    return [
        {
            address: SSP_ADDRESS[chainId],
            name: "lowerBound",
        },
        {
            address: SSP_ADDRESS[chainId],
            name: "topBound",
        },
        {
            address: SSP_ADDRESS[chainId],
            name: "leftMintableDei",
            ...leftMintableParams
        }
    ]
}
export const getSspV4Data = (chainId = ChainId.FTM) => {
    if (!SSPV4_ADDRESS[chainId]) return []

    return [
        {
            address: SSPV4_ADDRESS[chainId],
            name: "lowerBound",
        },
        {
            address: SSPV4_ADDRESS[chainId],
            name: "topBound",
        },
        {
            address: SSPV4_ADDRESS[chainId],
            name: "mintFeeRate",
        },
        {
            address: SSPV4_ADDRESS[chainId],
            name: "MINT_FEE_PRECISION",
        },
        {
            address: SSPV4_ADDRESS[chainId],
            name: "paused",
        },
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
        // {
        //     address: COLLATERAL_POOL_ADDRESS[chainId],
        //     name: 'availableExcessCollatDV',
        //     params: [collaterals]
        // },
        {
            address: COLLATERAL_POOL_ADDRESS[chainId],
            name: 'poolCeiling',
        },
        {
            address: COLLATERAL_POOL_ADDRESS[chainId],
            name: 'redemptionFee',
        },
        {
            address: COLLATERAL_POOL_ADDRESS[chainId],
            name: 'mintingFee',
        },
        {
            address: COLLATERAL_POOL_ADDRESS[chainId],
            name: 'buybackFee',
        },
        {
            address: COLLATERAL_POOL_ADDRESS[chainId],
            name: 'recollatFee',
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
            name: 'bonusRate',
        },
        {
            address: COLLATERAL_POOL_ADDRESS[chainId],
            name: 'deusRedemptionDelay',
        },
        {
            address: COLLATERAL_POOL_ADDRESS[chainId],
            name: 'collateralRedemptionDelay',
        },
    ]
    if (account) {
        calls = [...calls,
        {
            address: COLLATERAL_POOL_ADDRESS[chainId],
            name: 'getAllPositions',
            params: [account]
        },
        {
            address: COLLATERAL_POOL_ADDRESS[chainId],
            name: 'nextRedeemId',
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
//We should use new ui asap. 

export const SendWithToast = (fn, account, chainId, message, payload = {}) => {
    if (!fn) return
    let hash = null

    console.log(payload);
    const customSend = {
        from: account,
        ...payload
    }

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
        .once('error', (error, receipt) => CustomTransaction(TransactionState.FAILED, {
            hash,
            chainId: chainId,
            message: message,
            error,
            receipt
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

//MINT DEI
export const mintDeiSSP = (amountIn, chainId, web3) => {
    return getSSPContract(web3, chainId)
        .methods
        .buyDei(amountIn)
}
export const mintDeiSSPv4 = (amountIn, chainId, web3) => {
    return getSSPV4Contract(web3, chainId)
        .methods
        .buyDei(amountIn)
}

export const mintDeiSSPWithOracle = (amountIn, result, chainId, web3) => {
    console.log(amountIn, result.deus_price, result.expire_block, [result.signature]);
    return getSSPContract(web3, chainId)
        .methods
        .buyDei(amountIn, result.deus_price, result.expire_block, [result.signature])
}

export const mint1t1DEI = (collateral_amount, collateral_price, expire_block, signature, chainId, web3) => {
    return getCollateralPoolContract(web3, chainId)
        .methods
        .mint1t1DEI(collateral_amount, collateral_price, expire_block, [signature])
}

export const mintFractional = (collateral_amount, deus_amount, deus_current_price, expireBlock, signature, chainId, web3) => {
    return getCollateralPoolContract(web3, chainId)
        .methods
        .mintFractionalDEI(collateral_amount, deus_amount, deus_current_price, expireBlock, [signature])
}

export const mintAlgorithmic = (deus_amount_d18, deus_current_price, expire_block, signature, chainId, web3) => {
    return getCollateralPoolContract(web3, chainId)
        .methods
        .mintAlgorithmicDEI(deus_amount_d18, deus_current_price, expire_block, [signature])
}

export const redeem1to1Dei = (amountIn, chainId, web3) => {
    return getCollateralPoolContract(web3, chainId)
        .methods
        .redeem1t1DEI(amountIn)
}

export const redeemFractionalDei = (amountIn, chainId, web3) => {
    return getCollateralPoolContract(web3, chainId)
        .methods
        .redeemFractionalDEI(amountIn)
}

export const redeemAlgorithmicDei = (amountIn, chainId, web3) => {
    return getCollateralPoolContract(web3, chainId)
        .methods
        .redeemAlgorithmicDEI(amountIn)
}

export const collectCollateral = async (account, web3, chainId = ChainId.ETH) => {
    return getCollateralPoolContract(web3, chainId)
        .methods
        .collectCollateral()
}

export const collectDeus= async (account, web3, chainId = ChainId.ETH,price, id, signatures) => {
    return getCollateralPoolContract(web3, chainId)
        .methods
        .collectDeus(price, id, [signatures])
}

//READ FUNCTIONS
export const getUsdcTwapOracle = async (web3, tokenIn, amountIn, timestamp, duration) => {
    return getUsdcTwapOracleContract(web3, ChainId.FTM)
        .methods
        .twap(tokenIn, amountIn, timestamp, duration)
        .call()
}

export const getDeiInfo = async (web3, chainId = ChainId.ETH, collat_usd_price = collatUsdPrice) => {
    const LEN = LENGTH_COLLAT[chainId] ?? 3
    let collaterals = []
    for (let i = 0; i < LEN; i++) {
        // console.log(COLLAT_PRICE[chainId], collat_usd_price);
        collaterals.push(COLLAT_PRICE[chainId] ?? collat_usd_price);
    }
    // console.log(collaterals);
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
    if (!PROXY_MINT_ADDRESS[chainId]) return false
    if ((collatRatio === 100 && token.symbol === collateralToken[chainId]?.symbol && !isPair) ||
        (collatRatio === 0 && token.symbol === "DEUS" && !isPair) ||
        (collatRatio > 0 && collatRatio < 100 && isPair)) return false
    return true
}

export const isSspMinter = (token, isPair, amountIn, lowerBound, topBound, deiLeftInSSP, chainId) => {

    if (!token || !token.symbol) {
        console.error("token is null.")
        return false
    }
    if (isPair) {
        //console.log("just with single usdc or usdt.")
        return false
    }
    if (!chainId) {
        //console.error("chainId is null.")
        return false
    }
    if (token.address !== SSP_COLLATERAL_ADDRESS[chainId] || (!SSP_ADDRESS[chainId])) {
        return false
    }

    if (chainId === ChainId.BSC) return true

    return checkSSPvalidInput(amountIn, lowerBound, topBound, deiLeftInSSP)
}
export const isSspV4Minter = (token, isPair, amountIn, lowerBound, topBound, paused, chainId) => {

    if (!token || !token.symbol) {
        console.error("token is null.")
        return false
    }
    if (isPair) {
        return false
    }
    if (!chainId) {
        return false
    }
    if (paused) {
        console.log("sspv4 contract is paused.")
        return false
    }
    if (token.address !== SSP_COLLATERAL_ADDRESS[chainId] || !SSPV4_ADDRESS[chainId]) {
        return false
    }

    if (chainId === ChainId.BSC) return true

    return checkSSPV4validInput(amountIn, lowerBound, topBound)
}

export const checkSSPvalidInput = (amountIn, lowerBound, topBound, deiLeftInSSP) => {
    if ((!amountIn && !new BigNumber(lowerBound).isZero()) || new BigNumber(amountIn).comparedTo(lowerBound) < 0 || new BigNumber(amountIn).comparedTo(topBound) > 0) {
        //console.log("amountIn is not valid for ssp.")
        return false
    }

    if (new BigNumber(amountIn).comparedTo(deiLeftInSSP) > 0 || new BigNumber(deiLeftInSSP).comparedTo(1_000) < 0) {
        //console.log("amountIn is bigger than deiLeftInSSP.")
        return false
    }
    return true
}

export const checkSSPV4validInput = (amountIn, lowerBound, topBound) => {
    if ((!amountIn && !new BigNumber(lowerBound).isZero()) || new BigNumber(amountIn).comparedTo(lowerBound) < 0 || new BigNumber(amountIn).comparedTo(topBound) > 0) {
        return false
    }
    return true
}


export const getAmountOutDeusSwap = async (fromCurrency, amountIn, deus_price, collateral_price, web3, chainId) => {
    if (!fromCurrency || !amountIn || isZero(amountIn) || deus_price === undefined) return ""
    const amountInToWei = getToWei(amountIn, fromCurrency.decimals).toFixed(0)
    const collateralPriceWei = getToWei(collateral_price, 6).toFixed(0)
    const deusPriceWei = getToWei(deus_price, 6).toFixed(0)
    let method = ""
    let params = [amountInToWei, deusPriceWei, collateralPriceWei]
    // console.log(chainId, amountInToWei);

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

    // console.log(method, params);
    return getDeusSwapContract(web3, chainId).methods[method](...params).call()
}

export const getAmountOutProxy = async (fromCurrency, amountIn, deus_price, collateral_price, web3, chainId) => {
    if (!fromCurrency || !amountIn || isZero(amountIn) || deus_price === undefined) return ""
    const amountInToWei = getToWei(amountIn, fromCurrency.decimals).toFixed(0)
    const collateralPriceWei = getToWei(collateral_price, 6).toFixed(0)
    const deusPriceWei = getToWei(deus_price, 6).toFixed(0)
    let method = ""
    let params = [amountInToWei, deusPriceWei, collateralPriceWei]

    const erc20Path = MINT_PATH[chainId][fromCurrency.symbol]

    if (chainId === ChainId.FTM) {
        method = "getAmountsOut"
        params.push(erc20Path)
    } else {
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
    }

    // console.log(method, params);
    return getNewProxyMinterContract(web3, chainId).methods[method](...params).call()
}


export const getZapAmountsOut = async (currency, amountInToWei, zapperAddress, result, web3, chainId, useMinter = false) => {
    let erc20Path = MINT_PATH[chainId][currency.symbol]
    let toNativePath = TO_NATIVE_PATH[chainId][currency.symbol]
    const collateral_price_toWei = getToWei(result.collateral_price, 6).toFixed(0)
    const deus_price_toWei = getToWei(result.deus_price, 6).toFixed(0)

    if (zapperAddress === DEI_COLLATERAL_ZAP[chainId]) {
        if (chainId === ChainId.FTM) {
            return await getZapContract(web3, zapperAddress, chainId)
                .methods
                .getAmountOut([amountInToWei, deus_price_toWei, collateral_price_toWei, [...erc20Path], [...toNativePath]], useMinter).call()
        }
        return await getZapContract(web3, zapperAddress, chainId)
            .methods
            .getAmountOut([amountInToWei, deus_price_toWei, collateral_price_toWei, 4, [...erc20Path], []]).call()
    }
    else if (zapperAddress === DEUS_NATIVE_ZAP[chainId]) {
        if (currency.symbol === "DEUS" && chainId === ChainId.MATIC) {
            erc20Path = MINT_PATH[chainId]["DEUS_edited"]
            toNativePath = TO_NATIVE_PATH[chainId]["DEUS_edited"]
        } else if (chainId === ChainId.FTM) {
            return await getZapContract(web3, zapperAddress, chainId).methods
                .getAmountOut(amountInToWei, [...toNativePath]).call()
        }

        return await getZapContract(web3, zapperAddress, chainId).methods
            .getAmountOut([amountInToWei, deus_price_toWei, collateral_price_toWei, 20, [...erc20Path], [...toNativePath], 0]).call()
    }
    else if (currency.address === DEUS_ADDRESS[chainId]) {
        return getZapContract(web3, zapperAddress, chainId)
            .methods
            .getAmountOutLPDEUS(amountInToWei).call()
    } else if (currency.address === DEI_ADDRESS[chainId]) {
        return getZapContract(web3, zapperAddress, chainId)
            .methods
            .getAmountOutLPDEI(amountInToWei).call()
    }
    return getZapContract(web3, zapperAddress, chainId)
        .methods
        .getAmountOutLPERC20ORNativecoin(amountInToWei, deus_price_toWei, collateral_price_toWei, erc20Path).call()
}


// struct ProxyInput DEI_COLLATERAL_ZAP {
// 	uint amountIn;
// 	uint minAmountOut;
// 	uint deusPriceUSD;
// 	uint colPriceUSD;
// 	uint usdcForMintAmount;
// 	uint deusNeededAmount;
// 	uint expireBlock;
// 	bytes[] sigs;
// }

export const zapIn = (currency, zapperAddress, amountIn, minLpAmount, result, amountOutParams, transferResidual, web3, chainId) => {
    let erc20Path = MINT_PATH[chainId][currency.symbol]
    let toNativePath = TO_NATIVE_PATH[chainId][currency.symbol]
    const { collateral_price, deus_price, expire_block, signature } = result

    let proxyTuple = []
    if (amountOutParams.length > 0)
        proxyTuple = [
            amountIn,
            minLpAmount,
            deus_price,
            collateral_price,
            amountOutParams[2], // usdcForMintAmount
            amountOutParams[3], // deusNeededAmount
            expire_block,
            [signature]
        ]
    if (zapperAddress === DEI_DEUS_ZAP[chainId]) {
        if (currency.address === "0x") {
            return getZapContract(web3, zapperAddress, chainId)
                .methods
                .zapInNativecoin(proxyTuple, minLpAmount, erc20Path, transferResidual)
        }
        else if (currency.address === DEUS_ADDRESS[chainId]) {
            return getZapContract(web3, zapperAddress, chainId)
                .methods
                .zapInDEUS(amountIn, minLpAmount, transferResidual)
        }
        else if (currency.address === DEI_ADDRESS[chainId]) {
            return getZapContract(web3, zapperAddress, chainId)
                .methods
                .zapInDEI(amountIn, minLpAmount, transferResidual)
        }
        return getZapContract(web3, zapperAddress, chainId)
            .methods
            .zapInERC20(proxyTuple, amountIn, minLpAmount, erc20Path, transferResidual)

    } else if (zapperAddress === DEUS_NATIVE_ZAP[chainId]) {
        proxyTuple[1] = 0;
        if (currency.symbol === "DEUS" && chainId === ChainId.MATIC) {
            erc20Path = MINT_PATH[chainId]["DEUS_edited"]
            toNativePath = TO_NATIVE_PATH[chainId]["DEUS_edited"]
        }

        if (currency.address === "0x") {
            if (chainId === ChainId.FTM) {
                return getZapContract(web3, zapperAddress, chainId)
                    .methods
                    .zapInNativecoin(minLpAmount, transferResidual, amountOutParams[4])
            }
            return getZapContract(web3, zapperAddress, chainId)
                .methods
                .zapInNativecoin(minLpAmount, transferResidual, proxyTuple, toNativePath, erc20Path, amountOutParams[4])
        }
        if (chainId === ChainId.FTM) {
            return getZapContract(web3, zapperAddress, chainId)
                .methods
                .zapInERC20(amountIn, minLpAmount, transferResidual, toNativePath, amountOutParams[4])
        }
        return getZapContract(web3, zapperAddress, chainId)
            .methods
            .zapInERC20(minLpAmount, transferResidual, proxyTuple, toNativePath, erc20Path, amountOutParams[4])
    } else { // DEI_COLLATERAL_ZAP
        if (currency.address === "0x") {
            if (chainId === ChainId.FTM) {
                if (amountOutParams[5] === true) {
                    return getZapContract(web3, zapperAddress, chainId)
                        .methods
                        .zapInNativecoinWithMinting(minLpAmount, transferResidual, proxyTuple, erc20Path, amountOutParams[4])
                }
                return getZapContract(web3, zapperAddress, chainId)
                    .methods
                    .zapInNativecoinWithoutMinting(minLpAmount, transferResidual, erc20Path, amountOutParams[4])
            }
            return getZapContract(web3, zapperAddress, chainId)
                .methods
                .zapInNativecoin(minLpAmount, transferResidual, proxyTuple, erc20Path, amountOutParams[4])
        }
        if (chainId === ChainId.FTM) {
            if (amountOutParams[5] === true) {
                return getZapContract(web3, zapperAddress, chainId)
                    .methods
                    .zapInERC20WithMinting(amountIn, minLpAmount, transferResidual, proxyTuple, erc20Path, amountOutParams[4])
            }
            return getZapContract(web3, zapperAddress, chainId)
                .methods
                .zapInERC20WithoutMinting(amountIn, minLpAmount, transferResidual, erc20Path, amountOutParams[4])
        }
        return getZapContract(web3, zapperAddress, chainId)
            .methods
            .zapInERC20(amountIn, minLpAmount, transferResidual, proxyTuple, erc20Path, amountOutParams[4])
    }
}
