import { ChainId } from "./web3";

//Always we use first chainId as prefer chain
export const correctChains = [
    {
        url: "/swap",
        chains: [ChainId.MATIC, ChainId.ETH],
    },
    {
        url: "/stable/zap",
        chains: [ChainId.MATIC, ChainId.ETH],
    },
    {
        url: "/stable/farms",
        chains: [ChainId.FTM, ChainId.MATIC, ChainId.ETH],
    },
    {
        url: "/migrator",
        chains: [ChainId.MATIC, ChainId.ETH],
    },
    {
        url: "/muon-presale",
        chains: [ChainId.MATIC],
    },
    {
        url: "/stable",
        chains: [ChainId.FTM, ChainId.MATIC, ChainId.ETH, ChainId.BSC, ChainId.METIS],
    },
    {
        url: "/legacy-bridge",
        chains: [ChainId.FTM, ChainId.MATIC, ChainId.ETH, ChainId.BSC, ChainId.METIS],
    },
    {
        url: "/vedeus",
        chains: [ChainId.ETH, ChainId.MATIC, ChainId.BSC, ChainId.FTM], // ChainId.BSC_TESTNET, ChainId.RINKEBY
    },
    {
        url: "/vedeus2",
        chains: [ChainId.MATIC, ChainId.BSC, ChainId.FTM], // ChainId.BSC_TESTNET, ChainId.RINKEBY
    },
    {
        url: "/not-found",
        chains: Object.values(ChainId),
    },
]

export function getCorrectChains(path) {
    if (path === "/") return [ChainId.ETH]
    const lowerPath = path.toLowerCase()
    for (let i = 0; i < correctChains.length; i++) {
        if (lowerPath.includes(correctChains[i].url)) {
            if (correctChains[i].exact) {
                if (correctChains[i].url === lowerPath)
                    return correctChains[i].chains
                else
                    return [ChainId.ETH]
            }
            return correctChains[i].chains
        }
    }
    return [ChainId.ETH]
}
