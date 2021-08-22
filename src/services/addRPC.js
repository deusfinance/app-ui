import { NetworksData } from '../constant/web3';

export const addRPC = async (account, chainId) => {
    console.log("called");
    console.log(account, chainId, window.ethereum, NetworksData[chainId]);
    if (!account || !chainId || !window.ethereum || !NetworksData[chainId]) return

    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: NetworksData[chainId].chainId }],
        });
    } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
            try {
                return await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [NetworksData[chainId]],
                })
            } catch (addError) {
                console.log('Something went wrong trying to add a new  network RPC: ')
                return console.error(addError)
            }
        }
        // handle other "switch" errors
        console.log('Unknown error occurred when trying to change the network RPC: ')
        console.error(switchError)
    }
}
