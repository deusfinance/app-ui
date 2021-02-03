
export class Token {
    constructor(symbol, name, decimal, address, chain, logo = "default.png", provider = null) {
        this.symbol = symbol
        this.name = name
        this.decimal = decimal
        this.address = address
        this.logo = logo
        this.chain = chain
        this.provider = provider
    }
}

export const tokens = [
    new Token("deus", "DEUS", 18, "0x3b62F3820e0B035cc4aD602dECe6d796BC325325", 1, "deus.svg", "/swap"),
    new Token("deus", "DEUS", 18, "0x1424740D7Ba7f711cB194B8620E9cA417Ac54628", 4, "deus.svg", "/swap"),

    new Token("dea", "DEA", 18, "0x80aB141F324C3d6F2b18b030f1C4E95d4d658778", 1, "dea.svg", "/swap"),
    new Token("dea", "DEA", 18, "0x02b7a1AF1e9c7364Dd92CdC3b09340Aea6403934", 4, "dea.svg", "/swap"),

    new Token("timetoken", "TIMETOKEN", 18, "0x23459b0026Ed1cAE0b6da5E9364aCec07469Ffcd", 1, "default.svg", "/vaults"),
    new Token("timetoken", "TIMETOKEN", 18, "0x886f8586e1fbdc805e36fa3c871ae9e573db7a7f", 4, "default.svg", "/vaults"),

    new Token("usdc", "USDC", 18, "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", 1, "usdc.svg", "/swap"),
    new Token("usdc", "USDC", 18, "0x259F784f5b96B3f761b0f9B1d74F820C393ebd36", 4, "usdc.svg", "/swap"),

    new Token("usdt", "USDT", 18, "0xdAC17F958D2ee523a2206206994597C13D831ec7", 1, "usdt.svg", "/swap"),
    new Token("usdt", "USDT", 18, "0xA0953584886d983333D8Ca9844D0372F0c6F850D", 4, "usdt.svg", "/swap"),

    new Token("weth", "WETH", 18, "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", 1),
    new Token("weth", "WETH", 18, "0xc778417E063141139Fce010982780140Aa0cD5Ab", 4),

    new Token("eth", "ETH", 18, "0x0000000000000000000000000000000000000000", 1, "eth.svg", "/swap"),
    new Token("eth", "ETH", 18, "0x0000000000000000000000000000000000000000", 4, "eth.svg", "/swap"),

    new Token("wbtc", "WBTC", 18, "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599", 1, "usdt.svg", "/swap"),
    new Token("wbtc", "WBTC", 18, "0x577D296678535e4903D59A4C929B718e1D575e0A", 4, "usdt.svg", "/swap"),

    new Token("coinbase", "COINBASE", 18, "0x4185cf99745B2a20727B37EE798193DD4a56cDfa", 1, "usdt.svg", "/coinbase"),
    new Token("coinbase", "COINBASE", 18, "0xFD104902617231e053049044E3e51C1D37fE12D3", 4, "usdt.svg", "/coinbase"),

    new Token("bakkt", "BAKKT", 18, "0x11Aa73194769882521e4576D245ffacd4E98aCB4", 1, "bakkt.svg", "/bakkt"),
    new Token("bakkt", "BAKKT", 18, "0xE18cf55EC4e40cb3E4dD57c9150ceb9682c25329", 4, "bakkt.svg", "/bakkt"),

    new Token("dai", "DAI", 18, "0x6B175474E89094C44Da98b954EedeAC495271d0F", 1, "dai.svg", "/swap"),
    new Token("dai", "DAI", 18, "0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735", 4, "dai.svg", "/swap"),

    new Token("deus_dea", "deus_dea", 18, "0x92Adab6d8dc13Dbd9052b291CFC1D07888299D65", 1),
    new Token("deus_dea", "deus_dea", 18, "0x0000000000000000000000000000000000000000", 4),

    new Token("deus_eth", "deus_dea", 18, "0x4d9824fbc04EFf50AB1Dac614eaE4e20859D5c91", 1, "https://app.uniswap.org/#/add/0x3b62F3820e0B035cc4aD602dECe6d796BC325325/0x80aB141F324C3d6F2b18b030f1C4E95d4d658778"),
    new Token("deus_eth", "deus_dea", 18, "0x3c2D80d0EdAa124287e62a78740AC9dcf2F67a00", 4, "https://app.uniswap.org/#/add/0x3b62F3820e0B035cc4aD602dECe6d796BC325325/0x80aB141F324C3d6F2b18b030f1C4E95d4d658778"),

    new Token("dea_usdc", "dea_usdc", 18, "0x83973dcaa04A6786ecC0628cc494a089c1AEe947", 1, "https://app.uniswap.org/#/add/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/0x80aB141F324C3d6F2b18b030f1C4E95d4d658778"),
    new Token("dea_usdc", "dea_usdc", 18, "0x0000000000000000000000000000000000000000", 4, "https://app.uniswap.org/#/add/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/0x80aB141F324C3d6F2b18b030f1C4E95d4d658778"),

    new Token("ampl_eth", "ampl_eth", 18, "0xc5be99A02C6857f9Eac67BbCE58DF5572498F40c", 1),
    new Token("ampl_eth", "ampl_eth", 18, "0x0000000000000000000000000000000000000000", 4),

    new Token("coinbase_usdc", "coinbase_usdc", 18, "0x536a6b4b59e268c14f3dc0846f7966eee52e93c0", 1),
    new Token("coinbase_usdc", "coinbase_usdc", 18, "0x0000000000000000000000000000000000000000", 4),

    new Token("uni", "uni", 18, "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984", 1),
    new Token("uni", "uni", 18, "0x0000000000000000000000000000000000000000", 4),

    new Token("snx", "SNX", 18, "0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f", 1),
    new Token("snx", "SNX", 18, "0x0000000000000000000000000000000000000000", 4),

    new Token("sand_dea_usdc", "sand_dea_usdc", 18, "0xB7b52c3523Af9c237817a49D17E656283cC59678", 1, "/vaults"),
    new Token("sand_dea_usdc", "sand_dea_usdc", 18, "0xb91e3e0c16080a0df0b1e9f54f9467210383e45e", 4, "/vaults"),

    new Token("sand_deus_dea", "sand_deus_dea", 18, "0x2EdE9CB92a6dE0916889E5936B1aAd0e99ddf242", 1, "/vaults"),
    new Token("sand_deus_dea", "sand_deus_dea", 18, "0xb91e3e0c16080a0df0b1e9f54f9467210383e45e", 4, "/vaults"),

    new Token("sand_deus_eth", "sand_deus_eth", 18, "0x670431fCdAf39280deE488C6D8277B9865E22d08", 1, "/vaults"),
    new Token("sand_deus_eth", "sand_deus_eth", 18, "0xb91e3e0c16080a0df0b1e9f54f9467210383e45e", 4, "/vaults"),

    new Token("sand_dai", "sand_dai", 18, "0x9820c6CF24Ce2b7A0Fb1B7A4C5cCb9F9d8d27d0e", 1, "/vaults"),
    new Token("sand_dai", "sand_dai", 18, "0x760b6A8453B3154D22eDC9b0CC8DfF90C2ba01be", 4, "/vaults"),

    new Token("sand_deus", "sand_deus", 18, "0xc586AeA83A96d57764A431B9F4e2E84844075a01", 1, "/vaults"),
    new Token("sand_deus", "sand_deus", 18, "0xea59b13b2b383ec23029f659efd22469b6f42b04", 4, "/vaults"),

    new Token("sand_eth", "sand_eth", 18, "0xfada114F1DfD6196c0963b4252B89Dc7Ff68eD5D", 1, "/vaults"),
    new Token("sand_eth", "sand_eth", 18, "0x1b5d651e0c8ce0327d40977d2850ac4b3331dc81", 4, "/vaults"),

    new Token("sand_dea", "sand_dea", 18, "0xd8C33488B76D4a2C06D5cCB75574f10F6ccaC3D7", 1, "/vaults"),
    new Token("sand_dea", "sand_dea", 18, "0x131ce6d543607786dd45182c0eddf58ad239c660", 4, "/vaults"),

    new Token("sand_wbtc", "sand_wbtc", 18, "0x76c8bC36D485A56b8905cAF5b00B6bfE0BD19658", 1, "/vaults"),
    new Token("sand_wbtc", "sand_wbtc", 18, "0x4b07Bf406ACb164F7E07Df5C0BbD9bAC587Cf87F", 4, "/vaults"),

    new Token("bpt_native", "bpt_native", 18, "0x1Dc2948B6dB34E38291090B825518C1E8346938B", 1, "https://pools.balancer.exchange/#/pool/0x1dc2948b6db34e38291090b825518c1e8346938b/"),
    new Token("bpt_native", "bpt_native", 18, "0x0000000000000000000000000000000000000000", 4, "https://pools.balancer.exchange/#/pool/0x1dc2948b6db34e38291090b825518c1e8346938b/"),

    new Token("bpt_legacy", "bpt_legacy", 18, "0x0000000000000000000000000000000000000000", 1),
    new Token("bpt_legacy", "bpt_legacy", 18, "0x0000000000000000000000000000000000000000", 4),
]


// export const getAllToken = () => {
//     const { chainId, account } = useWeb3React()

//     return useMemo(() => {
//         const chain = chainId ? chainId : 1
//         _.filter(tokens, { chain: chain }).reduce(tokens, function (obj, token) {
//             obj[token.name] = token
//         })

//     }, [chainId, account])

// }
