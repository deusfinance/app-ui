import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components'
import { ButtonSyncDeactivated, ButtonSyncActive } from '../Button';
import { FlexCenter } from '../Container';
import { useWeb3React } from '@web3-react/core';
import { isGt, isZero } from '../../../constant/number';
import Wallets from '../../common/Navbar/Wallets';

const errors = {
    NotConnected: "CONNECT WALLET",
    WrongNetwork: "WRONG NETWORK",
    EMPTY: "ENTER AN AMOUNT",
    EMPTY_PROXY: "ENTER \"DEI\" AMOUNT",
    INSUFFICIENT: "INSUFFICIENT BALANCE",
    LOADING: "LOADING...",
    INPUT_ERROR: "INVALID AMOUNT",
    UNDER_MAINTENANCE: "UNDER MAINTENANCE",
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
export const ButtonSwap = styled(ButtonSyncActive)`
  background: ${({ theme, bgColor }) => bgColor ? theme[bgColor] : theme.grad3};
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
background: ${({ theme, bgColor, active }) => active ? bgColor ? theme[bgColor] : theme.grad3 : theme.border1};
color: ${({ theme, active }) => active ? theme.text1_2 : theme.text1};
z-index: 0;
font-size:12px;
margin:0 -1px;
`
const Line = styled.div`
background: ${({ theme, bgColor }) => bgColor ? theme[bgColor] : theme.grad3} ;
height: 2px;
width: 50%;
`
const SwapAction = ({ text = "SWAP", proxy, isPreApproved, amountIn, debouncedAmountIn, amountOut, swapState, TokensMap, isApproved, loading, swapLoading = false, validNetworks = [4, 1], handleApprove, handleSwap, bgColor, targetToken, isMint = false, inputError, underMaintenance = false }) => {
    const { account, chainId } = useWeb3React()
    const [showWallets, setShowWallets] = useState(false)
    const checkError = () => {
        if (underMaintenance) return text
        if (chainId && validNetworks.indexOf(chainId) === -1) return errors.WrongNetwork
        if (amountIn === "" || isZero(amountIn)) return proxy ? errors.EMPTY_PROXY : errors.EMPTY
        if (swapState && isGt(amountIn, TokensMap[swapState.from.address]?.balance)) return errors.INSUFFICIENT
        if (inputError) return errors.INPUT_ERROR
        if (isNaN(amountOut) || isPreApproved === null || (isMint && isApproved === null) || amountOut === "" || (debouncedAmountIn && debouncedAmountIn !== amountIn)) return errors.LOADING
        return null;
    }

    useEffect(() => {
        if (account)
            setShowWallets(false)
    }, [account])

    const error = checkError()

    return (useMemo(() => {
        if (!account) {
            return <WrapActions>
                <Wallets showWallets={showWallets} setShowWallets={setShowWallets} />
                <ButtonSwap bgColor={bgColor} active={true} onClick={() => setShowWallets(true)}>
                    CONNECT WALLET
                </ButtonSwap>
            </WrapActions>
        }

        if (error)
            return <WrapActions>
                <ButtonSyncDeactivated >{error}</ButtonSyncDeactivated>
            </WrapActions>

        return <>
            {(isMint && isApproved === true) || (!isMint && isPreApproved) ?
                <WrapActions>
                    <ButtonSwap active={true} fontSize={"25px"} onClick={handleSwap} bgColor={bgColor}>{text}
                        {swapLoading && <img style={{ position: "absolute", right: "10px" }} alt="sp" src="/img/spinner.svg" width="40" height="40" />}
                    </ButtonSwap>
                </WrapActions> : <>
                    <WrapActions>
                        {!isApproved ? <>
                            <ButtonSwap bgColor={bgColor} active={true} onClick={handleApprove} >
                                APPROVE {targetToken && targetToken.symbol}
                                {loading && <img style={{ position: "absolute", right: "0px" }} alt="sp" src="/img/spinner.svg" width="30" height="30" />}
                            </ButtonSwap>
                            <ButtonSyncDeactivated>{text}</ButtonSyncDeactivated>
                        </> : <>
                            <ButtonSyncDeactivated>APPROVED</ButtonSyncDeactivated>
                            <ButtonSwap bgColor={bgColor} active={true} onClick={handleSwap}>
                                {text}
                                {swapLoading && <img style={{ position: "absolute", right: "0px" }} alt="sp" src="/img/spinner.svg" width="30" height="30" />}
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
        </>
    }, [account, showWallets, setShowWallets, targetToken, isMint, isApproved, isPreApproved, handleApprove, handleSwap, bgColor, text, loading, swapLoading, error])

    );
}

export default SwapAction;