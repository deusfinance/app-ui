import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { addToken } from '../../../utils/addTokens';
import { deiCollateralLpToken, deiDeusLpToken, DeusNativeLpToken } from '../../../constant/token';
import { Copy, CheckCircle } from 'react-feather';


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
    const deiCollateralLp = deiCollateralLpToken[chainId]
    const deiDeusLp = deiDeusLpToken[chainId]
    const deusNativeLp = DeusNativeLpToken[chainId]
    const [state, setState] = useState({ "deiCollateral": false, "deiDeus": false, "deusNativeLp": false })

    return (
        useMemo(() => {
            return <MainWrapper>
                <EachUrl>
                    <p className="deus" onClick={() => addToken({ ...deusNativeLp, symbol: "UNI-V2" })}>Add {deusNativeLp?.symbol} to MetaMask <img src="/img/metamask.png" alt="metamask" /> </p>
                </EachUrl>
                <EachUrl>
                    <CopyToClipboard text={deusNativeLp?.address}
                        onCopy={() => setState({ ...state, "deusNativeLp": true })}>
                        <p className="deus">Copy {deusNativeLp?.symbol} Contract
                            {state["deusNativeLp"] ? <CheckCircle width="15px" style={{ marginLeft: "3px" }} /> : <Copy width="15px" style={{ marginLeft: "3px" }} />}
                        </p>
                    </CopyToClipboard>
                </EachUrl>
                <Line />
                {deiDeusLp?.address && <>
                    <EachUrl>
                        <p className="deus" onClick={() => addToken({ ...deiDeusLp, symbol: "UNI-V2" })}>Add  DEI-DEUS LP to MetaMask <img src="/img/metamask.png" alt="metamask" /> </p>
                    </EachUrl>
                    <EachUrl>
                        <CopyToClipboard text={deiDeusLp?.address}
                            onCopy={() => setState({ ...state, "deiDeus": true })}>
                            <p className="deus">Copy DEI-DEUS LP Contract
                                {state["deiDeus"] ? <CheckCircle width="15px" style={{ marginLeft: "3px" }} /> : <Copy width="15px" style={{ marginLeft: "3px" }} />}
                            </p>
                        </CopyToClipboard>
                    </EachUrl>
                    <Line />
                </>}

                <EachUrl>
                    <p className="dei" onClick={() => addToken({ ...deiCollateralLp, symbol: "UNI-V2" })}>Add DEI-USDC LP to MetaMask <img src="/img/metamask.png" alt="metamask" /> </p>
                </EachUrl>
                <EachUrl>
                    <CopyToClipboard text={deiCollateralLp?.address}
                        onCopy={() => setState({ ...state, "deiCollateral": true })}>
                        <p className="dei">Copy DEI-USDC LP Contract
                            {state["deiCollateral"] ? <CheckCircle width="15px" style={{ marginLeft: "3px" }} /> : <Copy width="15px" style={{ marginLeft: "3px" }} />}
                        </p>
                    </CopyToClipboard>
                </EachUrl>

            </MainWrapper>
        }, [deiCollateralLp, deiDeusLp, deusNativeLp, state])
    )
}

export default LpTokens