import { ChainId } from '../../constant/web3'

const blockTimes = {
  1: 24,
  137: 256,
  250: 6,
  57: 30,
  97: 30,
  4: 24,
}

const tokens = [
  {
    name: 'DEI',
    decimals: 18,
    tokenId: '0',
    balances: {
      56: '0',
      250: '0',
      1: '0',
      137: '0'
    },
    address: {
      56: "0xDE12c7959E1a72bbe8a5f7A1dc8f8EeF9Ab011B3",
      250: "0xDE12c7959E1a72bbe8a5f7A1dc8f8EeF9Ab011B3",
      1: "0xDE12c7959E1a72bbe8a5f7A1dc8f8EeF9Ab011B3",
      137: "0xDE12c7959E1a72bbe8a5f7A1dc8f8EeF9Ab011B3",
    },
    icon: '/tokens/dei.svg'
  },
  {
    name: 'DEUS',
    decimals: 18,
    tokenId: '1',
    balances: {
      56: '0',
      250: '0',
      1: '0',
      137: '0'
    },
    address: {
      56: '0xDE5ed76E7c05eC5e4572CfC88d1ACEA165109E44',
      250: '0xDE5ed76E7c05eC5e4572CfC88d1ACEA165109E44',
      1: '0xDE5ed76E7c05eC5e4572CfC88d1ACEA165109E44',
      137: '0xDE5ed76E7c05eC5e4572CfC88d1ACEA165109E44',
    },
    icon: '/tokens/deus.svg'
  },
  {
    name: 'TT',
    decimals: 18,
    tokenId: '2',
    balances: {
      56: '0',
      250: '0',
      1: '0',
      137: '0',
      4: '0',
      97: '0',
    },
    address: {
      56: "0xDE12c7959E1a72bbe8a5f7A1dc8f8EeF9Ab011B3",
      250: "0xDE12c7959E1a72bbe8a5f7A1dc8f8EeF9Ab011B3",
      1: "0xDE12c7959E1a72bbe8a5f7A1dc8f8EeF9Ab011B3",
      137: "0xDE12c7959E1a72bbe8a5f7A1dc8f8EeF9Ab011B3",
      4: "0x4b16E272421FD67E6D41a14ac27789AB2AFE7bcb",
      97: "0x39a571d0FF892aF5e5780AF286f5152784d15A9f",
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
