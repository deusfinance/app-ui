import { InjectedConnector } from '@web3-react/injected-connector';

export const injected = new InjectedConnector({
    supportedChainIds: [
        1, // Mainet
        3, // Ropsten
        4, // Rinkeby
        5, // Goerli
        42, // Kovan
    ]
})