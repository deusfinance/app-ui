const urls = [{
    name: 'Mint',
    link: '/dei'
  },
  {
    name: 'Redeem',
    link: '/Redeem'
  },
  {
    name: 'Buyback & Recollateralize',
    link: '/Buyback'
  },
]

const costs = [{
    name: 'COLLATERAL RATIO',
    value: '84.00%'
  },
  {
    name: 'REDEMPTION FEE',
    value: '0.55%'
  },
  {
    name: 'POOL BALANCE',
    value: '20.24 USDC'
  },
]

const costs_v2 = [{
    name: 'DEI PRICE',
    value: '$1.000'
  },
  {
    name: 'COLLATERAL RATIO',
    value: '84.00%'
  },
  {
    name: 'POOL BALANCE / CEILING',
    value: '21.829M / 41M'
  },
  {
    name: 'AVAILABLE TO MINT',
    value: '19.171M'
  },
]

const costs2 = [{
    name: 'EXCHANGE RATES',
    isTwoWay : true,
    title1: 'USDC: ',
    value1: '$1.000',
    title2: 'DEI: ',
    value2: '$874.34'
  },
  {
    name: 'SWAP FEE',
    isTwoWay : false,
    value1: '0.6%',
  },
  {
    name: 'POOL 🌊',
    isTwoWay : false,
    value1: '....',
  },
]


export {
  urls,
  costs,
  costs_v2,
  costs2,
}