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
                path: "https://deus.finance/wiki.html",
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