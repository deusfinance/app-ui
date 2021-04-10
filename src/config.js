export const contractEndpoint = "https://etherscan.io/address"
export const dappLinkMetamask = "https://metamask.app.link/dapp/deus.finance/"
export const dappLinkTrustWallet = "https://metamask.app.link/dapp/deus.finance/"

export const deusChains = {
    1: "Main",
    4: "Rinkbey",
    100: "xDAI",
    56: "BSC",
    97: "BSC-Test"
}

export const getCorrectChainId = (str) => {
    const arr = Object.entries(deusChains)

    for (let i = 0; i < arr.length; i++) {
        if (str.includes('/' + arr[i][1].toLowerCase() + '/')) {
            return Number(arr[i][0])
        }
    }
    return 1 //mainnet
}


export const TokenType = {
    Time: "time",
    Sand: "sand",
    Liquidity: "liquidity",
    Wrapped: "wrapped",
    Main: "main",
}

export const AddressChainMap = {
    1: {
        "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2": "eth",
        "0x3b62F3820e0B035cc4aD602dECe6d796BC325325": "deus",
        "0x80aB141F324C3d6F2b18b030f1C4E95d4d658778": "dea",
        "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48": "usdc",
        "0xdAC17F958D2ee523a2206206994597C13D831ec7": "usdt",
        "0x6B175474E89094C44Da98b954EedeAC495271d0F": "dai",
        "0x4185cf99745B2a20727B37EE798193DD4a56cDfa": "coinbase",
        "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599": "wbtc",
        "0x11Aa73194769882521e4576D245ffacd4E98aCB4": "bakkt",
        "0xf38eb2d5420583b69cAE3E0E92d95C842c0186A2": "spcx",
    },
    4: {
        "0xc778417E063141139Fce010982780140Aa0cD5Ab": "eth",
        "0x1424740D7Ba7f711cB194B8620E9cA417Ac54628": "deus",
        "0x71214d52b5205542f8a975e72a760cab73b725c4": "dea",
        "0x259F784f5b96B3f761b0f9B1d74F820C393ebd36": "usdc",
        "0xdAC17F958D2ee523a2206206994597C13D831ec7": "usdt",
        "0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735": "dai",
        "0xFD104902617231e053049044E3e51C1D37fE12D3": "coinbase",
        "0x577D296678535e4903D59A4C929B718e1D575e0A": "wbtc",
        "0xE18cf55EC4e40cb3E4dD57c9150ceb9682c25329": "bakkt",
        "0x20cff2e97ecfe8f95534edf5315036e40ca3d9ef": "spcx",
    },
}

