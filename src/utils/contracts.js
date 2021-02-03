class Contract {
    constructor(name, address, chain) {
        this.name = name
        this.address = address
        this.chain = chain
    }
}

const contracts = [
    new Contract("uniswap_router", "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", 1),
    new Contract("uniswap_router", "0x000000000000000000000000000000000000000", 4),

    new Contract("deus_swap_contract", "0x1162FA0e82cA0d6962d1C12AE4D99EF5733036a5", 1),
    new Contract("deus_swap_contract", "0xd32969c96e51B77b87C1dEbdD381c0E743814B3F", 4),

    new Contract("sps", "0x9b9d41172854c753f066f1089781435f16aeb631", 1),
    new Contract("sps", "0xc2f6C57bD82C3d356f4aA05018E9d434a6ba2cA7", 4),

    new Contract("amm", "0xD77700fC3C78d1Cb3aCb1a9eAC891ff59bC7946D", 1),
    new Contract("amm", "0x6D3459E48C5D106e97FeC08284D56d43b00C2AB4", 4),

    new Contract("stocks_contract", "0x00000000000000000000000000000000000", 1),
    new Contract("stocks_contract", "0xE7d50574C1aCa5b25710990E12919ff9d4c66589", 4),

]

export default contracts