import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { FrameConnector } from '@web3-react/frame-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { FortmaticConnector } from '@web3-react/fortmatic-connector'

const supportedChainIds = [
  1, // Mainet
  3, // Ropsten
  4, // Rinkeby
  42, // Kovan
  0x64, // xDAI
  0x38, // BSC
  0x61, // BSC TEST
  250, // Fantom
  4002 // Fantom TEST
]

const RPC_URLS = {
  1: 'https://mainnet.infura.io/v3/cf6ea736e00b4ee4bc43dfdb68f51093',
  4: 'https://rinkeby.infura.io/v3/cf6ea736e00b4ee4bc43dfdb68f51093',
  56: 'https://bsc-dataseed1.binance.org',
  97: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  100: 'https://rpc.xdaichain.com',
  4002: 'https://rpc.testnet.fantom.network/',
  250: 'https://rpcapi.fantom.network'
}

export const injected = new InjectedConnector({
  supportedChainIds
})

const POLLING_INTERVAL = 2000

//only mainnet (walletconnect only one chain supports)
export const walletconnect = new WalletConnectConnector({
  rpc: { 1: RPC_URLS[1] },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL
})

export const walletlink = new WalletLinkConnector({
  url: RPC_URLS[1],
  appName: 'app.deus.finance'
})

export const fortmatic = new FortmaticConnector({
  apiKey: 'pk_live_643EBE31BE0118DA',
  chainId: 1
})

export const frame = new FrameConnector({ supportedChainIds: [1] })

export const ConnectorNames = {
  Injected: 'MetaMask',
  Network: 'Network',
  WalletConnect: 'WalletConnect',
  WalletLink: 'WalletLink',
  Ledger: 'Ledger',
  Trezor: 'Trezor',
  Lattice: 'Lattice',
  Frame: 'Frame',
  Fortmatic: 'Fortmatic'
}

export const connectorsByName = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.WalletLink]: walletlink,
  [ConnectorNames.Frame]: frame,
  [ConnectorNames.Fortmatic]: fortmatic
  // [ConnectorNames.Network]: network,
}
