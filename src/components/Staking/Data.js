const tokens = {
  1: [
    {
      tokenName: 'dea',
      title: 'sDEA',
      titleExit: 'DEA',
      stakingContract: '0x4244abF6151153b8d3eEfbBfDBAB91CD85a8b222',
      vaultContract: '0x1591Da306e9726CF8a60BfF1CE96d7714D7b24cd',
      exitable: true,
      category: 'single',
      yieldable: true,
      link: '/swap'
    },
    {
      tokenName: 'deus',
      title: 'sDEUS',
      titleExit: 'DEUS',
      stakingContract: '0x4244abF6151153b8d3eEfbBfDBAB91CD85a8b222',
      vaultContract: '0xF8bcAF889F60E3d277EA0139e75047a0301D3307',
      exitable: true,
      category: 'single',
      yieldable: true,
      link: '/swap'
    },
    {
      tokenName: 'timetoken',

      title: 'TIME',
      titleExit: 'TIME',
      stakingContract: '0x4244abF6151153b8d3eEfbBfDBAB91CD85a8b222',
      vaultContract: '0x23459b0026Ed1cAE0b6da5E9364aCec07469Ffcd',

      exitable: false,
      category: '',
      yieldable: false
    },
    {
      tokenName: 'bpt',
      title: 'BPT',
      titleExit: 'BPT',
      stakingContract: '0x4244abF6151153b8d3eEfbBfDBAB91CD85a8b222',
      balancer: true,
      exitable: false,
      category: 'liquidity',
      yieldable: true,
      link: 'https://pools.balancer.exchange/#/pool/0x1dc2948b6db34e38291090b825518c1e8346938b/'
    },
    {
      tokenName: 'deus_dea',
      title: 'sUNI-DD',
      titleExit: 'UNI-DD',
      // stakingContract: '0x4244abF6151153b8d3eEfbBfDBAB91CD85a8b222',
      vaultContract: '0xEC7269Ebb7D219C905c28E3fD5Cc35F30dfB870b',
      tokenAddress: '0x2EdE9CB92a6dE0916889E5936B1aAd0e99ddf242',
      category: 'liquidity',
      onlyLocking: true,
      link: 'https://app.uniswap.org/#/add/0x3b62F3820e0B035cc4aD602dECe6d796BC325325/0x80aB141F324C3d6F2b18b030f1C4E95d4d658778'
    },
    {
      tokenName: 'dea_usdc',
      title: 'sUNI-DU',
      titleExit: 'UNI-DU',
      // stakingContract: '0x4244abF6151153b8d3eEfbBfDBAB91CD85a8b222',
      vaultContract: '0x4D01703442509233eFa9879E638278a59b4A5EBB',
      tokenAddress: '0xB7b52c3523Af9c237817a49D17E656283cC59678',
      category: 'liquidity',
      onlyLocking: true,
      link: 'https://app.uniswap.org/#/add/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/0x80aB141F324C3d6F2b18b030f1C4E95d4d658778'
    },
    {
      tokenName: 'deus_eth',
      title: 'sUNI-DE',
      titleExit: 'UNI-DE',
      // stakingContract: '0x4244abF6151153b8d3eEfbBfDBAB91CD85a8b222',
      vaultContract: '0xc8c91801Bed699598b5483F2ad55f89eBd35157F',
      tokenAddress: '0x670431fCdAf39280deE488C6D8277B9865E22d08',
      category: 'liquidity',
      onlyLocking: true,
      link: 'https://app.uniswap.org/#/add/0x3b62f3820e0b035cc4ad602dece6d796bc325325/ETH'
    }
  ]
  // 4: [
  //   {
  //     tokenName: 'dea',
  //     title: 'sDEA',
  //     titleExit: 'DEA',
  //     tokenAddress: '0x02b7a1AF1e9c7364Dd92CdC3b09340Aea6403934',
  //     stakingContract: '0xd8D02269dba3071f83Cf6e99E3D6DeEB318836C4',
  //     vaultContract: '0xbA5d9F66f7545fa57c15da4002A33792A7E41F46',
  //     exitable: true,
  //     category: 'single',
  //     yieldable: true,
  //     link: '/swap'
  //   },
  //   // {
  //   //   tokenName: 'deus',
  //   //   title: 'sDEUS',
  //   //   titleExit: 'DEUS',
  //   //   stakingContract: '0xd8D02269dba3071f83Cf6e99E3D6DeEB318836C4',
  //   //   vaultContract: '0xbA5d9F66f7545fa57c15da4002A33792A7E41F46',
  //   //   exitable: true,
  //   //   category: 'single',
  //   //   yieldable: true,
  //   //   link: '/swap'
  //   // },
  //   // {
  //   //   tokenName: 'timetoken',
  //   //   title: 'TIME',
  //   //   titleExit: 'TIME',
  //   //   stakingContract: '0xd8D02269dba3071f83Cf6e99E3D6DeEB318836C4',
  //   //   vaultContract: '0xbA5d9F66f7545fa57c15da4002A33792A7E41F46',
  //   //   exitable: false,
  //   //   category: '',
  //   //   yieldable: false
  //   // },
  //   // {
  //   //   tokenName: 'bpt',
  //   //   title: 'BPT',
  //   //   titleExit: 'BPT',
  //   //   stakingContract: '0xd8D02269dba3071f83Cf6e99E3D6DeEB318836C4',
  //   //   balancer: true,
  //   //   exitable: false,
  //   //   category: 'liquidity',
  //   //   yieldable: true,
  //   //   link:
  //   //     'https://pools.balancer.exchange/#/pool/0x1dc2948b6db34e38291090b825518c1e8346938b/'
  //   // },
  //   {
  //     tokenName: 'deus_dea',
  //     title: 'sUNI-DD',
  //     titleExit: 'UNI-DD',
  //     stakingContract: '0xd8D02269dba3071f83Cf6e99E3D6DeEB318836C4',
  //     vaultContract: '0xbA5d9F66f7545fa57c15da4002A33792A7E41F46',
  //     tokenAddress: '0xb91e3e0c16080a0df0b1e9f54f9467210383e45e',
  //     category: 'liquidity',
  //     onlyLocking: true,
  //     link:
  //       'https://app.uniswap.org/#/add/0x3b62F3820e0B035cc4aD602dECe6d796BC325325/0x80aB141F324C3d6F2b18b030f1C4E95d4d658778'
  //   },
  //   {
  //     tokenName: 'dea_usdc',
  //     title: 'sUNI-DU',
  //     titleExit: 'UNI-DU',
  //     stakingContract: '0xd8D02269dba3071f83Cf6e99E3D6DeEB318836C4',
  //     vaultContract: '0xbA5d9F66f7545fa57c15da4002A33792A7E41F46',
  //     tokenAddress: '0xb91e3e0c16080a0df0b1e9f54f9467210383e45e',
  //     category: 'liquidity',
  //     onlyLocking: true,
  //     link:
  //       'https://app.uniswap.org/#/add/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/0x80aB141F324C3d6F2b18b030f1C4E95d4d658778'
  //   },
  //   {
  //     tokenName: 'deus_eth',
  //     title: 'sUNI-DE',
  //     titleExit: 'UNI-DE',
  //     stakingContract: '0xd8D02269dba3071f83Cf6e99E3D6DeEB318836C4',
  //     vaultContract: '0xbA5d9F66f7545fa57c15da4002A33792A7E41F46',
  //     tokenAddress: '0xb91e3e0c16080a0df0b1e9f54f9467210383e45e',
  //     category: 'liquidity',
  //     onlyLocking: true,
  //     link:
  //       'https://app.uniswap.org/#/add/0x3b62f3820e0b035cc4ad602dece6d796bc325325/ETH'
  //   }
  // ]
}

export default tokens
