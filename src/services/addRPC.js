import { rpcConfig } from '../constant/web3';

export const addRPC = (account, activate, chainId = 100) => {
    if (account && (window.ethereum)) {
        let req = {
            method: 'wallet_addEthereumChain',
            params: [{ ...rpcConfig[chainId] }],
        }
        if (chainId < 5) {
            req = {
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: "0x" + chainId }]
            }
        }
        window.ethereum
            .request(req)
            .then((result) => {
                console.log("success");
            })
            .catch((error) => {
                console.log('We can encrypt anything without the key.');
            });
    }
}
