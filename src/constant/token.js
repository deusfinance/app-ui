import { Token } from '../utils/classes';
import { DEI_ADDRESS, COLLATERAL_ADDRESS, DEI_DEUS_LP, DEI_COLLATERAL_LP, DEUS_ADDRESS } from './contracts';
import { ChainId } from './web3';

export const sdeaToken = new Token(1, "0xd8C33488B76D4a2C06D5cCB75574f10F6ccaC3D7", 18, "sDEA", "sDEA", "/tokens/sdea.svg");
export const muonToken = new Token(1, null, 18, "MUON", "MUON", "/tokens/muon.svg");
export const xdaiToken = new Token(100, "0x0000000000000000000000000000000000000001", 18, "xDAI", "xDAI", "/tokens/xdai.svg");

//START DEI
export const deiToken = {
    [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, DEI_ADDRESS[ChainId.RINKEBY], 18, "DEI", "DEI", "/tokens/dei.svg"),
    [ChainId.HECO]: new Token(ChainId.HECO, DEI_ADDRESS[ChainId.HECO], 18, "DEI", "DEI", "/tokens/dei.svg"),
    [ChainId.AVALANCHE]: new Token(ChainId.AVALANCHE, DEI_ADDRESS[ChainId.AVALANCHE], 18, "DEI", "DEI", "/tokens/dei.svg"),
    [ChainId.MATIC]: new Token(ChainId.MATIC, DEI_ADDRESS[ChainId.MATIC], 18, "DEI", "DEI", "/tokens/dei.svg"),
    [ChainId.ETH]: new Token(ChainId.ETH, DEI_ADDRESS[ChainId.ETH], 18, "DEI", "DEI", "/tokens/dei.svg"),
};

export const collateralToken = {
    [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, COLLATERAL_ADDRESS[ChainId.RINKEBY], 6, "USDC", "USDC", "/tokens/usdc.svg"),
    [ChainId.HECO]: new Token(ChainId.HECO, COLLATERAL_ADDRESS[ChainId.HECO], 8, "HUSD", "HUSD", "/tokens/husd.svg"),
    [ChainId.AVALANCHE]: new Token(ChainId.AVALANCHE, COLLATERAL_ADDRESS[ChainId.AVALANCHE], 18, "DAI", "DAI", "/tokens/dai.png"),
    [ChainId.MATIC]: new Token(ChainId.MATIC, COLLATERAL_ADDRESS[ChainId.MATIC], 6, "USDC", "USDC", "/tokens/usdc.svg"),
    [ChainId.ETH]: new Token(ChainId.ETH, COLLATERAL_ADDRESS[ChainId.ETH], 6, "USDC", "USDC", "/tokens/usdc.svg"),
}

export const deiCollateralLpToken = {
    [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, DEI_COLLATERAL_LP[ChainId.RINKEBY], 18, "DEI-USDC", "DEI-USDC", "/tokens/dei.svg"),
    [ChainId.HECO]: new Token(ChainId.HECO, DEI_COLLATERAL_LP[ChainId.HECO], 18, "DEI-HUSD", "DEI-HUSD", "/tokens/dei.svg"),
    [ChainId.AVALANCHE]: new Token(ChainId.AVALANCHE, DEI_COLLATERAL_LP[ChainId.AVALANCHE], 18, "DEI-DAI", "DEI-DAI", "/tokens/dei.svg"),
    [ChainId.MATIC]: new Token(ChainId.MATIC, DEI_COLLATERAL_LP[ChainId.MATIC], 18, "DEI-DEUS", "DEI-DEUS", "/tokens/dei.svg"),
    [ChainId.ETH]: new Token(ChainId.ETH, DEI_COLLATERAL_LP[ChainId.ETH], 18, "DEI-DEUS", "DEI-DEUS", "/tokens/dei.svg"),
}

