import React from 'react';
import ReactModal from 'react-modal'
import styled from 'styled-components'
import { Type } from '../../App/Text';
import { RowBetween } from '../../App/Row';
import CircleToken from '../../../assets/images/circle-token.svg'
import { X } from 'react-feather'
import { StyledLogo } from '../Currency';
import { FlexCenter } from '../Container';
import { formatBalance3 } from '../../../utils/utils';
import { isZero } from '../../../constant/number';

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

const TokenRow = styled(RowBetween)`
padding:0 20px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
     padding:0 10px;
  `}
    :hover{
        cursor:pointer;
        background : #292929;
    }
`
const TokensWrap = styled.div`
    margin:0 -20px;
`
const TokenWrap = styled(FlexCenter)`
    margin:7.5px 0;
`

const SearchBox = ({ currencies, swapState, escapedType, changeToken, disableLoading = true, account, active, setActive }) => {

  return (active &&
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
          {Object.keys(currencies)
            .filter(address => currencies[address].symbol !== swapState[escapedType].symbol && (!swapState[escapedType].pairID || (swapState[escapedType].pairID && currencies[address].pairID !== swapState[escapedType].pairID)))
            .map((address, id) => {
              return <TokenRow key={id} onClick={() => changeToken(currencies[address], escapedType)}>
                <TokenWrap>
                  <StyledLogo size="40px" src={currencies[address]?.logo || CircleToken} alt={currencies[address]?.symbol || "token"} />
                  <Type.LG style={{ marginLeft: "10px" }} >{currencies[address]?.symbol}</Type.LG>
                </TokenWrap>
                {!account || disableLoading || currencies[address].balance || isZero(currencies[address].balance)
                  ? <Type.LG style={{ marginLeft: "10px", opacity: "0.75" }} >{formatBalance3(currencies[address]?.balance) || 0}</Type.LG>
                  : <img style={{ marginRight: "-15px" }} src="/img/spinner.svg" width="40" height="40" alt="sp" />
                }
              </TokenRow>
            })}
        </TokensWrap>
      </Wrapper >
    </ReactModal >
  );
}

export default SearchBox;