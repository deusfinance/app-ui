import React from 'react'
import ReactModal from 'react-modal'
if (typeof window !== 'undefined') {
  ReactModal.setAppElement('body')
}
const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '95%',
    maxWidth: '1007px',
    with: '95%',
    background: '#2D2F35',
    border: '1px solid #1c1c1c',
    borderRadius: '10px',
    padding: '25px 80px 35px'
  }
}
const ExitModal = (props) => {
  const { open, hide, handleOff, handleOn } = props

  return (
    <ReactModal
      isOpen={open}
      style={customStyles}
      closeTimeoutMS={200}
      onRequestClose={hide}
      shouldCloseOnOverlayClick={true}
    >
      <div className="modal-content">
        <div className="exit-modal-title">
          Are you sure you want to exit the Vaults?
        </div>
        <div className="exit-modal-content">
          <p>
            Initiating "Exit Vault" will release your stake evenly over the
            course of a set period of days (currently set to 90 days), and your
            farming rewards will diminish by the same rate (currently set to
            1/90 per day).
          </p>
          <p>
            For example, if you exit the vault now with a sDEA balance of 90,
            then after 24 hours, your sDEA balance will be 89, your DEA balance
            will be 1, and your farming rewards will diminish by 1/90. After
            another 24 hours, your sDEA balance will be 88, your DEA balance
            will be 2, and your farming rewards will diminished by 2/90. And so
            on.
          </p>
          <p>
            Exit means, I want to exit, I agree to unlocking my tokens in the
            schedule outlined above, and I agree to diminishing my staking
            returns.
          </p>
          <p>
            Don’t EXIT means, I want to stay in the Vaults, continue earning
            trading fees, and support the DEUS ecosystem.
          </p>
        </div>
        <div className="container-exit-modal-btn">
          <span className="exit-modal-btn pointer " onClick={handleOff}>
            <span>DON’T EXIT</span>
          </span>
          <span className="exit-modal-btn pointer " onClick={handleOn}>
            <span>EXIT</span>
          </span>
        </div>
      </div>
    </ReactModal>
  )
}

export default ExitModal
