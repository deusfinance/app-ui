import { makeContract } from '../../utils/Stakefun'
import { BridgeABI } from '../../utils/StakingABI'
import Web3 from 'web3'

const validNetworks = [4, 97, 4002]

// const BSCDEAToken='0xf93aAFF20124C9fbEDEA364Ea17B33dfEC09b34D'
// const FTMDEAToken='0xb79201Cb9f758dAb0cacEd4bFADC02D9465b5Cab'

const BridgeContractAddress = {
  4: '0xdAa80B54725147169614EF40C4a8EdeeA0F34D03',
  97: '0x11B650B8D2bbc60CdC434bd300F1b643ac77BAdA',
  4002: '0x05dFC221471F7Ea525c794Cfd3b5eC58D0d6B115'
}

const bscWeb3 = new Web3(
  new Web3.providers.HttpProvider(
    'https://data-seed-prebsc-1-s1.binance.org:8545/'
  )
)

const ethWeb3 = new Web3(
  new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/cf6ea736e00b4ee4bc43dfdb68f51093'
  )
)

const ftmWeb3 = new Web3(
  new Web3.providers.HttpProvider('https://rpc.testnet.fantom.network/')
)

const NetworkWeb3 = {
  4: ethWeb3,
  97: bscWeb3,
  4002: ftmWeb3
}

const Contract = {
  4: makeContract(ethWeb3, BridgeABI, BridgeContractAddress[4]),
  97: makeContract(bscWeb3, BridgeABI, BridgeContractAddress[97]),
  4002: makeContract(ftmWeb3, BridgeABI, BridgeContractAddress[4002])
}

const tokens = [
  {
    name: 'DEUS',
    decimals: 18,
    tokenId: '1',
    balances: {
      4: '0',
      97: '0',
      4002: '0'
    },
    address: {
      4: '0xb9B5FFC3e1404E3Bb7352e656316D6C5ce6940A1',
      97: '0xf93aAFF20124C9fbEDEA364Ea17B33dfEC09b34D',
      4002: '0xb79201Cb9f758dAb0cacEd4bFADC02D9465b5Cab'
    },
    icon: 'DEUS.svg'
  },
  {
    name: 'DEA',
    tokenId: '2',
    decimals: 18,
    balances: {
      4: '0',
      97: '0',
      4002: '0'
    },
    address: {
      4: '0xb9B5FFC3e1404E3Bb7352e656316D6C5ce6940A1',
      97: '0xf93aAFF20124C9fbEDEA364Ea17B33dfEC09b34D',
      4002: '0xb79201Cb9f758dAb0cacEd4bFADC02D9465b5Cab'
    },
    icon: 'DEA.svg'
  },
  {
    name: 'BPT',
    tokenId: '3',
    decimals: 18,
    balances: {
      4: '0',
      97: '0',
      4002: '0'
    },
    address: {
      4: '0xb9B5FFC3e1404E3Bb7352e656316D6C5ce6940A1',
      97: '0xf93aAFF20124C9fbEDEA364Ea17B33dfEC09b34D',
      4002: '0xb79201Cb9f758dAb0cacEd4bFADC02D9465b5Cab'
    },
    icon: 'BPT.svg'
  },
  {
    name: 'sDEA',
    tokenId: '4',
    decimals: 18,
    balances: {
      4: '0',
      97: '0',
      4002: '0'
    },
    address: {
      4: '0xb9B5FFC3e1404E3Bb7352e656316D6C5ce6940A1',
      97: '0xf93aAFF20124C9fbEDEA364Ea17B33dfEC09b34D',
      4002: '0xb79201Cb9f758dAb0cacEd4bFADC02D9465b5Cab'
    },
    icon: 'sDEA.svg'
  },
  {
    name: 'sDEUS',
    tokenId: '5',
    decimals: 18,
    balances: {
      4: '0',
      97: '0',
      4002: '0'
    },
    address: {
      4: '0xb9B5FFC3e1404E3Bb7352e656316D6C5ce6940A1',
      97: '0xf93aAFF20124C9fbEDEA364Ea17B33dfEC09b34D',
      4002: '0xb79201Cb9f758dAb0cacEd4bFADC02D9465b5Cab'
    },
    icon: 'sDEUS.svg'
  }
]

const chains = [
  { name: 'ETH', network: 4, networkName: 'rinkeby', web3: ethWeb3 },
  { name: 'BSC', network: 97, networkName: 'bsctest', web3: bscWeb3 },
  { name: 'FTM', network: 4002, networkName: 'ftmtest', web3: ftmWeb3 }
]

const instructions = [
  {
    name: 'approve',
    title: '1 – Approve Spend',
    desc: 'Approve the spend of the asset that you intend to bridge.'
  },
  {
    name: 'deposit',
    title: '2 – Deposit to Bridge',
    desc: 'Your asset will be deposited to the bridge before you can withdraw '
  },
  {
    name: 'network',
    title: '3 – Change Network',
    desc: 'Either press the button in the bridge interface or click: Change Network'
  },
  {
    name: 'claim',
    title: '4 – Claim Token',
    desc: 'Claim your bridged token.'
  }
]

export {
  tokens,
  chains,
  instructions,
  validNetworks,
  BridgeContractAddress,
  NetworkWeb3,
  Contract
}
