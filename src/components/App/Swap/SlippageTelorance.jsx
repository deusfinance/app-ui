import React from 'react';
import styled from 'styled-components'
import { Flex } from 'rebass/styled-components'

import { StyleSwapBase, StyleTitles } from '.';
import { Base } from '../Button';
import { RowFlat } from '../Row';
import { FlexCenter } from '../Container';
import { Type } from '../Text';


const Wrapper = styled(FlexCenter)`
    ${StyleSwapBase}
    ${StyleTitles}
    margin-top:-1px;
    justify-content:space-between;
    padding:10px 20px;
    &::first-child{
        position:absolute;
        left:20px;
    }
    
`
export const Option = styled(Base)`
  display:inline-flex;
  height:25px;

  color: ${({ theme, active }) => active ? theme.text1_2 : theme.text1};
  background: ${({ theme, active }) => active ? theme.grad3 : theme.text1_2};
  border: ${({ active }) => active || "1px"} solid ${({ theme }) => theme.text1};
  margin:1px;
  margin-right:5px;
  width:50px;
  font-size: 13px;
  cursor:${({ active }) => active ? "default" : "pointer"};
  &:hover{
    background : ${({ active, theme }) => active ? theme.grad3 : "#5f5f5f"};
  }
`

export const CustomOption = styled.div`
   font-size: 13px;
    height:25px;
    margin:1px;
   border: 1px solid ${({ theme, active }) => active ? theme.success : theme.text1};
   padding:0 5px;
   display:inline-flex;
   justify-content:flex-end;
   align-items:center;
   border-radius: 6px;
`


const InputSlippage = styled.input`
   direction:rtl;
   color:#FFFFFF;
   border:0;
   outline:none;
   width:60px;
   margin-right:2px;
   background:transparent;

`

const SlippageTelorance = () => {
    return (<Wrapper>
        <Type.SM className="title">Slippage Telorance</Type.SM>
        <div style={{ display: "inline-block" }} justifyContent="flex-end" wrap={false} height="25px">
            <Option>0.1%</Option>
            <Option>0.5%</Option>
            <Option active={true}>1%</Option>
            <CustomOption >
                <InputSlippage placeholder="0.5" />
                 %
            </CustomOption>
        </div>
    </Wrapper >);
}

export default SlippageTelorance;