import { Token } from '../utils/classes';
import { DEI_ADDRESS, COLLATERAL_ADDRESS, DEI_DEUS_LP, DEI_COLLATERAL_LP, DEUS_ADDRESS, DEUS_NATIVE_LP } from './contracts';
import { ChainId } from './web3';

export const bakktToken = new Token(1, "0x11Aa73194769882521e4576D245ffacd4E98aCB4", 18, "ioBAKKT", "ioBAKKT", "/tokens/bakkt.svg");
export const dBakktToken = new Token(1, "0x023466190D8dffF0fae089Cf1a05277E7203f89F", 18, "dBKKT", "dBKKT", "/tokens/BKKT.png");

// START DEI
export const deiToken = {
    [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, DEI_ADDRESS[ChainId.RINKEBY], 18, "DEI", "DEI", "/tokens/dei.svg"),
    [ChainId.MATIC]: new Token(ChainId.MATIC, DEI_ADDRESS[ChainId.MATIC], 18, "DEI", "DEI", "/tokens/dei.svg"),
    [ChainId.ETH]: new Token(ChainId.ETH, DEI_ADDRESS[ChainId.ETH], 18, "DEI", "DEI", "/tokens/dei.svg"),
    [ChainId.FTM]: new Token(ChainId.FTM, DEI_ADDRESS[ChainId.FTM], 18, "DEI", "DEI", "/tokens/dei.svg"),
    [ChainId.BSC]: new Token(ChainId.BSC, DEI_ADDRESS[ChainId.BSC], 18, "DEI", "DEI", "/tokens/dei.svg"),
    [ChainId.BSC_TESTNET]: new Token(ChainId.BSC_TESTNET, DEI_ADDRESS[ChainId.BSC_TESTNET], 18, "DEI", "DEI", "/tokens/dei.svg"),
    [ChainId.METIS]: new Token(ChainId.METIS, DEI_ADDRESS[ChainId.METIS], 18, "DEI", "DEI", "/tokens/dei.svg"),
    [ChainId.ARBITRUM]: new Token(ChainId.ARBITRUM, DEI_ADDRESS[ChainId.ARBITRUM], 18, "DEI", "DEI", "/tokens/dei.svg"),
    [ChainId.OPTIMISTIC]: new Token(ChainId.OPTIMISTIC, DEI_ADDRESS[ChainId.OPTIMISTIC], 18, "DEI", "DEI", "/tokens/dei.svg"),
};
export const deusToken = {
    [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, DEUS_ADDRESS[ChainId.RINKEBY], 18, "DEUS", "DEUS", "/tokens/deus.svg"),
    [ChainId.MATIC]: new Token(ChainId.MATIC, DEUS_ADDRESS[ChainId.MATIC], 18, "DEUS", "DEUS", "/tokens/deus.svg"),
    [ChainId.ETH]: new Token(ChainId.ETH, DEUS_ADDRESS[ChainId.ETH], 18, "DEUS", "DEUS", "/tokens/deus.svg"),
    [ChainId.FTM]: new Token(ChainId.FTM, DEUS_ADDRESS[ChainId.FTM], 18, "DEUS", "DEUS", "/tokens/deus.svg"),
    [ChainId.BSC]: new Token(ChainId.BSC, DEUS_ADDRESS[ChainId.BSC], 18, "DEUS", "DEUS", "/tokens/deus.svg"),
    [ChainId.BSC_TESTNET]: new Token(ChainId.BSC_TESTNET, DEUS_ADDRESS[ChainId.BSC_TESTNET], 18, "DEUS", "DEUS", "/tokens/deus.svg"),
    [ChainId.METIS]: new Token(ChainId.METIS, DEUS_ADDRESS[ChainId.METIS], 18, "DEUS", "DEUS", "/tokens/deus.svg"),
    [ChainId.ARBITRUM]: new Token(ChainId.ARBITRUM, DEUS_ADDRESS[ChainId.ARBITRUM], 18, "DEUS", "DEUS", "/tokens/deus.svg"),
    [ChainId.OPTIMISTIC]: new Token(ChainId.OPTIMISTIC, DEUS_ADDRESS[ChainId.OPTIMISTIC], 18, "DEUS", "DEUS", "/tokens/deus.svg"),
};

