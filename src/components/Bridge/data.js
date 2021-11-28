import { makeContract } from '../../utils/Stakefun'
import { BridgeABI } from '../../utils/StakingABI'
import { BRIDGE_ADDRESS } from '../../constant/contracts'
import Web3 from 'web3'

const blockTimes = {
  1: 24,
  137: 256,
}

const bscWeb3 = new Web3(
  new Web3.providers.HttpProvider(
    'https://data-seed-prebsc-1-s1.binance.org:8545/'
  )
)

const ethWeb3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://rinkeby.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`
  )
)

const NetworkWeb3 = {
  4: ethWeb3,
  97: bscWeb3
}

const Contract = {
  4: makeContract(ethWeb3, BridgeABI, BRIDGE_ADDRESS[4]),
  97: makeContract(bscWeb3, BridgeABI, BRIDGE_ADDRESS[97])
}

const tokens = [
  {
    name: 'DEI',
    decimals: 18,
    tokenId: '0',
    balances: {
      4: '0',
      97: '0',
      1: '0',
      137: '0'
    },
    address: {
      4: '0x43922ea6ef5995e94680000ed9e20b68974cd902',
      97: '0x15633ea478d0272516b763c25e8e62a9e43ae28a',
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
      4: '0',
      97: '0',
     1: '0',
      137: '0'
    },
    address: {
      4: '0x63461Bc35341523b319c12a366A9E9af24Eea6Eb',
      97: '0x1c2a9D1F6284EC5f4424e7FC2f1dAD12822b4e32',
      1: '0xDE5ed76E7c05eC5e4572CfC88d1ACEA165109E44',
      137: '0xDE5ed76E7c05eC5e4572CfC88d1ACEA165109E44',
    },
    icon: '/tokens/deus.svg'
  },
]

const chains = [
  { name: 'ETH', network: 1, networkName: 'eth'},
  { name: 'POLYGON', network: 137, networkName: 'polygon' },
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
  NetworkWeb3,
  Contract,
  blockTimes
}
