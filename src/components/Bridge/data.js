// step 1. set network
// step 2. ownerAddToken
// setp 3. mint token

const validNetworks = [4, 97, 4002]
const BSCContract = '0x3Fdc49a74992054e3DB67eCeC7eC7604f5c8Dfbe'
const ETHContract = '0xaB63a80776c75238fb5F63fE092f1d8C7ed4B12f'

const tokens = [
  {
    name: 'DEUS',
    tokenId: '1',
    address: {
      4: '0xb9B5FFC3e1404E3Bb7352e656316D6C5ce6940A1',
      97: '0x4Ef4E0b448AC75b7285c334e215d384E7227A2E6'
    },
    icon: 'DEUS.svg'
  },
  {
    name: 'DEA',
    tokenId: '2',
    address: {
      4: '0xb9B5FFC3e1404E3Bb7352e656316D6C5ce6940A1',
      97: '0x4Ef4E0b448AC75b7285c334e215d384E7227A2E6'
    },
    icon: 'DEA.svg'
  },
  {
    name: 'BPT',
    tokenId: '3',
    address: {
      4: '0xb9B5FFC3e1404E3Bb7352e656316D6C5ce6940A1',
      97: '0x4Ef4E0b448AC75b7285c334e215d384E7227A2E6'
    },
    icon: 'BPT.svg'
  },
  {
    name: 'sDEA',
    tokenId: '4',
    address: {
      4: '0xb9B5FFC3e1404E3Bb7352e656316D6C5ce6940A1',
      97: '0x4Ef4E0b448AC75b7285c334e215d384E7227A2E6'
    },
    icon: 'sDEA.svg'
  },
  {
    name: 'sDEUS',
    tokenId: '5',
    address: {
      4: '0xb9B5FFC3e1404E3Bb7352e656316D6C5ce6940A1',
      97: '0x4Ef4E0b448AC75b7285c334e215d384E7227A2E6'
    },
    icon: 'sDEUS.svg'
  }
]

const chains = [
  { id: 97, name: 'BSC', network: 2 },
  { id: 4, name: 'ETH', network: 1 }
  // { id: 4002, name: 'FTM', network: 3 }
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

export { ETHContract, BSCContract, tokens, chains, instructions, validNetworks }
