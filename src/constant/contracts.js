import { ChainId } from "./web3";

export const MULTICALL_NETWORKS = {
    [ChainId.ETH]: '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441',
    [ChainId.ROPSTEN]: '0x53C43764255c17BD724F74c4eF150724AC50a3ed',
    [ChainId.RINKEBY]: '0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821',
    [ChainId.FTM]: '0x63B8310c5093ac917552931D8b15d5AB6945c0a6',
    [ChainId.XDAI]: '0xb5b692a88BDFc81ca69dcB1d924f59f0413A602a',
    [ChainId.BSC]: '0xe348b292e8eA5FAB54340656f3D374b259D658b8',
    [ChainId.BSC_TESTNET]: '0xe348b292e8eA5FAB54340656f3D374b259D658b8',
    [ChainId.HECO]: '0xc9a9F768ebD123A00B52e7A0E590df2e9E998707',
    [ChainId.HECO_TESTNET]: '0x935Bfe9AfaA2Be26049ea4EDE40A3A2243361F87',
    [ChainId.MATIC]: '0x95028E5B8a734bb7E2071F96De89BABe75be9C8E',
    [ChainId.MATIC_TESTNET]: '0x9Fc8e50Eb08C1F463b45d1AFb9c261B0a1903006',
    [ChainId.AVALANCHE]: '0x0FB54156B496b5a040b51A71817aED9e2927912E',
}

export const SEALED_ADDRESS = "0xd8cb412e40447eefc7ddab672f1001c5e039f166"

export const MIGRATOR_ADDRESS = {
    [ChainId.RINKEBY]: "0x30DbC9F20f0F7FFB6CD97f4101b3f89910305A05",
    [ChainId.MATIC]: "0x30DbC9F20f0F7FFB6CD97f4101b3f89910305A05",
}

//START DEI
export const COLLATERAL_ADDRESS = {
    [ChainId.HECO]: "0x7a5a3819EcB1E481D656dAbE4a489644FBcb5844",
    [ChainId.RINKEBY]: "0x52e3462B6961ce623763EE21a20d6BA32899CA9b",
    [ChainId.AVALANCHE]: "0x9Ea9F4F8DDeb79f2b8d16EBA1Aff0306f8035919",
    [ChainId.MATIC]: "0x69AE60B749f7c679166b49409aee0375D2d42267",
}

export const ORACLE_ADDRESS = {
    [ChainId.HECO]: "0x0c94362098A5a1F5bA93BaF5B611B9da366E7Df9",
    [ChainId.RINKEBY]: "0xa2554F60ABb902c27426E84c53e679Edcf80c7F9",
    [ChainId.AVALANCHE]: "0x74864887DbCa456D6709ddeF5e43A42F80455718",
    [ChainId.MATIC]: "0xa2554F60ABb902c27426E84c53e679Edcf80c7F9",
}

export const DEI_ADDRESS = {
    [ChainId.HECO]: "0x2017F04FA02bD74712062286e2C9949F3F75a5B1",
    [ChainId.RINKEBY]: "0xDE14254d2877EbbC573D38eB61fc3fDaC9A8Ea8e",
    [ChainId.AVALANCHE]: "0x84A57Ee5D76E0faBFfFa42599A4B324096a51440",
    [ChainId.MATIC]: "0xDE14254d2877EbbC573D38eB61fc3fDaC9A8Ea8e",
}


export const DEUS_ADDRESS = {
    [ChainId.HECO]: "0x86eD67215aE62a849B5f0c900A7Ed8B9e94945B9",
    [ChainId.RINKEBY]: "0x20C714b12776744d7F35e2E0F9F4477b1117F017",
    [ChainId.AVALANCHE]: "0x33767b9bF00D2b6a1f21f47b4Ef8c3F6F1686346",
    [ChainId.MATIC]: "0x20C714b12776744d7F35e2E0F9F4477b1117F017",
}

export const DEI_POOL_ADDRESS = {
    [ChainId.HECO]: "0xAAb7c66d8857bFdC5d7Ff28290E88711BFb00cC0",
    [ChainId.RINKEBY]: "0x5dB942E60E0d38D9bD033bEC2dA83EA132C808E2",
    [ChainId.AVALANCHE]: "0xA2fCe691f555e91663A0Afb9b090Ad5f2Cc15eA1",
    [ChainId.MATIC]: "0x205D88EDdDE7Df06057f8F442783A04E70e6264a",
}

export const COLLATERAL_POOL_ADDRESS = {
    [ChainId.HECO]: "0x960690BBa6BFB18A5F05bf5399c038156aBa847d",
    [ChainId.RINKEBY]: "0x5dB942E60E0d38D9bD033bEC2dA83EA132C808E2",
    [ChainId.AVALANCHE]: "0x6eE1e9A9FAc04365236c16521008943cBA1175A3",
    [ChainId.MATIC]: "0x5dB942E60E0d38D9bD033bEC2dA83EA132C808E2",
}

export const PROXY_MINT_ADDRESS = {
    [ChainId.HECO]: "0xd25CF1D484CFE0d6DaeaF890D31AcC40b1DAc5f8",
    [ChainId.RINKEBY]: "0x24440A076e1363B62b00463A447Fcc7AE1ee9999",
    [ChainId.AVALANCHE]: "0x591832987934843AAa8e868e713A7d35b9c59c71",
    [ChainId.MATIC]: "",
}

