import random from 'lodash/random'

// Array of available nodes to connect to
// export const nodes = [process.env.REACT_APP_NODE_1, process.env.REACT_APP_NODE_2, process.env.REACT_APP_NODE_3]

export const nodes = {
    1: ["https://mainnet.infura.io/v3/" + process.env.REACT_APP_INFURA_KEY],
    97: ["https://data-seed-prebsc-1-s1.binance.org:8545"]
}

const getNodeUrl = (chainId = 1) => {
    const randomIndex = random(0, nodes[chainId].length - 1)
    return nodes[chainId][randomIndex]
}

export default getNodeUrl