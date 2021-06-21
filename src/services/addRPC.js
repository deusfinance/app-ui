import { ChainMap, NetworksData } from '../constant/web3';
import { ToastTransaction } from '../utils/explorers';

export const addRPC = (account, activate, chainId = 100) => {
    console.log(account, chainId)
    if (chainId === ChainMap.MAINNET || chainId === ChainMap.RINKEBY) {
        ToastTransaction("info", "Switch Network", "Please switch your network to ETH chains manually.", { autoClose: true })
        return
    }
    if (account && (window.ethereum)) {
        window.ethereum
            .request({
                method: 'wallet_addEthereumChain',
                params: [{ ...NetworksData[chainId] }],
            })
            .then((result) => {
                console.log("success");
            })
            .catch((error) => {
                console.log('We can encrypt anything without the key.');
            });
    }
}
