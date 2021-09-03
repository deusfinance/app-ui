import { getWeb3NoAccount } from '../hooks/web3'
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
import ProxyMinterAbi from '../config/abi/ProxyMinterAbi.json'
import ZapAbi from '../config/abi/ZapAbi.json'
import { DEI_ADDRESS, DEI_POOL_ADDRESS, COLLATERAL_POOL_ADDRESS, MULTICALL_NETWORKS, PROXY_MINT_ADDRESS, ZAP_ADDRESS } from '../constant/contracts'
import { ChainMap } from '../constant/web3'
import { getContractAddr } from '../utils/contracts'
import { SyncData } from '../constant/synchronizer'

const getContract = (abi, address, web3, chainId) => {
    const _web3 = web3 ?? getWeb3NoAccount(chainId)
    return new _web3.eth.Contract(abi, address)
}

export const getMultiSwapContract = (web3, chainId = ChainMap.ETH) => {
    return getContract(muliSwapAbi, getContractAddr("multi_swap_contract", chainId), web3)
}

export const getSynchronizerContract = (web3, chainId = ChainMap.ETH) => {
    if (chainId === ChainMap.XDAI)
        return getContract(XdaiProxyAbi, SyncData[chainId].contract, web3)
    return getContract(SyncAbi, SyncData[chainId].contract, web3)
}

export const getDeusAutomaticMarketMakerContract = (web3, chainId = ChainMap.ETH) => {
    return getContract(DeusAMMAbi, getContractAddr("amm", chainId), web3)
}

export const getUniswapRouterContract = (web3, chainId = ChainMap.ETH) => {
    return getContract(UniswapRouterAbi, getContractAddr("uniswap_router", chainId), web3)
}

export const getERC20Contract = (address, web3) => {
    return getContract(ERC20Abi, address, web3)
}

export const getMultiCallContract = (web3, chainId = ChainMap.ETH) => {
    return getContract(MultiCallAbi, MULTICALL_NETWORKS[chainId], web3)
}

export const getUniswapV2Contract = (address, web3) => {
    return getContract(UniswapV2Abi, address, web3)
}

export const getSealedSwapperContract = (address, web3) => {
    return getContract(SealedSwapperAbi, address, web3)
}

export const getMuonContract = (web3, chainId = ChainMap.ETH) => {
    if (chainId === ChainMap.ETH)
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
    return getContract(HusdPoolAbi, COLLATERAL_POOL_ADDRESS[chainId], web3)
}
export const getDeiStakingContract = (web3, address) => {
    return getContract(StakingDeiAbi, address, web3)
}
export const getProxyMinterContract = (web3, chainId = ChainMap.AVALANCHE) => {
    return getContract(ProxyMinterAbi, PROXY_MINT_ADDRESS[chainId], web3, chainId)
}
export const getZapContract = (web3, chainId = ChainMap.AVALANCHE) => {
    return getContract(ZapAbi, ZAP_ADDRESS[chainId], web3, chainId)
}