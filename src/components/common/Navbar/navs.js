import React from 'react'

export default [
  {
    id: 'app',
    text: 'APP',
    path: '/',
    exact: true,
    children: [
      {
        id: 'swap',
        text: 'SWAP',
        path: '/swap',
        exact: true
      },
      {
        id: 'staking',
        text: 'STAKING',
        path: '/staking',
        exact: false
      },
      {
        id: 'STAKE & YIELD',
        text: 'STAKE & YIELD',
        path: '/stakeandyield',
        exact: true
      },
      {
        id: 'vaults',
        text: 'VAULTS',
        path: '/vaults',
        exact: true
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
        id: 'mainnet',
        text: 'MAINNET',
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
      {
        id: 'litepaper',
        text: 'LITEPAPER',
        path: 'https://deus.finance/litepaper.pdf',
        out: true,
        exact: true
      }
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
