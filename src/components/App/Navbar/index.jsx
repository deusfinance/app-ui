import styled from 'styled-components'
import { ButtonSecondery } from '../Button'
import { TextBoxSecondery, TextBoxWarning } from '../TextBox'

const Base = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: nowrap;
    align-items: center;
    font-size: 15px;
    height :${({ height }) => (height || "35px")};
    padding:0 15px;
`

export const NavPrimaryText = styled(Base)`
    color:${({ theme }) => theme.text1};
    background: ${({ theme }) => theme.label_second};
    width:105px;
`

export const NavWarningText = styled(Base)`
    width:80px;
`

export const NavTextBoxSecondery = styled(TextBoxSecondery).attrs({
    height: "35px"
})`
    font-size: 15px;
    padding:0 15px;
`

export const NavTextBoxWarning = styled(TextBoxWarning).attrs({
    height: "35px",
})`
    font-size: 12.5px;
    padding:0 15px;
`

export const ButtonConnectWallet = styled(ButtonSecondery).attrs({
    height: "35px",
})`
`
export const ButtonChangeNetWork = styled(ButtonSecondery).attrs({
    height: "35px",
})`
`