import React from 'react';

export default [
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
                id: "synthetics",
                text: <span>SYNTHETICS <span style={{ fontSize: "12px" }}>(Rinkeby)</span> </span>,
                path: "/synthetics",
                exact: true,
            },
            // {
            //     id: "coinbase",
            //     text: "COINBASE",
            //     path: "/coinbase",
            //     exact: true,

            // },
            // {
            //     id: "bakkt",
            //     text: "BAKKT",
            //     path: "/bakkt",
            //     exact: true,

            // },
            {
                id: "staking",
                text: "STAKING",
                path: "/staking",
                exact: false,
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
        path: "/",
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