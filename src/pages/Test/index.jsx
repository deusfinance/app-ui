import React from 'react';
import styled, { keyframes } from 'styled-components';
import { ButtonMax, ButtonSyncDeactive, ButtonSyncActice } from '../../components/App/Button/index';
import CurrencyLogo from '../../components/App/Currency';
import { ButtonConnectWallet, NavTextBoxSecondery, NavTextBoxWarning } from '../../components/App/Navbar';
import { InputAmount, TokenInfo } from '../../components/App/Swap';
import TokenBox from '../../components/App/Swap/TokenBox';
import ButtonSyncType from '../../components/App/Synchronizer/ButtonSyncType';
import { Type } from '../../components/App/Text';

const Wrapper = styled.div`
& > div ,& > button {
    display: inline-block;
    text-align: center;
    max-width:500px;
    max-height:100px;
    vertical-align:middle;
    margin:10px 20px;
}
`
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  display: inline-block;
  vertical-align:middle;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius:${({ size }) => size} ;
  border:2px solid ${({ color }) => color || "#ffffff"};
  border-top:2px solid ${({ color }) => color || "#e95f86"};;
  border-bottom:2px solid ${({ color }) => color || "#3e90dd"};;
  animation: ${rotate} 0.5s linear infinite;
  margin:0 5px;
  text-align:center;
`

const Test = () => {
    return (<Wrapper>
        <div>regural text</div>

        <Type.Primary fontSize={25}>
            primary text
        </Type.Primary>

        <Type.Secodery fontSize={25}>
            secodery text
        </Type.Secodery>

        <Type.Success fontSize={25}>
            success text
        </Type.Success>

        <Type.Warning fontSize={25}>
            warning text
        </Type.Warning>

        <Type.XXXL>
            xxxl text
        </Type.XXXL>

        <Type.XXL>
            xxl text
        </Type.XXL>

        <Type.XL>
            xl text
        </Type.XL>

        <Type.LG>
            large text
        </Type.LG>

        <Type.MD>
            medium text
        </Type.MD>

        <Type.SM>
            small text
        </Type.SM>

        <Type.XS>
            extra small text
        </Type.XS>

        <ButtonSyncDeactive>
            SELECT AN ASSET
        </ButtonSyncDeactive>

        <ButtonSyncActice>
            SYNC
        </ButtonSyncActice>

        <ButtonSyncActice style={{ display: "flex" }}>
            <span>SYNC</span>
            <Loader style={{ position: "absolute", right: "10px" }}
                size="25px"
            />
        </ButtonSyncActice>

        <NavTextBoxSecondery>
            0x00c0...0F91
        </NavTextBoxSecondery>


        <NavTextBoxWarning >
            Wrong Network
        </NavTextBoxWarning>

        <ButtonConnectWallet onClick={() => console.log("ButtonConnectWallet")}>
            connect wallet
        </ButtonConnectWallet>

        <ButtonMax width={"40px"}
            onClick={() => console.log("max clicked")}>
            MAX
        </ButtonMax>

        <Type.XXL>
            SYNCHRONIZER XDAI
        </Type.XXL>

        <Type.SM color={'secodery'}>
            Balance: 0
        </Type.SM>

        <InputAmount
            placeholder="0.0"
            width={"100px"}
        />

        <CurrencyLogo
            style={{ verticalAlign: "middle" }}
            currency={{ logo: "/tokens/usdc.svg" }}
            size={"30px"}
        />

        <TokenBox
            hasMax={true}
            currency={{ logo: "/tokens/busd.svg", symbol: "busd", balance: "8235.284456129464577913" }}
        />

        <ButtonSyncType>
            <Type.LG>LONG</Type.LG>
        </ButtonSyncType>


    </Wrapper>);
}

export default Test;