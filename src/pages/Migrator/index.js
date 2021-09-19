import React, { useState } from 'react';
import styled from 'styled-components'
import { Type } from '../../components/App/Text';
import MultipleBox from '../../components/App/Migrator/MultipleBox';

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
   /* border: 1px solid #000000; */
   border-radius: 15px 15px 0px 0px;
`

export const Title = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 12px;
   height: 70px;
   border: 1px solid #000000;
`

export const TokensContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 22px;
   height: 70px;
   border: 1px solid #000000;
`

export const Token = styled.div`
    background: #272727;
    border: 1px solid #000000;
    box-sizing: border-box;
    border-radius: 15px;
    width: 160px;
    height: 100px;
`

const Migrator = () => {
    const [fastUpdate, setFastUpdate] = useState(0)
    const [swapState, setSwapState] = useState([
        { symbol: "DEA", balance: "342.23" },
        { symbol: "sDEA", balance: "342.23" },
        // { symbol: "DEA", balance: "342.23" },
        // { symbol: "sDEA", balance: "342.23" },
    ])

    return (<MainWrapper>
        <Type.XXL fontWeight="300">Migrator</Type.XXL>
        <Container>
            <Title>
                <div style={{ display: 'flex', justifyContent: "flex-start", alignItems: "center" }}>
                    <svg style={{ margin: "0 10px" }} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="20" height="20" rx="3" fill="#CECECE" />
                    </svg>
                    <Type.LG fontWeight="300">Migrate: </Type.LG>
                    <Type.LG style={{ marginLeft: "5px" }} fontWeight="300"> DEA / sDEA </Type.LG>
                </div>
                <div>&#8594;</div>
            </Title>

            <div style={{ marginBottom: '20px'}}>
                <MultipleBox
                    currency={swapState}
                    fastUpdate={fastUpdate}
                />
            </div>

            <div>.</div>

        </Container>
    </MainWrapper>);
}

export default Migrator;