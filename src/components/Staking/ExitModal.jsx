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
    maxWidth: '550px',
    width: '80%',
    background: '#2D2F35',
    border: '1px solid #000000',
    borderRadius: '10px',
    padding: '50px 50px 20px'
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
      <div className="close" onClick={hide}>
        &times;
      </div>
      <div className="modal-content">
        <div className="exit-modal-title">
          Are you sure you want to exit the Vaults?
        </div>
        <div className="exit-modal-content">
          <p>
            Initiating "Exit Vault" will release your stake evenly over the
            course of a set period of days (currently set to 75 days), and your
            farming rewards will diminish by the same rate (currently set to
            1/75 per day).
          </p>
          <p>
            For example, if you exit the vault now with a sDEA balance of 75,
            then after 24 hours, your sDEA balance will be 74, your DEA balance
            will be 1, and your farming rewards will diminish by 1/75. After
            another 24 hours, your sDEA balance will be 73, your DEA balance
            will be 2, and your farming rewards will diminished by 2/75. And so
            on.
          </p>

          <p className="desc-btn-yes">
            YES, I want to exit, I agree to unlocking my tokens in the schedule
            outlined above, and I agree to diminishing my staking returns.
          </p>

          <p className="desc-btn-no">
            No, I want to stay in the Vaults, continue earning trading fees, and
            support the DEUS ecosystem.
          </p>
          <div className="flex-between">
            <div className="btn-yes pointer" onClick={handleOn} style={{ margin: "0 5px" }}>
              YES
            </div>
            <div className="btn-no pointer" onClick={handleOff} style={{ margin: "0 5px" }}>
              NO
            </div>
          </div>
        </div>
      </div>
    </ReactModal>
  )
}

export default ExitModal
