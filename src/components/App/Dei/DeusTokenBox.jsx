import React, { useMemo } from 'react'
import styled from 'styled-components'
import { ExternalLink } from '../Link';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { addToken } from '../../../utils/addTokens';
import { DEITokens } from '../../../constant/token';


const MainWrapper = styled.div`
    font-family: 'Monument Grotesk';
    width: 100%;
    padding: 5px 25px;
    background: #0d0d0d;
    border: 1px solid #1c1c1c;
    border-radius: 10px;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 20px;
    margin-bottom: 10px;
    font-weight: 300;
`

const EachUrl = styled.span`
    cursor: pointer;
    display: block;
    font-size: 15px;
    margin:10px 0;
    font-weight: 300;
    .active {
        color: #0DB0F4;
    }
`

const DeusTokenBox = () => {
    const deusToken = DEITokens[1][1]
    return (
        useMemo(() => {
            return <MainWrapper>
                <EachUrl>
                    <p onClick={() => addToken(deusToken)}>Add $DEUS to MetaMask <img src="/img/metamask.png" alt="metmask" /> </p>
                </EachUrl>
                <EachUrl>
                    <CopyToClipboard text={deusToken.address}
                        onCopy={() => console.log("copied")}>
                        <p>Copy $DEUS Contract
                            <svg style={{ marginLeft: "5px" }} width={11} height={13} viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.5" y="3.5" width={7} height={9} rx="0.5" stroke="#C4C4C4" />
                                <rect x="3.5" y="0.5" width={7} height={9} rx="0.5" stroke="#C4C4C4" />
                            </svg>
                        </p>
                    </CopyToClipboard>

                </EachUrl>
                <EachUrl style={{ color: "#F34692" }}>
                    <ExternalLink href={`https://app.uniswap.org/#/swap?use=V2&outputCurrency=${deusToken.address}`}> Buy $DEUS on Uniswap</ExternalLink>
                </EachUrl>
                <EachUrl style={{ color: "#87b2ff" }}>
                    <ExternalLink href={`https://quickswap.exchange/#/swap?outputCurrency=${deusToken.address}`}> Buy $DEUS on QuickSwap</ExternalLink>
                </EachUrl>

            </MainWrapper>
        }, [])
    )
}

export default DeusTokenBox