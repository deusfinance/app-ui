import { useEffect, useState, useCallback } from "react"
import { useWeb3React } from '@web3-react/core'
import useWeb3, { useCrossWeb3 } from './useWeb3'
import BigNumber from 'bignumber.js'
import useRefresh from "./useRefresh";
import { getToWei } from "./formatBalance";
import { deposit, getPrices, getUsedAmount } from "./muonHelper";
import { ToastTransaction } from "../utils/explorers";
import axios from "axios";
import { getCurrentTimeStamp } from "../utils/utils";
import { ChainMap } from "../constant/web3";

export const useUsedAmount = (validChainId = 1) => {
    const { account } = useWeb3React()
    const bscWeb3 = useCrossWeb3(ChainMap.BSC)
    const xdaiWeb3 = useCrossWeb3(ChainMap.XDAI)
    const ethWeb3 = useCrossWeb3(ChainMap.MAINNET)
    const { fastRefresh } = useRefresh()

    const [used, setUsed] = useState(null)
    useEffect(() => {
        const get = async () => {
            const resEth = await getUsedAmount(account, ChainMap.MAINNET, ethWeb3)
            const resBsc = await getUsedAmount(account, ChainMap.BSC, bscWeb3)
            const resXdai = await getUsedAmount(account, ChainMap.XDAI, xdaiWeb3)
            const sumUsed = new BigNumber(resEth).plus(resBsc).plus(resXdai).toFixed(2)
            setUsed(sumUsed)
        }
        if (account)
            get()
    }, [ethWeb3, bscWeb3, xdaiWeb3, account, validChainId, fastRefresh])

    return used
}

export const useSwap = (fromCurrency, toCurrency, amountIn, amountOut, fromSymbol, amount, validChainId = 1, callback) => {
    const { account, chainId } = useWeb3React()
    const web3 = useWeb3()

    const handleSwap = useCallback(async () => {
        try {
            if (validChainId && chainId !== validChainId) return false
            // console.log(amount);
            // console.log(getToWei(amount, fromCurrency.decimals).toFixed(0));
            // const muonOutput = await getSign(fromSymbol, getToWei(amount, fromCurrency.decimals), account)
            const time = getCurrentTimeStamp()
            await signMsg(fromCurrency, toCurrency, amountIn, amountOut, fromSymbol, amount, time, account, chainId, validChainId, web3, callback)

        } catch (e) {
            console.log(e);
            return false
        }
    }, [fromCurrency, toCurrency, amountIn, amountOut, amount, account, chainId, fromSymbol, validChainId, callback, web3])

    return { onSwap: handleSwap }
}

export const usePrices = () => {
    const { slowRefresh } = useRefresh()
    const [prices, setPrices] = useState(null)

    useEffect(() => {
        const get = async () => {
            const p = await getPrices()
            setPrices(p)
        }
        get()
    }, [slowRefresh])

    return prices
}


export const useAmountsOut = (debouncedAmountIn, price = 0) => {
    const getAmountsOut = useCallback(() => {
        return new BigNumber(price).times(debouncedAmountIn).div(0.095).times(1e18)
    }, [debouncedAmountIn, price])
    return { getAmountsOut }
}

export const useAmountsIn = (from, debouncedAmountOut, price = 100000000) => {
    const getAmountsIn = useCallback(async () => {
        return getToWei(new BigNumber(0.095).times(debouncedAmountOut).div(price), from.decimals)
    }, [from, debouncedAmountOut, price])
    return { getAmountsIn }
}





