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
const WithdrawModal = (props) => {
  const { open, hide, handleWidthraw } = props

  return (
    <ReactModal
      isOpen={open}
      style={customStyles}
      closeTimeoutMS={200}
      onRequestClose={hide}
      shouldCloseOnOverlayClick={true}
    >
      <div className="close-modal" onClick={hide}>
        &times;
      </div>
      <div className="modal-content">
        <div className="exit-modal-title">
          Withdraw Old Balance First
        </div>
        <div className="exit-modal-content">
          <p>
            You can currently withdraw your previous unstaking Balance, please withdraw your balance first before creating another unstaking period.
          </p>

          <div className="flex-center">
            <div className="btn-yes pointer" onClick={handleWidthraw} style={{ margin: "0 5px" }}>
              Withdraw Now
            </div>
          </div>
        </div>
      </div>
    </ReactModal>
  )
}

export default WithdrawModal
