import { useWeb3React } from '@web3-react/core';
import React, { useState } from 'react';
import styled from 'styled-components'
import { isGt, isZero } from '../../../constant/number';
import Wallets from '../../common/Navbar/Wallets';
import { ButtonSyncDeactive, ButtonSyncActice } from '../Button';
import { FlexCenter } from '../Container';
import { WaveLoading } from 'react-loadingg';

// import Loader from '../Loader';
const errors = {
    NotConnected: "CONNECT WALLET",
    WrongNetwork: "WRONG NETWORK",
    EMPTY: "ENTER AMOUNT",
    INSUFFICIENT: "INSUFFICIENT BALANCE",
    LOADING: "LOADING...",
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
const ButtonSwap = styled(ButtonSyncActice)`
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
const SyncAction = ({ TokensMap, isPreApproved, validNetworks = [], fromCurrency, toCurrency, handlSync = undefined, mt, isApproved, handleApprove, loading, bgColor, amountIn, amountOut }) => {

    const { account, chainId } = useWeb3React()
    const [showWallets, setShowWallets] = useState(false)

    const checkError = () => {
        if (chainId && validNetworks.indexOf(chainId) === -1) return errors.WrongNetwork
        if (amountIn === "" || isZero(amountIn)) return errors.EMPTY
        if (TokensMap && isGt(amountIn, TokensMap[fromCurrency.address]?.balance)) return errors.INSUFFICIENT
        if (isNaN(amountOut)) return errors.LOADING
        return null;
    }

    if (!account) {
        return <WrapActions>
            <Wallets showWallets={showWallets} setShowWallets={setShowWallets} />
            <ButtonSwap active={true} onClick={() => setShowWallets(true)}>
                CONNECT WALLET
            </ButtonSwap>
        </WrapActions>
    }


    if (checkError()) {
        return <WrapActions>
            <ButtonSyncDeactive mt={mt} >{checkError()}</ButtonSyncDeactive>
        </WrapActions>
    }

    if (isPreApproved == null) {
        return <WrapActions>
            <ButtonSyncDeactive>
                <WaveLoading />
            </ButtonSyncDeactive>
        </WrapActions>
    }

    return (<>
        {isPreApproved ? <WrapActions mt={mt}><ButtonSwap onClick={() => handlSync()} active={true} > SYNC</ButtonSwap></WrapActions> :
            <>
                <WrapActions mt={mt}>
                    {!isApproved ? <>
                        <ButtonSwap bgColor={bgColor} active={true} onClick={handleApprove} >
                            APPROVE
                            {loading && <img style={{ position: "absolute", right: "10px" }} alt="sp" src="/img/spinner.svg" width="35" height="35" />}
                        </ButtonSwap>
                        <ButtonSyncDeactive>SYNC</ButtonSyncDeactive>
                    </> : <>
                        <ButtonSyncDeactive>APPROVED</ButtonSyncDeactive>
                        <ButtonSwap bgColor={bgColor} active={true} onClick={handlSync}>
                            SYNC
                        </ButtonSwap>
                    </>
                    }
                </WrapActions>
                <WrapStep>
                    <CycleNumber active={true}>1</CycleNumber>
                    <Line></Line>
                    <CycleNumber active={false} active={isApproved}>2</CycleNumber>
                </WrapStep>
            </>
        }
    </>);
}

export default SyncAction;