export const collateralToken = {
    [ChainId.MATIC]: new Token(ChainId.MATIC, COLLATERAL_ADDRESS[ChainId.MATIC], 6, "USDC", "USDC", "/tokens/usdc.svg"),
    [ChainId.ETH]: new Token(ChainId.ETH, COLLATERAL_ADDRESS[ChainId.ETH], 6, "USDC", "USDC", "/tokens/usdc.svg"),
    [ChainId.FTM]: new Token(ChainId.FTM, COLLATERAL_ADDRESS[ChainId.FTM], 6, "USDC", "USDC", "/tokens/usdc.svg"),
    [ChainId.BSC]: new Token(ChainId.BSC, COLLATERAL_ADDRESS[ChainId.BSC], 18, "USDC", "USDC", "/tokens/usdc.svg"),
    [ChainId.METIS]: new Token(ChainId.METIS, COLLATERAL_ADDRESS[ChainId.METIS], 6, "USDC", "USDC", "/tokens/usdc.svg"),
    [ChainId.ARBITRUM]: new Token(ChainId.ARBITRUM, COLLATERAL_ADDRESS[ChainId.ARBITRUM], 6, "USDC", "USDC", "/tokens/usdc.svg"),
    [ChainId.OPTIMISTIC]: new Token(ChainId.OPTIMISTIC, COLLATERAL_ADDRESS[ChainId.OPTIMISTIC], 6, "USDC", "USDC", "/tokens/usdc.svg"),
}

export const deiCollateralLpToken = {
    [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, DEI_COLLATERAL_LP[ChainId.RINKEBY], 18, "DEI-USDC LP", "DEI-USDC LP", "/tokens/dei.svg"),
    [ChainId.MATIC]: new Token(ChainId.MATIC, DEI_COLLATERAL_LP[ChainId.MATIC], 18, "DEI-USDC LP", "DEI-USDC LP", "/tokens/dei.svg"),
    [ChainId.ETH]: new Token(ChainId.ETH, DEI_COLLATERAL_LP[ChainId.ETH], 18, "DEI-USDC LP", "DEI-USDC LP", "/tokens/dei.svg"),
    [ChainId.FTM]: new Token(ChainId.FTM, DEI_COLLATERAL_LP[ChainId.FTM], 18, "DEI-USDC LP", "DEI-USDC LP", "/tokens/dei.svg"),
    [ChainId.BSC]: new Token(ChainId.BSC, DEI_COLLATERAL_LP[ChainId.BSC], 18, "DEI-USDC LP", "DEI-USDC LP", "/tokens/dei.svg"),
    [ChainId.METIS]: new Token(ChainId.METIS, DEI_COLLATERAL_LP[ChainId.METIS], 18, "DEI-USDC LP", "DEI-USDC LP", "/tokens/dei.svg"),
    [ChainId.ARBITRUM]: new Token(ChainId.ARBITRUM, DEI_COLLATERAL_LP[ChainId.ARBITRUM], 18, "DEI-USDC LP", "DEI-USDC LP", "/tokens/dei.svg"),
    [ChainId.OPTIMISTIC]: new Token(ChainId.OPTIMISTIC, DEI_COLLATERAL_LP[ChainId.OPTIMISTIC], 18, "DEI-USDC LP", "DEI-USDC LP", "/tokens/dei.svg"),
}

