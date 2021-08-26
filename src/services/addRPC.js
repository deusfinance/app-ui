import { rpcConfig } from '../constant/web3';

export const addRPC = async (account, chainId, provider) => {

    const web3 = provider?.currentProvider ?? window.ethereum
    if (!account || !chainId || !web3 || !rpcConfig[chainId]) return

    web3
        .request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: rpcConfig[chainId].chainId }],
        })
        .then((result) => {
            console.log("Successfully switched");
        })
        .catch((switchError) => {
            if (switchError.code === 4902) {
                web3
                    .request({
                        method: 'wallet_addEthereumChain',
                        params: [rpcConfig[chainId]],
                    })
                    .then((result) => {
                        console.log("Successfully added");
                    })
                    .catch((error) => {
                        console.log('Something went wrong trying to add a new  network RPC: ')
                        return console.error(error)
                    })
            }
            console.log('Unknown error occurred when trying to change the network RPC: ')
            console.error(switchError)
        })
}
