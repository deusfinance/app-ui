import { useWeb3React } from "@web3-react/core"
import { useCallback } from "react"
import useWeb3 from "./useWeb3"
import { getCurrentTimeStamp } from '../utils/utils';
import { BASE_URL, BASE_URL2, doMigration, getMigrationOption, getRandomNumber } from '../helper/migrationHelper';

export const useMigrate = (migrateList, validChainId = 1, callback) => {
    const { account, chainId } = useWeb3React()
    const web3 = useWeb3()

    const handleSwap = useCallback(async () => {
        try {
            if (validChainId && chainId !== validChainId) return false
            // console.log(amount);
            // console.log(getToWei(amount, fromCurrency.decimals).toFixed(0));
            // const muonOutput = await getSign(fromSymbol, getToWei(amount, fromCurrency.decimals), account)

            const timeStamp = getCurrentTimeStamp()
            const migrateOption = getMigrationOption(migrateList)
            const requestId1 = await getRandomNumber(account, BASE_URL)
            const requestId2 = await getRandomNumber(account, BASE_URL2)

            await doMigration([requestId1, requestId2].join(","), migrateOption, timeStamp, account, chainId, validChainId, web3)
            // await buyMuon(fromCurrency, toCurrency, amountIn, amountOut, fromSymbol, amount, time, account, chainId, validChainId, web3, callback)

        } catch (e) {
            console.log(e);
            return false
        }
    }, [migrateList, account, chainId, validChainId, callback, web3])

    return { onMigrate: handleSwap }
}