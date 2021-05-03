import { nodes } from './getRpcUrl'

export const setupNetwork = async () => {
    const provider = window.ethereum
    if (provider) {
        const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10)
        try {
            await provider.request({
                method: 'wallet_addEthereumChain',
                params: [
                    {
                        chainId: `0x${chainId.toString(16)}`,
                        chainName: 'Binance Smart Chain Mainnet',
                        nativeCurrency: {
                            name: 'BNB',
                            symbol: 'bnb',
                            decimals: 18,
                        },
                        rpcUrls: nodes,
                        blockExplorerUrls: ['https://bscscan.com/'],
                    },
                ],
            })
            return true
        } catch (error) {
            console.error(error)
            return false
        }
    } else {
        console.error("Can't setup the BSC network on metamask because window.ethereum is undefined")
        return false
    }
}

export const registerToken = async (
    tokenAddress,
    tokenSymbol,
    tokenDecimals,
    tokenImage,
) => {
    const tokenAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
            type: 'ERC20',
            options: {
                address: tokenAddress,
                symbol: tokenSymbol,
                decimals: tokenDecimals,
                image: tokenImage,
            },
        },
    })

    return tokenAdded
}