export const AllTokens = {
    "timetoken": {
        name: "timetoken",
        title: "Time",
        type: TokenType.Time,
        innerLink: true,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        provideLink: "/vaults",
    },
    "coinbase": {
        name: "coinbase",
        title: "Coinbase",
        type: TokenType.Main,
        innerLink: true,
        provideLink: "/swap",
        pic_name: "coinbase.svg",
        isFutures: true
    },
    "bakkt": {
        name: "bakkt",
        title: "Bakkt",
        type: TokenType.Main,
        innerLink: true,
        provideLink: "/swap",
        pic_name: "bakkt.svg",
        isBakkt: true
    },
    "spcx": {
        name: "spcx",
        title: "SPCx",
        type: TokenType.Main,
        innerLink: true,
        provideLink: "/swap",
        pic_name: "spcx.svg",
        isFutures: true
    },
    "deus": {
        name: "deus",
        title: "DEUS",
        type: TokenType.Main,
        innerLink: true,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        provideLink: "/swap",
        pic_name: "deus.svg",

    },
    "dea": {
        name: "dea",
        title: "DEA",
        type: TokenType.Main,
        innerLink: true,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        provideLink: "/swap",
        pic_name: "dea.svg",
    },
    "usdc": {
        name: "usdc",
        title: "USDC",
        type: TokenType.Main,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        innerLink: true,
        provideLink: "/swap",
        pic_name: "usdc.svg"
    },
    "usdt": {
        name: "usdt",
        title: "USDT",
        type: TokenType.Main,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        innerLink: true,
        provideLink: "/swap",
        pic_name: "usdt.png"
    },
    "eth": {
        name: "eth",
        title: "ETH",
        type: TokenType.Main,
        innerLink: true,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        provideLink: "/swap",
        pic_name: "eth-logo.svg",
        allowances: 999
    },
    "wbtc": {
        name: "wbtc",
        title: "WBTC",
        type: TokenType.Main,
        innerLink: true,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        provideLink: "/swap",
        pic_name: "wbtc.png"

    },
    "dai": {
        name: "dai",
        title: "DAI",
        type: TokenType.Main,
        innerLink: true,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        provideLink: "/swap",
        pic_name: "dai.png",

    },
    "uni": {
        name: "uni",
        title: "UNI",
        type: TokenType.Main,
        innerLink: false,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        provideLink: "/swap",
    },
    "snx": {
        name: "snx",
        title: "SNX",
        type: TokenType.Main,
        innerLink: false,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        provideLink: "/swap",
    },
    "ampl_eth": {
        name: "ampl_eth",
        title: "AMPL-ETH",
        type: TokenType.Main,
        innerLink: false,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        provideLink: "/swap",
    },
    "deus_dea": {
        name: "deus_dea",
        title: "UNI-LP-DEUS-DEA",
        type: TokenType.Liquidity,
        coin: "UNI-V2-DEUS/DEA",
        innerLink: false,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        provideLink: "https://app.uniswap.org/#/add/0x3b62F3820e0B035cc4aD602dECe6d796BC325325/0x80aB141F324C3d6F2b18b030f1C4E95d4d658778",
    },
    "dea_usdc": {
        name: "dea_usdc",
        title: "UNI-LP-DEA-USDC",
        type: TokenType.Liquidity,
        coin: "UNI-V2-DEA-USDC",
        innerLink: false,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        provideLink: "/swap",
    },
    "deus_eth": {
        name: "deus_eth",
        title: "UNI-LP-DEUS-ETH",
        type: TokenType.Liquidity,
        innerLink: false,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        provideLink: "https://app.uniswap.org/#/add/0x3b62f3820e0b035cc4ad602dece6d796bc325325/ETH",
    },
    "coinbase_usdc": {
        name: "coinbase_usdc",
        title: "UNI-LP-coinbase-USDC",
        type: TokenType.Liquidity,
        innerLink: false,
        stakingLink: "0x68Bcf35cC47e6c281BD44c6e8B3Ff65327fcdeD3",
        provideLink: "https://app.uniswap.org/#/add/0x4185cf99745b2a20727b37ee798193dd4a56cdfa/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",

    },
    "uni_lp_dea_usdc": {
        name: "uni_lp_dea_usdc",
        title: "UNI-LP-DEUS-DEA",
        type: TokenType.Liquidity,
        innerLink: false,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        provideLink: "/swap",
    },
    "uni_lp_deus_dea": {
        name: "uni_lp_deus_dea",
        title: "UNI-LP-DEUS-DEA",
        type: TokenType.Liquidity,
        innerLink: false,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        provideLink: "/swap",
    },
    "sand_dea_usdc": {
        name: "sand_dea_usdc",
        title: "sUNI-LP-DEA-USDC",
        type: TokenType.Sand,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        innerLink: true,
        provideLink: "/vaults",
    },
    "sand_deus_dea": {
        name: "sand_deus_dea",
        title: "sUNI-LP-DEUS-DEA",
        type: TokenType.Sand,
        innerLink: true,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        provideLink: "/vaults",
    },
    "sand_deus_eth": {
        name: "sand_deus_eth",
        title: "sUNI-LP-DEUS-ETH",
        type: TokenType.Sand,
        innerLink: true,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        provideLink: "/vaults",
    },
    "sand_dai": {
        name: "sand_dai",
        title: "sDAI",
        type: TokenType.Sand,
        innerLink: true,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        provideLink: "/vaults",
    },
    "sand_deus": {
        name: "sand_deus",
        title: "sDEUS",
        type: TokenType.Sand,
        innerLink: true,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        provideLink: "/vaults",
        apy: 250
    },
    "sand_eth": {
        name: "sand_eth",
        title: "sETH",
        type: TokenType.Sand,
        innerLink: true,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        provideLink: "/vaults",
    },
    "sand_dea": {
        name: "sand_dea",
        title: "sDEA",
        type: TokenType.Sand,
        innerLink: true,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        provideLink: "/vaults",
        apy: 490

    },
    "sand_wbtc": {
        name: "sand_wbtc",
        title: "sWBTC",
        type: TokenType.Sand,
        innerLink: true,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        provideLink: "/vaults",
    },
    "bpt_native": {
        name: "bpt_native",
        title: "Native Balancer",
        coin: "BPT",
        type: TokenType.Liquidity,
        inner_link: false,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        liqLink: "https://balancer.com",

    },
    "bpt_legacy": {
        name: "bpt_legacy",
        title: "Legacy Balancer",
        coin: "BPT",
        type: TokenType.Liquidity,
        inner_link: false,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        liqLink: "https://balancer.com",
    },
}

