import { deiDeusLpToken, deiHusdLpToken } from "../../../constant/token"
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
      depositToken: deiHusdLpToken[ChainMap.RINKEBY],
      withdrawToken: deiHusdLpToken[ChainMap.RINKEBY],
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
      depositToken: deiHusdLpToken[ChainMap.HECO],
      withdrawToken: deiHusdLpToken[ChainMap.HECO],
      stakingContract: "0x93a40f2652E86086238A9495B8b083c694cac0A2"
    },
    {
      title: "DEI-DEUS-LP",
      depositToken: deiDeusLpToken[ChainMap.HECO],
      withdrawToken: deiDeusLpToken[ChainMap.HECO],
      stakingContract: "0x0c199524b6E7C01558342e80502Ec7175550ba48"
    }
  ]
}