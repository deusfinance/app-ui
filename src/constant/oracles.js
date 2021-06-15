import { Token } from './token';

export const registrarUrl = "https://oracle1.deus.finance/registrar-detail.json"

export const oraclesUrl = {
    56: {
        reqiureSignatures: 1,
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
