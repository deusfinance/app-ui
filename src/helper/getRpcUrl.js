import random from 'lodash/random'

// Array of available nodes to connect to
// export const nodes = [process.env.REACT_APP_NODE_1, process.env.REACT_APP_NODE_2, process.env.REACT_APP_NODE_3]

export const nodes = ["https://mainnet.infura.io/v3/" + process.env.REACT_APP_INFURA_KEY]

const getNodeUrl = () => {
    const randomIndex = random(0, nodes.length - 1)
    return nodes[randomIndex]
}

export default getNodeUrl