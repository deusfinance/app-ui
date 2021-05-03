import Web3 from 'web3'
import getNodeUrl from './getRpcUrl'

const RPC_URL = getNodeUrl()
const httpProvider = new Web3.providers.HttpProvider(RPC_URL, { timeout: 10000 })
const web3NoAccount = new Web3(httpProvider)

const getWeb3NoAccount = () => {
    return web3NoAccount
}

export { getWeb3NoAccount }
export default web3NoAccount