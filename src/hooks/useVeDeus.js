
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import useRefresh from "./useRefresh";
import { useERC20, useVeDEUS } from "./useContract";
import useWeb3 from "./useWeb3";
import { DEUS_ADDRESS, VE_DEUS_ADDRESS } from "../constant/contracts";
import { ZERO } from '../constant/number';

// export const useAllowance = () => {
//     const [allowance, setAllowance] = useState(ZERO);
//     const { account, chainId } = useWeb3React();
//     const { fastRefresh } = useRefresh();
//     const deusContract = useERC20(DEUS_ADDRESS(chainId));
//     const veDeusAddress = VE_DEUS_ADDRESS[chainId]

//     useEffect(() => {
//         const fetchAllowance = async () => {
//             const res = await deusContract.methods
//                 .allowance(account, veDeusAddress)
//                 .call();
//             setAllowance(new BigNumber(res));
//         };
//         if (account && deusContract && veDeusAddress) {
//             fetchAllowance();
//         }
//     }, [account, deusContract, veDeusAddress, fastRefresh]);

//     return allowance;
// };

export const useVeDEUSInfo = () => {
    const [veDeusInfo, setVeDeusInfo] = useState({
        veDeusBalance: ZERO,
        lockedEnd: 0,
        veDeusTotalSupply: ZERO,
        totalDeus: ZERO,
        lockedDeus: ZERO,
    });

    const web3 = useWeb3();
    const { account, chainId } = useWeb3React();
    const { fastRefresh } = useRefresh();
    const veDeusContract = useVeDEUS(chainId);

    useEffect(() => {
        const getXlqdrInfo = async () => {
            try {
                const [veDeusTotalSupply, totalDeus, epoch] = await Promise.all([
                    veDeusContract.methods.totalSupply().call(),
                    veDeusContract.methods.supply().call(),
                    veDeusContract.methods.epoch().call(),
                ]);
                const [pointHistory] = await Promise.all([
                    veDeusContract.methods.point_history(epoch).call(),
                ]);
                let veDeusBalance = ZERO, lockedEnd = 0;
                let lockedDeus = ZERO;
                if (account) {
                    const [xlqdrBalanceRes, { 0: lockedAmount, 1: lockedEndRes }] =
                        await Promise.all([
                            veDeusContract.methods.balanceOf(account).call(),
                            veDeusContract.methods.locked(account).call(),
                        ]);
                    veDeusBalance = new BigNumber(xlqdrBalanceRes).div(1e18);
                    lockedEnd = Number(lockedEndRes);
                    lockedDeus = new BigNumber(lockedAmount).div(1e18);
                }
                setVeDeusInfo({
                    veDeusBalance,
                    lockedEnd,
                    veDeusTotalSupply: new BigNumber(veDeusTotalSupply).div(1e18),
                    totalDeus: new BigNumber(totalDeus).div(1e18),
                    lockedDeus,
                    deus_amt: new BigNumber(pointHistory[4].toString()).div(1e18),
                });
            } catch (e) {
                console.error("fetch veDeus data had error", e);
            }
        };
        if (web3) {
            getXlqdrInfo();
        }
    }, [web3, chainId, fastRefresh, account, veDeusContract]);

    return veDeusInfo;
};

