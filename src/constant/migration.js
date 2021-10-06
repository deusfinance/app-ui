export const snapShotMaker = (snap) => {
    const addedBalance = [
        {
            id: 0,
            title: {
                from: "DEA , sDEA",
                to: "DEUS V2"
            },
            tokens: {
                from: [
                    { symbol: "DEA", balance: snap["box1_in_DEA"], fromStaking: snap["box1_in_DEA_staking"] },
                    { symbol: "sDEA", balance: snap["box1_in_sDEA"], fromStaking: snap["box1_in_sDEA_staking"] },
                ],
                to: [
                    { symbol: "DEUS", amount: snap["box1_out_DEUS"] },
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
                    { symbol: "DEUS", balance: snap["box2_in_DEUS"], fromStaking: snap["box2_in_DEUS_staking"] },
                    { symbol: "sDEUS", balance: snap["box2_in_sDEUS"], fromStaking: snap["box2_in_sDEUS_staking"] },
                ],
                to: [
                    { symbol: "DEUS/DEI LP", amount: snap["box2_out_DDLP"] },
                    { symbol: "DEUS", amount: snap["box2_out_DEUS"] },
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
                    { symbol: "sUNI-DD", balance: snap["box3_in_sUniDD"] },
                    { symbol: "sUNI-DE", balance: snap["box3_in_sUniDE"] },
                    { symbol: "sUNI-DU", balance: snap["box3_in_sUniDU"] },
                    { symbol: "BPT", balance: snap["box3_in_BPT"], fromStaking: snap["box3_in_BPT_staking"] },
                ],
                to: [
                    { symbol: "DEUS/DEI LP", amount: snap["box3_out_DDLP"] },
                    { symbol: "DEUS", amount: snap["box3_out_DEUS"] },
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
                    { symbol: "Uni-DEUS/DEA", balance: snap["box4_in_UniDD"], fromStaking: snap["box4_in_UniDD_staking"] },
                ],
                to: [
                    { symbol: "DEUS/DEI LP", amount: snap["box4_out_DDLP"] },
                    { symbol: "DEUS", amount: snap["box4_out_DEUS"] },
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
                    { symbol: "Uni-DEA/USDC", balance: snap["box5_in_UniDU"], fromStaking: snap["box5_in_UniDU_staking"] },
                ],
                to: [
                    { symbol: "DEUS/DEI LP", amount: snap["box5_out_DDLP"] },
                    { symbol: "DEUS", amount: snap["box5_out_DEUS"] },
                    { isDU: true, symbol: "DEUS,USDC", amountDEUS: snap["box5_out_dea->DEUS"], amountUSDC: snap["box5_out_USDC"] },
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
                    { symbol: "Uni-DEUS/ETH", balance: snap["box6_in_UniDE"], fromStaking: snap["box6_in_UniDE_staking"] },
                ],
                to: [
                    { symbol: "DEUS/DEI LP", amount: snap["box6_out_DDLP"], },
                    { symbol: "DEUS", amount: snap["box6_out_DEUS"], },
                ]
            }
        },
    ]


    return addedBalance
}