export const deiDeusLpToken = {
    [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, DEI_DEUS_LP[ChainId.RINKEBY], 18, "DEI-DEUS", "DEI-DEUS", "/tokens/dei.svg"),
    [ChainId.HECO]: new Token(ChainId.HECO, DEI_DEUS_LP[ChainId.HECO], 18, "DEI-DEUS", "DEI-DEUS", "/tokens/dei.svg"),
    [ChainId.AVALANCHE]: new Token(ChainId.AVALANCHE, DEI_DEUS_LP[ChainId.AVALANCHE], 18, "DEI-DEUS", "DEI-DEUS", "/tokens/dei.svg"),
    [ChainId.MATIC]: new Token(ChainId.MATIC, DEI_DEUS_LP[ChainId.MATIC], 18, "DEI-DEUS", "DEI-DEUS", "/tokens/dei.svg"),
    [ChainId.ETH]: new Token(ChainId.ETH, DEI_DEUS_LP[ChainId.ETH], 18, "DEI-DEUS", "DEI-DEUS", "/tokens/dei.svg"),
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
    [ChainId.AVALANCHE]: [
        { logo: "/tokens/dai.png", symbol: "DAI", address: COLLATERAL_ADDRESS[ChainId.AVALANCHE], decimals: 18, chainId: ChainId.AVALANCHE },
        { logo: "/tokens/deus.svg", symbol: "DEUS", address: DEUS_ADDRESS[ChainId.AVALANCHE], decimals: 18, chainId: ChainId.AVALANCHE },
        { logo: "/tokens/dai.png", symbol: "DAI", address: COLLATERAL_ADDRESS[ChainId.AVALANCHE], decimals: 18, chainId: ChainId.AVALANCHE, pairID: 1 },
        { logo: "/tokens/deus.svg", symbol: "DEUS", address: DEUS_ADDRESS[ChainId.AVALANCHE], decimals: 18, chainId: ChainId.AVALANCHE, pairID: 1 },
        { logo: "/tokens/usdt.png", symbol: "USDT", address: "0xc7198437980c041c805A1EDcbA50c1Ce5db95118", decimals: 6, chainId: ChainId.AVALANCHE },
        { logo: "/tokens/avax.png", symbol: "AVAX", address: "0x", decimals: 18, chainId: ChainId.AVALANCHE },
    ],
    [ChainId.HECO]: [
        { logo: "/tokens/husd.svg", symbol: "HUSD", address: "0x7a5a3819EcB1E481D656dAbE4a489644FBcb5844", decimals: 8, chainId: ChainId.HECO },
        { logo: "/tokens/deus.svg", symbol: "DEUS", address: "0x86eD67215aE62a849B5f0c900A7Ed8B9e94945B9", decimals: 18, chainId: ChainId.HECO },
        { logo: "/tokens/husd.svg", symbol: "HUSD", address: "0x7a5a3819EcB1E481D656dAbE4a489644FBcb5844", decimals: 8, chainId: ChainId.HECO, pairID: 1 },
        { logo: "/tokens/deus.svg", symbol: "DEUS", address: "0x86eD67215aE62a849B5f0c900A7Ed8B9e94945B9", decimals: 18, chainId: ChainId.HECO, pairID: 1 },
        { logo: "/tokens/ht.png", symbol: "HT", address: "0x", decimals: 18, chainId: ChainId.HECO },
        { logo: "/tokens/usdt.png", symbol: "USDT", address: "0xa71edc38d189767582c38a3145b5873052c3e47a", decimals: 6, chainId: ChainId.HECO },
    ],
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
    ],
}
//END DEI

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

export const SealedTokens = [
    { logo: "/tokens/suni2.svg", symbol: "sUniDD", address: "0x2EdE9CB92a6dE0916889E5936B1aAd0e99ddf242", decimals: 18, chainId: 1 },
    { logo: "/tokens/suni2.svg", symbol: "sUniDU", address: "0xB7b52c3523Af9c237817a49D17E656283cC59678", decimals: 18, chainId: 1 },
    { logo: "/tokens/suni2.svg", symbol: "sUniDE", address: "0x670431fCdAf39280deE488C6D8277B9865E22d08", decimals: 18, chainId: 1 },
    { logo: "/tokens/bpt.svg", symbol: "BPT", address: "0x1Dc2948B6dB34E38291090B825518C1E8346938B", decimals: 18, chainId: 1 },
    { logo: "/tokens/usdc.svg", symbol: "ERT", address: "0x4Ef4E0b448AC75b7285c334e215d384E7227A2E6", decimals: 18, chainId: 97 },
]

export const MuonPreSaleTokens = [
    { logo: "/tokens/eth-logo.svg", symbol: "ETH", address: "0x", decimals: 18, chainId: 1 },
    { logo: "/tokens/bnb.svg", symbol: "BNB", address: "0x", decimals: 18, chainId: 56 },
    { logo: "/tokens/busd.svg", symbol: "BUSD", address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56", decimals: 18, chainId: 56 },
    { logo: "/tokens/xdai.svg", symbol: "xDAI", address: "0x", decimals: 18, chainId: 100 },
    ...MainTokens,
    sdeaToken,
    { logo: "/tokens/sdea.svg", symbol: "sDEUS", address: "0xc586AeA83A96d57764A431B9F4e2E84844075a01", decimals: 18, chainId: 1 },
    ...SealedTokens,
]

export const DeusPath = {
    "deus": {
        "eth": true,
    },
    "eth": {
        "deus": true,
    },
}