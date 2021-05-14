import React from 'react'
import { sendTransaction } from '../../utils/Stakefun'
import DrawableAmount from './DrawableAmount'
import WaitingTime from './WaitingTime'
import useWeb3 from '../../helper/useWeb3'

const Frozen = (props) => {
  const {
    balance,
    owner,
    chainId,
    title,
    titleExit,
    StakeAndYieldContract,
    withDrawable,
    withDrawableExit,
    withDrawTime,
    showFluid
  } = props

  const [unfreez, setUnfreez] = React.useState('0')
  const web3 = useWeb3()

  const handleUnfreeze = () => {
    try {
      if (unfreez === '0' || unfreez === '') return

      let amount = web3.utils.toWei(String(unfreez))

      sendTransaction(
        StakeAndYieldContract,
        `unfreeze`,
        [amount],
        owner,
        chainId,
        `Unfreeze ${unfreez} ${title}`
      ).then(() => {
        setUnfreez('0')
      })
    } catch (error) {
      console.log('error happend in un freez', error)
    }
  }
  return (
    <div className="userInfo-container">
      <div className="flex-between flex-column mb-15">
        <div className="frozen-desc">
          <p>Frozen </p>
          <p>
            <span className="blue-color">{balance} </span>
            <span className="opacity-5">
              {` ${title} are currently being used as collateral to borrow
            ETH to generate Yield on other protocols.`}
            </span>
          </p>
          <p className="opacity-5 pt-3">
            You can unfreeze them over period of 24 hours to withdraw them
            again.
          </p>
        </div>
        <div>
          <div className="wrap-box mb-15">
            {/* {stakeType != '1' && !exit && (
              <div className="wrap-box-gradient-left">Re-deposit</div>
            )}
            <div
              className={` ${
                stakeType != '1' && !exit
                  ? 'wrap-box-center'
                  : 'wrap-box-gray width-271'
              }`}
            > */}
            <div className="wrap-box-gray width-271">
              <input
                type="text"
                className="input-transparent"
                value={unfreez}
                onChange={(e) => setUnfreez(e.target.value)}
              />
              <span
                onClick={() => setUnfreez(balance)}
                className="opacity-75 pointer flex-align-center"
              >
                MAX
              </span>
            </div>
            <div className="wrap-box-gradient pointer" onClick={handleUnfreeze}>
              Unfreeze
            </div>
          </div>
          {(withDrawable > 0 || withDrawableExit > 0) && (
            <>
              <div className="wrap-box ">
                <DrawableAmount
                  withDrawable={withDrawable}
                  withDrawableExit={withDrawableExit}
                  title={title}
                  titleExit={titleExit}
                  width="width-271"
                />

                <div className="wrap-box-gradient" onClick={handleUnfreeze}>
                  <span className="fluid">FLUID IN: </span>
                  <span className="hour">
                    <WaitingTime
                      withDrawTime={withDrawTime}
                      showFluid={showFluid}
                    />
                  </span>
                </div>
              </div>
              <div className="unfreez-text">currently unfreezing</div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Frozen
