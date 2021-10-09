import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { addToken } from '../../../utils/addTokens';
import { DEITokens, ZapTokens } from '../../../constant/token';
import { Copy, CheckCircle } from 'react-feather';



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

const DeusTokenBox = () => {
    const deusToken = DEITokens[1][1]
    const deiToken = ZapTokens[1][0]
    const [state, setState] = useState({ "deusToken": false, "deiToken": false })
    return (
        useMemo(() => {
            return <MainWrapper>
                <EachUrl>
                    <p className="deus" onClick={() => addToken(deusToken)}>Add  <img src="/tokens/deus.svg" style={{ width: "20px", marginLeft: "4px", marginRight: "2px" }} alt="deus" /> DEUS to MetaMask <img src="/img/metamask.png" alt="metmask" /> </p>
                </EachUrl>
                <EachUrl>
                    <CopyToClipboard text={deusToken.address}
                        onCopy={() => {
                            setState({ ...state, "deusToken": true })
                        }}>
                        <p className="deus">Copy <img src="/tokens/deus.svg" style={{ width: "20px", marginLeft: "4px", marginRight: "2px" }} alt="deus" />DEUS Contract
                            {state["deusToken"] ? <CheckCircle width="15px" style={{ marginLeft: "3px" }} /> : <Copy width="15px" style={{ marginLeft: "3px" }} />}
                        </p>
                    </CopyToClipboard>

                </EachUrl>
                <Line />
                <EachUrl>
                    <p className="dei" onClick={() => addToken(deiToken)}>Add <img src="/tokens/dei.svg" style={{ width: "20px", marginLeft: "4px", marginRight: "2px" }} alt="dei" />DEI to MetaMask <img src="/img/metamask.png" alt="metmask" /> </p>
                </EachUrl>
                <EachUrl>
                    <CopyToClipboard text={deiToken.address}
                        onCopy={() => {
                            setState({ ...state, "deiToken": true })
                        }}>
                        <p className="dei">Copy <img src="/tokens/dei.svg" style={{ width: "20px", marginLeft: "4px", marginRight: "2px" }} alt="dei" />DEI Contract
                            {state["deiToken"] ? <CheckCircle width="15px" style={{ marginLeft: "3px" }} /> : <Copy width="15px" style={{ marginLeft: "3px" }} />}
                        </p>
                    </CopyToClipboard>
                </EachUrl>
            </MainWrapper >
        }, [deiToken, deusToken, state])
    )
}

export default DeusTokenBox