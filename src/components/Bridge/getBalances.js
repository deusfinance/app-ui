import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
// import { isAddress } from '@ethersproject/address'
import { ERC20ABI } from '../../utils/StakingABI'

import { getBalanceNumber } from '../../helper/formatBalance'
import multicall from '../../helper/multicall'
import { useCrossWeb3 } from '../../hooks/useWeb3'
import { ChainId } from '../../constant/web3'

const useTokenBalances = (chains, tokens, fetchData) => {
  const [balances, setBalances] = useState(tokens)
  const { account, chainId } = useWeb3React()
  
  const ethWeb3 = useCrossWeb3(ChainId.ETH)
  const bscWeb3 = useCrossWeb3(ChainId.BSC)
  // const rinkebyWeb3 = useCrossWeb3(ChainId.RINKEBY)
  // const bscTestWeb3 = useCrossWeb3(ChainId.BSC_TESTNET)
  const ftmWeb3 = useCrossWeb3(ChainId.FTM)
  const polygonWeb3 = useCrossWeb3(ChainId.MATIC)
  const metisWeb3 = useCrossWeb3(ChainId.METIS)
  const arbitrumWeb3 = useCrossWeb3(ChainId.ARBITRUM)
  // const optimisticWeb3 = useCrossWeb3(ChainId.OPTIMISTIC)
  const web3s = {
    [ChainId.ETH]: ethWeb3,
    [ChainId.FTM]: ftmWeb3,
    [ChainId.MATIC]: polygonWeb3,
    [ChainId.BSC]: bscWeb3,
    // [ChainId.RINKEBY]: rinkebyWeb3,
    // [ChainId.BSC_TESTNET]: bscTestWeb3,
    [ChainId.METIS]: metisWeb3,
    [ChainId.ARBITRUM]: arbitrumWeb3,
    // [ChainId.OPTIMISTIC]: optimisticWeb3,
  }
  useEffect(() => {
    const fetchBalances = async () => {
      chains.map(async (chain) => {
        const calls = tokens.filter(token => token.address[chain.network]).map((token, index) => {
          return {
            address: token.address[chain.network],
            name: 'balanceOf',
            params: [account]
          }
        })
        try {
          const result = await multicall(web3s[chain.network], ERC20ABI, calls, chain.network)
          for (let i = 0; i < result.length; i++) {
            const balance = result[i]
            const address = calls[i].address
            let token = tokens.find((token) => token.address[chain.network] === address)
            token.balances[chain.network] = getBalanceNumber(balance, tokens[address]?.decimals)
          }
        } catch (error) {
          console.log("error at useTokenBalances", error);
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
