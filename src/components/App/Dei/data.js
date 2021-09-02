import { deiDeusLpToken, deiCollateralLpToken } from "../../../constant/token"
import { ChainMap } from "../../../constant/web3"

export const urls = [{
  name: 'Mint',
  link: '/stable/mint'
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
  [ChainMap.RINKEBY]: [
    {
      title: "DEI-HUSD-LP",
      depositToken: deiCollateralLpToken[ChainMap.RINKEBY],
      withdrawToken: deiCollateralLpToken[ChainMap.RINKEBY],
      stakingContract: "0xcb98da981680a65ef5B4f12877A4DEB35b896541"
    },
    {
      title: "DEI-DEUS-LP",
      depositToken: deiDeusLpToken[ChainMap.RINKEBY],
      withdrawToken: deiDeusLpToken[ChainMap.RINKEBY],
      stakingContract: "0xcc4d8FDD8647331A9ab0BA153EA8c929cAc25245"
    }
  ],
  [ChainMap.HECO]: [
    {
      title: "DEI-HUSD-LP",
      depositToken: deiCollateralLpToken[ChainMap.HECO],
      withdrawToken: deiCollateralLpToken[ChainMap.HECO],
      stakingContract: "0x93a40f2652E86086238A9495B8b083c694cac0A2"
    },
    {
      title: "DEI-DEUS-LP",
      depositToken: deiDeusLpToken[ChainMap.HECO],
      withdrawToken: deiDeusLpToken[ChainMap.HECO],
      stakingContract: "0x0c199524b6E7C01558342e80502Ec7175550ba48"
    }
  ],
  [ChainMap.AVALANCHE]: [ //TODO
    {
      title: "DEI-DAI-LP",
      depositToken: deiCollateralLpToken[ChainMap.AVALANCHE],
      withdrawToken: deiCollateralLpToken[ChainMap.AVALANCHE],
      stakingContract: "0x977E4BCAC46C3e1E39F9f8baf82E236809D17435"
    },
    {
      title: "DEI-DEUS-LP",
      depositToken: deiDeusLpToken[ChainMap.AVALANCHE],
      withdrawToken: deiDeusLpToken[ChainMap.AVALANCHE],
      stakingContract: "0x085d3eB826416606Aaf83ffc4b797B3641DC5C73"
    }
  ]
}