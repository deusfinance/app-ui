import React from 'react'
import ReactModal from 'react-modal'
import TokenBadge from './TokenBadge'
import { tokens, chains } from './data'
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
    width: '560px',
    background: '#242424',
    border: '1px solid #242424',
    padding: '26px 20px'
  }
}

const TokenModal = (props) => {
  const { open, hide, changeToken } = props
  const [chainToken, setChainToken] = React.useState(chains)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [showTokens, setShowTokens] = React.useState(tokens)

  const handleSearchModal = (e) => {
    let search = e.target.value
    setSearchQuery(search)
  }
  const handleFilter = (e) => {
    if (e.target.checked) {
      let result = chainToken.filter((item) => item.name === e.target.value)
      if (result.length === 0) {
        setChainToken(chains)
      } else {
        setChainToken(result)
      }
    } else {
      let result = chainToken.filter((item) => item.name !== e.target.value)
      if (result.length === 0) {
        setChainToken(chains)
      } else {
        setChainToken(result)
      }
    }
  }
  React.useEffect(() => {
    const search = new RegExp([searchQuery].join(''), 'i')
    const resultFilter = tokens.filter(
      (item) => search.test(item.name) || search.test(item.chain)
    )
    setShowTokens(resultFilter)
  }, [chainToken, searchQuery])
  return (
    <ReactModal
      isOpen={open}
      style={customStyles}
      closeTimeoutMS={200}
      onRequestClose={hide}
      shouldCloseOnOverlayClick={true}
    >
      <div>
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Select an asset
          </h5>

          <span className="close" onClick={hide}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <div className="content-modal-bridge">
            <input
              className="input-search"
              placeholder="Type to search"
              onChange={handleSearchModal}
            />
            <div className="filter">Filter</div>
            <div className="bridge-checkbox">
              {chains.map((chain, index) => (
                <span key={index}>
                  <input
                    type="checkbox"
                    id={chain.name}
                    name={chain.name}
                    defaultValue={chain.name}
                    onChange={handleFilter}
                  />
                  <label htmlFor={chain.name}>{chain.name}</label>
                </span>
              ))}
            </div>
            <div className="border-bottom"></div>
            <div className="flex-between token-name">
              <div>Token name</div>
              <div>Balance</div>
            </div>
            <div className="border-bottom mb-5"></div>
            <div className="pt-20">
              {chainToken.map((chain) =>
                showTokens.map((token, index) => {
                  return (
                    <div
                      className="token-list"
                      key={index}
                      onClick={() => {
                        changeToken(token, chain.id)
                        hide()
                      }}
                    >
                      <div className="token-list-item">
                        <TokenBadge chain={chain.name} icon={token.icon} />
                        <span>{`${token.name} (${chain.name})`}</span>
                      </div>
                      <div>{token.balance}</div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </ReactModal>
  )
}

export default TokenModal
