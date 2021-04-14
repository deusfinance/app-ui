// import { useMemo } from 'react'

// export function useTokenBalancesWithLoadingIndicator(
//     address,
//     token
// ) {
//     const validatedTokens = useMemo(
//         () => tokens?.filter((t) => isAddress(t?.address) !== false) ?? [],
//         [tokens]
//     )

//     const validatedTokenAddresses = useMemo(() => validatedTokens.map(vt => vt.address), [validatedTokens])

//     const balances = useMultipleContractSingleData(validatedTokenAddresses, ERC20_INTERFACE, 'balanceOf', [address])

//     const anyLoading = useMemo(() => balances.some(callState => callState.loading), [balances])

//     return [
//         useMemo(
//             () =>
//                 address && validatedTokens.length > 0
//                     ? validatedTokens.reduce((memo, token, i) => {
//                         const value = balances?.[i]?.result?.[0]
//                         const amount = value ? JSBI.BigInt(value.toString()) : undefined
//                         if (amount) {
//                             memo[token.address] = new TokenAmount(token, amount)
//                         }
//                         return memo
//                     }, {})
//                     : {},
//             [address, validatedTokens, balances]
//         ),
//         anyLoading
//     ]
// }

// export function useTokenBalances(
//     address,
//     tokens
// ) {
//     return useTokenBalancesWithLoadingIndicator(address, tokens)[0]
// }

// // get the balance for a single token/account combo
// export function useTokenBalance(account, token) {
//     const tokenBalances = useTokenBalances(account, [token])
//     if (!token) return undefined
//     return tokenBalances[token.address]
// }

// export function useCurrencyBalances(
//     account,
//     currencies = []
// ) {
//     const tokens = useMemo(() => currencies?.filter((currency) => currency instanceof Token) ?? [], [
//         currencies
//     ])

//     const tokenBalances = useTokenBalances(account, tokens)
//     const containsETH = useMemo(() => currencies?.some(currency => currency === ETHER) ?? false, [currencies])
//     const ethBalance = useETHBalances(containsETH ? [account] : [])

//     return useMemo(
//         () =>
//             currencies?.map(currency => {
//                 if (!account || !currency) return undefined
//                 if (currency instanceof Token) return tokenBalances[currency.address]
//                 if (currency === ETHER) return ethBalance[account]
//                 return undefined
//             }) ?? [],
//         [account, currencies, ethBalance, tokenBalances]
//     )
// }

// export function useCurrencyBalance(account, currency) {
//     return useCurrencyBalances(account, [currency])[0]
// }


