import React, { useMemo } from 'react';
import Davatar from "@davatar/react";
import { NavbarSideWrap, NavButton, NavWarningButton } from '../../App/Navbar';
import { addRPC } from '../../../utils/addRPC';
import { NameChainId } from '../../../constant/web3';
import { formatAddress } from '../../../utils/utils';
import useWeb3 from '../../../hooks/useWeb3';
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router';
import { getCorrectChains } from '../../../constant/correctChain';
import { useENS } from '../../../hooks/useENS';

const NavSide = ({ handleConnect, open, setOpen, chainId, account }) => {
    const web3 = useWeb3()
    const location = useLocation()
    const validChains = getCorrectChains(location.pathname)
    const { t } = useTranslation()
    const { ensName } = useENS(account)

    return useMemo(() => {

        return <NavbarSideWrap >
            {account && <>
                {chainId && validChains.indexOf(chainId) === -1 ?
                    <NavWarningButton active={false} >
                        {t("WrongNetwork")}
                    </NavWarningButton>
                    :
                    <NavButton active={false} >
                        <svg width={8} height={8} style={{ marginRight: "5px" }} viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx={4} cy={4} r={4} fill="#00E376" />
                        </svg>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Davatar size={20} address={account} />
                            <div style={{ marginLeft: '6px' }}>{ensName || formatAddress(account)}</div>
                        </div>
                    </NavButton>
                }
            </>}
            {account ?
                (chainId && validChains.indexOf(chainId) === -1)
                    ?
                    <NavButton className="network-label" active={true} onClick={() => addRPC(account, validChains[0], web3)}>
                        {t("changeTo")} {NameChainId[validChains[0]] || "ETH"}
                    </NavButton>
                    :
                    <NavButton className="network-label" active={false} >
                        <span style={{ opacity: "0.5", marginRight: "5px" }}>Network: </span> {NameChainId[chainId]}
                        {/* {NameChainId[chainId]} */}
                    </NavButton>
                :
                <NavButton active={true} onClick={handleConnect}>
                    {t("connectWallet")}
                </NavButton>
            }

            <svg className="hamb" onClick={() => setOpen(!open)} width={22} height={16} viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 15H1" stroke="white" strokeWidth={2} strokeLinecap="round" /><path d="M21 8H1" stroke="white" strokeWidth={2} strokeLinecap="round" /><path d="M21 1H1" stroke="white" strokeWidth={2} strokeLinecap="round" /></svg>
        </NavbarSideWrap>
    }, [ensName, chainId, account, web3, validChains, handleConnect, setOpen, open, t])
}

export default NavSide;