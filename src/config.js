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
        id: "dashboard",
        text: "DASHBOARD",
        path: "/dashboard",
        exact: true,

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

export const stakingTokens = [
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
    },
    {
        name: "deus",
        coin: "deus",
        inner_link: true,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        liqLink: "/swap",
        deposited: 300.87,

    },
    {
        name: "dai",
        coin: "dai",
        inner_link: false,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        liqLink: "http://google.com",
    },
    {
        name: "eth",
        coin: "eth",
        inner_link: false,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        liqLink: "http://google.com",
    },

    {
        name: "wbtc",
        coin: "wbtc",
        inner_link: false,
        stakingLink: "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246",
        liqLink: "http://google.com",
        deposited: 50.053
    },
]