export const deiDeusLpToken = {
    [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, DEI_DEUS_LP[ChainId.RINKEBY], 18, "DEI-DEUS LP", "DEI-DEUS LP", "/tokens/deus.svg"),
    [ChainId.HECO]: new Token(ChainId.HECO, DEI_DEUS_LP[ChainId.HECO], 18, "DEI-DEUS LP", "DEI-DEUS LP", "/tokens/deus.svg"),
    [ChainId.MATIC]: new Token(ChainId.MATIC, DEI_DEUS_LP[ChainId.MATIC], 18, "DEI-DEUS LP", "DEI-DEUS LP", "/tokens/deus.svg"),
    [ChainId.ETH]: new Token(ChainId.ETH, DEI_DEUS_LP[ChainId.ETH], 18, "DEI-DEUS LP", "DEI-DEUS LP", "/tokens/deus.svg"),
    // [ChainId.FTM]: new Token(ChainId.FTM, DEI_DEUS_LP[ChainId.FTM], 18, "DEI-DEUS LP", "DEI-DEUS LP", "/tokens/deus.svg"),
    [ChainId.BSC]: new Token(ChainId.BSC, DEI_DEUS_LP[ChainId.BSC], 18, "DEI-DEUS LP", "DEI-DEUS LP", "/tokens/deus.svg"),
    [ChainId.METIS]: new Token(ChainId.METIS, DEI_DEUS_LP[ChainId.METIS], 18, "DEI-DEUS LP", "DEI-DEUS LP", "/tokens/deus.svg"),
    [ChainId.ARBITRUM]: new Token(ChainId.ARBITRUM, DEI_DEUS_LP[ChainId.ARBITRUM], 18, "DEI-DEUS LP", "DEI-DEUS LP", "/tokens/deus.svg"),
    [ChainId.OPTIMISTIC]: new Token(ChainId.OPTIMISTIC, DEI_DEUS_LP[ChainId.OPTIMISTIC], 18, "DEI-DEUS LP", "DEI-DEUS LP", "/tokens/deus.svg"),
}

export const DeusNativeLpToken = {
    [ChainId.MATIC]: new Token(ChainId.MATIC, DEUS_NATIVE_LP[ChainId.MATIC], 18, "DEUS-MATIC LP", "DEUS-MATIC LP", "/tokens/deus.svg"),
    [ChainId.ETH]: new Token(ChainId.ETH, DEUS_NATIVE_LP[ChainId.ETH], 18, "DEUS-ETH LP", "DEUS-ETH LP", "/tokens/deus.svg"),
    [ChainId.FTM]: new Token(ChainId.FTM, DEUS_NATIVE_LP[ChainId.FTM], 18, "DEUS-FTM LP", "DEUS-FTM LP", "/tokens/deus.svg"),
    [ChainId.BSC]: new Token(ChainId.BSC, DEUS_NATIVE_LP[ChainId.BSC], 18, "DEUS-BNB LP", "DEUS-BNB LP", "/tokens/deus.svg"),
    [ChainId.METIS]: new Token(ChainId.METIS, DEUS_NATIVE_LP[ChainId.METIS], 18, "DEUS-METIS LP", "DEUS-METIS LP", "/tokens/deus.svg"),
    [ChainId.ARBITRUM]: new Token(ChainId.ARBITRUM, DEUS_NATIVE_LP[ChainId.ARBITRUM], 18, "DEUS-ETH LP", "DEUS-ETH LP", "/tokens/deus.svg"),
    [ChainId.OPTIMISTIC]: new Token(ChainId.OPTIMISTIC, DEUS_NATIVE_LP[ChainId.OPTIMISTIC], 18, "DEUS-ETH LP", "DEUS-ETH LP", "/tokens/deus.svg"),
}


