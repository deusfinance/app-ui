export const MIGRATION_CONFIG = [
    {
        id: 0,
        title: {
            from: "DEA / sDEA",
            to: "DEUS V2"
        },
        tokens: {
            from: [
                { symbol: "DEA", balance: "342.23" },
                { symbol: "sDEA", balance: "342.23" },
            ],
            to: [
                { symbol: "DEUS", amount: "342.23" },
            ]
        }
    },
    {
        id: 1,
        title: {
            from: "DEUS / sDEUS",
            to: "DEUS V2"
        },
        tokens: {
            from: [
                { symbol: "DEUS", balance: "342.23" },
                { symbol: "sDEUS", balance: "342.23" },
            ],
            to: [
                { symbol: "DEUS/DEI LP", amount: "100" },
                { symbol: "DEUS", amount: "100" },
            ]
        }
    },
    {
        id: 2,
        title: {
            from: "sUNI / BPT",
            to: "DEUS V2"
        },
        tokens: {
            from: [
                { symbol: "sUNI-DD", balance: "1.23587" },
                { symbol: "sUNI-DE", balance: "1.23587" },
                { symbol: "sUNI-DU", balance: "1.23587" },
                { symbol: "BPT", balance: "1.23587" },
            ],
            to: [
                { symbol: "DEUS/DEI LP", amount: "100" },
                { symbol: "DEUS", amount: "100" },
            ]
        }
    },
    {
        id: 3,
        title: {
            from: "DEUS/DEA LP",
            to: "DEUS V2"
        },
        tokens: {
            from: [
                { symbol: "DEUS/DEA LP", balance: "1.23587" },
            ],
            to: [
                { symbol: "DEUS/DEI LP", amount: "100" },
                { symbol: "DEUS", amount: "100" },
            ]
        }
    },
    {
        id: 4,
        title: {
            from: "DEA/USDC LP",
            to: "DEUS V2"
        },
        tokens: {
            from: [
                { symbol: "DEUS/DEA LP", balance: "1.23587" },
            ],
            to: [
                { symbol: "DEUS/DEI LP", amount: "100" },
                { symbol: "DEUS", amount: "100" },
                { symbol: "DEUS/USDC LP", amount: "100" },
            ]
        }
    },
    {
        id: 5,
        title: {
            from: "DEUS/ETH LP",
            to: "DEUS V2"
        },
        tokens: {
            from: [
                { symbol: "DEUS/ETH LP", balance: "1.23587" },
            ],
            to: [
                { symbol: "DEUS/DEI LP", amount: "100" },
                { symbol: "DEUS", amount: "100" },
            ]
        }
    },
]
