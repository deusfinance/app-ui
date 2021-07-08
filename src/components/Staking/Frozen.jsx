import React from 'react'
import { sendTransaction } from '../../utils/Stakefun'
import DrawableAmount from './DrawableAmount'
import WaitingTime from './WaitingTime'
import useWeb3 from '../../helper/useWeb3'
import WithdrawModal from './WithdrawModal'

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
    nextEpochTime,
    showFluid
  } = props

  const [unfreez, setUnfreez] = React.useState('')
  const [show, setShow] = React.useState(null)
  const currtimestamp = Math.floor(Date.now() / 1000)
  const web3 = useWeb3()

  let remindedTime = null
  if (currtimestamp > nextEpochTime) {
    remindedTime = 0
  } else {
    remindedTime = nextEpochTime - currtimestamp
  }
  const handleUnfreeze = () => {
    if ((withDrawable > 0 || withDrawableExit > 0) && nextEpochTime < currtimestamp) {
      setShow(true)
      return
    }

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

  const handleWithDraw = () => {
    try {
      sendTransaction(
        StakeAndYieldContract,
        `withdrawUnfreezed`,
        [],
        owner,
        chainId,
        `WITHDRAW + REDEEM`
      ).then(() => {
        showFluid()
        setShow(false)
      })
    } catch (error) {
      console.log('error happend in Withdraw', error)
    }
  }

  return (
    <div className="userInfo-container">
      <div className="flex-between flex-column mb-15">
        <div className="frozen-desc">
          <p>

          </p>
          <div>Yield Balance (locked): <span className="blue-color">{balance} {title} </span></div>
          <p className="opacity-5 pt-3">
            Why is it locked? <br />
            Balance is currently being used as collateral to borrow ETH and generate Yield on other protocols with it.
            <br />
            <br />
            <br />
            ATTENTION
            <br />
            It takes 8 days for the unstaking process to be completed by harvesting rewards from Yearn Finance. DEUS Finance does not control this process.
            <br />
            <br />
            Two transactions are necessary to withdraw your tokens from the contract: <br />
            <br />
            1. Unfreeze <br />
            2. Withdraw (after harvesting) <br />
          </p>
        </div>
        <div>
          {(withDrawTime === 0 || nextEpochTime < currtimestamp) && <>
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
              <div className="wrap-box-gray width-300">
                <input
                  type="number"
                  className="input-transparent"
                  placeholder="0"
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
                UNSTAKE + REDEEM
              </div>
            </div>
            <div className="sub-description">UNSTAKE + REDEEM to redeem VAULT  TOKENS together with your STAKED TOKENS.</div>
          </>
          }
          {(withDrawable > 0 || withDrawableExit > 0) && remindedTime > 0 &&
            <>
              <div className="wrap-box ">
                <DrawableAmount
                  withDrawable={withDrawable}
                  withDrawableExit={withDrawableExit}
                  title={title}
                  titleExit={titleExit}
                  width="width-300"
                />

                <div className="wrap-box-fluid" >
                  <span className="fluid">WITHDRAWABLE</span>
                  <span className="hour">
                    <WaitingTime
                      nextEpochTime={nextEpochTime}
                      withDrawTime={withDrawTime}
                      showFluid={showFluid}
                    />
                  </span>
                </div>
              </div>
              <div className="sub-description mt-4">currently unstaking, will be available to withdraw after time run to zero.</div>
            </>}
        </div>
      </div>
      <WithdrawModal
        open={show ? show : false}
        hide={() => setShow(false)}
        handleWidthraw={() => {
          handleWithDraw()
        }}
        handleOff={() => {
          setShow(false)
        }}
      >

      </WithdrawModal>
    </div>
  )
}

export default Frozen
