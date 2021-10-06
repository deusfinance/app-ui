import random from 'lodash/random'
import { rpcConfig } from '../constant/web3'

const getNodeUrl = (chainId = 1) => {
    const nodes = rpcConfig[chainId]["rpcUrls"]
    const randomIndex = random(0, nodes.length - 1)
    return nodes[randomIndex]
}

export default getNodeUrl