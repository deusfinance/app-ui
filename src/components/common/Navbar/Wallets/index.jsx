import React from 'react';
import { connectorsByName } from '../../../../connectors';
import './wallets.scss'
import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';

const Wallets = ({ setShow }) => {
    const [, setActivatingConnector] = useState()

    const web3React = useWeb3React()
    const { activate } = web3React

    return (<div >
        <div className="blury"></div>
        <div className="wrap-wallets">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => setShow(false)}>
                <path d="M1 1L7 7L13 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13 13L7 7L0.999999 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <div className="title">Select a wallet provider</div>
            <div className="wallets">
                {Object.keys(connectorsByName).map(name => {
                    const currentConnector = connectorsByName[name]
                    return <div className="wallet" key={name} onClick={() => {
                        setActivatingConnector(currentConnector)
                        activate(connectorsByName[name])
                    }}>{name}</div>
                })}
            </div>
        </div>
    </div>);
}




export default Wallets;