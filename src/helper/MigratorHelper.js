import BigNumber from "bignumber.js"
import { HUSD_POOL_ADDRESS } from "../constant/contracts"
import { ChainMap } from "../constant/web3"
import { TransactionState } from "../utils/constant"
import { CustomTransaction, getTransactionLink } from "../utils/explorers"
import { formatUnitAmount } from "../utils/utils"
import { getLockerContract } from "./contractHelpers"
import { fromWei, getToWei } from "./formatBalance"
import { fetcher } from "./muonHelper"

export const dollarDecimals = 6

export const getLock = async (fromCurrency, amountIn, account, web3, chainId = ChainMap.RINKEBY) => {
    return getLockerContract(web3, chainId)
        .methods
        .lock(fromCurrency, account, amountIn)
        .send({ from: account })
}
