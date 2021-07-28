import React, { useMemo, Children } from 'react';
import ReactModal from 'react-modal'
import styled from 'styled-components'
import { Type } from '../../App/Text';
import { RowBetween } from '../../App/Row';
import { X } from 'react-feather'
import TokensRow from './TokensRow';

if (typeof window !== 'undefined') {
  ReactModal.setAppElement('body')
}

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    zIndex: 4,
    height: "100vh",
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height: "85vh",
    maxHeight: '600px',
    maxWidth: '500px',
    width: '95vw',
    background: 'transparent',
    border: '1px solid #000000',
    borderRadius: '10px',
    paddingBottom: '20px',
    zIndex: 5,
    overflow: "hidden",
  }
}

const Wrapper = styled.div`
  background: ${({ theme }) => theme.bg5};
  width: 50vw;
  max-width: 500px;
  border-radius: 10px;
  padding: 20px;
  max-height:600px;
  height:85vh;
  position: absolute;
  border: 1px solid #000000;
  box-shadow: inset 0px 2px 2px rgb(211 211 211 / 10%);
  left: 0;
  right: 0;
  transform: translateY(-50%);
  padding-bottom:20px;
  top:calc(50%);
  z-index: 5;
  margin:auto;
  ${({ theme }) => theme.mediaWidth.upToSmall`
      width: 95vw;
  `}
`
const StyledClose = styled(X)`
  :hover {
    cursor: pointer;
    filter:brightness(0.8);
  }
`
const Line = styled.div`
height: 1px;
background: rgba(255, 255, 255, 0.15);
margin:${({ my }) => my} 0;
`

const TokensWrap = styled.div`
    margin:0 -20px;
`


const SearchBox = ({ currencies, pairedTokens, swapState, escapedType, changeToken, disableLoading = true, account, active, setActive }) => {

  return (useMemo(() => active &&
    <ReactModal
      isOpen={active}
      style={customStyles}
      closeTimeoutMS={200}
      onRequestClose={() => setActive(false)}
      shouldCloseOnOverlayClick={true}
    >
      <Wrapper>
        <RowBetween fontWeight="300" >
          <Type.LG  >Select a Token</Type.LG>
          <StyledClose stroke="white" onClick={() => setActive(false)} />
        </RowBetween>
        <Line my="20px"></Line>
        <RowBetween mt="5px" opacity="0.5">
          <Type.MD >Token</Type.MD>
          <Type.MD >Balance</Type.MD>
        </RowBetween>
        <Line my="5px"></Line>
        <TokensWrap>
          {Children.toArray(pairedTokens.map(tokens => (<TokensRow tokens={tokens} currencies={currencies} account={account} disableLoading={disableLoading} handleClick={() => changeToken(tokens[0], escapedType)} />)))}
        </TokensWrap>
      </Wrapper>
    </ReactModal >, [active, currencies, pairedTokens, escapedType, changeToken, disableLoading, account, setActive]));
}

export default SearchBox;