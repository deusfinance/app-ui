import { deiHusdLpToken } from "../../../constant/token"

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

export const StakingInfo = [
  {
    title: "DEI-HUSD",
    token: deiHusdLpToken,
    stakingContract: "0xeC954bBdb8436Dc52e05b965bBECbd795bc6E027"
  }
]