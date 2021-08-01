import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { ButtonSyncDeactivated, ButtonSyncActive } from '../Button';
import { FlexCenter } from '../Container';
import { WaveLoading } from 'react-loadingg';
import { useWeb3React } from '@web3-react/core';
import { isGt, isZero } from '../../../constant/number';
import Wallets from '../../common/Navbar/Wallets';

const errors = {
    NotConnected: "CONNECT WALLET",
    WrongNetwork: "WRONG NETWORK",
    EMPTY: "ENTER AN AMOUNT",
    INSUFFICIENT: "INSUFFICIENT BALANCE",
    MAX_ALLOCATION: "INSUFFICIENT ALLOCATION",
    LOADING: "LOADING...",
}

const WrapActions = styled.div`
    margin-top:33px;
    height: "55px";
    display:flex;
    font-size:20px;
    font-family:"Monument Grotesk Semi";
    & > button {
        margin:0px 5px;
    }
`
const ButtonSwap = styled(ButtonSyncActive)`
  background: ${({ theme, bgColor }) => bgColor ? theme[bgColor] : theme.grad3};
  color: ${({ theme }) => theme.text1};
  font-size:${({ fontSize }) => fontSize || "20px"};
`

const WrapStep = styled(FlexCenter)`
margin-top:10px;
`

const CycleNumber = styled(FlexCenter)`
width:20px;
height:20px;
border-radius:20px;
background: ${({ theme, bgColor, active }) => active ? bgColor ? theme[bgColor] : theme.grad3 : theme.border1};
color: ${({ theme, active }) => active ? theme.text1 : theme.text1};
z-index: 0;
font-size:12px;
margin:0 -1px;
`
const Line = styled.div`
background: ${({ theme, bgColor }) => bgColor ? theme[bgColor] : theme.grad3} ;
height: 2px;
width: 50%;
`
const SwapAction = ({ isPreApproved, amountIn, amountOut, amountInDollar, swapState, TokensMap, isApproved, loading, swapLoading, validNetworks = [4, 1], handleApprove, handleSwap, allocation, bgColor }) => {

    const { account, chainId } = useWeb3React()
    const [showWallets, setShowWallets] = useState(false)

    const checkError = () => {
        if (!account) return errors.NotConnected
        if (chainId && validNetworks.indexOf(chainId) === -1) return errors.WrongNetwork
        if (amountIn === "" || isZero(amountIn)) return errors.EMPTY
        if (isGt(amountIn, TokensMap[swapState.from.address]?.balance)) return errors.INSUFFICIENT
        if (isGt(amountInDollar, allocation)) return errors.MAX_ALLOCATION
        if (isNaN(amountOut)) return errors.LOADING
        return null;
    }


    useEffect(() => {
        if (account)
            setShowWallets(false)
    }, [account])

    if (!account) {
        return <WrapActions>
            <Wallets showWallets={showWallets} setShowWallets={setShowWallets} />
            <ButtonSwap bgColor={bgColor} active={true} onClick={() => setShowWallets(true)}>
                {errors.NotConnected}
            </ButtonSwap>
        </WrapActions>
    }
    if (checkError()) {
        return <WrapActions>
            <ButtonSyncDeactivated bgColor="bg8" color='text1_2' >{checkError()}</ButtonSyncDeactivated>
        </WrapActions>
    }

    if (isPreApproved == null) {
        return <WrapActions>
            <ButtonSyncDeactivated>
                <WaveLoading />
            </ButtonSyncDeactivated>
        </WrapActions>
    }

    return (<>
        {isPreApproved ?
            <WrapActions>
                <ButtonSwap active={true} fontSize={"25px"} onClick={handleSwap} bgColor={bgColor}>
                    MUONIZE ME
                    {swapLoading && <img style={{ position: "absolute", right: "10px" }} alt="sp" src="/img/spinner.svg" width="35" height="35" />}
                </ButtonSwap>
            </WrapActions> : <>
                <WrapActions>
                    {!isApproved ? <>
                        <ButtonSwap bgColor={bgColor} active={true} onClick={handleApprove} >
                            APPROVE
                            {loading && <img style={{ position: "absolute", right: "10px" }} alt="sp" src="/img/spinner.svg" width="35" height="35" />}
                        </ButtonSwap>
                        <ButtonSyncDeactivated bgColor="bg8" color='text1_2'>MUONIZE ME</ButtonSyncDeactivated>
                    </> : <>
                        <ButtonSyncDeactivated bgColor="bg8" color='text1_2'>APPROVED</ButtonSyncDeactivated>
                        <ButtonSwap bgColor={bgColor} active={true} onClick={handleSwap}>
                            MUONIZE ME
                            {swapLoading && <img style={{ position: "absolute", right: "10px" }} alt="sp" src="/img/spinner.svg" width="35" height="35" />}
                        </ButtonSwap>
                    </>
                    }
                </WrapActions>
                <WrapStep bgColor={bgColor}>
                    <CycleNumber bgColor={bgColor} active={true}>1</CycleNumber>
                    <Line bgColor={bgColor}></Line>
                    <CycleNumber bgColor={bgColor} active={isApproved}>2</CycleNumber>
                </WrapStep>
            </>
        }
    </>);
}

export default SwapAction;