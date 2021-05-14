import React from 'react'
import { sendTransaction } from '../../utils/Stakefun'

const UserInfo = (props) => {
  const {
    own,
    balance,
    title,
    chainId,
    stakeTypeName,
    claim,
    StakeAndYieldContract,
    owner,
    exit,
    burn,
    fullyUnlock,
    exitable,
    strategyLink
  } = props
  const handleClaim = () => {
    try {
      sendTransaction(
        StakeAndYieldContract,
        `claim`,
        [],
        owner,
        chainId,
        `Claim ${claim} ${title}`
      )
    } catch (error) {
      console.log('Error happend in Claim', error)
    }
  }
  // const handleRedeem = async () => {}
  const handleStopExit = () => {
    try {
      sendTransaction(
        StakeAndYieldContract,
        `setExit`,
        [!exit],
        owner,
        chainId,
        `${exit ? 'Stop Vault Exit' : 'Enable Vault Exit'}`
      )
    } catch (error) {
      console.log('error happend in exit', error)
    }
  }
  return (
    <div className="userInfo-container">
      <div className="flex-between flex-column mb-15">
        <div className="mb-15">
          <div className="userInfo-pool mb-15">
            <p>{`You own ${own}% of the pool `}</p>
            <p>
              with
              <span className="blue-color">{` ${balance} ${title} `}</span>
              deposited
            </p>
          </div>

          <div className="userInfo-pool mb-15">
            <p>
              <span> Staketype: </span>
              <span className="blue-color">
                {stakeTypeName !== 'Stake' ? (
                  <a href={strategyLink} target="_blink">
                    {stakeTypeName}
                  </a>
                ) : (
                  stakeTypeName
                )}
              </span>
            </p>
            <p className="opacity-5">generating yield with this strategy</p>
          </div>
          {exitable && exit && (
            <div className="flex-between mb-15">
              <div className="exit-valuet">
                <p>
                  <span className="blue-color">Exit Vault</span> activated
                </p>
                <p>
                  You burn
                  <span className="blue-color">{` ${burn.toFixed(
                    4
                  )} ${title} per day `}</span>
                  {`(fully unlocked at ${fullyUnlock})`}
                </p>
              </div>
            </div>
          )}
        </div>
        <div>
          <div className="wrap-box mb-15">
            <div className="wrap-box-gray">
              <div>{`${claim} DEA `}</div>
              {/* <div className="opacity-5">claimable</div> */}
            </div>
            <div className="wrap-box-gradient pointer" onClick={handleClaim}>
              Claim
            </div>
          </div>

          {exitable && (
            <div className="wrap-box">
              <div className="wrap-box-exit pointer" onClick={handleStopExit}>
                {exit ? 'Stop Vault Exit' : 'Enable Vault Exit'}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserInfo
