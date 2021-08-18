import web3NoAccount from '../hooks/web3'
import muliSwapAbi from '../config/abi/muliSwapAbi.json'
import ERC20Abi from '../config/abi/ERC20Abi.json'
import DeusAMMAbi from '../config/abi/DeusAMM.json'
import UniswapRouterAbi from '../config/abi/uniswapRouterAbi.json'
import UniswapV2Abi from '../config/abi/UniswapV2Abi.json'
import MultiCallAbi from '../config/abi/Multicall.json'
import MuonPresaleAbi from '../config/abi/MuonPresale.json'
import MuonPresaleCrossChainAbi from '../config/abi/MuonPresaleCrossChain.json'
import SealedSwapperAbi from '../config/abi/SealedSwapperAbi.json'
import DeiPoolAbi from '../config/abi/DeiPoolAbi.json'
import DeiAbi from '../config/abi/DEIAbi.json'
import SyncAbi from '../config/abi/Sync.json'
import XdaiProxyAbi from '../config/abi/XdaiProxyAbi.json'
import StakingDeiAbi from '../config/abi/StakingDeiAbi.json'
import HusdPoolAbi from '../config/abi/HusdPoolAbi.json'
import { DEI_ADDRESS, DEI_POOL_ADDRESS, HUSD_POOL_ADDRESS, MULTICALL_NETWORKS } from '../constant/contracts'
import { ChainMap } from '../constant/web3'
import { getContractAddr } from '../utils/contracts'
import { SyncData } from '../constant/synchronizer'

const getContract = (abi, address, web3) => {
    const _web3 = web3 ?? web3NoAccount
    return new _web3.eth.Contract(abi, address)
}

export const getMultiSwapContract = (web3, chainId = ChainMap.MAINNET) => {
    return getContract(muliSwapAbi, getContractAddr("multi_swap_contract", chainId), web3)
}

export const getSynchronizerContract = (web3, chainId = ChainMap.MAINNET) => {
    if (chainId === ChainMap.XDAI)
        return getContract(XdaiProxyAbi, SyncData[chainId].contract, web3)
    return getContract(SyncAbi, SyncData[chainId].contract, web3)
}

export const getDeusAutomaticMarketMakerContract = (web3, chainId = ChainMap.MAINNET) => {
    return getContract(DeusAMMAbi, getContractAddr("amm", chainId), web3)
}

export const getUniswapRouterContract = (web3, chainId = ChainMap.MAINNET) => {
    return getContract(UniswapRouterAbi, getContractAddr("uniswap_router", chainId), web3)
}

export const getERC20Contract = (address, web3) => {
    return getContract(ERC20Abi, address, web3)
}

export const getMultiCallContract = (web3, chainId = ChainMap.MAINNET) => {
    return getContract(MultiCallAbi, MULTICALL_NETWORKS[chainId], web3)
}

export const getUniswapV2Contract = (address, web3) => {
    return getContract(UniswapV2Abi, address, web3)
}

export const getSealedSwapperContract = (address, web3) => {
    return getContract(SealedSwapperAbi, address, web3)
}

export const getMuonContract = (web3, chainId = ChainMap.MAINNET) => {
    if (chainId === ChainMap.MAINNET)
        return getContract(MuonPresaleAbi, getContractAddr("muon_presale", chainId), web3)
    return getContract(MuonPresaleCrossChainAbi, getContractAddr("muon_presale", chainId), web3)
}

export const getDeiPoolContract = (web3, chainId = ChainMap.RINKEBY) => {
    return getContract(DeiPoolAbi, DEI_POOL_ADDRESS[chainId], web3)
}
export const getDeiContract = (web3, chainId = ChainMap.RINKEBY) => {
    return getContract(DeiAbi, DEI_ADDRESS[chainId], web3)
}

export const getHusdPoolContract = (web3, chainId = ChainMap.RINKEBY) => {
    return getContract(HusdPoolAbi, HUSD_POOL_ADDRESS[chainId], web3)
}
export const getDeiStakingContract = (web3, address) => {
    return getContract(StakingDeiAbi, address, web3)
}