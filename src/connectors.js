import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
// import { PortisConnector } from '@web3-react/portis-connector'
import { FrameConnector } from '@web3-react/frame-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { FortmaticConnector } from '@web3-react/fortmatic-connector'

// const networkNames = {
//     1: "Mainnet",
//     3: "Ropsten",
//     4: "Rinkeby",
//     42: "Kovan",
// }



const supportedChainIds = [
    1, // Mainet
    3, // Ropsten
    4, // Rinkeby
    42, // Kovan
]


const RPC_URLS = {
    1: "wss://Mainnet.infura.io/ws/v3/cf6ea736e00b4ee4bc43dfdb68f51093",
    4: "wss://Rinkeby.infura.io/ws/v3/cf6ea736e00b4ee4bc43dfdb68f51093"
}

export const injected = new InjectedConnector({
    supportedChainIds
})

const POLLING_INTERVAL = 2000

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

export const fortmatic = new FortmaticConnector({ apiKey: "pk_live_643EBE31BE0118DA", chainId: 1 })


export const frame = new FrameConnector({ supportedChainIds: [1] })


export const ConnectorNames = {
    Injected: 'Metamask',
    Network: 'Network',
    WalletConnect: 'WalletConnect',
    WalletLink: 'WalletLink',
    Ledger: 'Ledger',
    Trezor: 'Trezor',
    Lattice: 'Lattice',
    Frame: 'Frame',
    Authereum: 'Authereum',
    Fortmatic: 'Fortmatic',
    Magic: 'Magic',
    Portis: 'Portis',
    Torus: 'Torus'
}


export const connectorsByName = {
    [ConnectorNames.Injected]: injected,
    // [ConnectorNames.Network]: network,
    [ConnectorNames.WalletConnect]: walletconnect,
    [ConnectorNames.WalletLink]: walletlink,
    // [ConnectorNames.Ledger]: ledger,
    // [ConnectorNames.Trezor]: trezor,
    // [ConnectorNames.Lattice]: lattice,
    [ConnectorNames.Frame]: frame,
    // [ConnectorNames.Authereum]: authereum,
    [ConnectorNames.Fortmatic]: fortmatic,
    // [ConnectorNames.Magic]: magic,
    // [ConnectorNames.Portis]: portis,
    // [ConnectorNames.Torus]: torus
}