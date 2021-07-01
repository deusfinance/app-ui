import React from 'react'
import { useWeb3React } from '@web3-react/core'

import '../../components/Staking/StakingStyle.scss'

import ToggleButtons from '../../components/Staking/ToggleButtons'
import TokenContainer from '../../components/Staking/TokenContainer'
import tokens from '../../components/Staking/Data'
import { ExternalLink } from '../../components/App/Link'

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
    // setOpen(false)
    let result =
      category === 'all'
        ? tokens[selesctedChainId]
        : tokens[selesctedChainId].filter(
          (token) => token.category === category
        )
    let titles = result.map((item) => item.title)
    let newOpen = open
    Object.keys(open).forEach((item) => {
      if (!titles.includes(item)) {
        newOpen[item] = false
      }
    })
    setOpen(newOpen)
    setShowTokens(result)
  }

  return (
    <div className="container-staking">
      <div className="staking-desc">
        <img
          className="deus-yearn-logo"
          src="/img/yearn-deus.png"
          alt="deus-yearn"
        />
        <div className="title-container">
          <span className="title">STAKE AND YIELD</span>
        </div>

        <ExternalLink className="explainer"> Explainer</ExternalLink>
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
              type={type}
              {...token}
              owner={account}
              chainId={chainId}
              open={open}
              handleTriggerClick={(token, balance, withDrawable, withDrawableExit) => {
                setOpen((prev) => {
                  return {
                    ...prev,
                    [token]: (balance || withDrawable || withDrawableExit)
                      ? true
                      : balance === undefined
                        ? !open[token]
                        : false
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
