class Vault {
    constructor(symbol, name, decimal, address, chain) {
        this.symbol = symbol
        this.name = name
        this.decimal = decimal
        this.address = address
        this.chain = chain
    }
}

const vaults = [
    new Vault("deus_dea", "UNI-LP-DEUS-DEA", 18, "0xEC7269Ebb7D219C905c28E3fD5Cc35F30dfB870b", 1),
    new Vault("deus_dea", "UNI-LP-DEUS-DEA", 18, "0xeb858a657b53cdc80ce287ee52e89a4e0695616b", 4),

    new Vault("deus_eth", "UNI-LP-DEUS-ETH", 18, "0xc8c91801Bed699598b5483F2ad55f89eBd35157F", 1),
    new Vault("deus_eth", "UNI-LP-DEUS-ETH", 18, "0xeb858a657b53cdc80ce287ee52e89a4e0695616b", 4),

    new Vault("dea_usdc", "UNI-LP-DEA-USDC", 18, "0x4D01703442509233eFa9879E638278a59b4A5EBB", 1),
    new Vault("dea_usdc", "UNI-LP-DEA-USDC", 18, "0xeb858a657b53cdc80ce287ee52e89a4e0695616b", 4),

    new Vault("deus", "DEUS", 18, "0xF8bcAF889F60E3d277EA0139e75047a0301D3307", 1),
    new Vault("deus", "DEUS", 18, "0x09cb978bb7e6fb5583fc9107f92214451f6296a5", 4),

    new Vault("dea", "DEA", 18, "0x1591Da306e9726CF8a60BfF1CE96d7714D7b24cd", 1),
    new Vault("dea", "DEA", 18, "0x6ba4ead0115f3c9239d596fe4bb7c242a39f62f0", 4),
]

export default vaults