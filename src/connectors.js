import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { FrameConnector } from '@web3-react/frame-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { FortmaticConnector } from '@web3-react/fortmatic-connector'
import { ChainMap } from './constant/web3'

const supportedChainIds = Object.values(ChainMap)
const INFURA_KEY = process.env.REACT_APP_INFURA_KEY
const FORTMATIC_KEY = process.env.REACT_APP_FORTMATIC_KEY

const RPC_URLS = {
  1: 'https://mainnet.infura.io/v3/' + INFURA_KEY,
  4: 'https://rinkeby.infura.io/v3/' + INFURA_KEY,
  56: 'https://bsc-dataseed1.binance.org',
  97: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  100: 'https://rpc.xdaichain.com',
  4002: 'https://rpc.testnet.fantom.network/',
  128: 'https://http-mainnet-node.huobichain.com',
  256: 'https://http-testnet.hecochain.com',
  250: 'https://rpcapi.fantom.network'
}

export const injected = new InjectedConnector({
  supportedChainIds
})

const POLLING_INTERVAL = 15000

//only mainnet (walletconnect only one chain supports)
export const walletconnect = new WalletConnectConnector({
  rpc: {
    1: RPC_URLS[1],
    56: RPC_URLS[56],
    100: RPC_URLS[100]
  },
  // bridge: 'https://bridge.walletconnect.org',
  // qrcode: true,
  pollingInterval: POLLING_INTERVAL
})

export const walletlink = new WalletLinkConnector({
  url: RPC_URLS[1],
  appName: 'app.deus.finance'
})

export const fortmatic = new FortmaticConnector({
  apiKey: FORTMATIC_KEY,
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
  // [ConnectorNames.Frame]: frame, // api keys are missing
  [ConnectorNames.Fortmatic]: fortmatic
}
