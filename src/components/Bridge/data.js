import { ChainId } from '../../constant/web3'

const blockTimes = {
  [ChainId.ETH]: 24,
  [ChainId.MATIC]: 256,
  [ChainId.FTM]: 6,
  [ChainId.BSC]: 30,
  [ChainId.BSC_TESTNET]: 30,
  [ChainId.RINKEBY]: 24,
}

const tokens = [
  {
    name: 'DEI',
    decimals: 18,
    tokenId: '0',
    balances: {
      [ChainId.BSC]: '0',
      [ChainId.FTM]: '0',
      [ChainId.ETH]: '0',
      [ChainId.MATIC]: '0'
    },
    address: {
      [ChainId.BSC]: "0xDE12c7959E1a72bbe8a5f7A1dc8f8EeF9Ab011B3",
      [ChainId.FTM]: "0xDE12c7959E1a72bbe8a5f7A1dc8f8EeF9Ab011B3",
      [ChainId.ETH]: "0xDE12c7959E1a72bbe8a5f7A1dc8f8EeF9Ab011B3",
      [ChainId.MATIC]: "0xDE12c7959E1a72bbe8a5f7A1dc8f8EeF9Ab011B3",
    },
    icon: '/tokens/dei.svg'
  },
  {
    name: 'DEUS',
    decimals: 18,
    tokenId: '1',
    balances: {
      [ChainId.BSC]: '0',
      [ChainId.FTM]: '0',
      [ChainId.ETH]: '0',
      [ChainId.MATIC]: '0'
    },
    address: {
      [ChainId.BSC]: '0xDE5ed76E7c05eC5e4572CfC88d1ACEA165109E44',
      [ChainId.FTM]: '0xDE5ed76E7c05eC5e4572CfC88d1ACEA165109E44',
      [ChainId.ETH]: '0xDE5ed76E7c05eC5e4572CfC88d1ACEA165109E44',
      [ChainId.MATIC]: '0xDE5ed76E7c05eC5e4572CfC88d1ACEA165109E44',
    },
    icon: '/tokens/deus.svg'
  },
  {
    name: 'TT',
    decimals: 18,
    tokenId: '2',
    balances: {
      [ChainId.BSC]: '0',
      [ChainId.FTM]: '0',
      [ChainId.ETH]: '0',
      [ChainId.MATIC]: '0',
      [ChainId.RINKEBY]: '0',
      [ChainId.BSC_TESTNET]: '0',
    },
    address: {
      [ChainId.BSC]: "0xDE12c7959E1a72bbe8a5f7A1dc8f8EeF9Ab011B3",
      [ChainId.FTM]: "0xDE12c7959E1a72bbe8a5f7A1dc8f8EeF9Ab011B3",
      [ChainId.ETH]: "0xDE12c7959E1a72bbe8a5f7A1dc8f8EeF9Ab011B3",
      [ChainId.MATIC]: "0xDE12c7959E1a72bbe8a5f7A1dc8f8EeF9Ab011B3",
      [ChainId.RINKEBY]: "0x4b16E272421FD67E6D41a14ac27789AB2AFE7bcb",
      [ChainId.BSC_TESTNET]: "0x39a571d0FF892aF5e5780AF286f5152784d15A9f",
    },
    icon: '/tokens/dei.svg'
  },
]

const chains = [
  { name: 'ETH', network: ChainId.ETH, networkName: 'eth' },
  { name: 'POLYGON', network: ChainId.MATIC, networkName: 'polygon' },
  { name: 'BSC', network: ChainId.BSC, networkName: 'bsc' },
  { name: 'FTM', network: ChainId.FTM, networkName: 'ftm' },
  // { name: 'BSC_TESTNET', network: ChainId.BSC_TESTNET, networkName: 'bsc test' },
  // { name: 'RINKEBY', network: ChainId.RINKEBY, networkName: 'rinkeby' },
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

export { tokens, chains, instructions, blockTimes }
