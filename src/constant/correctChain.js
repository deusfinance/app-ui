import { ChainMap } from "./web3";

//Always we use first chainId as prefer chain
export const correctChains = [
    {
        url: "/swap",
        chains: [ChainMap.ETH, ChainMap.RINKEBY],
        exact: true,
    },
    {
        url: "/swap2",
        chains: [ChainMap.ETH, ChainMap.RINKEBY],
        exact: true,
    },
    {
        url: "/stable",
        chains: [ChainMap.HECO, ChainMap.RINKEBY],
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
        chains: [ChainMap.ETH, ChainMap.RINKEBY],
        exact: true,
    },
    {
        url: "/stake-and-yield",
        chains: [ChainMap.ETH, ChainMap.RINKEBY],
        exact: true,
    },
    {
        url: "/vaults",
        chains: [ChainMap.ETH, ChainMap.RINKEBY],
        exact: true,
    },
    {
        url: "/staking",
        chains: [ChainMap.ETH, ChainMap.RINKEBY],
    },
    {
        url: "/migrator",
        chains: [ChainMap.ETH, ChainMap.RINKEBY],
        exact: true,
    },
    {
        url: "/bakkt",
        chains: [ChainMap.ETH, ChainMap.RINKEBY],
        exact: true,
    },
    {
        url: "/musk",
        chains: [ChainMap.ETH, ChainMap.RINKEBY],
        exact: true,
    },
    {
        url: "/sealed-swap",
        chains: [ChainMap.ETH],
        exact: true,
    },
    {
        url: "/crosschain/bsc/muon-presale",
        chains: [ChainMap.BSC_TESTNET, ChainMap.BSC],
        exact: true,
    },
    {
        url: "/crosschain/xdai/muon-presale",
        chains: [ChainMap.XDAI],
        exact: true,
    },
    {
        url: "/muon-presale",
        chains: [ChainMap.ETH],
        exact: true,
    },
    {
        url: "/sync2",
        chains: [ChainMap.BSC, ChainMap.XDAI, ChainMap.HECO, ChainMap.MATIC],
        exact: true,
    },
    {
        url: "/sync3",
        chains: [ChainMap.BSC, ChainMap.BSC_TESTNET],
        exact: true,
    },
    {
        url: "/bridge",
        chains: [ChainMap.RINKEBY, ChainMap.BSC_TESTNET],
    },
    {
        url: "/not-found",
        chains: Object.values(ChainMap),
    },
]

export function getCorrectChains(path) {
    if (path === "/") return [ChainMap.ETH]
    for (let i = 0; i < correctChains.length; i++) {
        if (path.includes(correctChains[i].url)) {
            if (correctChains[i].exact) {
                if (correctChains[i].url === path)
                    return correctChains[i].chains
                else
                    return [ChainMap.ETH]
            }
            return correctChains[i].chains
        }
    }
    return [ChainMap.ETH]
}
