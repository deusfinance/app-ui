import { Token } from './token';

export const registrarUrl = "https://oracle1.deus.finance/registrar-detail.json"

export const SyncData = {
    56: {
        reqiureSignatures: 1,
        contract: "0x3b62F3820e0B035cc4aD602dECe6d796BC325325",
        stableCoin: new Token(56, "0xe9e7cea3dedca5984780bafc599bd69add087d56", 18, "BUSD", "BUSD", "/tokens/busd.svg"),
        conducted: ["https://oracle1.deus.finance/bsc/conducted.json",],
        prices: ["https://oracle1.deus.finance/bsc/price.json"],
        signatures: [
            "https://oracle1.deus.finance/bsc/signatures.json",
            "https://oracle3.deus.finance/bsc/signatures.json",
        ],
        registrar: [registrarUrl]
    },

}
