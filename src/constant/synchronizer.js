import { Token } from '../utils/classes';
import { ChainMap } from './web3';

export const registrarUrl = "https://oracle1.deus.finance/registrar-detail.json"

export const SyncData = {
    [ChainMap.BSC]: {
        requiredSignatures: 2,
        isStableApprovable: true,
        isAssetApprovable: false,
        contract: "0x3b62F3820e0B035cc4aD602dECe6d796BC325325",
        stableCoin: new Token(ChainMap.BSC, "0xe9e7cea3dedca5984780bafc599bd69add087d56", 18, "BUSD", "BUSD", "/tokens/busd.svg"),
        conducted: ["https://oracle1.deus.finance/bsc/conducted.json"],
        prices: ["https://oracle4.deus.finance/price"],
        signatures: ["https://oracle4.deus.finance/signature", "https://oracle5.deus.finance/signature"],
        registrar: [registrarUrl]
    },
    [ChainMap.XDAI]: {
        requiredSignatures: 2,
        isStableApprovable: false,
        isAssetApprovable: true,
        contract: "0x89951F2546f36789072c72C94272a68970Eba65e",
        stableCoin: new Token(ChainMap.XDAI, "0x", 18, "xDAI", "xDAI", "/tokens/xdai.svg"),
        conducted: ["https://oracle1.deus.finance/xdai/conducted.json"],
        prices: ["https://oracle4.deus.finance/price"],
        signatures: ["https://oracle4.deus.finance/signature", "https://oracle5.deus.finance/signature"],
        registrar: [registrarUrl]
    },

}
