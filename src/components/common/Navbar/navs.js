import React from 'react'

export default [
  {
    id: 'app',
    text: 'APP',
    path: '/',
    exact: true,
    children: [
      {
        id: 'mobileApp',
        text: 'Mobile Android',
        path: 'https://play.google.com/store/apps/details?id=finance.deus.deus_mobile&hl=en_US',
        out: true,
        exact: true
      },
      {
        id: 'swap',
        text: 'SWAP',
        path: '/swap',
        exact: true
      },
      {
        id: 'stakeAndYield',
        text: 'STAKE & YIELD (NEW)',
        path: '/stake-and-yield',
        exact: true
      },
      {
        id: 'vaultsL',
        text: 'LEGACY VAULTS (OLD)',
        path: '/vaults',
        exact: true
      },
      {
        id: 'staking',
        text: 'LEGACY STAKING (OLD)',
        path: '/staking',
        exact: false
      }
    ]
  },
  {
    id: 'buyStocks',
    text: <span>BUY&thinsp;Stocks</span>,
    path: '/',
    exact: true,
    children: [
      {
        id: 'ETH',
        text: 'ETH',
        path: '/synchronizer',
        exact: true
      },
      {
        id: 'xDai',
        text: 'xDAI',
        path: '/crosschain/xdai/synchronizer',
        exact: true
      },
      {
        id: 'bsc',
        text: 'BSC',
        path: '/crosschain/bsc/synchronizer',
        exact: true
      },
      {
        id: 'heco',
        text: 'HECO',
        path: '/crosschain/heco/synchronizer',
        exact: true
      }
    ]
  },
  {
    id: 'futures',
    text: 'FUTURES',
    path: '/',
    exact: true,
    children: [
      {
        id: 'coinbaseMigrator',
        text: <span>COINBASE MIGRATOR</span>,
        path: '/migrator',
        exact: true
      },
      {
        id: 'bakkt',
        text: 'BAKKT',
        path: '/bakkt',
        exact: true
      },
      {
        id: 'musk',
        text: 'MUSK',
        path: '/musk',
        exact: true
      }
    ]
  },
  {
    id: 'learn',
    text: 'LEARN',
    path: '/',
    exact: true,
    children: [
      {
        id: 'deusWiki',
        text: 'DEUS wiki',
        path: 'https://wiki.deus.finance/docs',
        out: true,
        exact: true
      },
      // {
      //   id: 'litepaper',
      //   text: 'LITEPAPER',
      //   path: 'https://deus.finance/litepaper.pdf',
      //   out: true,
      //   exact: true
      // }
    ]
  },
  {
    id: 'tools',
    text: 'TOOLS',
    path: '/',
    exact: true,
    children: [
      {
        id: 'simulator',
        text: 'DEUS simulator',
        path: 'https://simulate.deus.finance',
        out: true,
        exact: true
      },
      {
        id: 'tradingview',
        text: 'DEUS tradingview',
        path: 'https://chart.deus.finance',
        out: true,
        exact: true
      },
      {
        id: 'vote',
        text: 'DEUS vote',
        path: 'https://vote.deus.finance',
        out: true,
        exact: true
      }
    ]
  }
]
