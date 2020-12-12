export const ClaimableDuration = 20
export const UpdateDuration = 20
export const FixedRatio = 0.07936428253968254
export const contractEndpoint = "https://etherscan.io/address"
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
            //     id: "nstaking",
            //     text: "NEW STAKING",
            //     path: "/new-staking",
            //     exact: true,
            // },
            {
                id: "vaults",
                text: "VAULTS",
                path: "/vaults",
                exact: true,

            },
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

export const swapTokensList = [
    { name: "DEA", pic_name: "dea", balance: "-", allowances: 0 },
    { name: "DEUS", pic_name: "deus", balance: "-", allowances: 0 },
    // { name: "USDC", pic_name: "usdc", price: 1.05, balance: 436.23, allowances: 0 },
    { name: "ETH", pic_name: "eth-logo", balance: "-", allowances: 10 },
]





export const TokenType = {
    Time: "time",
    Sand: "sand",
    Liquidity: "liquidity",
    Main: "main",
}

export const oldPoolToken = [
    { name: "dea_usdc" },
    { name: "deus_eth" },
    { name: "dea_deus" },
    { name: "deus" },
    { name: "dea" },
    { name: "ampl_eth" },
    { name: "snx" },
    { name: "uni" },
]

export const OldStakes = {
    dea_usdc: {
        name: "dea_usdc",
        title: "DEA-USDC",
        amounts: {
            dea: 0,
            apy: 0,
            lp: 0,
            pool: 0,
        },
        deposited: 0,
        claimable_unit: "DEA",
        claimable_amount: "-",
        pool: "-",
        coin_name: "UNI-V2-DEA-USDC",
        stakingLink: "0x2e3394d3CdcbaAF2bb85Fe9aB4c79CeF4d28b216",
        liqLink: "https://app.uniswap.org/#/add/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/0x80aB141F324C3d6F2b18b030f1C4E95d4d658778",
        rewardRatio: 0,
    },
    deus_eth: {
        name: "deus_eth",
        title: "DEUS-ETH",
        amounts: {
            dea: 0,
            newdea: 0,
            apy: 0,
            lp: 0,
            pool: 0,
            currLp: 0,
            allowances: 0,
        },
        deposited: 0,
        claimable_unit: "DEA",
        claimable_amount: "-",
        pool: "-",
        coin_name: "UNI-V2-DEUS/ETH",
        stakingLink: "0x19945547eC934bBD8C48fA69bC78152C468CCA7a",
        liqLink: "https://app.uniswap.org/#/add/ETH/0x3b62F3820e0B035cc4aD602dECe6d796BC325325",
        rewardRatio: 0,
    },
    deus: {
        name: "deus",
        title: "DEUS",
        amounts: {
            dea: 0,
            newdea: 0,
            apy: 0,
            lp: 0,
            pool: 0,
            currLp: 0,
            allowances: 0,
        },
        deposited: 0,
        claimable_unit: "DEA",
        claimable_amount: "-",
        pool: "-",
        isDeusLink: true,
        coin_name: "DEUS",
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        liqLink: "/swap",
        rewardRatio: 0,
    },
    dea: {
        name: "dea",
        name: "DEA",
        amounts: {
            dea: 0,
            newdea: 0,
            apy: 0,
            lp: 0,
            pool: 0,
            currLp: 0,
            allowances: 0,
        },
        deposited: 0,
        claimable_unit: "DEA",
        claimable_amount: "-",
        pool: "-",
        isDeusLink: true,
        coin_name: "DEUS",
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        liqLink: "/swap",
        rewardRatio: 0,
    },
    deus_dea: {
        name: "deus_dea",
        title: "DEUS-DEA",
        amounts: {
            dea: 0,
            newdea: 0,
            apy: 0,
            lp: 0,
            pool: 0,
            currLp: 0,
            allowances: 0,
        },
        deposited: 0,
        claimable_unit: "DEA",
        claimable_amount: "-",
        pool: "-",
        isDeusLink: true,
        coin_name: "DEUS",
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        liqLink: "/swap",
        rewardRatio: 0,
    },
    ampl_eth: {
        name: "ampl_eth",
        title: "AMPL-ETH",
        amounts: {
            dea: 0,
            newdea: 0,
            apy: 0,
            lp: 0,
            pool: 0,
            currLp: 0,
            allowances: 0,
        },
        deposited: 0,
        claimable_unit: "DEA",
        claimable_amount: "-",
        pool: "-",

        coin_name: "UNI-V2-AMPL-ETH",
        stakingLink: "0xa3bE45e9F6c42e06231618cf45be1AB9625A591f",
        liqLink: "https://app.uniswap.org/#/add/ETH/0xd46ba6d942050d489dbd938a2c909a5d5039a161",
        rewardRatio: 0,
    },
    snx: {
        name: "snx",
        title: "SNX",
        amounts: {
            dea: 0,
            newdea: 0,
            apy: 0,
            lp: 0,
            pool: 0,
            currLp: 0,
            allowances: 0,
        },
        deposited: 0,
        claimable_unit: "DEA",
        claimable_amount: "-",
        pool: "-",
        coin_name: "SNX",
        stakingLink: "0x1B043BbB372452d71503E6603Dd33b93271Bfec0",
        liqLink: "https://app.uniswap.org/#/swap?outputCurrency=0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f",
        rewardRatio: 0,
    },
    uni: {
        name: "uni",
        title: "UNI",
        amounts: {
            dea: 0,
            newdea: 0,
            apy: 0,
            lp: 0,
            pool: 0,
            currLp: 0,
            allowances: 0,
        },
        deposited: 0,
        claimable_unit: "DEA",
        claimable_amount: "-",
        pool: "-",
        deposited: 0,
        claimable_unit: "DEA",
        claimable_amount: "-",
        pool: "-",
        coin_name: "UNI",
        stakingLink: "0x8cd408279e966b7e7e1f0b9e5ed8191959d11a19",
        liqLink: "https://app.uniswap.org/#/swap?outputCurrency=0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
        rewardRatio: 0,
    },
}



