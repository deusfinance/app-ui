import { Flex } from 'rebass/styled-components';
import styled from 'styled-components';


export const ZapContainer = styled(Flex)`
    justify-content: space-between;
    align-items: center;
    ${({ theme }) => theme.mediaWidth.upToSmall`
      flex-direction:column;
  `}
`