import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useWeb3React } from '@web3-react/core';

import { NoEthereumProviderError, UserRejectedRequestError as UserRejectedRequestErrorInjected } from '@web3-react/injected-connector'
import { WalletConnectConnector, UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector'

import { connectorsByName } from '../../../../connectors';
import { useInactiveListener, useEagerConnect } from "../../../../hooks";

import './wallets.scss'

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

function getErrorMessage(error) {
  console.error(error);
  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect
  ) {
    return 'Please authorize this website to access your Ethereum account.'
  } else {
    return 'An unknown error occurred. Check the console for more details.'
  }
}

const Wallets = ({ showWallets, setShowWallets }) => {
    const context = useWeb3React()
    const { connector, chainId, account, activate, deactivate, active, error  } = context

    const [ displayErrorBox, setDisplayErrorBox ] = useState(false);
    const [ cachedConnectorName, setCachedConnectorName ] = useState(undefined);

    // in the process of connecting with a provider
    const [activatingConnector, setActivatingConnector] = useState()
    useEffect(() => {
      if (activatingConnector && activatingConnector === connector) {
        setActivatingConnector(undefined)
      }
    }, [activatingConnector, connector])

    // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
    const triedEager = useEagerConnect()

    // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
    useInactiveListener(!triedEager || !!activatingConnector)

    useEffect(() => {
      if (
        error instanceof UserRejectedRequestErrorInjected ||
        error instanceof UserRejectedRequestErrorWalletConnect
      ) {
        // do something special here if we want to
      }

      if (!!error) {
        setDisplayErrorBox(true)
        resetWalletConnector()
      }
    }, [error])

    function showModal () {
      setShowWallets(true)
    }

    function closeModal () {
      setDisplayErrorBox(false);
      setShowWallets(false)
    }

    // walletconnect has this bug where it doesn't reload after closing the window, remove connector in that case
    function resetWalletConnector () {
      if (
        connector &&
        connector instanceof WalletConnectConnector &&
        connector.walletConnectProvider?.wc?.uri
      ) {
        connector.walletConnectProvider = undefined
      }
    }

    // on page load, do nothing until we've tried to connect to the injected connector
    if (!triedEager) {
      return null
    }

    return (<div >
      <Modal
        isOpen={showWallets}
        onRequestClose={closeModal}
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="wrap-wallets">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={closeModal}>
                <path d="M1 1L7 7L13 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13 13L7 7L0.999999 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <div className="title">Select a wallet provider</div>
            <div className="wallets">
                {Object.keys(connectorsByName).map(name => {
                    const currentConnector = connectorsByName[name]
                    const activating = currentConnector === activatingConnector
                    const isConnected = currentConnector === connector
                    return (
                      <div
                        className={`wallet ${(account && isConnected) ? 'connected' : ''}`}
                        key={name}
                        onClick={() => {
                          setActivatingConnector(currentConnector)
                          setCachedConnectorName(currentConnector)
                          setDisplayErrorBox(false)
                          activate(connectorsByName[name])
                        }}
                      >
                        {(isConnected && active)
                          ? <Circle style={{position: 'relative', transform: 'translateY(-14px)'}} />
                          : <div></div>
                        }
                        <div>{name}</div>
                        {activating && <Spinner color={'red'} style={{ height: '50%', position: 'absolute', transform: 'translateY(-10px)'}} />}
                      </div>
                )})}
                {displayErrorBox && (
                  <div className="wallet error">
                    {console.log(getErrorMessage(error))}
                    <div className="wallet-msg">Error connecting.</div>
                    <div className="wallet-box" onClick={() => {
                      activate(cachedConnectorName);
                    }}>Try Again</div>
                  </div>
                )}
            </div>
        </div>
      </Modal>
  </div>);
}

function Circle ({...rest}) {
  return (
    <svg width={8} height={8} viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <circle cx={4} cy={4} r={4} fill="#00E376" />
    </svg>
  )
}

function Spinner({ color, ...rest }) {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke={color} {...rest}>
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)" strokeWidth="4">
          <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
          <path d="M36 18c0-9.94-8.06-18-18-18">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </g>
    </svg>
  )
}

export default Wallets;
