import React from 'react';
import styled from 'styled-components'
import { Type } from '../../components/App/Text';

export const MainWrapper = styled.div`
   padding-top: 60px;
   padding-bottom: 30px;
   text-align:center;
   max-width: 95%;
   margin:auto;
`
export const Container = styled.div`
   margin-top: 60px;
   background: linear-gradient(180deg, #18191D 0%, #18191D 100%);
   border: 1px solid #000000;
   border-radius: 15px 15px 0px 0px;
`

export const Title = styled.div`
   height: 70px;
   border: 1px solid #000000;
`



const Migrator = () => {
    return (<MainWrapper>
        <Type.XXL fontWeight="300">Migrator</Type.XXL>
        <Container>
            <Title>
                {"->"}
            </Title>
        </Container>
    </MainWrapper>);
}

export default Migrator;