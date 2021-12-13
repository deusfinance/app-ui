import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { ButtonSyncDeactivated, ButtonSyncActive } from '../Button';
import { useWeb3React } from '@web3-react/core';
import Wallets from '../../common/Navbar/Wallets';
import { addRPC } from '../../../services/addRPC';
import { NameChainId } from '../../../constant/web3';

const errors = {
    NotConnected: "CONNECT WALLET",
    WrongNetwork: "WRONG NETWORK",
    SelectTokens: "SELECT TOKENS",
    CoolDown: "*COOLDOWN",
}

const WrapActions = styled.div`
    margin: 24px;
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
  color: ${({ theme }) => theme.text1_2};
  font-size:${({ fontSize }) => fontSize || "20px"};
`
const SwapAction = ({ text = "SWAP", swapLoading = false, migrateList, validNetwork, handleSwap, coolDown, bgColor }) => {

    const { account, chainId } = useWeb3React()
    const [showWallets, setShowWallets] = useState(false)

    const checkError = () => {
        // if (chainId && validNetworks.indexOf(chainId) === -1) return errors.WrongNetwork
        if (parseInt(coolDown) !== 0) return errors.CoolDown + " : " + coolDown + " s"
        if (Object.keys(migrateList).length === 0) return errors.SelectTokens
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
                CONNECT WALLET
            </ButtonSwap>
        </WrapActions>
    }
    if (chainId && chainId !== validNetwork) {
        return <WrapActions>
            <Wallets showWallets={showWallets} setShowWallets={setShowWallets} />
            <ButtonSwap bgColor={bgColor} active={true} onClick={() => addRPC(account, validNetwork)}>
                SWITCH TO {NameChainId[validNetwork].toUpperCase()}
            </ButtonSwap>
        </WrapActions>
    }


    if (checkError()) {
        return <WrapActions>
            <ButtonSyncDeactivated style={{ fontWeight: "300" }} >{checkError()}</ButtonSyncDeactivated>
        </WrapActions>
    }
    return (<>
        <WrapActions>
            <ButtonSwap active={true} fontSize={"25px"} onClick={handleSwap} style={{ fontWeight: "300" }} bgColor={bgColor}>{text}
                {swapLoading && <img style={{ position: "absolute", right: "10px" }} alt="sp" src="/img/spinner-gold.svg" width="40" height="40" />}
            </ButtonSwap>
        </WrapActions>
    </>);
}

export default SwapAction;