// export const MIGRATION_CONFIG = [
//     {
//         id: 0,
//         title: {
//             from: "DEA / sDEA",
//             to: "DEUS V2"
//         },
//         tokens: {
//             from: [
//                 { symbol: "DEA", balance: "342.23" },
//                 { symbol: "sDEA", balance: "342.23" },
//             ],
//             to: [
//                 { symbol: "DEUS", amount: "342.23" },
//             ]
//         }
//     },
//     {
//         id: 1,
//         title: {
//             from: "DEUS / sDEUS",
//             to: "DEUS V2"
//         },
//         tokens: {
//             from: [
//                 { symbol: "DEUS", balance: "0" },
//                 { symbol: "sDEUS", balance: "342.23" },
//             ],
//             to: [
//                 { symbol: "DEUS/DEI LP", amount: "100" },
//                 { symbol: "DEUS", amount: "100" },
//             ]
//         }
//     },
//     {
//         id: 2,
//         title: {
//             from: "sUNI , BPT",
//             to: "DEUS V2"
//         },
//         tokens: {
//             from: [
//                 { symbol: "sUNI-DD", balance: "1.23587" },
//                 { symbol: "sUNI-DE", balance: "1.23587" },
//                 { symbol: "sUNI-DU", balance: "1.23587" },
//                 { symbol: "BPT", balance: "1.23587" },
//             ],
//             to: [
//                 { symbol: "DEUS/DEI LP", amount: "100" },
//                 { symbol: "DEUS", amount: "100" },
//             ]
//         }
//     },
//     {
//         id: 3,
//         title: {
//             from: "Uni DEUS/DEA LP",
//             to: "DEUS V2"
//         },
//         tokens: {
//             from: [
//                 { symbol: "Uni-DEUS/DEA", balance: "1.23587" },
//             ],
//             to: [
//                 { symbol: "DEUS/DEI LP", amount: "100" },
//                 { symbol: "DEUS", amount: "100" },
//             ]
//         }
//     },
//     {
//         id: 4,
//         title: {
//             from: "Uni DEA/USDC LP",
//             to: "DEUS V2"
//         },
//         tokens: {
//             from: [
//                 { symbol: "Uni-DEA/USDC", balance: "1.23587" },
//             ],
//             to: [
//                 { symbol: "DEUS/DEI LP", amount: "100" },
//                 { symbol: "DEUS", amount: "100" },
//                 { symbol: "DEUS/USDC LP", amount: "100" },
//             ]
//         }
//     },
//     {
//         id: 5,
//         title: {
//             from: "Uni DEUS/ETH LP",
//             to: "DEUS V2"
//         },
//         tokens: {
//             from: [
//                 { symbol: "Uni-DEUS/ETH", balance: "1.23587" },
//             ],
//             to: [
//                 { symbol: "DEUS/DEI LP", amount: "100" },
//                 { symbol: "DEUS", amount: "100" },
//             ]
//         }
//     },
// ]



export const snapShotMaker = (snap) => {
    const {
        BPT_balance,
        DEA_balance,
        SDEA_balance,
        sUniDD_balance,
        sUniDE_balance,
        sUniDU_balance,
        UniDD_balance,
        UniDE_balance,
        UniDU_balance,
        SDEUS_balance,
    } = snap
    return [
        {
            id: 0,
            title: {
                from: "DEA / sDEA",
                to: "DEUS V2"
            },
            tokens: {
                from: [
                    { symbol: "DEA", balance: DEA_balance },
                    { symbol: "sDEA", balance: SDEA_balance },
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
                    { symbol: "DEUS", balance: 0 },
                    { symbol: "sDEUS", balance: SDEUS_balance },
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
                from: "sUNI , BPT",
                to: "DEUS V2"
            },
            tokens: {
                from: [
                    { symbol: "sUNI-DD", balance: sUniDD_balance },
                    { symbol: "sUNI-DE", balance: sUniDE_balance },
                    { symbol: "sUNI-DU", balance: sUniDU_balance },
                    { symbol: "BPT", balance: BPT_balance },
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
                from: "Uni DEUS/DEA LP",
                to: "DEUS V2"
            },
            tokens: {
                from: [
                    { symbol: "Uni-DEUS/DEA", balance: UniDD_balance },
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
                from: "Uni DEA/USDC LP",
                to: "DEUS V2"
            },
            tokens: {
                from: [
                    { symbol: "Uni-DEA/USDC", balance: UniDU_balance },
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
                from: "Uni DEUS/ETH LP",
                to: "DEUS V2"
            },
            tokens: {
                from: [
                    { symbol: "Uni-DEUS/ETH", balance: UniDE_balance },
                ],
                to: [
                    { symbol: "DEUS/DEI LP", amount: "100" },
                    { symbol: "DEUS", amount: "100" },
                ]
            }
        },
    ]
}