import React, { useState, useCallback, useEffect } from 'react';
import { Type } from '../../components/App/Text';
import MultipleBox from '../../components/App/Migrator/MultipleBox';
import MigrateChains from '../../components/App/Migrator/MigrateChains';
import SwapAction from '../../components/App/Migrator/SwapAction';
import { Image } from 'rebass/styled-components';
import { useWeb3React } from '@web3-react/core';
import { useLocation } from 'react-router';
import { ChainId } from '../../constant/web3';
import { getCorrectChains } from '../../constant/correctChain';
import DeusV2Tokens from '../../components/App/Migrator/DeusV2Tokens';
import MigrationTitle from '../../components/App/Migrator/MigrationTitle';
import { RowBetween } from '../../components/App/Row';
import { MainWrapper, MainDiv, Container, Line } from '../../components/App/Migrator';
import { snapShotMaker } from '../../constant/migration';
import snapshot from '../../config/snapshot.json'
import { useMigrate, useUserStatus } from '../../hooks/useMigrate';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { coolDownState } from '../../store/dei';
import { getCurrentTimeStamp } from '../../utils/utils';

const Migrator = () => {
    const { account, chainId } = useWeb3React()
    const [fastUpdate, setFastUpdate] = useState(0)
    const [userSnap, setUserSnap] = useState([])
    const location = useLocation()
    const coolDown = useRecoilValue(coolDownState)
    const [seconds, setSeconds] = useState(0)
    const setCoolDown = useSetRecoilState(coolDownState)

    const search = useLocation().search;
    const queryParams = {
        network: new URLSearchParams(search).get('network')?.toUpperCase(),
    }

    useEffect(() => {
        if (account) {
            const snap = snapshot.filter(snap => snap.user_address === account.toLowerCase())
            if (snap.length > 0) {
                setUserSnap(snapShotMaker(snap[0]))
            } else {
                setUserSnap([])
            }
        }
    }, [account])

    const tempChain = queryParams.network && ChainId[queryParams.network] ? ChainId[queryParams.network] : null
    const userChain = tempChain ? tempChain : chainId
    const validChains = getCorrectChains(location.pathname)
    const currChain = userChain && validChains.indexOf(userChain) !== -1 ? userChain : ChainId.ETH
    const [SyncChainId, setSyncChainId] = useState(currChain)
    const [migrateList, setMigrateList] = useState({})

    useEffect(() => {
        setSyncChainId(currChain)
    }, [currChain]);

    useEffect(() => {
        const reminded = parseInt(coolDown) - parseInt(getCurrentTimeStamp())
        if (coolDown && reminded)
            setSeconds(reminded)
    }, [coolDown]);

    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                setCoolDown(0)
                clearInterval(myInterval)
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    }, [seconds, setCoolDown]);


    const toggleId = (id, active, token, index) => {
        if (active) {
            delete migrateList[id]
        } else {
            migrateList[id] = {
                targetToken: token ?? userSnap[id].tokens.to.filter(t => t.symbol === "DEUS")[0].symbol,
                index: index + 1
            }
        }
        setMigrateList({ ...migrateList })
    }

    const { onMigrate } = useMigrate(migrateList, SyncChainId, fastUpdate)

    const handleMigrate = useCallback(async () => {
        try {
            const tx = await onMigrate()
            console.log(tx);
            setFastUpdate(fastUpdate => fastUpdate + 1)
        } catch (e) {
            console.error(e)
        }
    }, [onMigrate])

    // Array of migrated id
    const migratedList = useUserStatus(account)

    if (account && !migratedList) {
        return (<div className="loader-wrap">
            {<img className="loader" src={process.env.PUBLIC_URL + "/img/loading.png"} alt="loader" />}
        </div>)
    }

    const currUnMigratedList = userSnap.filter(config => !migratedList?.includes(config.id) && config.tokens.from.filter(token => token.balance > 0).length > 0)

    return (<MainWrapper>
        <Type.XXL fontWeight="300" marginBottom="20px">Migrator</Type.XXL>
        <Type.MD fontWeight="300" margin="auto" mb="4" opacity="0.5" maxWidth="700px" width="80%" >Please check the box corresponding to the tokens you wish to migrate. Note that all tokens checked will be migrated to the chosen network. Each token type can only be migrated ONCE.</Type.MD>

        {account && <MainDiv>
            {currUnMigratedList.length > 0 ? currUnMigratedList.map(config => {
                return <div key={config.id}>
                    <Container >
                        <MigrationTitle toggleId={toggleId} active={migrateList[config.id]} config={config} />
                        <RowBetween align={"flex-start"}>
                            <MultipleBox currency={config.tokens.from} fastUpdate={fastUpdate} />
                            <DeusV2Tokens toggleId={toggleId} config={config} active={migrateList[config.id]} />
                        </RowBetween>
                    </Container>
                    {(config.id + 1) !== userSnap.length && <Image src="/img/dei/arrow-down.svg" size="35px" my="15px" />}
                </div>
            }) : <div style={{ borderRadius: "8px", display: "inline-block", padding: "10px 20px", backgroundColor: "#2b2d34", margin: "20px auto" }}><Type.MD>No eligible tokens for migration found</Type.MD></div>}
        </MainDiv>}

        <div style={{ margin: "40px 0" }}></div>

        {(currUnMigratedList.length > 0 || !account) && <Container pb={"20px"}>
            <MigrateChains
                title="Select Destination Network"
                SyncChainId={SyncChainId}
                setSyncChainId={setSyncChainId}
                validNetworks={validChains}
            />

            <Line bgColor={'black'}></Line>


            <SwapAction
                bgColor={"grad_dei"}
                text="Migrate"
                migrateList={migrateList}
                isPreApproved={true}
                isApproved={false}
                validNetwork={SyncChainId}
                loading={false}
                swapLoading={false}
                handleApprove={null}
                handleSwap={handleMigrate}
                amountIn={1}
                amountOut={0}
                coolDown={seconds}
            />
            {seconds > 0 && <Type.MD mt="2" color="#ff4646">*Next migration available after cooldown timer is at zero</Type.MD>}
        </Container>}
    </MainWrapper>);
}

export default Migrator;
