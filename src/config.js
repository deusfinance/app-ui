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
                path: "/newswap",
                exact: true,

            },
            {
                id: "conductr",
                text: "CONDUCTR",
                path: "/conductr",
                exact: false,
            },
            {
                id: "staking",
                text: "STAKING",
                path: "/staking",
                exact: true,
            },
            {
                id: "nstaking",
                text: "NEW STAKING",
                path: "/new-staking",
                exact: true,
            },
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




export const swapTokens = [
    { name: "DEA", pic_name: "dea", price: 34.05, balance: 0.96, allowances: 0 },
    { name: "DEUS", pic_name: "deus", price: 1.47, balance: 700.48, allowances: 10 },
    { name: "USDC", pic_name: "usdc", price: 1.05, balance: 436.23, allowances: 0 },
    { name: "ETH", pic_name: "eth-logo", price: 350.33, balance: 0.668, allowances: 9000 },
]



export const timeToken = {
    name: "timetoken",
    inner_link: false,
    stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
    liqLink: "/swap",
    deposited: 0,
    balance: 8.9236
}


export const sandTokens = [
    {
        name: "uni_lp_deus_dea",
        coin: "deus dea",
        inner_link: false,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        liqLink: "/swap",
        deposited: 0,
        balance: 34.285
    },
    {
        name: "uni_lp_dea_usdc",
        coin: "dea usdc",
        inner_link: false,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        liqLink: "http://google.com",
        balance: 0
    },
    {
        name: "deus",
        coin: "deus",
        inner_link: true,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        liqLink: "/swap",
        deposited: 300.87,
        allowances: 10,
        balance: 0

    },
    {
        name: "dai",
        coin: "dai",
        inner_link: false,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        liqLink: "http://google.com",
        deposited: 1,
        balance: 0
    },
    {
        name: "eth",
        coin: "eth",
        inner_link: false,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        liqLink: "http://google.com",
        balance: 0
    },
    {
        name: "dea",
        coin: "dea",
        inner_link: false,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        liqLink: "http://google.com",
        balance: 6.15
    },

    {
        name: "wbtc",
        coin: "wbtc",
        inner_link: false,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        liqLink: "http://google.com",
        deposited: 50.053,
        balance: 0
    },
]


export const balancerTokens = {
    native: {
        name: "native",
        title: "Native Balancer",
        inner_link: false,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        liqLink: "/swap",
        own_pool: 30,
        balance: 3.009,
        apy: 120,
        deposited: 10.64,
        claimable: 1.09832
    },
    legacy: {
        name: "legacy",
        title: "Legacy Balancer",
        inner_link: false,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        liqLink: "/swap",
        own_pool: 0,
        balance: 1.9999,
        apy: 178,
        deposited: 0,
        claimable: 0

    }
}

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