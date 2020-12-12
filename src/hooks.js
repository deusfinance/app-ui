
import { useWeb3React } from '@web3-react/core';

import { useState, useEffect, useMemo } from 'react'
import { getAllowances, getTokenBalance } from './services/SwapServices';

export function useEagerConnect(injected) {
    const { activate, active } = useWeb3React()

    const [tried, setTried] = useState(false)

    useEffect(() => {
        injected.isAuthorized().then((isAuthorized) => {
            if (isAuthorized) {
                activate(injected, undefined, true).catch(() => {
                    setTried(true)
                })
            } else {
                setTried(true)
            }
        })
    }, []) // intentionally only running on mount (make sure it's only mounted once :))

    // if the connection worked, wait until we get confirmation of that to flip the flag
    useEffect(() => {
        if (!tried && active) {
            setTried(true)
        }
    }, [tried, active])

    return tried
}

function getTokenInfo(token) {
    //balance
    //allowences

}

async function getBlance(tokenName) {
    try {
        const balance = await getTokenBalance(tokenName)
        return balance
    } catch (error) {
        return 0
    }
}

async function getAllowance(tokenName) {
    try {
        const allowances = await getAllowances(tokenName)
        return allowances
    } catch (error) {
        return 0
    }
}

export function useGetToken(token) {
    const context = useWeb3React()
    const { account, chainId } = context
    const [newToken, setNewToken] = useState(token)
    const { name } = token

    setNewToken = useMemo(() => {
        try {
            setNewToken.balance = getBlance(name)
            if (setNewToken.allowances <= 0) setNewToken.allowances = getAllowance(name)
            setNewToken(token)
        } catch (err) {
            console.log(err);
        }
    }, name, account, chainId, token.lastFetch)

    return setNewToken
}
