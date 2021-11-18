import { Token } from '../utils/classes';
import { DEI_ADDRESS, COLLATERAL_ADDRESS, DEI_DEUS_LP, DEI_COLLATERAL_LP, DEUS_ADDRESS, DEUS_NATIVE_LP } from './contracts';
import { ChainId } from './web3';

export const muonToken = new Token(1, null, 18, "MUON", "MUON", "/tokens/muon.svg");

export const bakktToken = new Token(1, "0x11Aa73194769882521e4576D245ffacd4E98aCB4", 18, "ioBAKKT", "ioBAKKT", "/tokens/bakkt.svg");
export const dBakktToken = new Token(1, "0x023466190D8dffF0fae089Cf1a05277E7203f89F", 18, "dBKKT", "dBKKT", "/tokens/BKKT.png");

//START DEI
export const deiToken = {
    [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, DEI_ADDRESS[ChainId.RINKEBY], 18, "DEI", "DEI", "/tokens/dei.svg"),
    [ChainId.HECO]: new Token(ChainId.HECO, DEI_ADDRESS[ChainId.HECO], 18, "DEI", "DEI", "/tokens/dei.svg"),
    [ChainId.AVALANCHE]: new Token(ChainId.AVALANCHE, DEI_ADDRESS[ChainId.AVALANCHE], 18, "DEI", "DEI", "/tokens/dei.svg"),
    [ChainId.MATIC]: new Token(ChainId.MATIC, DEI_ADDRESS[ChainId.MATIC], 18, "DEI", "DEI", "/tokens/dei.svg"),
    [ChainId.ETH]: new Token(ChainId.ETH, DEI_ADDRESS[ChainId.ETH], 18, "DEI", "DEI", "/tokens/dei.svg"),
    [ChainId.FTM]: new Token(ChainId.FTM, DEI_ADDRESS[ChainId.FTM], 18, "DEI", "DEI", "/tokens/dei.svg"),
};
export const deusToken = {
    [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, DEUS_ADDRESS[ChainId.RINKEBY], 18, "DEUS", "DEUS", "/tokens/deus.svg"),
    [ChainId.MATIC]: new Token(ChainId.MATIC, DEUS_ADDRESS[ChainId.MATIC], 18, "DEUS", "DEUS", "/tokens/deus.svg"),
    [ChainId.ETH]: new Token(ChainId.ETH, DEUS_ADDRESS[ChainId.ETH], 18, "DEUS", "DEUS", "/tokens/deus.svg"),
    [ChainId.FTM]: new Token(ChainId.FTM, DEUS_ADDRESS[ChainId.FTM], 18, "DEUS", "DEUS", "/tokens/deus.svg"),
};

export const collateralToken = {
    [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, COLLATERAL_ADDRESS[ChainId.RINKEBY], 6, "USDC", "USDC", "/tokens/usdc.svg"),
    [ChainId.HECO]: new Token(ChainId.HECO, COLLATERAL_ADDRESS[ChainId.HECO], 8, "HUSD", "HUSD", "/tokens/husd.svg"),
    [ChainId.AVALANCHE]: new Token(ChainId.AVALANCHE, COLLATERAL_ADDRESS[ChainId.AVALANCHE], 18, "DAI", "DAI", "/tokens/dai.png"),
    [ChainId.MATIC]: new Token(ChainId.MATIC, COLLATERAL_ADDRESS[ChainId.MATIC], 6, "USDC", "USDC", "/tokens/usdc.svg"),
    [ChainId.ETH]: new Token(ChainId.ETH, COLLATERAL_ADDRESS[ChainId.ETH], 6, "USDC", "USDC", "/tokens/usdc.svg"),
    [ChainId.FTM]: new Token(ChainId.FTM, COLLATERAL_ADDRESS[ChainId.FTM], 6, "USDC", "USDC", "/tokens/usdc.svg"),
}

