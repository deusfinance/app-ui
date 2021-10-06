export function addToken(token, base) {
    const { address, symbol, decimals } = token
    const image = `https://${base ?? "app"}.deus.finance` + token.logo

    if (window.ethereum) {
        window.ethereum.request({
            method: 'wallet_watchAsset',
            params: {
                type: 'ERC20',
                options: {
                    address,
                    symbol,
                    decimals,
                    image,
                },
            },
        }).then((success) => {
            if (success) {
                console.log(symbol + ' successfully added to wallet!')
            } else {
                throw new Error('Something went wrong.')
            }
        }).catch(console.error)
    }
}