import random from 'lodash/random'
import { ChainMap } from '../constant/web3'

// Array of available nodes to connect to
export const nodes = {
    [ChainMap.ETH]: ["https://mainnet.infura.io/v3/" + process.env.REACT_APP_INFURA_KEY],
    [ChainMap.RINKEBY]: ["https://rinkeby.infura.io/v3/" + process.env.REACT_APP_INFURA_KEY],
    [ChainMap.BSC]: ["https://bsc-dataseed.binance.org", "https://bsc-dataseed1.defibit.io"],
    [ChainMap.BSC_TESTNET]: ["https://data-seed-prebsc-1-s1.binance.org:8545", "https://data-seed-prebsc-2-s1.binance.org:8545"],
    [ChainMap.XDAI]: ["https://rpc.xdaichain.com/"],
    [ChainMap.MATIC]: ["https://rpc-mainnet.matic.network", "https://rpc-mainnet.maticvigil.com", "https://rpc-mainnet.matic.quiknode.pro"],
    [ChainMap.HECO]: ["https://http-mainnet.hecochain.com"],
    [ChainMap.HECO_TESTNET]: ["https://http-testnet.hecochain.com"],
}

const getNodeUrl = (chainId = 1) => {
    const randomIndex = random(0, nodes[chainId].length - 1)
    return nodes[chainId][randomIndex]
}

export default getNodeUrl