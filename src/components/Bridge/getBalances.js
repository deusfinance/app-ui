import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
// import { isAddress } from '@ethersproject/address'
import { ERC20ABI } from '../../utils/StakingABI'
import { getBalanceNumber } from '../../helper/formatBalance'
import multicall from '../../helper/multicall'
import { useCrossWeb3 } from '../../hooks/useWeb3'
import { ChainId } from '../../constant/web3'

const useTokenBalances = (chains, tokens, fetchData) => {
  // console.log(tokens);
  const [balances, setBalances] = useState(tokens)
  const { account, chainId } = useWeb3React()
  const ethWeb3 = useCrossWeb3(ChainId.ETH)
  const bscWeb3 = useCrossWeb3(ChainId.BSC)
  const ftmWeb3 = useCrossWeb3(ChainId.FTM)
  const polygonWeb3 = useCrossWeb3(ChainId.MATIC)
  const metisWeb3 = useCrossWeb3(ChainId.METIS)
  // const arbiWeb3 = useCrossWeb3(ChainId.ARBITRUM)
  // const optimisticWeb3 = useCrossWeb3(ChainId.OPTIMISTIC)

  const web3s = {
    [ChainId.ETH]: ethWeb3,
    [ChainId.FTM]: ftmWeb3,
    [ChainId.MATIC]: polygonWeb3,
    [ChainId.BSC]: bscWeb3,
    [ChainId.METIS]: metisWeb3,
    // [ChainId.ARBITRUM]: arbiWeb3,
    // [ChainId.OPTIMISTIC]: optimisticWeb3,
  }

  useEffect(() => {
    const fetchBalances = async () => {
      Object.keys(web3s).map(async (currChainId) => {
        const calls = tokens.filter(token => token.address[currChainId]).map((token, index) => {
          return {
            address: token.address[currChainId],
            name: 'balanceOf',
            params: [account]
          }
        })
        try {
          const result = await multicall(web3s[currChainId], ERC20ABI, calls, currChainId)
          if (currChainId === ChainId.METIS) {
            console.log(result);
          }
          for (let i = 0; i < result.length; i++) {
            const balance = result[i]
            const address = calls[i].address
            let token = tokens.find((token) => token.address[currChainId] === address)
            token.balances[currChainId] = getBalanceNumber(balance, tokens[address]?.decimals)
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
