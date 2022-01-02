import React from 'react'
import ReactModal from 'react-modal'
import { BridgeTokens } from '../../constant/token'
import { chains } from './data'
if (typeof window !== 'undefined') {
  ReactModal.setAppElement('body')
}
const customStyles = {
  overlay: {
    zIndex: 2,
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
    maxWidth: '560px',
    width: '95% ',
    background: '#242424',
    border: '1px solid #242424',
    borderRadius: '10px',
    padding: '26px 20px'
    // overflow: 'unset'
  }
}

const TokenModal = (props) => {
  const { open, hide, changeToken, tokens, tokenId, selectedChain } = props
  const [chain, setChain] = React.useState(chains[1])
  const [showTokens, setShowTokens] = React.useState(tokens)
  React.useEffect(() => {
    if (tokenId) {
      let result = showTokens.filter((token) => token.tokenId === tokenId)
      setShowTokens(result)
    } else {
      setShowTokens(tokens)
    }
  }, [tokenId]) // eslint-disable-line

  const closeModal = () => {
    hide()
    setChain('')
  }

  return (
    <ReactModal
      isOpen={open}
      style={customStyles}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
    >
      <div>
        <div className="modal-header">
          <div className="modal-title">Select an asset</div>
          <span onClick={closeModal} className="close">
            &times;
          </span>
        </div>
        <div className="border-bottom"></div>

        <div className="content-modal-bridge">
          <div className="filter">Select Chain</div>
          <ul className="bridge-radio">
            {chains.map((chain, index) => (
              <li key={index} className="pointer">
                <input
                  type="radio"
                  id={chain.name}
                  name="chainRadio"
                  onChange={() => setChain(chain)}
                  // checked={chain.name === selectedChain.name}
                  disabled={chain.network === selectedChain}
                />
                <label style={{marginTop: "8px"}} htmlFor={chain.name} className={`${chain.name} pointer`}>
                  {chain.name}
                </label>
              </li>
            ))}
          </ul>
          <div className="flex-between token-name">
            <div>Token name</div>
            <div className="pr-13">Balance</div>
          </div>
          <div className="border-bottom"></div>
          <div className="container-token">
            {chain ? (
              BridgeTokens[Number(chain.network)].map((token, index) => {

                return (
                  <div className="token-list pointer" key={index} onClick={() => {
                    changeToken(token, chain.network)
                    closeModal()
                  }}>
                    <div className="token-list-item ">
                      <img src={`${token.logo}`} alt={token.logo} />
                      <div>
                        {token.symbol}
                        <span className="bridge-container-badge-modal">
                          (
                          <span
                            className={`modal-badge badge badge-${chain.name}`}
                          >
                            {chain.name}
                          </span>
                          )
                        </span>
                      </div>
                    </div>
                    <div>{tokens[index].balances[chain.network]}</div>
                  </div>
                )
              })
            ) : (
              <div className="desc-select-chain">Select a Chain</div>
            )}
          </div>
        </div>
      </div>
    </ReactModal>
  )
}

export default TokenModal
