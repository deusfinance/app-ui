const axios = require('axios')
const { chains } = require('./data')

const BASE_URL = 'http://104.131.177.195/v1'

console.log({ BASE_URL })

const ethCallContract = (address, method, params, abi, fromChian) => {
  console.log({ address, method, params, abi, fromChian })

  let network = chains.find((item) => item.network === fromChian).networkName
  let filteredAbi = [
    abi.find(({ name, type }) => name === method && type === 'function')
  ]
  let data = {
    app: 'eth',
    method: 'call',
    params: {
      address,
      method,
      params,
      abi: filteredAbi,
      outputs: ['user', 'amount', 'fromChain', 'toChain', 'tokenId', 'txId'],
      network
    }
  }
  return axios.post(BASE_URL, data).then(({ data }) => data)
}

module.exports = {
  ethCallContract
}
