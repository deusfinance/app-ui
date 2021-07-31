import { useCallback } from "react";
import useRefresh from "../hooks/useRefresh";
import { sendMessage } from "./telegramLogger";

export const fetcher = async function (url, init) {
    try {
        const resp = await fetch(url, init)
        return await resp.json()
    } catch (error) {
        console.log("fetch " + url + " had some error", error);
    }
}

export const useOracleFetch = (urls = []) => {
    return useCallback(() => {
        let reportMessages = ""
        return Promise.allSettled(
            urls.map(api => fetch(api, { cache: "no-cache" }))
        ).then(function (responses) {
            responses = responses.filter((result, i) => {
                if (result?.value?.ok) return true
                reportMessages = urls[i] + "\t is down\n"
                return false
            })
            if (reportMessages !== "") {
                sendMessage(reportMessages)
                reportMessages = ""
            }
            return Promise.all(responses.map(function (response) {
                return response.value.json();
            }));
        }).catch(function (error) {
            console.log(error);
        })
    }, [urls])
}

export const useFreshOracleFetch = (urls = []) => {
    const { fastRefresh } = useRefresh()
    return useCallback(() => {
        let reportMessages = ""
        return Promise.allSettled(
            urls.map(api => fetch(api, { cache: "no-cache" }))
        ).then(function (responses) {
            responses = responses.filter((result, i) => {
                if (result?.value?.ok) return true
                reportMessages = urls[i] + "\t is down\n"
                return false
            })
            if (reportMessages !== "") {
                sendMessage(reportMessages)
                reportMessages = ""
            }
            return Promise.all(responses.map(function (response) {
                return response.value.json();
            }));
        }).catch(function (error) {
            console.log(error);
        })
    }, [urls, fastRefresh])
}