import { convertRate } from "../helper/migrationHelper"

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
        DEA_balance_DU,
        USDC_balance_DU,
        DEA_balance_from_BPT,
        SDEA_balance_from_BPT,
        sUniDD_balance_from_BPT,
        sUniDE_balance_from_BPT,
        sUniDU_balance_from_BPT,
        SDEUS_balance_from_BPT,
    } = snap

    const addedBalance = [
        {
            id: 0,
            title: {
                from: "DEA , sDEA",
                to: "DEUS V2"
            },
            tokens: {
                from: [
                    { symbol: "DEA", balance: DEA_balance },
                    { symbol: "sDEA", balance: SDEA_balance },
                ],
                to: [
                    { symbol: "DEUS" },
                ]
            }
        },
        {
            id: 1,
            title: {
                from: "DEUS , sDEUS",
                to: "DEUS V2"
            },
            tokens: {
                from: [
                    { symbol: "DEUS", balance: 0 },
                    { symbol: "sDEUS", balance: SDEUS_balance },
                ],
                to: [
                    { symbol: "DEUS/DEI LP" },
                    { symbol: "DEUS" },
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
                    {
                        symbol: "BPT",
                        balance: BPT_balance,
                        DEA_balance_from_BPT,
                        SDEA_balance_from_BPT,
                        sUniDD_balance_from_BPT,
                        sUniDE_balance_from_BPT,
                        sUniDU_balance_from_BPT,
                        SDEUS_balance_from_BPT,
                    },
                ],
                to: [
                    { symbol: "DEUS/DEI LP" },
                    { symbol: "DEUS" },
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
                    { symbol: "DEUS/DEI LP" },
                    { symbol: "DEUS" },
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
                    { symbol: "DEUS/DEI LP" },
                    { symbol: "DEUS" },
                    { isDU: true, symbol: "DEUS,USDC", amountDEUS: DEA_balance_DU, amountUSDC: USDC_balance_DU },
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
                    { symbol: "DEUS/DEI LP" },
                    { symbol: "DEUS" },
                ]
            }
        },
    ]

    const addedAmount = addedBalance.map(item => {
        return {
            ...item,
            tokens: convertRate(item.tokens)
        }
    })

    return addedAmount
}