//Staking
export const DEI_DEUS_LP = {
    [ChainId.HECO]: "0xd0B9d3A52fa1dAee082F9ac998b9fB49F6bb7a16",
    [ChainId.RINKEBY]: "0xAc439EB3F654B65e1d878BFD026C7bFa9Df97059",
    [ChainId.AVALANCHE]: "0x6c3de04c121D6754bbb963F183ab31734e6a0e9b",
    [ChainId.MATIC]: "0x579b51b1811B30734ff467B2A0Bb2B728C5295c8",
}

export const DEI_COLLATERAL_LP = {
    [ChainId.HECO]: "0xcd9383b17264D32F690E1192B5967514034b168D",
    [ChainId.RINKEBY]: "0x4AD04c1afC3E8FDD30264f7f4D3D6bb609FBe9d9",
    [ChainId.AVALANCHE]: "0x33cf66920F25e0233cd429114CfD06DA3886EEb2",
    [ChainId.MATIC]: "0xDCA65D29b20E0D487E2E25bf6fEd4170c1Ad149c",
}

export const DEI_DEUS_STAKING = {
    [ChainId.HECO]: "0x0c199524b6E7C01558342e80502Ec7175550ba48",
    [ChainId.RINKEBY]: "0x09d143A946546F63f265cA1f8907D44FfcFCf40b",
    [ChainId.AVALANCHE]: "0x085d3eB826416606Aaf83ffc4b797B3641DC5C73",
    [ChainId.MATIC]: "0x09d143A946546F63f265cA1f8907D44FfcFCf40b",
}

export const DEI_COLLATERAL_STAKING = {
    [ChainId.HECO]: "0x93a40f2652E86086238A9495B8b083c694cac0A2",
    [ChainId.RINKEBY]: "0x3B66AAA7a43961302148FCF4c9384f758bC983C8",
    [ChainId.AVALANCHE]: "0x977E4BCAC46C3e1E39F9f8baf82E236809D17435",
    [ChainId.MATIC]: "0x3B66AAA7a43961302148FCF4c9384f758bC983C8",
}

export const DEI_COLLATERAL_ZAP = {
    [ChainId.HECO]: "0xd25CF1D484CFE0d6DaeaF890D31AcC40b1DAc5f8",
    [ChainId.RINKEBY]: "0xDB04bcE11A04fc038D5C8C9324ae1507fdFCEae0",
    [ChainId.AVALANCHE]: "0x977E4BCAC46C3e1E39F9f8baf82E236809D17435",
    [ChainId.MATIC]: "0x019524eC8570909Fa08e710E45E61297f69146B3",
}
export const DEI_DEUS_ZAP = {
    [ChainId.HECO]: "0xd25CF1D484CFE0d6DaeaF890D31AcC40b1DAc5f8",
    [ChainId.RINKEBY]: "0x285AE3f93d166d7dECbc293D297Db2593C8ac384",
    [ChainId.AVALANCHE]: "0x591832987934843AAa8e868e713A7d35b9c59c71",
    [ChainId.MATIC]: "0x80eDaDe64a286c034753B58321D61e732b6Cbb1c",
}

export const MINT_PATH = {
    [ChainId.HECO]: {
        HT: ["0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f", "0xa71edc38d189767582c38a3145b5873052c3e47a", "0x0298c2b32eae4da002a15f36fdf7615bea3da047"],
        USDT: ["0xa71edc38d189767582c38a3145b5873052c3e47a", "0x0298c2b32eae4da002a15f36fdf7615bea3da047"]
    },
    [ChainId.AVALANCHE]: {
        AVAX: ["0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7", "0x9Ea9F4F8DDeb79f2b8d16EBA1Aff0306f8035919"],
        USDT: ["0xc7198437980c041c805A1EDcbA50c1Ce5db95118", "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7", "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70"],
        WETH: ["0xa71edc38d189767582c38a3145b5873052c3e47a", "0x0298c2b32eae4da002a15f36fdf7615bea3da047"],
    },
    [ChainId.MATIC]: {
        DEUS: ["0x5976D7ABc3d7e057cbFf6e210580fCce994964E8", "0x0E08f54B1334757518330Fab17410b074194e55F", "0x0eF52C70fB995d0334fcBc98F4a3b2e6B1f062F5"],
    },
    [ChainId.RINKEBY]: {
        DEUS: [DEUS_ADDRESS[ChainId.RINKEBY], DEI_ADDRESS[ChainId.RINKEBY]],
        ETH: ["0xc778417e063141139fce010982780140aa0cd5ab", COLLATERAL_ADDRESS[ChainId.RINKEBY]],
        USDC: [COLLATERAL_ADDRESS[ChainId.RINKEBY]],
        HUSD: ["0x8313949568A16b2Cc786Af26F363071777Af4b8b", COLLATERAL_ADDRESS[ChainId.RINKEBY]],
        DEI: [DEI_ADDRESS[ChainId.RINKEBY], COLLATERAL_ADDRESS[ChainId.RINKEBY]],
    },
}
//END DEI