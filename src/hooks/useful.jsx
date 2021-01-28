import { useEffect, useRef, useState } from "react";
import { useWeb3React } from '@web3-react/core';
import useSWR from 'swr';




// Hook
export function useDebounce(value, delay) {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(
        () => {
            // Update debounced value after delay
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            // Cancel the timeout if value changes (also on delay change or unmount)
            // This is how we prevent debounced value from updating if value is changed ...
            // .. within the delay period. Timeout gets cleared and restarted.
            return () => {
                clearTimeout(handler);
            };
        },
        [value, delay] // Only re-call effect if value or delay changes
    );

    return debouncedValue;
}

// export function useEagerConnect() {
//     const { activate, active } = useWeb3React()

//     const [tried, setTried] = useState(false)

//     useEffect(() => {
//         injected.isAuthorized().then((isAuthorized) => {
//             if (isAuthorized) {
//                 activate(injected, undefined, true).catch(() => {
//                     setTried(true)
//                 })
//             } else {
//                 setTried(true)
//             }
//         })
//     }, [activate])

//     // if the connection worked, wait until we get confirmation of that to flip the flag
//     useEffect(() => {
//         if (!tried && active) {
//             setTried(true)
//         }
//     }, [tried, active])

//     return tried
// }


export function useKeepSWRDataLiveAsBlocksArrive(mutate) {
    // because we don't care about the referential identity of mutate, just bind it to a ref
    const mutateRef = useRef(mutate)
    useEffect(() => {
        mutateRef.current = mutate
    })
    // then, whenever a new block arrives, trigger a mutation
    const { data } = useBlockNumber()
    console.log(data);
    useEffect(() => {
        mutateRef.current()
    }, [data])
}

export function useBlockNumber() {
    const { library } = useWeb3React()
    const shouldFetch = !!library
    return useSWR(shouldFetch ? 1 : null, getBlockNumber(library))
    // return useSWR(shouldFetch ? 1 : null, getBlockNumber(library), {
    //     refreshInterval: 20 * 1000,
    // })
}

function getBlockNumber(library) {
    return async () => library.getBlockNumber()
}