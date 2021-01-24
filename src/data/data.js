// function getBlockNumber(library: Web3Provider): () => Promise<number> {
//   return async (): Promise<number> => {
//     return library.getBlockNumber()
//   }
// }


// function getTokenBalance(contract, token) {
// Promise  {
//         return async (address: string): Promise<TokenAmount> =>
//             contract
//                 .balanceOf(address)
//                 .then((balance: { toString: () => string }) => new TokenAmount(token, balance.toString()))
//     }
// }



export function useTokenBalance(
    token,
    address = null,
    suspense = false
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
) {
    const contract = useContract(token?.address, IERC20.abi)

    const result = useSWR(
        typeof address === 'string' && token && contract
            ? [address, token.chainId, token.address, DataType.TokenBalance]
            : null,
        getTokenBalance(contract, token),
        { suspense }
    )
    useKeepSWRDataLiveAsBlocksArrive(result.mutate)
    return result
}

const { data: balance } = useSWR(["getBalance", account, "latest"])


const fetcher = (library) => (...args) => {
    const [method, ...params] = args
    console.log(method, params)
    return library[method](...params)
}


export const Balance = () => {
    const { account, library } = useWeb3React()
    const { data: balance, mutate } = useSWR(['getBalance', account, 'latest'], {
        fetcher: fetcher(library),
    })

    useEffect(() => {
        // listen for changes on an Ethereum address
        console.log(`listening for blocks...`)
        library.on('block', () => {
            console.log('update balance...')
            mutate(undefined, true)
        })
        // remove listener when the component is unmounted
        return () => {
            library.removeAllListeners('block')
        }
        // trigger the effect only on component mount
    }, [])

    if (!balance) {
        return <div>...</div>
    }
    return <div>Ξ {parseFloat(formatEther(balance)).toPrecision(4)}</div>
}


const { account, library } = useWeb3React()
library.on("blockNumber", (blockNumber) => {
    console.log({ blockNumber })
})


export const TokenBalance = ({ symbol, address, decimals }) => {
    const { account, library } = useWeb3React()
    const { data: balance, mutate } = useSWR([address, 'balanceOf', account], {
        fetcher: fetcher(library, ERC20ABI),
    })

    useEffect(() => {
        // listen for changes on an Ethereum address
        console.log(`listening for Transfer...`)
        const contract = new Contract(address, ERC20ABI, library.getSigner())
        const fromMe = contract.filters.Transfer(account, null)
        library.on(fromMe, (from, to, amount, event) => {
            console.log('Transfer|sent', { from, to, amount, event })
            mutate(undefined, true)
        })
        const toMe = contract.filters.Transfer(null, account)
        library.on(toMe, (from, to, amount, event) => {
            console.log('Transfer|received', { from, to, amount, event })
            mutate(undefined, true)
        })
        // remove listener when the component is unmounted
        return () => {
            library.removeAllListeners(toMe)
            library.removeAllListeners(fromMe)
        }
        // trigger the effect only on component mount
    }, [])

    if (!balance) {
        return <div>...</div>
    }
    return (
        <div>
            {parseFloat(formatUnits(balance, decimals)).toPrecision(4)} {symbol}
        </div>
    )
}

const fetcher = (library, abi) => (...args) => {
    const [arg1, arg2, ...params] = args
    // it's a contract
    if (isAddress(arg1)) {
        const address = arg1
        const method = arg2
        const contract = new Contract(address, abi, library.getSigner())
        return contract[method](...params)
    }
    // it's a eth call
    const method = arg1
    return library[method](arg2, ...params)
}