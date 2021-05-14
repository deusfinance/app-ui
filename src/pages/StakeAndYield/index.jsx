import React from 'react'
import { useWeb3React } from '@web3-react/core'

import '../../components/Staking/StakingStyle.css'

import ToggleButtons from '../../components/Staking/ToggleButtons'
import TokenContainer from '../../components/Staking/TokenContainer'
import tokens from '../../components/Staking/Data'

const Staking = () => {
  const { account, chainId } = useWeb3React()

  const [showTokens, setShowTokens] = React.useState(tokens[1])
  const [selesctedChainId, setSelesctedChainId] = React.useState(1)
  const [type, setType] = React.useState('all')
  const [open, setOpen] = React.useState({
    sDEUS: false,
    sDEA: false,
    TIME: false,
    BPT: false,
    'sUNI-DD': false,
    'sUNI-DU': false,
    'sUNI-DE': false
  })

  React.useEffect(() => {
    if (account) {
      setType('all')
      let selectedChainId = 1
      // TODO add rinkeby when contarct deploy
      // let selectedChainId = chainId === 4 ? chainId : 1
      setShowTokens(tokens[selectedChainId])
      setSelesctedChainId(selectedChainId)
    }
  }, [account, chainId])

  const chooseType = (e) => {
    let category = e.target.value
    setType(category)
    setOpen(false)
    let result =
      category === 'all'
        ? tokens[selesctedChainId]
        : tokens[selesctedChainId].filter(
          (token) => token.category === category
        )
    setShowTokens(result)
  }

  return (
    <div className="container-staking">
      <div className="staking-desc">
        <div className="title-container">
          <span className="title">STAKE AND YIELD WITH YEARN FINANCE</span>
          <img
            src="/img/staking/yearn-finance-logo.svg"
            alt="yearn-finance-logo"
          />
        </div>

        <p>
          Stake your locked DEUS/DEA, Balancer Liquidity to
          earn trading fees.
        </p>
        <p>
          You can also opt for Stake+Yield where the underlying ETH value of
          your stake will be used to earn yield on{' '}
          <span className="yearn-finance">
            YEARN FINANCE{' '}
            <img
              src="/img/staking/yearn-finance-logo.svg"
              alt="yearn-finance-logo"
            />{' '}
          </span>
          – <span className="blue-color">basically double rewards!</span>
        </p>
      </div>

      <div className="staking-content">
        <ToggleButtons
          data={[
            { title: 'SINGLE', value: 'single' },
            { title: 'ALL', value: 'all' },
            { title: 'LIQUIDITY', value: 'liquidity' }
          ]}
          handleSelectedButton={chooseType}
          name="Single-Liquidity"
          defaultChecked={type}
          classes="main-toggle-btn"
        />

        <div className="wrap-tokens">
          {showTokens.map((token, index) => (
            <TokenContainer
              key={index}
              {...token}
              owner={account}
              chainId={chainId}
              open={open}
              handleTriggerClick={(token) => {
                setOpen((prev) => {
                  return {
                    ...prev,
                    [token]: !open[token]
                  }
                })
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Staking
