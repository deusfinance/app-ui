class Staking {
    constructor(symbol, name, address, decimal, chain, payload) {
        this.symbol = symbol
        this.name = name
        this.address = address
        this.decimal = decimal
        this.chain = chain
        this.payload = payload
    }
}

const stakings = [
    new Staking("sand_deus", "sDEUS", "0x417d16BF319B7F413E950e131D0335004536A37E", 18, 1),
    new Staking("sand_deus", "sDEUS", "0x56effe8af98593d0731dffb3cbaf177deaf04840", 18, 4),

    new Staking("sand_dea", "sDEA", "0xFd82cdf5A0212A5C838D7A69f43Ceb4A624ad7eF", 18, 1),
    new Staking("sand_dea", "sDEA", "0x4674057884ed45Dc3AE7c1994d99dc298acD1a26", 18, 4),

    new Staking("timetoken", "TimeToken", "0x982C54303622347fB3724Ee757cCF6ACc553A5f8", 18, 1),
    new Staking("timetoken", "TimeToken", "0x9ae68ce2523c624c4e9bed9b52c96d0997a99f7c", 18, 4),

    new Staking("bpt_native", "Native Balancer", "0x136193485A8f4870f31B864429a72A9037a1fCE2", 18, 1, { info: "DEA (not sealed)    38.78%\n\nsUNI DEUS-DEA       38.78%\nsDEA                7.14% \nsDEUS               7.14% \nsUNI DEA-USDC       4.08% \n sUNI DEUS-ETH       4.08%  ", balancer: true }),
    new Staking("bpt_native", "Native Balancer", "0x0000000000000000000000000000000000000000", 18, 4),

    new Staking("coinbase_usdc", "COINBASE-USDC", "0x68Bcf35cC47e6c281BD44c6e8B3Ff65327fcdeD3", 18, 1),
    new Staking("coinbase_usdc", "COINBASE-USDC", "0x0000000000000000000000000000000000000000", 18, 4),

    new Staking("deus_eth", "DEUS-ETH", "0x19945547eC934bBD8C48fA69bC78152C468CCA7a", 18, 1),
    new Staking("deus_eth", "DEUS-ETH", "0xA5dB9B35bd53dB1e6bD1E92031d6482aA17B00E9", 18, 4),

    new Staking("dea_usdc", "DEA-USDC", "0x2e3394d3CdcbaAF2bb85Fe9aB4c79CeF4d28b216", 18, 1),
    new Staking("dea_usdc", "DEA-USDC", "0x0000000000000000000000000000000000000000", 18, 4),

    new Staking("deus_dea", "DEUS-DEA", "0xEf753f6Da67B765dED917C2273cE07445e86c8D2", 18, 1),
    new Staking("deus_dea", "DEUS-DEA", "0x0000000000000000000000000000000000000000", 18, 4),

    new Staking("ampl_eth", "AMPL-ETH", "0xa3bE45e9F6c42e06231618cf45be1AB9625A591f", 18, 1),
    new Staking("ampl_eth", "AMPL-ETH", "0x0000000000000000000000000000000000000000", 18, 4),

    new Staking("deus", "DEUS", "0x15Cd5DDB1ca1A2B87B17e4fc728d904A5B43D246", 18, 1),
    new Staking("deus", "DEUS", "0xb5ab1A59fc3CD89F531E8584A45a7503AB13b3B3", 18, 4),

    new Staking("dea", "DEA", "0x1D17d697cAAffE53bf3bFdE761c90D61F6ebdc41", 18, 1),
    new Staking("dea", "DEA", "0x0000000000000000000000000000000000000000", 18, 4),

    new Staking("uni", "UNI", "0x8cd408279e966b7e7e1f0b9e5ed8191959d11a19", 18, 1),
    new Staking("uni", "UNI", "0x0000000000000000000000000000000000000000", 18, 4),

    new Staking("snx", "SNX", "0x1B043BbB372452d71503E6603Dd33b93271Bfec0", 18, 1),
    new Staking("snx", "SNX", "0x0000000000000000000000000000000000000000", 18, 4),

]