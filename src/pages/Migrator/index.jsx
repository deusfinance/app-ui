import React, { useState } from 'react';
import { Type } from '../../components/App/Text';
import MultipleBox from '../../components/App/Migrator/MultipleBox';
import MigrateBox from '../../components/App/Migrator/MigrateBox';
import SwapAction from '../../components/App/Migrator/SwapAction';
import { Image } from 'rebass/styled-components';
import { useWeb3React } from '@web3-react/core';
// import useTokenBalances from '../../hooks/useTokenBalances';
import { useLocation } from 'react-router';
// import { LOCKER_ADDRESS } from "../../constant/contracts";
import SelectBox from '../../components/App/Migrator/SelectBox';
import { ChainId, NameChainId } from '../../constant/web3';
import { getCorrectChains } from '../../constant/correctChain';
import DeusV2Tokens from '../../components/App/Migrator/DeusV2Tokens';
import MigrationTitle from '../../components/App/Migrator/MigrationTitle';
import { RowBetween } from '../../components/App/Row';
import { MainWrapper, MainDiv, Container, Line } from '../../components/App/Migrator';
import { MIGRATION_CONFIG } from '../../constant/migration';


const Migrator = () => {
    const { account, chainId } = useWeb3React()
    const [fastUpdate, setFastUpdate] = useState(0)
    const contractAddress = "";

    const location = useLocation()
    const search = useLocation().search;
    const queryParams = {
        network: new URLSearchParams(search).get('network')?.toUpperCase(),
    }
    const tempChain = queryParams.network && ChainId[queryParams.network] ? ChainId[queryParams.network] : null
    const userChain = tempChain ? tempChain : chainId
    const validChains = getCorrectChains(location.pathname)
    const currChain = userChain && validChains.indexOf(userChain) !== -1 ? userChain : ChainId.ETH
    const [SyncChainId, setSyncChainId] = useState(currChain)
    const [migrateList, setMigrateList] = useState({})
    const toggleId = (id, active, token) => {
        if (active) {
            delete migrateList[id]
        } else {
            migrateList[id] = {
                targetToken: token ?? MIGRATION_CONFIG[id].tokens.to[0].symbol
            }
        }
        setMigrateList({ ...migrateList })
    }

    // Array of migrated id
    const migratedList = [2]


    return (<MainWrapper>
        <Type.XXL fontWeight="300" marginBottom="30px">Migrator</Type.XXL>
        <MainDiv>
            {MIGRATION_CONFIG.filter(config => !migratedList.includes(config.id)).map(config => {
                return <Container key={config.id}>
                    <MigrationTitle toggleId={toggleId} active={migrateList[config.id]} config={config} />
                    <RowBetween align={"flex-start"}>
                        <MultipleBox
                            currency={config.tokens.from}
                            fastUpdate={fastUpdate}
                        />
                        <DeusV2Tokens toggleId={toggleId} config={config} active={migrateList[config.id]} />
                    </RowBetween>
                </Container>
            })}
        </MainDiv>

        <Image src="/img/swap/single-arrow.svg" size="20px" my="15px" />

        <Container>
            <MigrateBox
                title="Select Destination Network"
                SyncChainId={SyncChainId}
                setSyncChainId={setSyncChainId}
            />

            <Line bgColor={'black'}></Line>

            <SwapAction
                bgColor={"grad_dei"}
                text="Migrate"
                isPreApproved={false}
                isApproved={false}
                validNetworks={validChains}
                // targetToken={targetToken}
                loading={false}
                swapLoading={false}
                handleApprove={null}
                handleSwap={null}
                // swapState={swapState}
                amountIn={1}
                amountOut={0}
            />
        </Container>
    </MainWrapper>);
}

export default Migrator;