export const signMsg = async (fromCurrency, toCurrency, amountIn, amountOut, fromSymbol, amount, time, account, chainId, validChainId = 1, web3, callback) => {

    // const msgParams = [
    //     {
    //         type: 'uint256', // Any valid solidity type
    //         name: 'time', // Any string label you want
    //         value: time // The value to sign
    //     },
    //     {
    //         type: 'address',
    //         name: 'forAddress',
    //         value: account
    //     }
    // ]


    // const example = {
    //     types: {
    //         EIP712Domain: [
    //         ],
    //         RelayRequest: [
    //             {
    //                 type: 'uint256', // Any valid solidity type
    //                 name: 'time', // Any string label you want
    //                 value: time // The value to sign
    //             },
    //             {
    //                 type: 'address',
    //                 name: 'forAddress',
    //                 value: account
    //             },
    //         ],
    //     },
    //     domain: { },
    //     primaryType: "RelayRequest",
    //     message: {
    //         time: time,
    //         forAddress: account,
    //     },
    // };
    // const example = {
    //     types: {
    //         EIP712Domain: [
    //         ],
    //         RelayRequest: [
    //             {
    //                 type: 'uint256', // Any valid solidity type
    //                 name: 'time', // Any string label you want
    //                 value: time // The value to sign
    //             },
    //             {
    //                 type: 'address',
    //                 name: 'forAddress',
    //                 value: account
    //             },
    //         ],
    //     },
    //     domain: {},
    //     primaryType: "RelayRequest",
    //     message: {
    //         time: time,
    //         forAddress: account,
    //     },
    // };
    // const msgParams = [
    //     {
    //         type: 'string',
    //         name: 'message',
    //         value: 'Hi, Alice!'
    //     },
    //     {
    //         "type": "address",
    //         "name": "forAddress",
    //         "value": account
    //     }
    // ]
    // console.log(msgParams);

    // signMsg(msgParams, issuerAddress).then(value => {
    //     // thisClaim.signature.type = 'eth_signTypedData',
    //     //     thisClaim.signature.creator = issuerAddress,
    //     //     thisClaim.signature.signatureValue = value.result
    //     // resolve(thisClaim)
    // })


    // const typedData = [{
    //     type: 'string',
    //     name: 'message',
    //     value: 'Hi, Alice!'
    // }]

    // const msgParams2 = [
    //     account, // Required
    //     typedData, // Required
    // ];


    let domain = [
        { name: "name", type: "string" },
    ]

    let domainData = {
        name: "PreSale",
    }

    let messageType = [
        {
            type: 'uint256',
            name: 'time',
        },
        {
            type: 'address',
            name: 'forAddress',
        }
    ]

    let messageData = {
        time: time,
        forAddress: account
    }

    let eip712TypedData = {
        types: {
            EIP712Domain: domain,
            Message: messageType
        },
        domain: domainData,
        primaryType: "Message",
        message: messageData
    }

    let dataToSign = JSON.stringify(eip712TypedData)


    web3.currentProvider.sendAsync(
        {
            from: account,
            id: time,
            jsonrpc: "2.0",
            method: 'eth_signTypedData_v4',
            params: [account, dataToSign]
        },
        async function (err, result) {
            if (err) return console.error(err)
            if (result.error) {
                return console.error(result.error.message)
            }
            console.log(result);
            const BASE_URL = 'https://node1.muon.net/v1/'
            let data = {
                app: 'presale',
                method: 'deposit',
                params: {
                    token: fromSymbol,
                    amount: getToWei(amount, fromCurrency.decimals),
                    forAddress: account,
                    time,
                    sign: result.result,
                    chainId: chainId
                }
            }
            try {
                const output = await axios.post(BASE_URL, data)
                const muonOutput = output.data
                console.log(output);
                console.log(muonOutput);

                if (!muonOutput.success) {
                    ToastTransaction("warn", "MUONIZE FAILED", muonOutput.error.message, { autoClose: true })
                    return
                }

                const { result } = muonOutput
                console.log(result);

                const tx = await deposit(
                    fromCurrency,
                    toCurrency,
                    amountIn,
                    amountOut,
                    result.data.result,
                    result.cid,
                    result.signatures,
                    account,
                    validChainId,
                    web3
                )
                callback(tx)
            } catch (error) {
                callback({ status: false })

                console.log(error)
            }
        }
    )
}


function doSignTypedData(method, msgParams, from, web3) {
    return new Promise(resolve => {
        web3.currentProvider.sendAsync({ method: 'eth_signTypedData', params: [msgParams, from], from: from }, (error, result) => {
            if (error) {
                console.error(error);
                resolve(error);
            } else if (result.error) {
                console.error(result.error.message);
                resolve(result.error.message);
            } else {
                console.log("Signature: " + result.result);
                resolve(result.result);
            }
        });
    });
}


function signMsg2(msgParams, from, web3) {
    return new Promise(function (resolve, reject) {
        web3.currentProvider.sendAsync({
            method: 'eth_signTypedData',
            params: [msgParams, from],
            from: from
        }, function (err, result) {
            if (err) reject(console.error(err))
            if (result.error) {
                reject(console.error(result.error.message))
            }
            resolve(result)
        })
    })
}

