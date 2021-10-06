import { useWeb3React } from '@web3-react/core';
import React, { useState } from 'react';
import styled from 'styled-components'
import { ButtonSyncDeactivated, ButtonSyncActive } from '../Button';
import { FlexCenter } from '../Container';
import { WaveLoading } from 'react-loadingg';
import { isZero, isGt } from '../../../constant/number';
import Wallets from '../../common/Navbar/Wallets';
import { NameChainId } from '../../../constant/web3';
import { addRPC } from '../../../services/addRPC';
import { useTranslation } from 'react-i18next';

// import Loader from '../Loader';
const errors = {
    NotConnected: "ConnectWallet",
    MARKET_CLOSED: "marketIsClosed",
    WrongNetwork: "WrongNetwork",
    EMPTY: "enterAmount",
    INSUFFICIENT: "insufficientBalance",
    SELECT_ASSET: "selectAnAsset",
    UNDER_MAINTENANCE: "underMaintenance",
    LOADING: "LOADING...",
    EXCEEDS_CAP: "EXCEEDS SYNCHRONIZER CAP",
}


const WrapActions = styled.div`
    margin-top:${({ mt }) => mt || "33px"};
    height: 55px;
    display:flex;
    font-size:20px;
    font-family:"Monument Grotesk Semi";
    & > button {
        margin:0px 5px;
    }
`
const ButtonSwap = styled(ButtonSyncActive)`
  background: ${({ theme }) => theme.grad1};
  color: ${({ theme }) => theme.text1};
  font-size:25px;
`
const WrapStep = styled(FlexCenter)`
margin-top:10px;
`

const CycleNumber = styled(FlexCenter)`
width:20px;
height:20px;
border-radius:20px;
background: ${({ theme, active }) => active ? theme.grad1 : theme.border1};
color: ${({ theme, active }) => active ? theme.text1 : theme.text1};
z-index: 0;
font-size:12px;
margin:0 -1px;
`
const Line = styled.div`
background: ${({ theme }) => theme.grad1} ;
height: 2px;
width: 50%;
`
const SyncAction = ({ maxBalance, isPreApproved, validNetwork, fromCurrency, toCurrency, position, isClose, strategy, remindCap = 100000000000000, handleSync = undefined, mt, isApproved, handleApprove, loading, bgColor, bgDeactivated, amountIn, amountOut }) => {

    const { account, chainId } = useWeb3React()
    const [showWallets, setShowWallets] = useState(false)
    const { t } = useTranslation()


    // if (isClosed)
    //     errTxt = t("marketIsClosed")
    // else if ((validChain && chainId && chainId !== validChain)) {
    //     errTxt = t("wrongNetwork")
    // } else if (isNaN(amount) || Number(amount) === 0) {
    //     errTxt = t("enterAmount")
    // } else if (getBalance() < amount) {
    //     errTxt = t("insufficientBalance")
    // } else if (account && remindCap < amount) {
    //     errTxt = "EXCEEDS SYNCHRONIZER CAP"
    // }

    const checkError = () => {
        if (!toCurrency || !fromCurrency) return t(errors.SELECT_ASSET)
        if (isClose) return t(errors.MARKET_CLOSED)
        if (amountIn === "" || isZero(amountIn)) return t(errors.EMPTY)
        if (maxBalance && isGt(amountIn, maxBalance)) return t(errors.INSUFFICIENT)
        if (isNaN(amountOut)) return errors.LOADING
        // if (remindCap < amountIn) return t(errors.EXCEEDS_CAP)
        return null;
    }

    if (!account) {
        return <WrapActions>
            <Wallets showWallets={showWallets} setShowWallets={setShowWallets} />
            <ButtonSwap active={true} onClick={() => setShowWallets(true)}>
                {t(errors.NotConnected)}
            </ButtonSwap>
        </WrapActions>
    }
    if (chainId && chainId !== validNetwork) {
        return <WrapActions>
            <Wallets showWallets={showWallets} setShowWallets={setShowWallets} />
            <ButtonSwap active={true} onClick={() => addRPC(account, validNetwork)}>
                SWITCH TO {NameChainId[validNetwork]}
            </ButtonSwap>
        </WrapActions>
    }


    if (checkError()) {
        return <ButtonSyncDeactivated bgColor={bgDeactivated} mt={mt}>{checkError()}</ButtonSyncDeactivated>
    }

    if (isPreApproved == null) {
        return <WrapActions>
            <ButtonSyncDeactivated bgColor={bgDeactivated}>
                <WaveLoading />
            </ButtonSyncDeactivated>
        </WrapActions>
    }

    const syncText = <> <span>{position.toUpperCase()}</span><span style={{ marginLeft: "7px" }}>{strategy}</span></>

    return (<>
        {isPreApproved ? <WrapActions mt={mt}><ButtonSwap active={true} onClick={handleSync} >{syncText}</ButtonSwap> </WrapActions> : <>
            <WrapActions mt={mt}>
                <ButtonSwap active={!isApproved} onClick={handleApprove} >
                    APPROVE
                </ButtonSwap>
                {isApproved ?
                    <ButtonSwap active={true} onClick={handleApprove} >{syncText}</ButtonSwap> :
                    <ButtonSyncDeactivated bgColor={bgDeactivated} onClick={handleSync}> {syncText} </ButtonSyncDeactivated>
                }
            </WrapActions>
            <WrapStep>
                <CycleNumber active={true}>1</CycleNumber>
                <Line></Line>
                <CycleNumber active={isApproved}>2</CycleNumber>
            </WrapStep>
        </>
        }
    </>);
}

export default SyncAction;