export const timeToken = {
    name: "timetoken",
    title: "TimeToken",
    innerLink: true,
    stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
    liqLink: "/vaults",
    apy: "597.19",
    allowances: 10,
}



export const AllTokens = {
    "timetoken": {
        name: "timetoken",
        title: "TimeToken",
        type: TokenType.Time,
        innerLink: true,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        provideLink: "/vaults",
    },
    "deus": {
        name: "deus",
        title: "DEUS",
        type: TokenType.Main,
        innerLink: true,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        provideLink: "/swap",
        pic_name: "deus",
        allowances: 999
    },
    "dea": {
        name: "dea",
        title: "DEA",
        type: TokenType.Main,
        innerLink: true,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        provideLink: "/swap",
        pic_name: "dea",
        balance: 200
    },
    "usdc": {
        name: "usdc",
        title: "USDC",
        type: TokenType.Main,
        innerLink: false,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        provideLink: "/swap",
        pic_name: "usdc"
    },
    "eth": {
        name: "eth",
        title: "ETH",
        type: TokenType.Main,
        innerLink: false,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        provideLink: "/swap",
        pic_name: "eth-logo"
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
        innerLink: true,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
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


export const sandTokens = {

    "s_dai": {
        name: "s_dai",
        title: "sDAI",
        type: TokenType.Sand,
        innerLink: true,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        provideLink: "/vaults",
    },
    "timetoken": {
        name: "timetoken",
        title: "TimeToken",
        type: TokenType.Sand,
        innerLink: true,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        provideLink: "/vaults",
    },
    "s_deus": {
        name: "s_deus",
        title: "sDEUS",
        type: TokenType.Sand,
        innerLink: true,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        provideLink: "/vaults",
    },
    "s_eth": {
        name: "s_eth",
        title: "sETH",
        type: TokenType.Sand,
        innerLink: true,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        provideLink: "/vaults",
    },
    "s_dea": {
        name: "s_dea",
        title: "sDEA",
        type: TokenType.Sand,
        innerLink: true,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        provideLink: "/vaults",
    },
    "s_wbtc": {
        name: "s_wbtc",
        title: "sWBTC",
        type: TokenType.Sand,
        innerLink: true,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        provideLink: "/vaults",
    },
}


export const balancerTokens = [
    {
        name: "native",
        title: "Native Balancer",
        coin: "BPT Native",
        inner_link: false,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        liqLink: "https://balancer.com",
        own_pool: 30,
        balance: 3.009,
        apy: "120",
        balancer: true,
        info: "50% DEA\n30% sUNI-LP-DEUS-DEA\n7.5% sDEUS\n7.5% sDEA\n25% sUNI-LP-DEA-USDC",
        deposited: 10.64,
        claimable: 1.09832
    }, {
        name: "legacy",
        title: "Legacy Balancer",
        inner_link: false,
        coin: "BPT Legacy",
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        liqLink: "https://balancer.com",
        own_pool: 0,
        balancer: true,
        balance: 1.9999,
        info: "25% DEA\n25% sWBTC\n25% sETH\n25% sDAI",
        apy: 178,
        deposited: 0,
        claimable: 0
    }
]

export const vaultsTokens = [
    {
        name: "uni_lp_deus_dea",
        coin: "deus dea",
        inner_link: false,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        liqLink: "/swap",
        locked: 0,
        balance: 3.7341
    },
    {
        name: "uni_lp_dea_usdc",
        coin: "dea usdc",
        inner_link: false,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        liqLink: "http://google.com",
        balance: 3
    },
    {
        name: "deus",
        coin: "deus",
        inner_link: true,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        liqLink: "/swap",
        locked: 300.87,
        allowances: 10,
        balance: 0,

    },
    {
        name: "dea",
        coin: "dea",
        inner_link: false,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        liqLink: "http://google.com",
        locked: 1,
        balance: 0,
    },
    {
        name: "dai",
        coin: "dai",
        inner_link: false,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        liqLink: "http://google.com",
        locked: 1,
        balance: 0,
    },
    {
        name: "eth",
        coin: "eth",
        inner_link: false,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        liqLink: "http://google.com",
        balance: 0,
    },

    {
        name: "wbtc",
        coin: "wbtc",
        inner_link: false,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        liqLink: "http://google.com",
        locked: 50.053,
        balance: 0,
    },
]


export const vaultsTokens2 = {
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
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        estimation: 250

    },
    dea: {
        name: "dea",
        title: "DEA",
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",

    },
    dai: {
        name: "dai",
        title: "DAI",
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",

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
    vaults: vaultsTokens2,
    sand: {
        "sand_uni_lp_deus_dea": {
            name: "s_uni_lp_deus_dea",
            title: "s_uni_lp_deus_dea",
            innerLink: true,
            stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
            liqLink: "/vaults",
            claimabel_amount: 0,
            deposited: 0
        },
        "sand_uni_lp_dea_usdc": {
            name: "s_uni_lp_dea_usdc",
            title: "s_uni_lp_dea_usdc",
            stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
            claimabel_amount: 0,
            deposited: 0
        },
        "sand_dai": {
            name: "s_dai",
            title: "sDAI",
            innerLink: true,
            stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
            liqLink: "/vaults",
            claimabel_amount: 0,
            deposited: 0
        },
        "sand_deus": {
            name: "s_deus",
            title: "sDEUS",
            innerLink: true,
            stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
            liqLink: "/vaults",
            claimabel_amount: 0,
            deposited: 0
        },
        "sand_eth": {
            name: "s_eth",
            title: "sETH",
            innerLink: true,
            stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
            liqLink: "/vaults",
            claimabel_amount: 0,
            deposited: 0
        },
        "sand_dea": {
            name: "s_dea",
            title: "sDEA",
            innerLink: true,
            stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
            liqLink: "/vaults",
            claimabel_amount: 0,
            deposited: 0
        },
        "sand_wbtc": {
            name: "s_wbtc",
            title: "sWBTC",
            innerLink: true,
            stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
            liqLink: "/vaults",
            claimabel_amount: 0,
            deposited: 0
        },
        "timetoken": {
            name: "timetoken",
            title: "TimeToken",
            innerLink: true,
            stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
            liqLink: "/vaults",
            claimabel_amount: 0,
            deposited: 0
        },
    },
    balancer: {
        native: {
            name: "native",
            title: "Native Balancer",
            inner_link: false,
            stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
            liqLink: "https://balancer.com",
            balancer: true,
            claimable_amount: 0,
            apy: 126,
            own_pool: 30,
            info: "50% DEA\n30% sUNI-LP-DEUS-DEA\n7.5% sDEUS\n7.5% sDEA\n25% sUNI-LP-DEA-USDC",
        },
        legacy: {
            name: "legacy",
            title: "Legacy Balancer",
            inner_link: false,
            stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
            liqLink: "https://balancer.com",
            own_pool: 0,
            balancer: true,
            info: "25% DEA\n25% sWBTC\n25% sETH\n25% sDAI",
            apy: 178,
            claimable_amount: 0,
            deposited: 0,
            claimable: 0
        }
    }
}

