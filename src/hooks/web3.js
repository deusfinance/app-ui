import Web3 from 'web3'
import getNodeUrl from '../helper/getRpcUrl'

const getWeb3NoAccount = (chainId) => {
    const RPC_URL = getNodeUrl(chainId)
    const httpProvider = new Web3.providers.HttpProvider(RPC_URL, { timeout: 10000 })
    return new Web3(httpProvider)
}

export { getWeb3NoAccount }