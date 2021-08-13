import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components'
import { ExternalLink as ExternalIcon, X } from 'react-feather'
import ReactModal from 'react-modal'
import { RowBetween, RowFlat } from '../../Row';
import { Type } from '../../Text';
import { ButtonMax } from '../../Button';
import { ExternalLink } from '../../Link';
import { FlexCenter } from '../../Container';
import SwapAction from '../SwapAction';
import { formatBalance3 } from '../../../../utils/utils';


const Popup = ({
    hasMax = true,
    amount,
    setAmount,
    title,
    active = true,
    setActive = undefined,
    balance = "1000",
    buttonText,
    isPreApproved,
    isApproved,
    loading,
    handleApprove,
    handleAction }) => {

    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0,0,0,0.8)',
            zIndex: 4,
            height: "100vh",
        },
        content: {
            color: "#000000",
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            height: "85vh",
            maxHeight: '350px',
            maxWidth: '450px',
            width: '95vw',
            background: 'transparent',
            border: '1px solid #000000',
            borderRadius: '10px',
            padding: 'none',
            paddingBottom: '20px',
            zIndex: 5,
            overflow: "hidden",
        }
    }

    const Wrapper = styled.div`
        background: ${({ theme }) => theme.text1};
        border-radius: 10px;
        height:100%;
        border: 1px solid #000000;
        box-shadow: inset 0px 2px 2px rgb(211 211 211 / 10%);
        left: 0;
        right: 0;
        ${({ theme }) => theme.mediaWidth.upToSmall`
            width: 95vw;
        `}
`
    const StyledClose = styled(X)`
        stroke: #000;
        :hover {
            cursor: pointer;
            stroke: #6e6e6e;
        }
`
    const TitleWrapper = styled.div`
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 44px;
       padding:0  20px;
       width:100%;
        background: rgba(0, 0, 0, 0.15);
    `
    const InputContainer = styled.div`
       display: flex;
       align-items: center;
       justify-content: space-between;
       width:100%;
       padding:5px 10px;
       padding-right: 0px;
       border:1px solid #333;
       border-radius: 6px;
        margin-top:5px;
    `
    const Container = styled.div``

    const InputAmount = styled.input.attrs({
        type: "number",
        autocomplete: "off",
        autocorrect: "off",
        spellcheck: "false",
        autoFocus: true
    })`
        font-weight: 400;
        flex: 1 1 auto;
        border: ${({ border }) => border || "none"};
        outline-style: none;
        width: ${({ width }) => width || "0px"};
        font-size: ${({ fontSize }) => fontSize || "25px"};
        color: ${({ theme }) => theme.text1_2};
        background: transparent;
`
    const [onMax, setOnMax] = useState(false)

    useEffect(() => {
        if (amount === balance) {
            setOnMax(true)
        } else {
            setOnMax(false)
        }
    }, [amount, balance])

    return (useMemo(() => {
        return <ReactModal
            isOpen={active}
            style={customStyles}
            closeTimeoutMS={200}
            onRequestClose={() => setActive(false)}
            shouldCloseOnOverlayClick={true}
        >
            <Wrapper>
                <RowBetween fontWeight="300" >
                    <TitleWrapper>
                        <Type.LG  >{title}</Type.LG>
                        <StyledClose stroke="white" onClick={() => setActive(false)} />
                    </TitleWrapper>
                </RowBetween>
                <Container style={{ padding: "10px", marginTop: "20px", marginBottom: "80px" }}>
                    <RowFlat style={{ width: "100%", justifyContent: "flex-end" }}>
                        <Type.SM>Balance:</Type.SM>
                        <Type.SM>{formatBalance3(balance, 6)}</Type.SM>
                    </RowFlat>
                    <InputContainer>
                        <InputAmount
                            placeholder="0.0"
                            width="0"
                            value={amount} onChange={(e) => setAmount(e.currentTarget.value)} />
                        {hasMax && !onMax && <ButtonMax width={"40px"} active={true}
                            style={{ background: "#616161" }}
                            onClick={() => setAmount(balance)}>
                            MAX
                        </ButtonMax >}
                    </InputContainer>

                    <ExternalLink href="https://rinkeby.etherscan.io/address/0xeC954bBdb8436Dc52e05b965bBECbd795bc6E027">
                        <FlexCenter style={{ marginTop: "20px" }}>
                            <Type.MD style={{ marginRight: "2px", marginTop: "3px" }}  >SHOW ME THE CONTRACT</Type.MD>
                            <ExternalIcon height="18px" />
                        </FlexCenter>
                    </ExternalLink>
                    <SwapAction
                        text={buttonText}
                        isPreApproved={isPreApproved}
                        isApproved={isApproved}
                        loading={loading}
                        amountOut={0}
                        handleApprove={handleApprove}
                        handleSwap={handleAction}
                        bgColor={"grad_dei"}
                        amountIn={amount}
                    />
                </Container>


            </Wrapper>
        </ReactModal>
    }, [customStyles, title, hasMax, onMax, active, setActive, amount, balance, handleAction, handleApprove, loading, buttonText, isApproved, isPreApproved, setAmount])
    );
}

export default Popup;