import React from 'react';
import { Header, BigTitle, FrontEndImage, MainWrap, MiniDescription } from '../../components/App/Frontend';
import BecameOperator from '../../components/App/Frontend/BecameOperator';
import ItemInfo from '../../components/App/Frontend/ItemInfo';
import { RowCenter } from '../../components/App/Row/index';

const RunAFrontend = () => {
    return (<MainWrap>
        <Header>
            <BigTitle>Frontend Operators</BigTitle>
            <MiniDescription>Frontend Operators provide a web interface to the end-user, connecting them to the Liquity protocol and receiving LQTY rewards in return.</MiniDescription>
            {false && <FrontEndImage />}
        </Header>
        <RowCenter style={{ alignItems: "flex-start", flexWrap: "wrap" }}>
            <ItemInfo title={`Decentralized frontends`} description={`As a company, Liquity AG is not running its own frontend — making the system more decentralized and censorship-resistant. Instead, Liquity is leaning on its ecosystem to bootstrap access to the protocol..`} />
            <ItemInfo title={`How does it work?`} description={`The protocol pays out LQTY rewards pro rata to users who deposit LUSD to the Stability Pool. Frontend Operators can receive a portion of these rewards by tagging deposits facilitated by their interface and specifying the percentage of LQTY to “kickback” to their users.`} />
        </RowCenter>
        <BecameOperator />

    </MainWrap>);
}

export default RunAFrontend;