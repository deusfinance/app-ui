import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { approve } from './callHelper'
import { useERC20 } from './useContract'

export const useApprove = (currency, contractAddress, validChainId) => {
    const { account, chainId } = useWeb3React()

    const { address: tokenAddress } = currency
    const contract = useERC20(tokenAddress)

    const handleApprove = useCallback(async () => {
        try {
            if (validChainId && chainId !== validChainId) return null
            const tx = await approve(
                contract,
                contractAddress,
                account,
                { chainId, currency }
            )
            return tx
        } catch (e) {
            return false
        }
    }, [account, chainId, validChainId, currency, contract, contractAddress])

    return { onApprove: handleApprove }
}