export const deiCollateralLpToken = {
    [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, DEI_COLLATERAL_LP[ChainId.RINKEBY], 18, "DEI-USDC LP", "DEI-USDC LP", "/tokens/dei.svg"),
    [ChainId.HECO]: new Token(ChainId.HECO, DEI_COLLATERAL_LP[ChainId.HECO], 18, "DEI-HUSD LP", "DEI-HUSD LP", "/tokens/dei.svg"),
    [ChainId.AVALANCHE]: new Token(ChainId.AVALANCHE, DEI_COLLATERAL_LP[ChainId.AVALANCHE], 18, "DEI-DAI LP", "DEI-DAI LP", "/tokens/dei.svg"),
    [ChainId.MATIC]: new Token(ChainId.MATIC, DEI_COLLATERAL_LP[ChainId.MATIC], 18, "DEI-USDC LP", "DEI-USDC LP", "/tokens/dei.svg"),
    [ChainId.ETH]: new Token(ChainId.ETH, DEI_COLLATERAL_LP[ChainId.ETH], 18, "DEI-USDC LP", "DEI-USDC LP", "/tokens/dei.svg"),
    [ChainId.FTM]: new Token(ChainId.FTM, DEI_COLLATERAL_LP[ChainId.FTM], 18, "DEI-USDC LP", "DEI-USDC LP", "/tokens/dei.svg"),
}

export const deiDeusLpToken = {
    [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, DEI_DEUS_LP[ChainId.RINKEBY], 18, "DEI-DEUS LP", "DEI-DEUS LP", "/tokens/deus.svg"),
    [ChainId.HECO]: new Token(ChainId.HECO, DEI_DEUS_LP[ChainId.HECO], 18, "DEI-DEUS LP", "DEI-DEUS LP", "/tokens/deus.svg"),
    [ChainId.AVALANCHE]: new Token(ChainId.AVALANCHE, DEI_DEUS_LP[ChainId.AVALANCHE], 18, "DEI-DEUS LP", "DEI-DEUS LP", "/tokens/deus.svg"),
    [ChainId.MATIC]: new Token(ChainId.MATIC, DEI_DEUS_LP[ChainId.MATIC], 18, "DEI-DEUS LP", "DEI-DEUS LP", "/tokens/deus.svg"),
    [ChainId.ETH]: new Token(ChainId.ETH, DEI_DEUS_LP[ChainId.ETH], 18, "DEI-DEUS LP", "DEI-DEUS LP", "/tokens/deus.svg"),
    [ChainId.FTM]: new Token(ChainId.FTM, DEI_DEUS_LP[ChainId.FTM], 18, "DEI-DEUS LP", "DEI-DEUS LP", "/tokens/deus.svg"),
}

export const DeusNativeLpToken = {
    [ChainId.MATIC]: new Token(ChainId.MATIC, DEUS_NATIVE_LP[ChainId.MATIC], 18, "DEUS-MATIC LP", "DEUS LP", "/tokens/deus.svg"),
    [ChainId.ETH]: new Token(ChainId.ETH, DEUS_NATIVE_LP[ChainId.ETH], 18, "DEUS-ETH LP", "DEUS LP", "/tokens/deus.svg"),
    [ChainId.FTM]: new Token(ChainId.FTM, DEUS_NATIVE_LP[ChainId.FTM], 18, "DEUS-ETH LP", "DEUS LP", "/tokens/deus.svg"),
}


