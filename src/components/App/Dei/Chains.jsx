import React from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core';
import SelectBox from './SelectBox';

export const MainWrapper = styled.div`
    font-family: 'Monument Grotesk';
    width: 100%;
    padding: 20px 25px;
    background: #0d0d0d;
    border: 1px solid #1c1c1c;
    border-radius: 10px;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 20px;
    margin-bottom: 18px;
    padding-top: 10px;
    padding-bottom: 0;
    font-weight: 300;
`

export const Chains = ({ validChainId, validNetworks }) => {
    const { account } = useWeb3React()
    return (<MainWrapper>
        <p style={{ opacity: "0.7", fontSize: "13px" }}>Select Chain  <span style={{ color: "#d28787" }}>{!account ? "(Connect your wallet)" : ""}</span> </p>
        <SelectBox currRow={validChainId} validNetworks={validNetworks} account={account} />
    </MainWrapper>
    )
}