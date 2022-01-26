import { DEI_COLLATERAL_STAKING, DEI_DEUS_STAKING, DEI_COLLATERAL_ZAP, DEI_DEUS_ZAP, DEUS_NATIVE_STAKING, DEUS_NATIVE_ZAP } from "./contracts"
import { deiDeusLpToken, deiCollateralLpToken, DeusNativeLpToken } from "./token"
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
]

export const StakingConfig = {
  [ChainId.MATIC]: [
    {
      id: 0,
      title: "DEI-USDC",
      pic1: "/tokens/dei.svg",
      pic2: "/tokens/usdc.svg",
      depositToken: deiCollateralLpToken[ChainId.MATIC],
      stakingContract: DEI_COLLATERAL_STAKING[ChainId.MATIC],
      zapperContract: DEI_COLLATERAL_ZAP[ChainId.MATIC],
      provideLink: "https://quickswap.exchange/#/add/0xDE12c7959E1a72bbe8a5f7A1dc8f8EeF9Ab011B3/0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
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
    },
    {
      id: 2,
      title: "DEUS-MATIC",
      pic1: "/tokens/deus.svg",
      pic2: "/tokens/matic.jpg",
      depositToken: DeusNativeLpToken[ChainId.MATIC],
      stakingContract: DEUS_NATIVE_STAKING[ChainId.MATIC],
      zapperContract: DEUS_NATIVE_ZAP[ChainId.MATIC],
      provideLink: "https://quickswap.exchange/#/add/0xDE5ed76E7c05eC5e4572CfC88d1ACEA165109E44/ETH",
      apy: "50"
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
      zapperContract: null,
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
    },
    {
      id: 2,
      title: "DEUS-ETH",
      pic1: "/tokens/deus.svg",
      pic2: "/tokens/eth-logo.svg",
      depositToken: DeusNativeLpToken[ChainId.ETH],
      stakingContract: DEUS_NATIVE_STAKING[ChainId.ETH],
      zapperContract: DEUS_NATIVE_ZAP[ChainId.ETH],
      provideLink: "https://app.uniswap.org/#/add/v2/ETH/0xDE5ed76E7c05eC5e4572CfC88d1ACEA165109E44",
      apy: "50"
    }
  ],
  [ChainId.FTM]: [
    {
      id: 0,
      title: "DEI-USDC",
      pic1: "/tokens/dei.svg",
      pic2: "/tokens/usdc.svg",
      depositToken: deiCollateralLpToken[ChainId.FTM],
      stakingContract: DEI_COLLATERAL_STAKING[ChainId.FTM],
      zapperContract: null,
      provideLink: "https://swap.spiritswap.finance/#/add/0xDE12c7959E1a72bbe8a5f7A1dc8f8EeF9Ab011B3/0x04068DA6C83AFCFA0e13ba15A6696662335D5B75",
      apy: "50"
    },
    // {
    //   id: 1,
    //   title: "DEI-DEUS",
    //   pic1: "/tokens/dei.svg",
    //   pic2: "/tokens/deus.svg",
    //   depositToken: deiDeusLpToken[ChainId.FTM],
    //   stakingContract: DEI_DEUS_STAKING[ChainId.FTM],
    //   zapperContract: null,
    //   provideLink: "https://swap.spiritswap.finance/#/add/0xDE12c7959E1a72bbe8a5f7A1dc8f8EeF9Ab011B3/0xDE5ed76E7c05eC5e4572CfC88d1ACEA165109E44",
    //   apy: "100"
    // },
    {
      id: 2,
      title: "DEUS-FTM",
      pic1: "/tokens/deus.svg",
      pic2: "/tokens/eth-logo.svg",
      depositToken: DeusNativeLpToken[ChainId.FTM],
      stakingContract: DEUS_NATIVE_STAKING[ChainId.FTM],
      zapperContract: null,
      provideLink: "https://swap.spiritswap.finance/#/add/FTM/0xDE5ed76E7c05eC5e4572CfC88d1ACEA165109E44",
      apy: "50"
    }
  ],
}