import useSWR from 'swr'
import { useContract } from './useContract';
import { tokenABI } from '../utils/abis';
import { TokenAmount } from '../sdk/tokens';
import { formatUnits } from '@ethersproject/units';
import { useCallback, useEffect, useState } from 'react';
// import { useKeepSWRDataLiveAsBlocksArrive } from './useful';

export function useTokenBalance(
    token,
    address = null,
    suspense = false
) {
    const contract = useContract(token?.address, tokenABI)
    // const balance = getTokenSingleBalance(address, contract, token).then((balance) => {
    //     console.log(token?.symbol + "\t", balance);
    //     return balance
    // })
    // const { execute, status, value, error } = 
    return useAsync(getTokenSingleBalance2(address, contract, token), false);

    // const result = useSWR(
    //     typeof address === 'string' && token && contract
    //         ? [address, token.chainId, token.address, 1]
    //         : null,
    //     getTokenBalance2(contract, token),
    //     { suspense }
    // )
    // useKeepSWRDataLiveAsBlocksArrive(result.mutate)
    // return result
}


export async function getTokenSingleBalance(address, contract, token) {
    if (!address || !token) return null
    const balance = contract.balanceOf(address).then((balance) => {
        return formatUnits(balance, token.decimals)
    }).catch(e => {
        console.log(e)
        return null
    })
    return balance
}

function getTokenSingleBalance2(address, contract, token) {
    return async () =>
        contract.balanceOf(address).then((balance) => {
            return formatUnits(balance, token.decimals)
        })
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

const useAsync = (asyncFunction, immediate = true) => {
    const [status, setStatus] = useState("idle");
    const [value, setValue] = useState(null);
    const [error, setError] = useState(null);
    // The execute function wraps asyncFunction and
    // handles setting state for pending, value, and error.
    // useCallback ensures the below useEffect is not called
    // on every render, but only if asyncFunction changes.
    const execute = useCallback(() => {
        setStatus("pending");
        setValue(null);
        setError(null);
        return asyncFunction()
            .then((response) => {
                setValue(response);
                setStatus("success");
            })
            .catch((error) => {
                setError(error);
                setStatus("error");
            });
    }, [asyncFunction]);
    // Call execute if we want to fire it right away.
    // Otherwise execute can be called later, such as
    // in an onClick handler.
    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [execute, immediate]);
    return { execute, status, value, error };
};

// const getTokenBalance = useCallback((contract, token) => {
//     return async (address) =>
//         contract.balanceOf(address).then((balance) => {
//             console.log(balance.toString());
//             return new TokenAmount(token, balance.toString())
//         })
// })