const axios = require('axios')

const BASE_URL = process.env.MUON_NODE_GATEWAY

function ethCallContract(address, method, params, abi, network) {
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

}
  return axios.post(BASE_URL, data).then(({ data }) => data)
}

module.exports = {
  ethCallContract
}
