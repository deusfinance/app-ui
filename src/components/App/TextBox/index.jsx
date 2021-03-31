import styled from 'styled-components'

const Base = styled.div`
  padding: ${({ padding }) => (padding ? padding : '0')};
  height: ${({ height }) => (height || "35px")};
  line-height :${({ height }) => (height || "35px")};
  font-family: Monument Grotesk;
  font-weight: 400;
  text-align: center;
  border-radius: 6px;
  border-radius: ${({ borderRadius }) => borderRadius && borderRadius};
  outline: none;
  border: 0;
  color: white;
  text-decoration: none;
  display: flex;
  flex-direction:column
  justify-content: center;
  flex-wrap: nowrap;
  align-items: center;
`

export const TextBoxSecondery = styled(Base)`
 background: ${({ theme }) => theme.grad2};
 color:${({ theme }) => theme.text1};
 border: 1px solid rgba(97, 192, 191, 0.25);
`

export const TextBoxWarning = styled(Base)`
 background: ${({ theme }) => theme.bg2};
 color:${({ theme }) => theme.label_warning};
 border: 1px solid #d50000;
 font-size:12.5px;
`