import { ToastTransaction } from '../utils/explorers';

export const addRPC = (account, activate, chainId = 100) => {
    console.log(account, chainId)
    if (chainId === 1) {
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
    128: {
        chainId: "0x80",
        chainName: "Huobi ECO Chain Mainnet",
        nativeCurrency: {
            name: "HT",
            symbol: "HT",
            decimals: 18,
        },
        rpcUrls: ["https://http-mainnet.hecochain.com"],
        blockExplorerUrls: ["https://hecoinfo.com"],
    },
    256: {
        chainId: "0x100",
        chainName: "Huobi ECO Chain Testnet",
        nativeCurrency: {
            name: "htt",
            symbol: "htt",
            decimals: 18,
        },
        rpcUrls: ["https://http-testnet.hecochain.com"],
        blockExplorerUrls: ["https://testnet.hecoinfo.com"],
    },
}
