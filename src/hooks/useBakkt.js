import { useWeb3React } from "@web3-react/core"
import { useCallback, useEffect, useState } from "react"
import { getBakktMigrationContract } from "../helper/contractHelpers"
import { fromWei, getToWei } from "../helper/formatBalance"
import { SendWithToast } from "../helper/web3"
import useWeb3 from "./useWeb3"

export const useMigrate = (amount, amountOut, toCurrency, validChainId = 1, forceUpdate) => {
    const { account, chainId } = useWeb3React()
    const web3 = useWeb3()

    const handleSwap = useCallback(async () => {
        try {
            if (validChainId && chainId !== validChainId) return false
            const fn = getBakktMigrationContract(web3).methods.migrate(getToWei(amount).toFixed(), "0x023466190D8dffF0fae089Cf1a05277E7203f89F")
            return await SendWithToast(fn, { from: account }, chainId, `Migrate ${amountOut} ${toCurrency.symbol}`)
        } catch (e) {
            console.log(e);
            return false
        }
        // eslint-disable-next-line
    }, [account, amount, amountOut, chainId, validChainId, web3, forceUpdate])

    return { onMigrate: handleSwap }
}

export const useRatio = (migratorContract) => {
    const [ratio, setRatio] = useState("")
    const web3 = useWeb3()

    useEffect(() => {
        const getRatio = async () => {
            getBakktMigrationContract(web3).methods.ratio().call().then(ratio => {
                setRatio(fromWei(ratio))
            })
        }
        getRatio()
    }, [web3])

    return ratio
}


