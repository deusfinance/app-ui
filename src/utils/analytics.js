import ReactGA from "react-ga"


function init() {
    const GOOGLE_ANALYTICS_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_ID
    if (typeof GOOGLE_ANALYTICS_ID === 'string') {
        ReactGA.initialize(GOOGLE_ANALYTICS_ID, {
            gaOptions: {
                storage: 'none',
                storeGac: false,
            },
        })
    } else {
        ReactGA.initialize('test', { testMode: true, debug: true })
    }
}

function sendEvent(payload) {
    ReactGA.event(payload)
}

function sendPageview(path) {
    ReactGA.set({ page: path })
    ReactGA.pageview(path)
}

export default {
    init,
    sendEvent,
    sendPageview,
}