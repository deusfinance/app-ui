export function shortenHex(hex, length = 4) {
    return `${hex.substring(0, length + 2)}…${hex.substring(hex.length - length)}`
}

export function getTokenName(token) {
    return token.equals(WETH[token.chainId]) ? 'ETH' : token.symbol ?? 'UNKNOWN'
}
