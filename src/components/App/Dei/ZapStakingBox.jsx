import React from 'react';
import { Image, Flex } from 'rebass/styled-components';
import styled from 'styled-components';
import { FlexCenter } from '../Container';
import CurrencyLogo from '../Currency';
import { Type } from '../Text';

const Wrapper = styled(FlexCenter)`
    position: relative;
    height: 185px;
    width: 100%;
    max-width: 230px;
    
    margin-top: ${({ mt }) => (mt && mt)};
    background: ${({ theme }) => theme.border1};
    border: 2px solid #000000;
    border-radius: ${({ borderRadius }) => borderRadius || "15px"};
`
const TokenInfo = styled(FlexCenter)`
    position: absolute;
    bottom:20px;
    margin:auto;
    left:0;
    right:0;
    cursor:${({ active }) => active ? "pointer" : "default"};
    &:hover{
        filter:${({ active }) => active && "brightness(0.8)"};
    }
`

const StakingListWrap = styled(Flex)`
    background: ${({ active }) => !active ? "slategrey" : "none"};
    padding: 10px;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    cursor:${({ active }) => active ? "pointer" : "default"};
    &:hover{
        filter:${({ active }) => active && "brightness(0.8)"};
    }
`

const ZapBox = ({ setActive, availableStaking, activeStakingList, stakingInfo, setStakingInfo, mt }) => {

    if (activeStakingList) {

        return (<Wrapper mt={mt} style={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}  >

            {availableStaking.map((info, index) => {
                return <StakingListWrap key={index} active={stakingInfo.zapperContract !== info.zapperContract} onClick={() => {
                    setStakingInfo(info)
                    setActive(false)
                }} >
                    <CurrencyLogo
                        style={{ verticalAlign: "middle", zIndex: "1", padding: "5px", marginRight: "-7px", }}
                        currency={{ logo: info?.pic1, symbol: info?.pic1 }}
                        size={"35px"}
                        bgColor="#000000"
                    />

                    <CurrencyLogo
                        style={{ verticalAlign: "middle", position: "", padding: "5px", marginLeft: "-7px", }}
                        currency={{ logo: info?.pic2, symbol: info?.pic2 }}
                        size={"35px"}
                        bgColor="#000000"
                    />
                    <Type.LG fontWeight="300" color="text1" ml="10px" mr="9px">{info.title}</Type.LG>
                </StakingListWrap>
            })}

        </Wrapper>);

    }



    return (<Wrapper mt={mt} >

        <CurrencyLogo
            style={{ verticalAlign: "middle", position: "absolute", top: "55px", marginLeft: "-20px", zIndex: "1", padding: "5px" }}
            currency={{ logo: stakingInfo?.pic1, symbol: stakingInfo?.pic1 }}
            size={"40px"}
            bgColor="#000000"
        />

        <CurrencyLogo
            style={{ verticalAlign: "middle", position: "absolute", marginTop: "-15px", marginRight: "-30px", padding: "5px" }}
            currency={{ logo: stakingInfo?.pic2, symbol: stakingInfo?.pic2 }}
            size={"40px"}
            bgColor="#000000"
        />

        <TokenInfo onClick={setActive ? () => setActive(true) : undefined} active={setActive ? true : false}>
            <Type.XL fontWeight="300" color="text1" ml="10px" mr="9px">{stakingInfo.title}</Type.XL>
            {setActive && <Image src="/img/select.svg" size="10px" />}
        </TokenInfo>

    </Wrapper>);
}

export default ZapBox;