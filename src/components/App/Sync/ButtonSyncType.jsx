import React from 'react';
import { Base } from '../Button';
import { Flex, Box, Image } from 'rebass/styled-components';
import styled from 'styled-components';


const Wrapper = styled(Base).attrs({
    width: "100%",
    height: "55px",
    borderRadius: "6px",
    padding: "2px",
})`
  background: ${({ theme }) => theme.sync_active};
  font-size:20px;
  cursor:pointer;
   &:hover{
       & > div{
            background-color:transparent;
        }
  }
`

const ButtonSyncType = ({ children }) => {
    return (<Wrapper>
        <Flex
            justifyContent="center"
            flexDirection="column"
            width="100%"
            height="100%"
            backgroundColor="#111111"
            style={{ borderRadius: "6px", transition: "all 0.35s" }}
        >
            {children}
        </Flex>
    </Wrapper>);
}

export default ButtonSyncType;