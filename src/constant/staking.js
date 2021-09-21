import { deiDeusLpToken, deiCollateralLpToken } from "./token"
import { ChainId } from "./web3"

export const urls = [{
  name: 'Mint',
  link: '/stable/mint'
},
{
  name: 'Redeem',
  link: '/stable/redeem'
},
{
  name: 'Zap',
  link: '/stable/zap'
},
{
  name: 'Farms',
  link: '/stable/farms'
},
{
  name: 'Buyback & Recollateralize',
  link: '/stable/buyback-recollat'
},
]

export const StakingConfig = {
  [ChainId.RINKEBY]: [
    {
      title: "DEI-USDC",
      pic1: "/tokens/dei.svg",
      pic2: "/tokens/usdc.svg",
      depositToken: deiCollateralLpToken[ChainId.RINKEBY],
      stakingContract: "0x9e0a047994f5C4d46Da1678039CC6101DecD8412",
      zapperContract: "0x9e0a047994f5C4d46Da1678039CC6101DecD8412",

    },
    {
      title: "DEI-DEUS",
      pic1: "/tokens/dei.svg",
      pic2: "/tokens/deus.svg",
      depositToken: deiDeusLpToken[ChainId.RINKEBY],
      stakingContract: "0x9d11aE78B850D1505164127F177F6Bfa9347617E",
      zapperContract: "0x9d11aE78B850D1505164127F177F6Bfa9347617E",
    }
  ],
  [ChainId.HECO]: [
    {
      title: "DEI-HUSD",
      pic1: "/tokens/dei.svg",
      pic2: "/tokens/husd.svg",
      depositToken: deiCollateralLpToken[ChainId.HECO],
      stakingContract: "0x93a40f2652E86086238A9495B8b083c694cac0A2"
    },
    {
      title: "DEI-DEUS",
      pic1: "/tokens/dei.svg",
      pic2: "/tokens/deus.svg",
      depositToken: deiDeusLpToken[ChainId.HECO],
      stakingContract: "0x0c199524b6E7C01558342e80502Ec7175550ba48"
    }
  ],
  [ChainId.AVALANCHE]: [
    {
      title: "DEI-DAI",
      pic1: "/tokens/dei.svg",
      pic2: "/tokens/dai.png",
      depositToken: deiCollateralLpToken[ChainId.AVALANCHE],
      stakingContract: "0x977E4BCAC46C3e1E39F9f8baf82E236809D17435",
      zapperContract: "0x0C13f5cd27fcf3C4eB9b90f1bD261cD0B7Ac987F",

    },
    {
      title: "DEI-DEUS",
      pic1: "/tokens/dei.svg",
      pic2: "/tokens/deus.svg",
      depositToken: deiDeusLpToken[ChainId.AVALANCHE],
      stakingContract: "0x085d3eB826416606Aaf83ffc4b797B3641DC5C73",
      zapperContract: "0x8a833926E9b7ca23193D98A35831b67C85Aa521E",
    }
  ],
  [ChainId.MATIC]: [
    {
      title: "DEI-DAI",
      pic1: "/tokens/dei.svg",
      pic2: "/tokens/dai.png",
      depositToken: deiCollateralLpToken[ChainId.MATIC],
      stakingContract: "0xa775c8392cED560010a52487133e58D07566336a",
      zapperContract: "0xa775c8392cED560010a52487133e58D07566336a",

    },
    {
      title: "DEI-DEUS",
      pic1: "/tokens/dei.svg",
      pic2: "/tokens/deus.svg",
      depositToken: deiDeusLpToken[ChainId.MATIC],
      stakingContract: "0x344bF33411A008D45838f08B4974C946aD207D2e",
      zapperContract: "0x344bF33411A008D45838f08B4974C946aD207D2e",
    }
  ],
}