import { deiDeusLpToken, deiCollateralLpToken } from "../../../constant/token"
import { ChainId } from "../../../constant/web3"

export const urls = [{
  name: 'Mint',
  link: '/stable/mint'
},
{
  name: 'Zap',
  link: '/stable/zap'
},
{
  name: 'Staking',
  link: '/stable/staking'
},
{
  name: 'Redeem',
  link: '/stable/redeem'
},
{
  name: 'Buyback & Recollateralize',
  link: '/stable/buyback-recollat'
},
]

export const StakingConfig = {
  [ChainId.RINKEBY]: [
    {
      title: "DEI-HUSD",
      depositToken: deiCollateralLpToken[ChainId.RINKEBY],
      withdrawToken: deiCollateralLpToken[ChainId.RINKEBY],
      stakingContract: "0xcb98da981680a65ef5B4f12877A4DEB35b896541"
    },
    {
      title: "DEI-DEUS",
      depositToken: deiDeusLpToken[ChainId.RINKEBY],
      withdrawToken: deiDeusLpToken[ChainId.RINKEBY],
      stakingContract: "0xcc4d8FDD8647331A9ab0BA153EA8c929cAc25245"
    }
  ],
  [ChainId.HECO]: [
    {
      title: "DEI-HUSD",
      depositToken: deiCollateralLpToken[ChainId.HECO],
      withdrawToken: deiCollateralLpToken[ChainId.HECO],
      stakingContract: "0x93a40f2652E86086238A9495B8b083c694cac0A2"
    },
    {
      title: "DEI-DEUS",
      depositToken: deiDeusLpToken[ChainId.HECO],
      withdrawToken: deiDeusLpToken[ChainId.HECO],
      stakingContract: "0x0c199524b6E7C01558342e80502Ec7175550ba48"
    }
  ],
  [ChainId.AVALANCHE]: [ //TODO
    {
      title: "DEI-DAI",
      depositToken: deiCollateralLpToken[ChainId.AVALANCHE],
      withdrawToken: deiCollateralLpToken[ChainId.AVALANCHE],
      stakingContract: "0x977E4BCAC46C3e1E39F9f8baf82E236809D17435"
    },
    {
      title: "DEI-DEUS",
      depositToken: deiDeusLpToken[ChainId.AVALANCHE],
      withdrawToken: deiDeusLpToken[ChainId.AVALANCHE],
      stakingContract: "0x085d3eB826416606Aaf83ffc4b797B3641DC5C73"
    }
  ]
}