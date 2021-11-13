import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
// import { isAddress } from '@ethersproject/address'
import { ERC20ABI } from '../../utils/StakingABI'

import { getBalanceNumber } from '../../helper/formatBalance'
import multicall from '../../helper/multicall'
import { useCrossWeb3 } from '../../hooks/useWeb3'

const useTokenBalances = (chains, tokens, fetchData) => {
  const [balances, setBalances] = useState(tokens)
  const { account, chainId } = useWeb3React()
  const web3s = { 1: useCrossWeb3(1), 137: useCrossWeb3(137) }

  useEffect(() => {
    const fetchBalances = async () => {
      chains.map(async (chain) => {
        const calls = tokens.map((token, index) => {
          return {
            address: token.address[chain.network],
            name: 'balanceOf',
            params: [account]
          }
        })

        const result = await multicall(
          web3s[chain.network],
          ERC20ABI,
          calls,
          chain.network
        )

        for (let i = 0; i < result.length; i++) {
          const balance = result[i]
          const address = calls[i].address

          let token = tokens.find(
            (token) => token.address[chain.network] === address
          )
          token.balances[chain.network] = getBalanceNumber(
            balance,
            tokens[address]?.decimals
          )
        }
      })
      setBalances(tokens)
    }

    if (account) {
      fetchBalances()
    }
  }, [account, tokens, chainId, fetchData, chains, web3s])

  return balances
}

export default useTokenBalances
