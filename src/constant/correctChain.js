import { ChainMap } from "./web3";

//Always we use first chainId as prefer chain
export const correctChains = [
    {
        url: "/swap",
        chains: [ChainMap.MAINNET, ChainMap.RINKEBY],
        exact: true,
    },
    {
        url: "/swap2",
        chains: [ChainMap.MAINNET, ChainMap.RINKEBY],
        exact: true,
    },
    {
        url: "/crosschain/xdai",
        chains: [ChainMap.XDAI],
    },
    {
        url: "/crosschain/bsc",
        chains: [ChainMap.BSC, ChainMap.BSC_TESTNET],
    },
    {
        url: "/crosschain/heco",
        chains: [ChainMap.HECO],
    },
    {
        url: "/crosschain/polygon",
        chains: [ChainMap.MATIC],
    },
    {
        url: "/synchronizer",
        chains: [ChainMap.MAINNET, ChainMap.RINKEBY],
        exact: true,
    },
    {
        url: "/stake-and-yield",
        chains: [ChainMap.MAINNET, ChainMap.RINKEBY],
        exact: true,
    },
    {
        url: "/vaults",
        chains: [ChainMap.MAINNET, ChainMap.RINKEBY],
        exact: true,
    },
    {
        url: "/staking",
        chains: [ChainMap.MAINNET, ChainMap.RINKEBY],
    },
    {
        url: "/migrator",
        chains: [ChainMap.MAINNET, ChainMap.RINKEBY],
        exact: true,
    },
    {
        url: "/bakkt",
        chains: [ChainMap.MAINNET, ChainMap.RINKEBY],
        exact: true,
    },
    {
        url: "/musk",
        chains: [ChainMap.MAINNET, ChainMap.RINKEBY],
        exact: true,
    },
    {
        url: "/sealed-swap",
        chains: [ChainMap.MAINNET],
        exact: true,
    },
    {
        url: "/muon-presale",
        chains: [ChainMap.MAINNET, ChainMap.BSC_TESTNET, ChainMap.BSC, ChainMap.XDAI, ChainMap.RINKEBY],
        exact: true,
    },
    {
        url: "/bridge",
        chains: [ChainMap.RINKEBY, ChainMap.BSC_TESTNET],
    },
]

export function getCorrectChains(path) {
    if (path === "/") return [ChainMap.MAINNET]
    for (let i = 0; i < correctChains.length; i++) {
        if (path.includes(correctChains[i].url)) {
            if (correctChains[i].exact) {
                if (correctChains[i].url === path)
                    return correctChains[i].chains
                else
                    return [ChainMap.MAINNET]
            }
            return correctChains[i].chains
        }
    }
    return [ChainMap.MAINNET]
}
