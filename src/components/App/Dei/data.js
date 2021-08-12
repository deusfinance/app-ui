import { deiToken } from "../../../constant/token"

export const urls = [{
  name: 'Mint',
  link: '/dei/mint'
},
{
  name: 'Staking',
  link: '/dei/staking'
},
{
  name: 'Redeem',
  link: '/dei/redeem'
},
{
  name: 'Buyback & Recollateralize',
  link: '/dei/buyback-recollat'
},
]

export const StakingConfig = [
  {
    title: "DEI-HUSD-LP",
    depositToken: deiToken,
    withdrawToken: deiToken,
    stakingContract: "0xcb98da981680a65ef5B4f12877A4DEB35b896541"
  },
  {
    title: "DEI-DEUS-LP",
    depositToken: deiToken,
    withdrawToken: deiToken,
    stakingContract: "0xcc4d8FDD8647331A9ab0BA153EA8c929cAc25245"
  },
]