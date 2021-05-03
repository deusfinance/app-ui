import React from 'react';
import styled from 'styled-components'
import { ButtonSyncDeactive, ButtonSyncActice } from '../Button';
import { FlexCenter } from '../Container';
import { WaveLoading } from 'react-loadingg';
import { useWeb3React } from '@web3-react/core';
import { isGt, isZero } from '../../../constant/number';

const errors = {
    NotConnected: "CONNECT WALLET",
    WrongNetwork: "WRONG NETWORK",
    EMPTY: "ENTER AN AMOUNT",
    INSUFFICIENT: "INSUFFICIENT BALANCE",
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
const ButtonSwap = styled(ButtonSyncActice)`
  background: ${({ theme }) => theme.grad3};
  color: ${({ theme }) => theme.text1_2};
  font-size:${({ fontSize }) => fontSize || "20px"};
`
const WrapStep = styled(FlexCenter)`
margin-top:10px;
`

const CycleNumber = styled(FlexCenter)`
width:20px;
height:20px;
border-radius:20px;
background: ${({ theme, active }) => active ? theme.grad3 : theme.border1};
color: ${({ theme, active }) => active ? theme.text1_2 : theme.text1};
z-index: 0;
font-size:12px;
margin:0 -1px;
`
const Line = styled.div`
background: ${({ theme }) => theme.grad3} ;
height: 2px;
width: 50%;
`
const SwapAction = ({ isPreApproved, amountIn, amountOut, swapState, TokensMap, isApproved, loading, validNetworks = [4, 1], handleApprove, handleSwap }) => {

    const { account, chainId } = useWeb3React()

    const checkError = () => {
        if (!account) return errors.NotConnected
        if (chainId && validNetworks.indexOf(chainId) === -1) return errors.WrongNetwork
        if (amountIn === "" || amountOut === "" || isZero(amountIn)) return errors.EMPTY
        if (isGt(amountIn, TokensMap[swapState.from.address]?.balance)) return errors.INSUFFICIENT
        return null;
    }

    if (checkError()) {
        return <WrapActions>
            <ButtonSyncDeactive >{checkError()}</ButtonSyncDeactive>
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
        {isPreApproved ?
            <WrapActions>
                <ButtonSwap active={true} fontSize={"25px"} onClick={handleSwap}>SWAP</ButtonSwap>
            </WrapActions> : <>
                <WrapActions>
                    {!isApproved ? <>
                        <ButtonSwap active={true} onClick={handleApprove} >
                            APPROVE
                        {loading && <img style={{ position: "absolute", top: "0px", right: "0px" }} alt="sp" src="/img/spinner.svg" width="35" height="35" />}
                        </ButtonSwap>
                        <ButtonSyncDeactive>SWAP</ButtonSyncDeactive>
                    </> : <>
                        <ButtonSyncDeactive>APPROVED</ButtonSyncDeactive>
                        <ButtonSwap active={true} onClick={handleSwap}>
                            SWAP
                    </ButtonSwap>
                    </>
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

export default SwapAction;