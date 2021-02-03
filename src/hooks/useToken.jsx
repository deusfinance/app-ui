import useSWR from 'swr'
import { useContract } from './useContract';
import { tokenABI } from '../utils/abis';
import { TokenAmount } from '../sdk/tokens';
// import { useKeepSWRDataLiveAsBlocksArrive } from './useful';

export function useTokenBalance(
    token,
    address = null,
    suspense = false
) {
    const contract = useContract(token?.address, tokenABI)

    const result = useSWR(
        typeof address === 'string' && token && contract
            ? [address, token.chainId, token.address, 1]
            : null,
        getTokenBalance2(contract, token),
        { suspense }
    )
    // useKeepSWRDataLiveAsBlocksArrive(result.mutate)
    return result
}


function getTokenBalance(contract, token) {
    return async (address) =>
        contract.balanceOf(address).then((balance) => {
            console.log(balance.toString());
            return new TokenAmount(token, balance.toString())
        })
}

function getTokenBalance2(contract, token) {
    return async (address) =>
        contract.balanceOf(address).then((balance) => {
            console.log(balance.toString());
            const tokenAmount = new TokenAmount(token, balance.toString())
            return tokenAmount.amount
        })
}

// export function getTokenSingleBalance(token, address) {
//     const contract = useContract(token?.address, tokenABI)
//     return async (address) =>
//         contract.balanceOf(address).then((balance) => {
//             console.log(balance.toString());
//             return formatUnits(amount, token.decimals)
//         })
// }


// const getTokenBalance = useCallback((contract, token) => {
//     return async (address) =>
//         contract.balanceOf(address).then((balance) => {
//             console.log(balance.toString());
//             return new TokenAmount(token, balance.toString())
//         })
// })