// Deploy muon
// 1. ownerAddSigner(muon_node_1/2/3)

// Deploy bridge
// step 1. set network
// step 2. ownerAddToken
// setp 3. mint token
// setp 4. ownerSetSideContract

const validNetworks = [4, 97, 4002]

const MUON_NODE_1 = '0x06A85356DCb5b307096726FB86A78c59D38e08ee'
const MUON_NODE_2 = '0x4513218Ce2e31004348Fd374856152e1a026283C'
const MUON_NODE_3 = '0xe4f507b6D5492491f4B57f0f235B158C4C862fea'

const BSCMuon = '0xA740811dBA35B719DAc61395A913dE67AA60a415'
const ETHMuon = '0xf0A7580d99E71785C892080Ac29E2F653B00d63d'
const FTMMuon = '0x73349C38E06470a55901e3388006C68Ce4140D97'

const BSCContract = '0x5D91EA00E414BB113C8ECe6674F84C906BD8b5D4'
const ETHContract = '0x42196Ecdd7fa421706Cb9CEA0BBE560fc05D3248'
const FTMContract = '0x4Cf8106B486A5b6df8FB748c94EB129c104fdba4'

const tokens = [
  {
    name: 'DEUS',
    tokenId: '1',
    address: {
      4: '0xb9B5FFC3e1404E3Bb7352e656316D6C5ce6940A1',
      97: '0x4Ef4E0b448AC75b7285c334e215d384E7227A2E6',
      4002: '0x91E32eE7799F20e6b89A36CdaA7fa12d5f482781'
    },
    icon: 'DEUS.svg'
  },
  {
    name: 'DEA',
    tokenId: '2',
    address: {
      4: '0xb9B5FFC3e1404E3Bb7352e656316D6C5ce6940A1',
      97: '0x4Ef4E0b448AC75b7285c334e215d384E7227A2E6',
      4002: '0x91E32eE7799F20e6b89A36CdaA7fa12d5f482781'
    },
    icon: 'DEA.svg'
  },
  {
    name: 'BPT',
    tokenId: '3',
    address: {
      4: '0xb9B5FFC3e1404E3Bb7352e656316D6C5ce6940A1',
      97: '0x4Ef4E0b448AC75b7285c334e215d384E7227A2E6',
      4002: '0x91E32eE7799F20e6b89A36CdaA7fa12d5f482781'
    },
    icon: 'BPT.svg'
  },
  {
    name: 'sDEA',
    tokenId: '4',
    address: {
      4: '0xb9B5FFC3e1404E3Bb7352e656316D6C5ce6940A1',
      97: '0x4Ef4E0b448AC75b7285c334e215d384E7227A2E6',
      4002: '0x91E32eE7799F20e6b89A36CdaA7fa12d5f482781'
    },
    icon: 'sDEA.svg'
  },
  {
    name: 'sDEUS',
    tokenId: '5',
    address: {
      4: '0xb9B5FFC3e1404E3Bb7352e656316D6C5ce6940A1',
      97: '0x4Ef4E0b448AC75b7285c334e215d384E7227A2E6',
      4002: '0x91E32eE7799F20e6b89A36CdaA7fa12d5f482781'
    },
    icon: 'sDEUS.svg'
  }
]

const chains = [
  { id: 97, name: 'BSC', network: 2 },
  { id: 4, name: 'ETH', network: 1 },
  { id: 4002, name: 'FTM', network: 3 }
]

const instructions = [
  {
    name: 'approve',
    title: '1 – Approve Spend',
    desc: 'Approve the spend of the asset that you intend to bridge.'
  },
  {
    name: 'deposit',
    title: '2 – Deposit',
    desc: 'Your asset will be deposited to the bridge before you can withdraw '
  },
  {
    name: 'network',
    title: '3 – Change Network',
    desc: 'Either press the button in the bridge interface or click: Change Network'
  },
  {
    name: 'bridge',
    title: '4 – Initiate Bridging',
    desc: 'Initiate bridging to the new network by pressing the button in the interface.'
  },
  {
    name: 'claim',
    title: '5 – Claim on destination Network',
    desc: 'Claim your bridged token.'
  }
]

const getTxABI = [
  {
    inputs: [{ internalType: 'uint256', name: '_txId', type: 'uint256' }],
    name: 'getTx',
    outputs: [
      { internalType: 'uint256', name: 'txId', type: 'uint256' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'uint256', name: 'fromChain', type: 'uint256' },
      { internalType: 'uint256', name: 'toChain', type: 'uint256' },
      { internalType: 'address', name: 'user', type: 'address' }
    ],
    stateMutability: 'view',
    type: 'function'
  }
]

export {
  ETHContract,
  BSCContract,
  FTMContract,
  tokens,
  chains,
  instructions,
  validNetworks
}
