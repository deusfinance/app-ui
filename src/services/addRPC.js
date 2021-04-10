import { injected } from '../connectors';
import { toast } from 'react-toastify';

export const addRPC = (account, activate, chainId = 100) => {
    console.log(account, chainId)
    if (chainId === 1) {
        toast.info("Please switch your network to Mainnet manually.", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: false
        });
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
                setTimeout(() => {
                    try {
                        activate(injected)
                    } catch (error) {
                        console.log("error ", error);
                    }
                }, 500)
            })
            .catch((error) => {
                console.log('We can encrypt anything without the key.');
            });
    }
}

const NetworksData = {
    1: {
        chainId: "0x1",
        chainName: "Ethereum Mainnet",
        nativeCurrency: {
            name: "ETH",
            symbol: "ETH",
            decimals: 18,
        },
        rpcUrls: ["https://mainnet.infura.io/v3/undefined"],
        blockExplorerUrls: ["https://etherscan.io/"],
        iconUrls: []

    },
    100: {
        chainId: "0x64",
        chainName: "xDAI Chain",
        nativeCurrency: {
            name: "xDAI",
            symbol: "xDAI",
            decimals: 18,
        },
        rpcUrls: ["https://rpc.xdaichain.com/"],
        blockExplorerUrls: ["https://blockscout.com/poa/xdai/"],
        iconUrls: ["https://app.deus.finance/tokens/xdai.svg"]
    },
    56: {
        chainId: "0x38",
        chainName: "Binance Smart Chain Mainnet",
        nativeCurrency: {
            name: "BNB",
            symbol: "BNB",
            decimals: 18,
        },
        rpcUrls: ["https://bsc-dataseed1.binance.org"],
        blockExplorerUrls: ["https://bscscan.com"],
    },
    97: {
        chainId: "0x61",
        chainName: "Binance Smart Chain Testnet",
        nativeCurrency: {
            name: "BNB",
            symbol: "BNB",
            decimals: 18,
        },
        rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
        blockExplorerUrls: ["https://testnet.bscscan.com"],
    },
}
