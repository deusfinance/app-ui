import { Token } from './token';
import { ChainMap } from './web3';

export const registrarUrl = "https://oracle1.deus.finance/registrar-detail.json"

export const SyncData = {
    [ChainMap.BSC_TESTNET]: {
        reqiureSignatures: 1,
        isStableApprovable: true,
        isAssetApprovable: false,
        contract: "0x3b62F3820e0B035cc4aD602dECe6d796BC325325",
        stableCoin: new Token(ChainMap.BSC, "0xe9e7cea3dedca5984780bafc599bd69add087d56", 18, "BUSD", "BUSD", "/tokens/busd.svg"),
        conducted: ["https://oracle1.deus.finance/bsc/conducted.json"],
        prices: ["https://oracle1.deus.finance/bsc/price.json"],
        signatures: ["https://oracle1.deus.finance/bsc/signatures.json", "https://oracle3.deus.finance/bsc/signatures.json"],
        registrar: [registrarUrl]
    },
    [ChainMap.BSC]: {
        reqiureSignatures: 1,
        isStableApprovable: true,
        isAssetApprovable: false,
        contract: "0x3b62F3820e0B035cc4aD602dECe6d796BC325325",
        stableCoin: new Token(ChainMap.BSC, "0xe9e7cea3dedca5984780bafc599bd69add087d56", 18, "BUSD", "BUSD", "/tokens/busd.svg"),
        conducted: ["https://oracle1.deus.finance/bsc/conducted.json"],
        prices: ["https://oracle4.deus.finance/price"],
        signatures: ["https://oracle4.deus.finance/signature"],
        registrar: [registrarUrl]
    },

}
