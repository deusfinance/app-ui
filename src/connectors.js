import { InjectedConnector } from '@web3-react/injected-connector';
// import { NetworkConnector } from '@web3-react/network-connector'
// import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
// import { INFURA_PREFIXES } from './sdk/constant';
import { Web3Provider } from '@ethersproject/providers';


const supportedChainIds = [
    1, // Mainet
    3, // Ropsten
    4, // Rinkeby
    42, // Kovan
]
export const injected = new InjectedConnector({
    supportedChainIds
})





// export function getNetwork(defaultChainId = 1) {
//     return new NetworkConnector({
//         urls: supportedChainIds.reduce(
//             (urls, chainId) =>
//                 Object.assign(urls, {
//                     [chainId]: `https://${INFURA_PREFIXES[chainId]}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
//                 }),
//             {}
//         ),
//         defaultChainId,
//     })
// }

// // export const injected = new InjectedConnector({ supportedChainIds: supportedChainIds })

// export const walletconnect = new WalletConnectConnector({
//     rpc: {
//         1: `https://${INFURA_PREFIXES[1]}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
//     },
//     bridge: 'https://bridge.walletconnect.org',
// })

// let networkLibrary
// export function getNetworkLibrary() {
//     return (networkLibrary = networkLibrary ?? new Web3Provider(network.provider))
// }