export const vaultsStaking = {
    deus_dea: {
        name: "deus_dea",
        title: "UNI-LP-DEUS-DEA",
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
    },
    deus_eth: {
        name: "deus_eth",
        title: "UNI-LP-DEUS-ETH",
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
    },
    dea_usdc: {
        name: "dea_usdc",
        title: "UNI-LP-DEA-USDC",
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
    },
    deus: {
        name: "deus",
        title: "DEUS",
        stakingLink: "0x09cb978bb7e6fb5583fc9107f92214451f6296a5",
    },
    dea: {
        name: "dea",
        title: "DEA",
        stakingLink: "0x6ba4ead0115f3c9239d596fe4bb7c242a39f62f0",
    },
    dai: {
        name: "dai",
        title: "DAI",

    },
    eth: {
        name: "eth",
        title: "ETH",
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
    },
    wbtc: {
        name: "wbtc",
        title: "WBTC",
    },
}

export const AllStakings = {

    "sand_uni_lp_deus_dea": {
        name: "s_uni_lp_deus_dea",
        title: "s_uni_lp_deus_dea",
        innerLink: true,
        provideLink: "/vaults",
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        isClose: true,

    },
    "sand_uni_lp_dea_usdc": {
        name: "s_uni_lp_dea_usdc",
        title: "s_uni_lp_dea_usdc",
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        isClose: true,

        innerLink: true,
        provideLink: "/vaults",
    },
    "sand_dai": {
        name: "sand_dai",
        title: "sDAI",
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        innerLink: true,
        provideLink: "/vaults",
    },
    "sand_deus": {
        name: "sand_deus",
        title: "sDEUS",
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        innerLink: true,
        provideLink: "/vaults",
    },
    "sand_eth": {
        name: "sand_eth",
        title: "sETH",
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        innerLink: true,
        provideLink: "/vaults",
    },
    "sand_dea": {
        name: "sand_dea",
        title: "sDEA",
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        innerLink: true,
        provideLink: "/vaults",

    },
    "sand_wbtc": {
        name: "sand_wbtc",
        title: "sWBTC",
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",

        innerLink: true,
        provideLink: "/vaults",
    },
    "timetoken": {
        name: "timetoken",
        title: "TimeToken",
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        // isClose: true,
        innerLink: true,
        provideLink: "/vaults",
    },
    bpt_native: {
        name: "bpt_native",
        title: "Native Balancer",
        inner_link: false,
        liqLink: "https://pools.balancer.exchange/#/pool/0x1dc2948b6db34e38291090b825518c1e8346938b/",
        balancer: true,
        info: "DEA (not sealed)    38.78%\n\nsUNI DEUS-DEA       38.78%\nsDEA                7.14% \nsDEUS               7.14% \nsUNI DEA-USDC       4.08% \n sUNI DEUS-ETH       4.08%  ",

    },
    bpt_legacy: {
        name: "bpt_legacy",
        title: "Legacy Balancer",
        inner_link: false,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        liqLink: "https://balancer.com",
        own_pool: 0,
        balancer: true,
        info: "25% DEA\n25% sWBTC\n25% sETH\n25% sDAI",
        claimable_amount: 0,
        deposited: 0,
    },
    dea_usdc: {
        name: "dea_usdc",
        title: "DEA-USDC",
        claimable_unit: "DEA",
        coin_name: "UNI-V2-DEA-USDC",
        stakingLink: "0x2e3394d3CdcbaAF2bb85Fe9aB4c79CeF4d28b216",
        liqLink: "https://app.uniswap.org/#/add/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/0x80aB141F324C3d6F2b18b030f1C4E95d4d658778",
        isClose: true,

    },
    coinbase_usdc: {
        name: "coinbase_usdc",
        title: "COINBASE-USDC",
        claimable_unit: "DEA",
        coin_name: "UNI-LP-coinbase-USDC",
        stakingLink: "0x68Bcf35cC47e6c281BD44c6e8B3Ff65327fcdeD3",
        liqLink: "https://app.uniswap.org/#/add/0x4185cf99745b2a20727b37ee798193dd4a56cdfa/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        isClose: true,

    },
    deus_eth: {
        name: "deus_eth",
        title: "DEUS-ETH",
        claimable_unit: "DEA",
        coin_name: "UNI-V2-DEUS/ETH",
        stakingLink: "0x19945547eC934bBD8C48fA69bC78152C468CCA7a",
        liqLink: "https://app.uniswap.org/#/add/0x3b62f3820e0b035cc4ad602dece6d796bc325325/ETH",
        isClose: true,

    },
    deus: {
        name: "deus",
        title: "DEUS",
        claimable_unit: "DEA",
        isDeusLink: true,
        innerLink: true,
        coin_name: "DEUS",
        provideLink: "/swap",
        isClose: true,

    },
    dea: {
        name: "dea",
        title: "DEA",
        claimable_unit: "DEA",
        isDeusLink: true,
        innerLink: true,
        coin_name: "DEA",
        provideLink: "/swap",
        isClose: true,

    },
    deus_dea: {
        name: "deus_dea",
        title: "DEUS-DEA",
        claimable_unit: "DEA",
        isDeusLink: true,
        liqLink: "https://app.uniswap.org/#/add/0x3b62F3820e0B035cc4aD602dECe6d796BC325325/0x80aB141F324C3d6F2b18b030f1C4E95d4d658778",
        isClose: true,

    },
    ampl_eth: {
        name: "ampl_eth",
        title: "AMPL-ETH",
        claimable_unit: "DEA",
        coin_name: "UNI-V2-AMPL-ETH",
        stakingLink: "0xa3bE45e9F6c42e06231618cf45be1AB9625A591f",
        liqLink: "https://app.uniswap.org/#/add/ETH/0xd46ba6d942050d489dbd938a2c909a5d5039a161",
        isClose: true,
    },
    snx: {
        name: "snx",
        title: "SNX",
        claimable_unit: "DEA",
        coin_name: "SNX",
        stakingLink: "0x1B043BbB372452d71503E6603Dd33b93271Bfec0",
        liqLink: "https://app.uniswap.org/#/swap?outputCurrency=0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f",
        isClose: true,
    },
    uni: {
        name: "uni",
        title: "UNI",
        claimable_unit: "DEA",
        coin_name: "UNI",
        stakingLink: "0x8cd408279e966b7e7e1f0b9e5ed8191959d11a19",
        liqLink: "https://app.uniswap.org/#/swap?outputCurrency=0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
        isClose: true,
    },
}


