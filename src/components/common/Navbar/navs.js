export const defaultNavbar = [
  {
    id: "app",
    text: 'APP',
    children: [
      {
        id: 'Stake And YIELD'.toUpperCase(),
        text: 'STAKE & YIELD',
        path: '/stake-and-yield',
        exact: true
      },
      {
        id: 'sealed Swap'.toUpperCase(),
        text: 'sealed swap',
        path: '/sealed-swap',
        exact: true
      },
      {
        id: 'vaultsL',
        text: 'VAULTS (LEGACY)',
        path: '/vaults',
        exact: true
      },
      {
        id: 'STAKING (LEGACY)',
        text: 'STAKING (LEGACY)',
        path: '/staking',
      }
    ]
  },
  {
    id: 'learn',
    text: 'LEARN',
    children: [{
      id: 'deusWiki',
      text: 'DEUS wiki',
      path: 'https://wiki.deus.finance/docs',
    },]
  },
  {
    id: "telegram",
    image: true,
    path: "https://t.me/deusfinance",
    children: [{
      id: 'Announcement',
      text: 'Announcement Channel',
      path: 'https://t.me/deusfinance_news',
    },
    {
      id: 'Community',
      text: 'Community Channel',
      path: 'https://t.me/deusfinance',
    },
    ]
  },
  {
    id: "twitter",
    image: true,
    path: "https://twitter.com/DeusDao"
  },
  {
    id: "discord",
    image: true,
    path: "https://discord.com/invite/xfeYT6acha"
  },
]


export const desktopNavs = [
  ...defaultNavbar.slice(0, 1),
  {
    id: 'swap',
    text: 'SWAP',
    path: '/swap',
    exact: true,
  },
  ...defaultNavbar.slice(1)].reverse()


let { children } = defaultNavbar[0]
defaultNavbar[0] = {
  ...defaultNavbar[0], children: [{
    id: 'swap',
    text: 'SWAP',
    path: '/swap',
    exact: true,
  }, ...children]
}

export const mobileNavs = defaultNavbar.reverse()
