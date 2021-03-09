export const addRPC = (account) => {
    if (account && (window.ethereum))
        window.ethereum
            .request({
                method: 'wallet_addEthereumChain',
                params: [
                    {
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
                    }
                ],
            })
            .then((result) => {
                console.log("success");
            })
            .catch((error) => {
                console.log('We can encrypt anything without the key.');
            });
}