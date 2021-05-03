import web3NoAccount from './web3'
import muliSwapAbi from '../config/abi/muliSwapAbi.json'
import ERC20Abi from '../config/abi/ERC20Abi.json'
import DeusAMMAbi from '../config/abi/DeusAMM.json'
import UniswapRouterAbi from '../config/abi/uniswapRouterAbi.json'
import { ChainMap } from '../constant/web3'
import { getContractAddr } from '../utils/contracts'

const getContract = (abi, address, web3) => {
    const _web3 = web3 ?? web3NoAccount
    return new _web3.eth.Contract(abi, address)
}

export const getMultiSwapContract = (web3, chainId = ChainMap.Mainnet) => {
    return getContract(muliSwapAbi, getContractAddr("multi_swap_contract", chainId), web3)
}

export const getDeusAutomaticMarketMakerContract = (web3, chainId = ChainMap.Mainnet) => {
    return getContract(DeusAMMAbi, getContractAddr("amm", chainId), web3)
}

export const getUniswapRouterContract = (web3, chainId = ChainMap.Mainnet) => {
    return getContract(UniswapRouterAbi, getContractAddr("uniswap_router", chainId), web3)
}

export const getERC20Contract = (address, web3) => {
    return getContract(ERC20Abi, address, web3)
}