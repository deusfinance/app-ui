import BigNumber from "bignumber.js"
import { HUSD_POOL_ADDRESS } from "../constant/contracts"
import { ChainMap } from "../constant/web3"
import { TransactionState } from "../utils/constant"
import { CustomTransaction, getTransactionLink } from "../utils/explorers"
import { formatUnitAmount } from "../utils/utils"
import { getDeiContract, getDeiStakingContract, getHusdPoolContract } from "./contractHelpers"
import { fromWei, getToWei } from "./formatBalance"
import { fetcher } from "./muonHelper"

const baseUrl = "https://oracle4.deus.finance/nft"

export const dollarDecimals = 6
export const collatUsdPrice = "1000000"

export const makeHash = (amountIn) => {
    const randomNumber = new BigNumber(Math.floor(Math.random() * 1e18)) // A random number between 0 and 99
    const sum = new BigNumber(amountIn).plus(randomNumber).toString()

    // TODO: Use a better hash function
    const hash = new BigNumber(sum).mod(new BigNumber("10000000000000000")).toString()

    console.log(`Random number: ${randomNumber}`);
    console.log(`AmountIn: ${amountIn}`);
    console.log(`Sum: ${sum}`);
    return hash
}
