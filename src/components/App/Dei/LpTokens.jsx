import React, { useMemo } from 'react'
import styled from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { addToken } from '../../../utils/addTokens';
import { deiCollateralLpToken, deiDeusLpToken, DEITokens, ZapTokens } from '../../../constant/token';


const MainWrapper = styled.div`
    font-family: 'Monument Grotesk';
    width: 100%;
    padding: 5px 15px;
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
    p{
        display: flex;
        align-items: center;
    }
    .deus{
        &:hover{
            color:#13a9cf;
        }
    }
    .dei{
        &:hover{
            color:#de8c5a;
        }
    }
`

const Line = styled.div`
    width: 75%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    margin:auto;
    margin-bottom: 10px;
    margin-top: 10px;
`

const LpTokens = ({ chainId = 1 }) => {
    console.log(chainId);
    const deiCollateralLp = deiCollateralLpToken[chainId]
    const deiDeusLp = deiDeusLpToken[chainId]
    console.log(deiCollateralLp, deiDeusLp);
    return (
        useMemo(() => {
            return <MainWrapper>
                <EachUrl>
                    <p className="deus" onClick={() => addToken({ ...deiDeusLp, symbol: "UNI-V2" })}>Add  DEI-DEUS LP to MetaMask <img src="/img/metamask.png" alt="metmask" /> </p>
                </EachUrl>
                <EachUrl>
                    <CopyToClipboard text={deiDeusLp.address}
                        onCopy={() => console.log("copied")}>
                        <p className="deus">Copy DEI-DEUS LP Contract
                            <svg style={{ marginLeft: "5px" }} width={11} height={13} viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.5" y="3.5" width={7} height={9} rx="0.5" stroke="#C4C4C4" />
                                <rect x="3.5" y="0.5" width={7} height={9} rx="0.5" stroke="#C4C4C4" />
                            </svg>
                        </p>
                    </CopyToClipboard>

                </EachUrl>
                <Line />
                <EachUrl>
                    <p className="dei" onClick={() => addToken({ ...deiCollateralLp, symbol: "UNI-V2" })}>Add DEI-USDC LP to MetaMask <img src="/img/metamask.png" alt="metmask" /> </p>
                </EachUrl>
                <EachUrl>
                    <CopyToClipboard text={deiCollateralLp.address}
                        onCopy={() => console.log("copied")}>
                        <p className="dei">Copy DEI-USDC LP Contract
                            <svg style={{ marginLeft: "5px" }} width={11} height={13} viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.5" y="3.5" width={7} height={9} rx="0.5" stroke="#C4C4C4" />
                                <rect x="3.5" y="0.5" width={7} height={9} rx="0.5" stroke="#C4C4C4" />
                            </svg>
                        </p>
                    </CopyToClipboard>
                </EachUrl>
            </MainWrapper>
        }, [deiCollateralLp, deiDeusLp])
    )
}

export default LpTokens