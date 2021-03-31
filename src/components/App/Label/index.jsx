import styled from 'styled-components'

const Base = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: nowrap;
    color:${({ theme }) => theme.text1};
    width:${({ width }) => (width ? width : '100%')};
    align-items: center;
`

export const LabelPrimary = styled(Base)`
    color:${({ theme }) => theme.text1};
    background: ${({ theme }) => theme.label_primary};
`
export const LabelSecondary = styled(Base)`
    color:${({ theme }) => theme.text1};
    background: ${({ theme }) => theme.label_second};
`

export const LabelSuccess = styled(Base)`

`
export const LabelWarning = styled(Base)`

`

