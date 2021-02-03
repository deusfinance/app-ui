import React from 'react';
import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { BigNumber } from 'ethers'
import { useWeb3React } from '@web3-react/core'
import { formatEther, formatUnits } from '@ethersproject/units'
import useEthSWR, { EthSWRConfig } from 'ether-swr'
// import ERC20ABI from './ERC20.abi.json'
import { tokenABI } from '../../utils/abis';
import { formatAddress } from '../../utils/utils';
import { useTokenBalance } from '../../hooks/useToken';
import { Token } from '../../sdk/tokens';

const ABIs = [
    ['0x6b175474e89094c44da98b954eedeac495271d0f', tokenABI],
    ['0x80ab141f324c3d6f2b18b030f1c4e95d4d658778', tokenABI],
]

// const EthBalance = () => {
//     const { account } = useWeb3React()
//     // const { data: balance } = useEthSWR(['getBalance', account, 'latest'])

//     if (!balance) {
//         return <div>...</div>
//     }
//     return <div>{parseFloat(formatEther(balance)).toPrecision(4)} Ξ</div>
// }

// const TokenBalance = ({ symbol, address, decimals }) => {
//     const { account } = useWeb3React()

//     const { data: balance } = useEthSWR([address, 'balanceOf', account])

//     if (!balance) {
//         return <div>...</div>
//     }

//     return (
//         <div>
//             {parseFloat(formatUnits(balance, decimals)).toPrecision(4)} {symbol}
//         </div>
//     )
// }

// export const TokenList = ({ chainId }) => {
//     console.log(chainId);
//     return (
//         <>
//             {['0x6b175474e89094c44da98b954eedeac495271d0f', "0x80ab141f324c3d6f2b18b030f1c4e95d4d658778"].map(token => (
//                 <TokenBalance key={token.address} {...token} />
//             ))}
//         </>
//     )
// }

const deaToken = new Token(1, "0x80ab141f324c3d6f2b18b030f1c4e95d4d658778", 18, "DEA", "DEA Finance", "dea.svg");
const deusToken = new Token(1, "0x3b62f3820e0b035cc4ad602dece6d796bc325325", 18, "DEUS", "DEUS Finance", "dea.svg");
const sdeusToken = new Token(4, "0xf025db474fcf9ba30844e91a54bc4747d4fc7842", 18, "sDEUS", "sDEUS Finance", "dea.svg");
const wbtcToken = new Token(1, "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599", 8, "WBTC", "Wrap BTC", "btc.svg");


export const Test = () => {
    const { chainId, account, library, activate, active } = useWeb3React()
    const { data: deaAmount } = useTokenBalance(deaToken, account)
    const { data: deusAmount } = useTokenBalance(deusToken, account)
    const { data: sdeusAmount } = useTokenBalance(sdeusToken, account)
    const { data: wbtcAmount } = useTokenBalance(wbtcToken, account)
    return (
        <div style={{ color: "#ffffff" }}>
            <div>ChainId: {chainId}</div>
            <div>Account: {formatAddress(account)}</div>
            <div>{sdeusAmount?.name} : {sdeusAmount?.amount}</div>
            <div>{deaAmount?.name} : {deaAmount?.amount}</div>
            <div>{deusAmount?.name} : {deusAmount?.amount}</div>
            <div>{wbtcAmount?.name} : {wbtcAmount?.amount}</div>
        </div>
    )
}


export default Test;