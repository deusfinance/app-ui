import { getWeb3NoAccount } from '../hooks/web3'
import muliSwapAbi from '../config/abi/muliSwapAbi.json'
import ERC20Abi from '../config/abi/ERC20Abi.json'
import DeusAMMAbi from '../config/abi/DeusAMM.json'
import UniswapRouterAbi from '../config/abi/uniswapRouterAbi.json'
import UniswapV2Abi from '../config/abi/UniswapV2Abi.json'
import MultiCallAbi from '../config/abi/Multicall.json'
import SealedSwapperAbi from '../config/abi/SealedSwapperAbi.json'
import DeiPoolAbi from '../config/abi/DeiPoolAbi.json'
import DeiAbi from '../config/abi/DEIAbi.json'
import SyncAbi from '../config/abi/Sync.json'
import XdaiProxyAbi from '../config/abi/XdaiProxyAbi.json'
import StakingDeiAbi from '../config/abi/StakingDeiAbi.json'
import CollateralAbi from '../config/abi/HusdPoolAbi.json'
import ProxyMinterAbi from '../config/abi/ProxyMinterAbi.json'
import NewProxyMinterAbi from '../config/abi/NewProxyAbi'
import DeiCollateralZapAbi from '../config/abi/DeiCollateralZapAbi.json'
import DeiDeusZapAbi from '../config/abi/DeiDeusZap.json'
import DeusSwapAbi from '../config/abi/DeusSwapAbi.json'
import MigrationAbi from '../config/abi/MigrationAbi.json'
import BakktAbi from '../config/abi/bakktAbi.json'
import BridgeABI from '../config/abi/BridgeABI.json'
import { DEI_ADDRESS, DEI_POOL_ADDRESS, COLLATERAL_POOL_ADDRESS, MULTICALL_NETWORKS, PROXY_MINT_ADDRESS, MIGRATOR_ADDRESS, DEI_DEUS_ZAP, NEW_PROXY_MINT_ADDRESS, BRIDGE_ADDRESS, DEUS_SWAP_ADDRESS } from '../constant/contracts'
import { ChainId } from '../constant/web3'
import { getContractAddr } from '../utils/contracts'
import { SyncData } from '../constant/synchronizer'

const getContract = (abi, address, web3, chainId) => {
    const _web3 = web3 ?? getWeb3NoAccount(chainId)
    return new _web3.eth.Contract(abi, address)
}

export const getMultiSwapContract = (web3, chainId = ChainId.ETH) => {
    return getContract(muliSwapAbi, getContractAddr("multi_swap_contract", chainId), web3)
}

export const getSynchronizerContract = (web3, chainId = ChainId.ETH) => {
    if (chainId === ChainId.XDAI)
        return getContract(XdaiProxyAbi, SyncData[chainId].contract, web3)
    return getContract(SyncAbi, SyncData[chainId].contract, web3)
}

export const getDeusAutomaticMarketMakerContract = (web3, chainId = ChainId.ETH) => {
    return getContract(DeusAMMAbi, getContractAddr("amm", chainId), web3)
}

export const getUniswapRouterContract = (web3, chainId = ChainId.ETH) => {
    return getContract(UniswapRouterAbi, getContractAddr("uniswap_router", chainId), web3)
}

export const getERC20Contract = (address, web3) => {
    return getContract(ERC20Abi, address, web3)
}

export const getMultiCallContract = (web3, chainId = ChainId.ETH) => {
    return getContract(MultiCallAbi, MULTICALL_NETWORKS[chainId], web3)
}

export const getUniswapV2Contract = (address, web3) => {
    return getContract(UniswapV2Abi, address, web3)
}

export const getSealedSwapperContract = (address, web3) => {
    return getContract(SealedSwapperAbi, address, web3)
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
export const getProxyMinterContract = (web3, chainId = ChainId.AVALANCHE) => {
    return getContract(ProxyMinterAbi, PROXY_MINT_ADDRESS[chainId], web3, chainId)
}
export const getZapContract = (web3, address, chainId = ChainId.AVALANCHE) => {
    if (address === DEI_DEUS_ZAP[chainId])
        return getContract(DeiDeusZapAbi, address, web3, chainId)
    return getContract(DeiCollateralZapAbi, address, web3, chainId)
}

export const getMigrationContract = (web3, chainId = ChainId.RINKEBY) => {
    return getContract(MigrationAbi, MIGRATOR_ADDRESS[chainId], web3, chainId)
}

export const getNewProxyMinterContract = (web3, chainId = ChainId.MATIC) => {
    return getContract(NewProxyMinterAbi, NEW_PROXY_MINT_ADDRESS[chainId], web3, chainId)
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