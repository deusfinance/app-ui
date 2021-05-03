import { Token } from '../sdk/tokens';

export const xdaiToken = new Token(100, "0x0000000000000000000000000000000000000001", 18, "xDAI", "xDAI", "/tokens/xdai.svg");
export const wxdaiToken = new Token(100, "0xe91d153e0b41518a2ce8dd3d7944fa863463a97d", 18, "wxDAI", "wxDAI", "/tokens/xdai.svg");

export const busdToken = new Token(56, "0xe9e7cea3dedca5984780bafc599bd69add087d56", 18, "BUSD", "BUSD", "/tokens/busd.svg");

export const busdTestToken = new Token(97, "0x8301f2213c0eed49a7e28ae4c3e91722919b8b47", 18, "BUSD", "BUSD", "/tokens/busd.svg");
export const bnbTestToken = new Token(97, null, 18, "BNB", "BNB", "/tokens/busd.svg");
export const dgmeTestToken = new Token(97, "0xf923835cf23370a90784eb794f5b0098833015f1", 18, "dGME", "GameStop Corp. Long DEUS Sync V1", "/img/ticker/GME.png");
export const dAmcTestToken = new Token(56, "0xc36827ac37a92f6353125ce6c84fb625cc4bd202", 18, "dAMC", "AMC Entertainment Holdings Inc Long DEUS Synthetic V1", "/img/ticker/AMC.png");

export const isNative = (address, chainId) => {
    return address === "0x"
        || (chainId === 1 && address === "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
        || (chainId === 4 && address === "0xc778417E063141139Fce010982780140Aa0cD5Ab")

}
export const WethRinkeby = { logo: "/tokens/eth-logo.svg", symbol: "ETH", decimals: 18, address: "0xc778417E063141139Fce010982780140Aa0cD5Ab", chainId: 4 }
export const Weth = { logo: "/tokens/eth-logo.svg", symbol: "ETH", decimals: 18, address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", chainId: 1 }

export const DefaultTokens = [
    { logo: "/tokens/eth-logo.svg", symbol: "ETH", address: "0x", decimals: 18, },
    { logo: "/tokens/deus.svg", symbol: "DEUS", address: "0x3b62F3820e0B035cc4aD602dECe6d796BC325325", decimals: 18, chainId: 1 },
    { logo: "/tokens/deus.svg", symbol: "DEUS", address: "0xf025DB474fcF9bA30844e91A54bC4747d4FC7842", decimals: 18, chainId: 4 },
    { logo: "/tokens/dea.svg", symbol: "DEA", address: "0x80aB141F324C3d6F2b18b030f1C4E95d4d658778", decimals: 18, chainId: 1 },
    { logo: "/tokens/dea.svg", symbol: "DEA", address: "0x02b7a1AF1e9c7364Dd92CdC3b09340Aea6403934", decimals: 18, chainId: 4 },
    { logo: "/tokens/usdc.svg", symbol: "USDC", address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", decimals: 6, chainId: 1 },
    { logo: "/tokens/usdc.svg", symbol: "USDC", address: "0x259F784f5b96B3f761b0f9B1d74F820C393ebd36", decimals: 6, chainId: 4 },
    { logo: "/tokens/wbtc.png", symbol: "WBTC", address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599", decimals: 8, chainId: 1 },
    { logo: "/tokens/wbtc.png", symbol: "WBTC", address: "0x577D296678535e4903D59A4C929B718e1D575e0A", decimals: 8, chainId: 4 },
]

export const DeusPath = {
    "deus": {
        "eth": true,
        "bakkt": true,
        "coinbase": true
    },
    "dea": {
        "spcx": true,
    },
    "coinbase": {
        "deus": true,
    },
    "bakkt": {
        "deus": true,
    },
    "spcx": {
        "dea": true,
    },
    "eth": {
        "deus": true,
    },
}