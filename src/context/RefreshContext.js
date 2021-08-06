import React, { useState, useEffect } from 'react'

const RAPID_INTERVAL = 3000
const FAST_INTERVAL = 10000
const SLOW_INTERVAL = 60000

const RefreshContext = React.createContext({ slow: 0, fast: 0, rapid: 0 })

// This context maintain 3 counters that can be used as a dependencies on other hooks to force a periodic refresh
const RefreshContextProvider = ({ children }) => {
    const [slow, setSlow] = useState(0)
    const [fast, setFast] = useState(0)
    const [rapid, setRapid] = useState(0)

    useEffect(() => {
        const interval = setInterval(async () => {
            setRapid((prev) => prev + 1)
        }, RAPID_INTERVAL)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const interval = setInterval(async () => {
            setFast((prev) => prev + 1)
        }, FAST_INTERVAL)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const interval = setInterval(async () => {
            setSlow((prev) => prev + 1)
        }, SLOW_INTERVAL)
        return () => clearInterval(interval)
    }, [])

    return <RefreshContext.Provider value={{ slow, fast, rapid }}>{children}</RefreshContext.Provider>
}

export { RefreshContext, RefreshContextProvider }