import React, { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useEagerConnect, useInactiveListener } from '../../../hooks'

export default function Web3ReactManager({ children }) {
    const context = useWeb3React()
    const { connector, chainId, active, networkError } = context
    const triedEager = useEagerConnect()

    // handle logic to recognize the connector currently being activated
    const [activatingConnector, setActivatingConnector] = useState()

    useEffect(() => {
        if (activatingConnector && activatingConnector === connector) {
            setActivatingConnector(undefined)
        }
    }, [activatingConnector, connector, chainId])

    // when there's no account connected, react to logins (broadly speaking) on the injected provider, if it exists
    useInactiveListener(!triedEager)

    // handle delayed loader state
    // const [showLoader, setShowLoader] = useState(false)
    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         setShowLoader(true)
    //     }, 600)

    //     return () => {
    //         clearTimeout(timeout)
    //     }
    // }, [])

    // on page load, do nothing until we've tried to connect to the injected connector
    if (!triedEager) {
        return null
    }

    // if the account context isn't active, and there's an error on the network context, it's an irrecoverable error
    if (!active && networkError) {
        return (
            <>
                {/* <Message>{t('unknownError')}</Message> */}
                unknownError
            </>
        )
    }

    // // if neither context is active, spin
    // if (!active && !networkActive) {
    //     return showLoader ? (
    //         <Loader size={"50px"} />
    //     ) : null
    // }

    return children

}

