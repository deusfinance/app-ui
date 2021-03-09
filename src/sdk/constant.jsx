import JSBI from 'jsbi'

export const CHAIN_ID = {
    MAINNET: 1,
    ROPSTEN: 3,
    RINKEBY: 4,
    GÖRLI: 5,
    KOVAN: 42
}


export const INFURA_PREFIXES = {
    1: 'mainnet',
    3: 'ropsten',
    4: 'rinkeby',
    5: 'goerli',
    42: 'kovan',
}

export const EtherscanType = {
    Account: 1,
    TokenBalance: 2,
    Transaction: 3,
    Token: 4,
}

// export const EtherscanTypeData = {
//     [EtherscanType.Account]: [number, string],
//     [EtherscanType.TokenBalance]: [Token, string],
//     [EtherscanType.Transaction]: [number, string]
// }

export function formatEtherscanLink(type, chainId, address) {

    if (chainId === 100) {
        return "https://blockscout.com/poa/xdai/address/" + address
    }
    switch (type) {
        case EtherscanType.Account: {
            return `https://${ETHERSCAN_PREFIXES[chainId]}etherscan.io/address/${address}`
        }
        case EtherscanType.Transaction: {
            return `https://${ETHERSCAN_PREFIXES[chainId]}etherscan.io/tx/${address}`
        }
        case EtherscanType.Token: {
            return `https://${ETHERSCAN_PREFIXES[chainId]}etherscan.io/token/${address}`
        }
        default: {
            return ""
        }
    }
}

const ETHERSCAN_PREFIXES = {
    1: '',
    3: 'ropsten.',
    4: 'rinkeby.',
    5: 'goerli.',
    42: 'kovan.',
}

// exports for internal consumption
export const ZERO = JSBI.BigInt(0)
export const TEN = JSBI.BigInt(10)


export const SolidityType = {
    uint8: 'uint8',
    uint256: 'uint256'
}
