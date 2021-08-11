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
    stakingContract: "0x3E3Ade0aDd97E6B19129F867E255e5DEebd70cBA"
  }
]