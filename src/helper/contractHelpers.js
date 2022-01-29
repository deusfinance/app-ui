import { getWeb3NoAccount } from '../hooks/web3'
import ERC20Abi from '../config/abi/ERC20Abi.json'
import MultiCallAbi from '../config/abi/Multicall.json'
import DeiPoolAbi from '../config/abi/DeiPoolAbi.json'
import DeiAbi from '../config/abi/DEIAbi.json'
import StakingDeiAbi from '../config/abi/StakingDeiAbi.json'
import CollateralAbi from '../config/abi/HusdPoolAbi.json'
import NewProxyMinterAbi from '../config/abi/NewProxyAbi'
import DeiCollateralZapAbi from '../config/abi/DeiCollateralZapAbi.json'
import DeiDeusZapAbi from '../config/abi/DeiDeusZap.json'
import DeusSwapAbi from '../config/abi/DeusSwapAbi.json'
import MigrationAbi from '../config/abi/MigrationAbi.json'
import BakktAbi from '../config/abi/bakktAbi.json'
import DeusNativeZapAbi from '../config/abi/DeusNativeZapAbi.json'
import DeusNativeZapAbiETH from '../config/abi/DeusNativeZapAbiETH.json'
import MuonPresaleCrossChainAbi from '../config/abi/MuonPresaleMatic.json'
import BridgeABI from '../config/abi/NewBridgeABI.json'
import VeDeusAbi from '../config/abi/VeDeUSAbi.json'

import {
    DEI_ADDRESS,
    MUON_PRESALE_ADDRESS,
    DEI_POOL_ADDRESS,
    COLLATERAL_POOL_ADDRESS,
    MULTICALL_NETWORKS,
    MIGRATOR_ADDRESS,
    DEI_DEUS_ZAP,
    PROXY_MINT_ADDRESS,
    BRIDGE_ADDRESS,
    DEUS_SWAP_ADDRESS,
    DEUS_NATIVE_ZAP
} from '../constant/contracts'
import { ChainId } from '../constant/web3'

const getContract = (abi, address, web3, chainId) => {
    const _web3 = web3 ?? getWeb3NoAccount(chainId)
    return new _web3.eth.Contract(abi, address)
}

export const getERC20Contract = (address, web3) => {
    return getContract(ERC20Abi, address, web3)
}

export const getMultiCallContract = (web3, chainId = ChainId.ETH) => {
    return getContract(MultiCallAbi, MULTICALL_NETWORKS[chainId], web3)
}


export const getDeiPoolContract = (web3, chainId = ChainId.RINKEBY) => {
    return getContract(DeiPoolAbi, DEI_POOL_ADDRESS[chainId], web3)
}

export const getDeiContract = (web3, chainId = ChainId.RINKEBY) => {
    return getContract(DeiAbi, DEI_ADDRESS[chainId], web3)
}

export const getCollateralPoolContract = (web3, chainId = ChainId.AVALANCHE) => {
    return getContract(CollateralAbi, COLLATERAL_POOL_ADDRESS[chainId], web3)
}

export const getDeiStakingContract = (web3, address) => {
    return getContract(StakingDeiAbi, address, web3)
}

export const getZapContract = (web3, address, chainId = ChainId.AVALANCHE) => {
    if (address === DEI_DEUS_ZAP[chainId])
        return getContract(DeiDeusZapAbi, address, web3, chainId)
    else if (address === DEUS_NATIVE_ZAP[chainId]) {
        if (chainId === ChainId.MATIC)
            return getContract(DeusNativeZapAbi, address, web3, chainId)
        else if (chainId === ChainId.ETH)
            return getContract(DeusNativeZapAbiETH, address, web3, chainId)
    } else {
        return getContract(DeiCollateralZapAbi, address, web3, chainId)
    }
}

export const getMigrationContract = (web3, chainId = ChainId.RINKEBY) => {
    return getContract(MigrationAbi, MIGRATOR_ADDRESS[chainId], web3, chainId)
}

export const getNewProxyMinterContract = (web3, chainId = ChainId.MATIC) => {
    return getContract(NewProxyMinterAbi, PROXY_MINT_ADDRESS[chainId], web3, chainId)
}

export const getDeusSwapContract = (web3, chainId = ChainId.MATIC) => {
    return getContract(DeusSwapAbi, DEUS_SWAP_ADDRESS[chainId], web3, chainId)
}

export const getBakktMigrationContract = (web3, chainId = ChainId.ETH) => {
    return getContract(BakktAbi, "0x702ed7074b2ee71896d386efaf78e1ddc221e34e", web3, chainId)
}

export const getBridgeContract = (web3, chainId = ChainId.MATIC) => {
    return getContract(BridgeABI, BRIDGE_ADDRESS[chainId], web3, chainId)
}

export const getMuonContract = (web3, chainId = ChainId.MATIC) => {
    return getContract(MuonPresaleCrossChainAbi, MUON_PRESALE_ADDRESS[chainId], web3)
}

export const getVeDEUSContract = (address, web3) => {
    return getContract(VeDeusAbi, address, web3)
}