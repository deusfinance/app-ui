import React, { useCallback, useState } from 'react';
import { MainWrapper, SwapWrapper } from '../../components/App/Swap';
import { DEITokens } from '../../constant/token';
import { CostBox } from '../../components/App/Dei/CostBox';
import LinkBox from '../../components/App/Dei/LinkBox'
import { Type } from '../../components/App/Text';
import { useApprove } from '../../hooks/useApprove';
import useChain from '../../hooks/useChain';
import { ContentWrapper } from '../../components/App/Dei';
import { useDeiUpdate } from '../../hooks/useDei';
import { useLocation } from 'react-router-dom';
import { getCorrectChains } from '../../constant/correctChain';
import { Chains } from '../../components/App/Dei/Chains';
import DeusTokenBox from '../../components/App/Dei/DeusTokenBox';
import DeiTokenBox from '../../components/App/Dei/BuyDEUS';
import { ButtonSwap } from './../../components/App/Dei/SwapAction'

const Burn = () => {
    const location = useLocation()
    const validNetworks = getCorrectChains(location.pathname)
    const chainId = useChain(validNetworks)
    const [, setApproveLoading] = useState(false)
    useDeiUpdate(chainId)

    let targetToken = DEITokens[chainId][1]
    let adminAddress = "0xE5227F141575DcE74721f4A9bE2D7D636F923044"

    const { onApprove } = useApprove(targetToken, adminAddress, chainId)

    const handleApprove = useCallback(async () => {
        try {
            setApproveLoading(true)
            const tx = await onApprove()
            if (tx.status) {
                console.log("Approved");
            } else {
                console.log("Approve Failed");
            }
            setApproveLoading(false)

        } catch (e) {
            setApproveLoading(false)
            console.error(e)
        }
    }, [onApprove])

    return (<>
        <MainWrapper>
            <ContentWrapper>
                <Type.XL fontWeight="300">Approve DEUS to burn your token</Type.XL>
                <SwapWrapper style={{ marginTop: "25px" }}>
                    <ButtonSwap bgColor={"grad_dei"} active={true} onClick={handleApprove} >
                        APPROVE {targetToken && targetToken.symbol}
                    </ButtonSwap>
                </SwapWrapper>
            </ContentWrapper>
        </MainWrapper>

        <div className='tut-left-wrap'>
            <LinkBox />
            <CostBox type={'mint'} chainId={chainId} />
        </div>

        <div className='tut-right-wrap'>
            <DeusTokenBox />
            <DeiTokenBox />
            <Chains validChainId={chainId} validNetworks={validNetworks} />
        </div>
    </>);
}

export default Burn;
