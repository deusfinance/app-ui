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
      id: 0,
      title: "DEI-USDC",
      pic1: "/tokens/dei.svg",
      pic2: "/tokens/usdc.svg",
      depositToken: deiCollateralLpToken[ChainId.RINKEBY],
      stakingContract: DEI_COLLATERAL_STAKING[ChainId.RINKEBY],
      zapperContract: DEI_COLLATERAL_ZAP[ChainId.RINKEBY],
    },
    {
      id: 1,
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
      id: 0,
      title: "DEI-HUSD",
      pic1: "/tokens/dei.svg",
      pic2: "/tokens/husd.svg",
      depositToken: deiCollateralLpToken[ChainId.HECO],
      stakingContract: DEI_COLLATERAL_STAKING[ChainId.HECO],
      zapperContract: DEI_COLLATERAL_ZAP[ChainId.HECO],
    },
    {
      id: 1,
      title: "DEI-DEUS",
      pic1: "/tokens/dei.svg",
      pic2: "/tokens/deus.svg",
      depositToken: deiDeusLpToken[ChainId.HECO],
      stakingContract: DEI_DEUS_STAKING[ChainId.HECO]
    }
  ],
  [ChainId.AVALANCHE]: [
    {
      id: 0,
      title: "DEI-DAI",
      pic1: "/tokens/dei.svg",
      pic2: "/tokens/dai.png",
      depositToken: deiCollateralLpToken[ChainId.AVALANCHE],
      stakingContract: DEI_COLLATERAL_STAKING[ChainId.AVALANCHE],
      zapperContract: DEI_COLLATERAL_ZAP[ChainId.AVALANCHE],
    },
    {
      id: 1,
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
      id: 0,
      title: "DEI-USDC",
      pic1: "/tokens/dei.svg",
      pic2: "/tokens/usdc.svg",
      depositToken: deiCollateralLpToken[ChainId.MATIC],
      stakingContract: DEI_COLLATERAL_STAKING[ChainId.MATIC],
      zapperContract: DEI_COLLATERAL_ZAP[ChainId.MATIC],
      provideLink: "https://quickswap.exchange/#/add/0xDE5ed76E7c05eC5e4572CfC88d1ACEA165109E44/0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
      apy: "50"
    },
    {
      id: 1,
      title: "DEI-DEUS",
      pic1: "/tokens/dei.svg",
      pic2: "/tokens/deus.svg",
      depositToken: deiDeusLpToken[ChainId.MATIC],
      stakingContract: DEI_DEUS_STAKING[ChainId.MATIC],
      zapperContract: DEI_DEUS_ZAP[ChainId.MATIC],
      provideLink: "https://quickswap.exchange/#/add/0xDE5ed76E7c05eC5e4572CfC88d1ACEA165109E44/0xDE12c7959E1a72bbe8a5f7A1dc8f8EeF9Ab011B3",
      apy: "100"
    }
  ],
  [ChainId.ETH]: [
    {
      id: 0,
      title: "DEI-USDC",
      pic1: "/tokens/dei.svg",
      pic2: "/tokens/usdc.svg",
      depositToken: deiCollateralLpToken[ChainId.ETH],
      stakingContract: DEI_COLLATERAL_STAKING[ChainId.ETH],
      zapperContract: DEI_COLLATERAL_ZAP[ChainId.ETH],
      provideLink: "https://curve.fi/factory/47/deposit",
      apy: "50"
    },
    {
      id: 1,
      title: "DEI-DEUS",
      pic1: "/tokens/dei.svg",
      pic2: "/tokens/deus.svg",
      depositToken: deiDeusLpToken[ChainId.ETH],
      stakingContract: DEI_DEUS_STAKING[ChainId.ETH],
      zapperContract: DEI_DEUS_ZAP[ChainId.ETH],
      provideLink: "https://app.uniswap.org/#/add/v2/0xDE12c7959E1a72bbe8a5f7A1dc8f8EeF9Ab011B3/0xDE5ed76E7c05eC5e4572CfC88d1ACEA165109E44?use=V2",
      apy: "100"
    }
  ],
}