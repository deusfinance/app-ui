import { useCallback } from "react";
// import { sendMessage } from "./telegramLogger";

export const fetcher = async function (url, init) {
    try {
        const resp = await fetch(url, init)
        return await resp.json()
    } catch (error) {
        console.log("fetch " + url + " had some error", error);
    }
}

export const useOracleFetch = (urls = [], init = { cache: "no-cache" }) => {
    return useCallback(() => {
        let reportMessages = ""
        return Promise.allSettled(
            urls.map(api => fetch(api, init))
        ).then(function (responses) {
            responses = responses.filter((result, i) => {
                if (result?.value?.ok) return true
                reportMessages = urls[i] + "\t is down\n"
                return false
            })
            if (reportMessages !== "") {
                // sendMessage(reportMessages) TODO
                reportMessages = ""
            }
            return Promise.all(responses.map(function (response) {
                return response.value.json();
            }));
        }).catch(function (error) {
            console.log(error);
        })
        //eslint-disable-next-line 
    }, [urls])
}
