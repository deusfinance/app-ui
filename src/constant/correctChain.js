import { ChainId } from "./web3";

//Always we use first chainId as prefer chain
export const correctChains = [
    {
        url: "/swap",
        chains: [ChainId.ETH, ChainId.MATIC],
    },

    {
        url: "/stable/zap",
        chains: [ChainId.MATIC],
    },
    {
        url: "/stable",
        chains: [ChainId.ETH, ChainId.MATIC],
    },
    {
        url: "/migrator",
        chains: [ChainId.ETH, ChainId.MATIC],
    },
    {
        url: "/crosschain/xdai",
        chains: [ChainId.XDAI],
    },
    {
        url: "/crosschain/bsc",
        chains: [ChainId.BSC, ChainId.BSC_TESTNET],
    },
    {
        url: "/crosschain/bsc/muon-presale",
        chains: [ChainId.BSC_TESTNET, ChainId.BSC],
    },
    {
        url: "/crosschain/xdai/muon-presale",
        chains: [ChainId.XDAI],
    },
    {
        url: "/muon-presale",
        chains: [ChainId.ETH],
        exact: true,
    },
    {
        url: "/bridge",
        chains: [ChainId.RINKEBY, ChainId.BSC_TESTNET],
    },
    {
        url: "/not-found",
        chains: Object.values(ChainId),
    },
]

export function getCorrectChains(path) {
    if (path === "/") return [ChainId.ETH]
    for (let i = 0; i < correctChains.length; i++) {
        if (path.includes(correctChains[i].url)) {
            if (correctChains[i].exact) {
                if (correctChains[i].url === path)
                    return correctChains[i].chains
                else
                    return [ChainId.ETH]
            }
            return correctChains[i].chains
        }
    }
    return [ChainId.ETH]
}
