import { DEI_COLLATERAL_STAKING, DEI_DEUS_STAKING, DEI_COLLATERAL_ZAP, DEI_DEUS_ZAP } from "./contracts"
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
      stakingContract: DEI_COLLATERAL_STAKING[ChainId.RINKEBY],
      zapperContract: DEI_COLLATERAL_ZAP[ChainId.RINKEBY],
    },
    {
      title: "DEI-DEUS",
      pic1: "/tokens/dei.svg",
      pic2: "/tokens/deus.svg",
      depositToken: deiDeusLpToken[ChainId.RINKEBY],
      stakingContract: DEI_DEUS_STAKING[ChainId.RINKEBY],
      zapperContract: DEI_DEUS_ZAP[ChainId.RINKEBY],
    }
  ],
  [ChainId.HECO]: [
    {
      title: "DEI-HUSD",
      pic1: "/tokens/dei.svg",
      pic2: "/tokens/husd.svg",
      depositToken: deiCollateralLpToken[ChainId.HECO],
      stakingContract: DEI_COLLATERAL_STAKING[ChainId.HECO],
      zapperContract: DEI_COLLATERAL_ZAP[ChainId.HECO],
    },
    {
      title: "DEI-DEUS",
      pic1: "/tokens/dei.svg",
      pic2: "/tokens/deus.svg",
      depositToken: deiDeusLpToken[ChainId.HECO],
      stakingContract: DEI_DEUS_STAKING[ChainId.HECO]
    }
  ],
  [ChainId.AVALANCHE]: [
    {
      title: "DEI-DAI",
      pic1: "/tokens/dei.svg",
      pic2: "/tokens/dai.png",
      depositToken: deiCollateralLpToken[ChainId.AVALANCHE],
      stakingContract: DEI_COLLATERAL_STAKING[ChainId.AVALANCHE],
      zapperContract: DEI_COLLATERAL_ZAP[ChainId.AVALANCHE],
    },
    {
      title: "DEI-DEUS",
      pic1: "/tokens/dei.svg",
      pic2: "/tokens/deus.svg",
      depositToken: deiDeusLpToken[ChainId.AVALANCHE],
      stakingContract: DEI_DEUS_STAKING[ChainId.AVALANCHE],
      zapperContract: DEI_DEUS_ZAP[ChainId.AVALANCHE],
    }
  ],
  [ChainId.MATIC]: [
    {
      title: "DEI-USDC",
      pic1: "/tokens/usdc.svg",
      pic2: "/tokens/dai.png",
      depositToken: deiCollateralLpToken[ChainId.MATIC],
      stakingContract: DEI_COLLATERAL_STAKING[ChainId.MATIC],
      zapperContract: DEI_COLLATERAL_ZAP[ChainId.MATIC],
    },
    {
      title: "DEI-DEUS",
      pic1: "/tokens/dei.svg",
      pic2: "/tokens/deus.svg",
      depositToken: deiDeusLpToken[ChainId.MATIC],
      stakingContract: DEI_DEUS_STAKING[ChainId.MATIC],
      zapperContract: DEI_DEUS_ZAP[ChainId.MATIC],
    }
  ],
}