export const ZapTokens = {
    [ChainId.RINKEBY]: [
        { logo: "/tokens/dei.svg", symbol: "DEI", address: DEI_ADDRESS[ChainId.RINKEBY], decimals: 18, chainId: 4 },
        { logo: "/tokens/usdc.svg", symbol: "USDC", address: COLLATERAL_ADDRESS[ChainId.RINKEBY], decimals: 6, chainId: 4 },
        { logo: "/tokens/deus.svg", symbol: "DEUS", address: DEUS_ADDRESS[ChainId.RINKEBY], decimals: 18, chainId: 4 },
        { logo: "/tokens/usdc.svg", symbol: "USDC", address: COLLATERAL_ADDRESS[ChainId.RINKEBY], decimals: 6, chainId: 4, pairID: 1 },
        { logo: "/tokens/deus.svg", symbol: "DEUS", address: DEUS_ADDRESS[ChainId.RINKEBY], decimals: 18, chainId: 4, pairID: 1 },
        { logo: "/tokens/eth-logo.svg", symbol: "ETH", address: "0x", decimals: 18, chainId: 4 },
        { logo: "/tokens/husd.svg", symbol: "HUSD", address: "0x8313949568A16b2Cc786Af26F363071777Af4b8b", decimals: 6, chainId: 4 },
    ],
    [ChainId.MATIC]: [
        { logo: "/tokens/dei.svg", symbol: "DEI", address: DEI_ADDRESS[ChainId.MATIC], decimals: 18, chainId: ChainId.MATIC },
        { logo: "/tokens/usdc.svg", symbol: "USDC", address: COLLATERAL_ADDRESS[ChainId.MATIC], decimals: 6, chainId: ChainId.MATIC },
        { logo: "/tokens/deus.svg", symbol: "DEUS", address: DEUS_ADDRESS[ChainId.MATIC], decimals: 18, chainId: ChainId.MATIC },
        { logo: "/tokens/usdc.svg", symbol: "USDC", address: COLLATERAL_ADDRESS[ChainId.MATIC], decimals: 6, chainId: ChainId.MATIC, pairID: 1 },
        { logo: "/tokens/deus.svg", symbol: "DEUS", address: DEUS_ADDRESS[ChainId.MATIC], decimals: 18, chainId: ChainId.MATIC, pairID: 1 },
        { logo: "/tokens/matic.jpg", symbol: "MATIC", address: "0x", decimals: 18, chainId: ChainId.MATIC },
        { logo: "/tokens/eth-logo.svg", symbol: "WETH", address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619", decimals: 18, chainId: ChainId.MATIC },

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
    [ChainId.RINKEBY]: [
        { logo: "/tokens/usdc.svg", symbol: "USDC", address: COLLATERAL_ADDRESS[ChainId.RINKEBY], decimals: 6, chainId: 4 },
        { logo: "/tokens/deus.svg", symbol: "DEUS", address: DEUS_ADDRESS[ChainId.RINKEBY], decimals: 18, chainId: 4 },
        { logo: "/tokens/usdc.svg", symbol: "USDC", address: COLLATERAL_ADDRESS[ChainId.RINKEBY], decimals: 6, chainId: 4, pairID: 1 },
        { logo: "/tokens/deus.svg", symbol: "DEUS", address: DEUS_ADDRESS[ChainId.RINKEBY], decimals: 18, chainId: 4, pairID: 1 },
        { logo: "/tokens/eth-logo.svg", symbol: "ETH", address: "0x", decimals: 18, chainId: 4 },
        { logo: "/tokens/husd.svg", symbol: "HUSD", address: "0x8313949568A16b2Cc786Af26F363071777Af4b8b", decimals: 6, chainId: 4 },
    ],
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
        { logo: "/tokens/usdc.svg", symbol: "USDC", address: COLLATERAL_ADDRESS[ChainId.FTM], decimals: 6, chainId: ChainId.FTM},
        { logo: "/tokens/deus.svg", symbol: "DEUS", address: DEUS_ADDRESS[ChainId.FTM], decimals: 18, chainId: ChainId.FTM},
        { logo: "/tokens/usdc.svg", symbol: "USDC", address: COLLATERAL_ADDRESS[ChainId.FTM], decimals: 6, chainId: ChainId.FTM, pairID: 1 },
        { logo: "/tokens/deus.svg", symbol: "DEUS", address: DEUS_ADDRESS[ChainId.FTM], decimals: 18, chainId: ChainId.FTM, pairID: 1 },
        { logo: "/tokens/eth-logo.svg", symbol: "FTM", address: "0x", decimals: 18, chainId: ChainId.FTM },
    ],
}
//END DEI
export const BridgeTokens = {
    [ChainId.RINKEBY]: [
        { logo: "/tokens/deus.svg", symbol: "TestToken", address: "0x43922ea6ef5995e94680000ed9e20b68974cd902",id:"0", decimals: 18, chainId: 4 },
        { logo: "/tokens/dei.svg", symbol: "TestToken2", address: "0x63461Bc35341523b319c12a366A9E9af24Eea6Eb",id:"1", decimals: 18, chainId: 4 },
    ],
    [ChainId.BSC_TESTNET]: [
        { logo: "/tokens/deus.svg", symbol: "TestToken", address: "0x15633ea478d0272516b763c25e8e62a9e43ae28a",id:"0", decimals: 18, chainId: 97 },
        { logo: "/tokens/dei.svg", symbol: "TestToken2", address: "0x1c2a9D1F6284EC5f4424e7FC2f1dAD12822b4e32", id:"1",decimals: 18, chainId: 97 },
    ],
    [ChainId.MATIC]: [
        { logo: "/tokens/dei.svg", symbol: "DEI", address: DEI_ADDRESS[ChainId.MATIC], decimals: 18,id:"0",  chainId: ChainId.MATIC },
        { logo: "/tokens/deus.svg", symbol: "DEUS", address: DEUS_ADDRESS[ChainId.MATIC], decimals: 18, id:"1", chainId: ChainId.MATIC },
    ],
    [ChainId.ETH]: [
        { logo: "/tokens/dei.svg", symbol: "DEI", address: DEI_ADDRESS[ChainId.ETH], decimals: 18,id:"0",  chainId: ChainId.ETH },
        { logo: "/tokens/deus.svg", symbol: "DEUS", address: DEUS_ADDRESS[ChainId.ETH], decimals: 18, id:"1", chainId: ChainId.ETH },
    ],
}

export const isNative = (address, chainId) => {
    return address === "0x"
        || (chainId === 1 && address === "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
        || (chainId === 4 && address === "0xc778417E063141139Fce010982780140Aa0cD5Ab")
}
export const WethRinkeby = { logo: "/tokens/eth-logo.svg", symbol: "ETH", decimals: 18, address: "0xc778417E063141139Fce010982780140Aa0cD5Ab", chainId: 4 }
export const Weth = { logo: "/tokens/eth-logo.svg", symbol: "ETH", decimals: 18, address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", chainId: 1 }

export const MainTokens = [
    { logo: "/tokens/deus.svg", symbol: "DEUS", address: "0x3b62F3820e0B035cc4aD602dECe6d796BC325325", decimals: 18, chainId: 1 },
    { logo: "/tokens/dea.svg", symbol: "DEA", address: "0x80aB141F324C3d6F2b18b030f1C4E95d4d658778", decimals: 18, chainId: 1 },
    { logo: "/tokens/usdc.svg", symbol: "USDC", address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", decimals: 6, chainId: 1 },
    { logo: "/tokens/dai.png", symbol: "DAI", address: "0x6B175474E89094C44Da98b954EedeAC495271d0F", decimals: 18, chainId: 1 },
    { logo: "/tokens/wbtc.png", symbol: "wBTC", address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599", decimals: 8, chainId: 1 },
]

export const TestTokens = [
    { logo: "/tokens/deus.svg", symbol: "DEUS", address: "0xf025DB474fcF9bA30844e91A54bC4747d4FC7842", decimals: 18, chainId: 4 },
    { logo: "/tokens/dea.svg", symbol: "DEA", address: "0x02b7a1AF1e9c7364Dd92CdC3b09340Aea6403934", decimals: 18, chainId: 4 },
    { logo: "/tokens/usdc.svg", symbol: "USDC", address: "0x259F784f5b96B3f761b0f9B1d74F820C393ebd36", decimals: 6, chainId: 4 },
    { logo: "/tokens/dai.png", symbol: "DAI", address: "0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735", decimals: 18, chainId: 4 },
    { logo: "/tokens/wbtc.png", symbol: "wBTC", address: "0x577D296678535e4903D59A4C929B718e1D575e0A", decimals: 8, chainId: 4 },
    { logo: "/tokens/usdc.svg", symbol: "TEST", address: "0xb9b5ffc3e1404e3bb7352e656316d6c5ce6940a1", decimals: 18, chainId: 4 },
]

export const NativeTokens = [
    { logo: "/tokens/eth-logo.svg", symbol: "ETH", address: "0x", decimals: 18, }
]

export const DefaultTokens = [...NativeTokens, ...MainTokens, ...TestTokens]


export const MuonPreSaleTokens = [
    { logo: "/tokens/eth-logo.svg", symbol: "ETH", address: "0x", decimals: 18, chainId: 1 },
    { logo: "/tokens/bnb.svg", symbol: "BNB", address: "0x", decimals: 18, chainId: 56 },
    { logo: "/tokens/busd.svg", symbol: "BUSD", address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56", decimals: 18, chainId: 56 },
    { logo: "/tokens/xdai.svg", symbol: "xDAI", address: "0x", decimals: 18, chainId: 100 },
    { logo: "/tokens/usdc.svg", symbol: "USDC", address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", decimals: 6, chainId: 1 },
    { logo: "/tokens/dai.png", symbol: "DAI", address: "0x6B175474E89094C44Da98b954EedeAC495271d0F", decimals: 18, chainId: 1 },
    { logo: "/tokens/wbtc.png", symbol: "wBTC", address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599", decimals: 8, chainId: 1 },
]

export const DeusPath = {
    "deus": {
        "eth": true,
    },
    "eth": {
        "deus": true,
    },
}