export const ZapTokens = {
    [ChainId.MATIC]: [
        { logo: "/tokens/dei.svg", symbol: "DEI", address: DEI_ADDRESS[ChainId.MATIC], decimals: 18, chainId: ChainId.MATIC },
        { logo: "/tokens/usdc.svg", symbol: "USDC", address: COLLATERAL_ADDRESS[ChainId.MATIC], decimals: 6, chainId: ChainId.MATIC },
        { logo: "/tokens/deus.svg", symbol: "DEUS", address: DEUS_ADDRESS[ChainId.MATIC], decimals: 18, chainId: ChainId.MATIC },
        { logo: "/tokens/usdc.svg", symbol: "USDC", address: COLLATERAL_ADDRESS[ChainId.MATIC], decimals: 6, chainId: ChainId.MATIC, pairID: 1 },
        { logo: "/tokens/deus.svg", symbol: "DEUS", address: DEUS_ADDRESS[ChainId.MATIC], decimals: 18, chainId: ChainId.MATIC, pairID: 1 },
        { logo: "/tokens/matic.jpg", symbol: "MATIC", address: "0x", decimals: 18, chainId: ChainId.MATIC },
        { logo: "/tokens/eth-logo.svg", symbol: "WETH", address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619", decimals: 18, chainId: ChainId.MATIC },
        // { logo: "/tokens/wbtc.png", symbol: "WBTC", address: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6", decimals: 8, chainId: ChainId.MATIC },
    ],
    [ChainId.ETH]: [
        { logo: "/tokens/dei.svg", symbol: "DEI", address: DEI_ADDRESS[ChainId.ETH], decimals: 18, chainId: 1 },
        { logo: "/tokens/usdc.svg", symbol: "USDC", address: COLLATERAL_ADDRESS[ChainId.ETH], decimals: 6, chainId: 1 },
        { logo: "/tokens/deus.svg", symbol: "DEUS", address: DEUS_ADDRESS[ChainId.ETH], decimals: 18, chainId: 1 },
        { logo: "/tokens/usdc.svg", symbol: "USDC", address: COLLATERAL_ADDRESS[ChainId.ETH], decimals: 6, chainId: 1, pairID: 1 },
        { logo: "/tokens/deus.svg", symbol: "DEUS", address: DEUS_ADDRESS[ChainId.ETH], decimals: 18, chainId: 1, pairID: 1 },
        { logo: "/tokens/eth-logo.svg", symbol: "ETH", address: "0x", decimals: 18, chainId: 1 },
    ],
}


export const DEITokens = {
    [ChainId.MATIC]: [
        { logo: "/tokens/usdc.svg", symbol: "USDC", address: COLLATERAL_ADDRESS[ChainId.MATIC], decimals: 6, chainId: ChainId.MATIC },
        { logo: "/tokens/deus.svg", symbol: "DEUS", address: DEUS_ADDRESS[ChainId.MATIC], decimals: 18, chainId: ChainId.MATIC },
        { logo: "/tokens/usdc.svg", symbol: "USDC", address: COLLATERAL_ADDRESS[ChainId.MATIC], decimals: 6, chainId: ChainId.MATIC, pairID: 1 },
        { logo: "/tokens/deus.svg", symbol: "DEUS", address: DEUS_ADDRESS[ChainId.MATIC], decimals: 18, chainId: ChainId.MATIC, pairID: 1 },
        { logo: "/tokens/matic.jpg", symbol: "MATIC", address: "0x", decimals: 18, chainId: ChainId.MATIC },
        { logo: "/tokens/eth-logo.svg", symbol: "WETH", address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619", decimals: 18, chainId: ChainId.MATIC },
    ],
    [ChainId.ETH]: [
        { logo: "/tokens/usdc.svg", symbol: "USDC", address: COLLATERAL_ADDRESS[ChainId.ETH], decimals: 6, chainId: 1 },
        { logo: "/tokens/deus.svg", symbol: "DEUS", address: DEUS_ADDRESS[ChainId.ETH], decimals: 18, chainId: 1 },
        { logo: "/tokens/usdc.svg", symbol: "USDC", address: COLLATERAL_ADDRESS[ChainId.ETH], decimals: 6, chainId: 1, pairID: 1 },
        { logo: "/tokens/deus.svg", symbol: "DEUS", address: DEUS_ADDRESS[ChainId.ETH], decimals: 18, chainId: 1, pairID: 1 },
        { logo: "/tokens/eth-logo.svg", symbol: "ETH", address: "0x", decimals: 18, chainId: 1 },
        { logo: "/tokens/dai.png", symbol: "DAI", address: "0x6B175474E89094C44Da98b954EedeAC495271d0F", decimals: 18, chainId: 1 },
        { logo: "/tokens/wbtc.png", symbol: "wBTC", address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599", decimals: 8, chainId: 1 },
    ],
    [ChainId.FTM]: [
        { logo: "/tokens/usdc.svg", symbol: "USDC", address: COLLATERAL_ADDRESS[ChainId.FTM], decimals: 6, chainId: ChainId.FTM },
        { logo: "/tokens/deus.svg", symbol: "DEUS", address: DEUS_ADDRESS[ChainId.FTM], decimals: 18, chainId: ChainId.FTM },
        { logo: "/tokens/usdc.svg", symbol: "USDC", address: COLLATERAL_ADDRESS[ChainId.FTM], decimals: 6, chainId: ChainId.FTM, pairID: 1 },
        { logo: "/tokens/deus.svg", symbol: "DEUS", address: DEUS_ADDRESS[ChainId.FTM], decimals: 18, chainId: ChainId.FTM, pairID: 1 },
    ],
    [ChainId.BSC]: [
        { logo: "/tokens/usdc.svg", symbol: "USDC", address: COLLATERAL_ADDRESS[ChainId.BSC], decimals: 18, chainId: ChainId.BSC },
        { logo: "/tokens/deus.svg", symbol: "DEUS", address: DEUS_ADDRESS[ChainId.BSC], decimals: 18, chainId: ChainId.BSC },
        { logo: "/tokens/usdc.svg", symbol: "USDC", address: COLLATERAL_ADDRESS[ChainId.BSC], decimals: 18, chainId: ChainId.BSC, pairID: 1 },
        { logo: "/tokens/deus.svg", symbol: "DEUS", address: DEUS_ADDRESS[ChainId.BSC], decimals: 18, chainId: ChainId.BSC, pairID: 1 },
    ],
    [ChainId.METIS]: [
        { logo: "/tokens/usdc.svg", symbol: "USDC", address: COLLATERAL_ADDRESS[ChainId.METIS], decimals: 6, chainId: ChainId.METIS },
        { logo: "/tokens/deus.svg", symbol: "DEUS", address: DEUS_ADDRESS[ChainId.METIS], decimals: 18, chainId: ChainId.METIS },
        { logo: "/tokens/usdc.svg", symbol: "USDC", address: COLLATERAL_ADDRESS[ChainId.METIS], decimals: 6, chainId: ChainId.METIS, pairID: 1 },
        { logo: "/tokens/deus.svg", symbol: "DEUS", address: DEUS_ADDRESS[ChainId.METIS], decimals: 18, chainId: ChainId.METIS, pairID: 1 },
    ],
    [ChainId.ARBITRUM]: [
        { logo: "/tokens/usdc.svg", symbol: "USDC", address: COLLATERAL_ADDRESS[ChainId.ARBITRUM], decimals: 6, chainId: ChainId.ARBITRUM },
        { logo: "/tokens/deus.svg", symbol: "DEUS", address: DEUS_ADDRESS[ChainId.ARBITRUM], decimals: 18, chainId: ChainId.ARBITRUM },
        { logo: "/tokens/usdc.svg", symbol: "USDC", address: COLLATERAL_ADDRESS[ChainId.ARBITRUM], decimals: 6, chainId: ChainId.ARBITRUM, pairID: 1 },
        { logo: "/tokens/deus.svg", symbol: "DEUS", address: DEUS_ADDRESS[ChainId.ARBITRUM], decimals: 18, chainId: ChainId.ARBITRUM, pairID: 1 },
    ],
    [ChainId.OPTIMISTIC]: [
        { logo: "/tokens/usdc.svg", symbol: "USDC", address: COLLATERAL_ADDRESS[ChainId.OPTIMISTIC], decimals: 6, chainId: ChainId.OPTIMISTIC },
        { logo: "/tokens/deus.svg", symbol: "DEUS", address: DEUS_ADDRESS[ChainId.OPTIMISTIC], decimals: 18, chainId: ChainId.OPTIMISTIC },
        { logo: "/tokens/usdc.svg", symbol: "USDC", address: COLLATERAL_ADDRESS[ChainId.OPTIMISTIC], decimals: 6, chainId: ChainId.OPTIMISTIC, pairID: 1 },
        { logo: "/tokens/deus.svg", symbol: "DEUS", address: DEUS_ADDRESS[ChainId.OPTIMISTIC], decimals: 18, chainId: ChainId.OPTIMISTIC, pairID: 1 },
    ],
}
// END DEI
export const BridgeTokens = {
    [ChainId.BSC]: [
        { logo: "/tokens/dei.svg", symbol: "DEI", address: DEI_ADDRESS[ChainId.BSC], decimals: 18, id: "0", chainId: ChainId.BSC },
        { logo: "/tokens/deus.svg", symbol: "DEUS", address: DEUS_ADDRESS[ChainId.BSC], decimals: 18, id: "1", chainId: ChainId.BSC },
    ],
    [ChainId.FTM]: [
        { logo: "/tokens/dei.svg", symbol: "DEI", address: DEI_ADDRESS[ChainId.FTM], decimals: 18, id: "0", chainId: ChainId.FTM },
        { logo: "/tokens/deus.svg", symbol: "DEUS", address: DEUS_ADDRESS[ChainId.FTM], decimals: 18, id: "1", chainId: ChainId.FTM },
    ],
    [ChainId.MATIC]: [
        { logo: "/tokens/dei.svg", symbol: "DEI", address: DEI_ADDRESS[ChainId.MATIC], decimals: 18, id: "0", chainId: ChainId.MATIC },
        { logo: "/tokens/deus.svg", symbol: "DEUS", address: DEUS_ADDRESS[ChainId.MATIC], decimals: 18, id: "1", chainId: ChainId.MATIC },
    ],
    [ChainId.ETH]: [
        { logo: "/tokens/dei.svg", symbol: "DEI", address: DEI_ADDRESS[ChainId.ETH], decimals: 18, id: "0", chainId: ChainId.ETH },
        { logo: "/tokens/deus.svg", symbol: "DEUS", address: DEUS_ADDRESS[ChainId.ETH], decimals: 18, id: "1", chainId: ChainId.ETH },
    ],
    [ChainId.METIS]: [
        { logo: "/tokens/dei.svg", symbol: "DEI", address: DEI_ADDRESS[ChainId.METIS], decimals: 18, id: "0", chainId: ChainId.METIS },
        { logo: "/tokens/deus.svg", symbol: "DEUS", address: DEUS_ADDRESS[ChainId.METIS], decimals: 18, id: "1", chainId: ChainId.METIS },
    ],
    [ChainId.ARBITRUM]: [
        { logo: "/tokens/dei.svg", symbol: "DEI", address: DEI_ADDRESS[ChainId.ARBITRUM], decimals: 18, id: "0", chainId: ChainId.ARBITRUM },
        { logo: "/tokens/deus.svg", symbol: "DEUS", address: DEUS_ADDRESS[ChainId.ARBITRUM], decimals: 18, id: "1", chainId: ChainId.ARBITRUM },
    ],
    [ChainId.OPTIMISTIC]: [
        { logo: "/tokens/dei.svg", symbol: "DEI", address: DEI_ADDRESS[ChainId.OPTIMISTIC], decimals: 18, id: "0", chainId: ChainId.OPTIMISTIC },
        { logo: "/tokens/deus.svg", symbol: "DEUS", address: DEUS_ADDRESS[ChainId.OPTIMISTIC], decimals: 18, id: "1", chainId: ChainId.OPTIMISTIC },
    ],
}

export const isNative = (address, chainId) => {
    return address === "0x"
        || (chainId === 1 && address === "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
        || (chainId === 4 && address === "0xc778417E063141139Fce010982780140Aa0cD5Ab")
}
export const WethRinkeby = { logo: "/tokens/eth-logo.svg", symbol: "ETH", decimals: 18, address: "0xc778417E063141139Fce010982780140Aa0cD5Ab", chainId: 4 }
export const Weth = { logo: "/tokens/eth-logo.svg", symbol: "ETH", decimals: 18, address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", chainId: 1 }


export const MuonPreSaleTokens = [
    { logo: "/tokens/deus.svg", symbol: "DEUS", address: DEUS_ADDRESS[ChainId.MATIC], decimals: 18, chainId: ChainId.MATIC },
]

export const muonToken = new Token(1, null, 18, "MUON", "MUON", "/tokens/muon.svg");

export const DeusPath = {
    "deus": {
        "eth": true,
    },
    "eth": {
        "deus": true,
    },
}