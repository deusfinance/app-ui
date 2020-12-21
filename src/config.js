

export const contractEndpoint = "https://rinkeby.etherscan.io/address"
export const dappLink = "https://metamask.app.link/dapp/demo.deus.finance/"
export const navbarItems = [
    {
        id: "app",
        text: "APP",
        path: "/",
        exact: true,
        children: [
            {
                id: "swap",
                text: "SWAP",
                path: "/swap",
                exact: true,

            },
            {
                id: "coinbase",
                text: "CoinBase",
                path: "/coinbase",
                exact: true,

            },

            // {
            //     id: "conductr",
            //     text: "CONDUCTR",
            //     path: "/conductr",
            //     exact: false,
            // },
            {
                id: "staking",
                text: "STAKING",
                path: "/staking",
                exact: false,
            },

            // {
            //     id: "vaults",
            //     text: "VAULTS",
            //     path: "/vaults",
            //     exact: true,

            // },
        ]
    },
    {
        id: "learn",
        text: "LEARN",
        path: "/learn",
        exact: true,
        children: [
            {
                id: "wiki",
                text: "DEUS wiki",
                path: "https://wiki.deus.finance",
                out: true,
                exact: true,

            },
            {
                id: "litepaper",
                text: "LITEPAPER",
                path: "https://deus.finance/litepaper.pdf",
                out: true,
                exact: true,

            },
        ]
    },
]


export const TokenType = {
    Time: "time",
    Sand: "sand",
    Liquidity: "liquidity",
    Wrapped: "wrapped",
    Main: "main",
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
        type: TokenType.Wrapped,
        innerLink: true,
        provideLink: "/swap",
        pic_name: "coinbase.svg",
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
        innerLink: false,
        provideLink: "/swap",
        pic_name: "usdc.svg"
    },
    "eth": {
        name: "eth",
        title: "ETH",
        type: TokenType.Main,
        innerLink: false,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        provideLink: "/swap",
        pic_name: "eth-logo.svg",
        allowances: 999
    },
    "wbtc": {
        name: "wbtc",
        title: "WBTC",
        type: TokenType.Main,
        innerLink: false,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        provideLink: "/swap",
    },
    "dai": {
        name: "dai",
        title: "DAI",
        type: TokenType.Main,
        innerLink: false,
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
    "dea_deus": {
        name: "dea_deus",
        title: "DEA-DEUS",
        type: TokenType.Main,
        innerLink: false,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        provideLink: "/swap",
    },
    "dea_usdc": {
        name: "dea_usdc",
        title: "DEA-USDC",
        type: TokenType.Main,
        innerLink: false,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        provideLink: "/swap",
    },
    "deus_eth": {
        name: "deus_eth",
        title: "DEUS-ETH",
        type: TokenType.Main,
        innerLink: false,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        provideLink: "/swap",
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
    "sand_uni_lp_dea_usdc": {
        name: "uni_lp_dea_usdc",
        title: "sUNI-LP-DEUS-DEA",
        type: TokenType.Sand,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        innerLink: true,
        provideLink: "/vaults",
    },
    "sand_uni_lp_deus_dea": {
        name: "uni_lp_deus_dea",
        title: "sUNI_LP_DEUS-DEA",
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
    uni_lp_deus_dea: {
        name: "uni_lp_deus_dea",
        title: "UNI-LP-DEUS-DEA",
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",

    },
    uni_lp_dea_usdc: {
        name: "uni_lp_dea_usdc",
        title: "UNI-LP-DEA-USDC",
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        // locked: 25,
        // own: 25
    },
    deus: {
        name: "deus",
        title: "DEUS",
        stakingLink: "0x09cb978bb7e6fb5583fc9107f92214451f6296a5",
        estimation: 250

    },
    dea: {
        name: "dea",
        title: "DEA",
        stakingLink: "0x6ba4ead0115f3c9239d596fe4bb7c242a39f62f0",
        estimation: 250

    },
    dai: {
        name: "dai",
        title: "DAI",
        stakingLink: "0xb9846a53d478b2bf54c4b6531708376ba192fbf8",
        estimation: 250

    },
    eth: {
        name: "eth",
        title: "ETH",
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",

    },

    wbtc: {
        name: "wbtc",
        title: "WBTC",
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
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
        isClose: true,

        innerLink: true,
        provideLink: "/vaults",
        onlyMain: true,
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
        isClose: true,

        innerLink: true,
        provideLink: "/vaults",
        onlyMain: true,
    },
    "timetoken": {
        name: "timetoken",
        title: "TimeToken",
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        isClose: true,

        innerLink: true,
        provideLink: "/vaults",
        onlyMain: true,

    },
    bpt_native: {
        name: "bpt_native",
        title: "Native Balancer",
        inner_link: false,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        liqLink: "https://balancer.com",
        balancer: true,
        claimable_amount: 0,
        apy: 126,
        own_pool: 30,
        isClose: true,
        onlyMain: true,
        info: "50% DEA\n25% sUNI-LP-DEUS-DEA\n7.5% sDEUS\n7.5% sDEA\n10% sUNI-LP-DEA-USDC",
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
        apy: 178,
        claimable_amount: 0,
        isClose: true,
        deposited: 0,
        onlyMain: true
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
    deus_eth: {
        name: "deus_eth",
        title: "DEUS-ETH",
        claimable_unit: "DEA",
        coin_name: "UNI-V2-DEUS/ETH",
        stakingLink: "0x19945547eC934bBD8C48fA69bC78152C468CCA7a",
        liqLink: "https://app.uniswap.org/#/add/ETH/0x3b62F3820e0B035cc4aD602dECe6d796BC325325",
        isClose: true,

    },
    deus: {
        name: "deus",
        title: "DEUS",
        claimable_unit: "DEA",
        isDeusLink: true,
        coin_name: "DEUS",
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        liqLink: "/swap",
        isClose: true,
    },
    dea: {
        name: "dea",
        title: "DEA",
        claimable_unit: "DEA",
        isDeusLink: true,
        coin_name: "DEUS",
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        liqLink: "/swap",
        isClose: true,
    },
    deus_dea: {
        name: "deus_dea",
        title: "DEUS-DEA",
        claimable_unit: "DEA",
        isDeusLink: true,
        coin_name: "DEUS",
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        liqLink: "/swap",
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
        claimable_unit: "DEA",
        coin_name: "UNI",
        stakingLink: "0x8cd408279e966b7e7e1f0b9e5ed8191959d11a19",
        liqLink: "https://app.uniswap.org/#/swap?outputCurrency=0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
        isClose: true,
    },
}
