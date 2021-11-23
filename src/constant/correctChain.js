import { ChainId } from "./web3";

//Always we use first chainId as prefer chain
export const correctChains = [
    {
        url: "/swap",
        chains: [ChainId.ETH, ChainId.MATIC],
    },
    {
        url: "/stable/zap",
        chains: [ChainId.ETH, ChainId.MATIC],
    },
    {
        url: "/stable/farms",
        chains: [ChainId.ETH, ChainId.MATIC],
    },
    {
        url: "/stable",
        chains: [ChainId.ETH, ChainId.MATIC, ChainId.FTM,ChainId.BSC],
    },
    {
        url: "/migrator",
        chains: [ChainId.ETH, ChainId.MATIC],
    },
    {
        url: "/bridge",
        chains: [ChainId.ETH, ChainId.MATIC,ChainId.BSC,ChainId.FTM],
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
