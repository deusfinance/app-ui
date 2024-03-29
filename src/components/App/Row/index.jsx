import styled from 'styled-components'
import { Box } from 'rebass/styled-components'

export const Row = styled(Box)`
  width: ${({ width }) => width ?? '100%'};
  display: flex;
  padding: 0;
  align-items: ${({ align }) => align ?? 'center'};
  justify-content: ${({ justify }) => justify ?? 'flex-start'};
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
`

export const RowBetween = styled(Row)`
  justify-content: space-between;
`

export const RowCenter = styled(Row)`
  justify-content: center;
`

export const RowFlat = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

export const RowStart = styled.div`
  display: flex;
  align-items: flex-start;
`

export const AutoRow = styled(Row)`
  flex-wrap: wrap;
  margin: ${({ gap }) => gap && `-${gap}`};
  justify-content: ${({ justify }) => justify && justify};
  & > * {
    margin: ${({ gap }) => gap} !important;
  }
`

export const RowFixed = styled(Row)`
  width: fit-content;
  margin: ${({ gap }) => gap && `-${gap}`};
`

export default Row