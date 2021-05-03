import { useWeb3React } from "@web3-react/core"
import { useEffect, useState } from "react"
import { useDeusAMM } from "./useContract"
import BigNumber from "bignumber.js";


const useAmountOut = (amountIn) => {
    const { account } = useWeb3React()
    const [amount, setAmount] = useState("")
    const contract = useDeusAMM(account)

    useEffect(() => {
        const fetchBalance = async () => {
            const walletBalance = await contract.methods.calculatePurchaseReturn(amountIn).call()
            setAmount(new BigNumber(walletBalance))
        }

        if (account) {
            fetchBalance()
        }

    }, [account])

    return amount
}
export { useAmountOut }
export default useAmountOut