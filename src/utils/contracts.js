import addrs from '../services/addresses.json'

export const getTokenAddr = (tokenName, chainId) => addrs["token"][tokenName][chainId.toString()]
export const getContractAddr = (contractName, chainId) => addrs[contractName][chainId.toString()]