import { ChainMap } from "../constant/web3"
import { getDeiContract, getDeiPoolContract, getHusdPoolContract } from "./contractHelpers"
import { fetcher } from "./muonHelper"

const baseUrl = "https://oracle4.deus.finance/dei"

export const makeCostData = (deiPrice, cr, poolBalance, ceiling, availableAmount) => (
    [{
        name: 'DEI PRICE',
        value: deiPrice ? `$${deiPrice}` : deiPrice
    },
    {
        name: 'COLLATERAL RATIO',
        value: cr
    },
    {
        name: 'POOL BALANCE / CEILING',
        value: poolBalance && ceiling ? poolBalance + ' / ' + ceiling : null
    },
    {
        name: 'AVAILABLE TO MINT',
        value: availableAmount
    },
    ])


export const makeDeiRequest = async (path) => {
    return fetcher(baseUrl + path)
}

export const mintDei = async (web3) => {

}


export const getDeiInfo = async (web3, chainId = ChainMap.RINKEBY, collat_usd_balance = 1000000) => {
    return getDeiContract(web3, chainId)
        .methods
        .dei_info(collat_usd_balance)
}

export const getCollatDollarBalance = async (web3, chainId = ChainMap.RINKEBY, collat_usd_balance = 1000000) => {
    return getHusdPoolContract(web3)
        .methods
        .collatDollarBalance(collat_usd_balance)
        .call()
}

export const getCollatRatio = async (web3, chainId = ChainMap.RINKEBY) => {
    // const muonContract = getMuonContract(web3, chainId)
}



