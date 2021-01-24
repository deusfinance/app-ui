import { useContract } from './useContract';
import { tokenABI } from '../utils/abis';

export function useTokenBalance(
    token,
    address = null,
    suspense = false
) {
    const contract = useContract(token?.address, tokenABI)

    const result = useSWR(
        typeof address === 'string' && token && contract
            ? [address, token.chainId, token.address, DataType.TokenBalance]
            : null,
        getTokenBalance(contract, token),
        { suspense }
    )
    useKeepSWRDataLiveAsBlocksArrive(result.mutate)
    return result
}