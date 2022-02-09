import React from 'react';
import { Header, BigTitle, FrontEndImage, MainWrap, MiniDescription } from '../../components/App/Frontend';
import ItemInfo from '../../components/App/Frontend/ItemInfo';
import List from '../../components/App/Frontend/List';
import { RowCenter } from '../../components/App/Row/index';

const UseDeus = () => {
    return (<MainWrap>
        <Header>
            <BigTitle>Use DEUS</BigTitle>
            <MiniDescription>To interact with the DEUS Protocol, users may choose from the list of Frontend Operators below.</MiniDescription>
            {false && <FrontEndImage />}
        </Header>
        <RowCenter style={{ alignItems: "flex-start", flexWrap: "wrap" }}>
            <ItemInfo title={`Decentralized Frontends`} description={`As a company, DEUS AG is not running its own frontend — making the system more decentralized and censorship-resistant. To open loans, make deposits etc., users thus have to use one of the frontends provided by third parties.`} />
            <ItemInfo title={`Which frontend do I pick? `} description={`Deciding which frontend to use is a personal decision that may be based on various factors including UI, UX, features, tools, and the Frontend Operator's "kickback rate".`} />
        </RowCenter>
        <RowCenter style={{ alignItems: "flex-start", flexWrap: "wrap" }}>
            <ItemInfo title={`What is a "kickback" rate? `} description={`The kickback rate is a rate between 0% and 100% that determines the fraction of LQTY that will be paid out to Stability Providers using a particular frontend. For example, a kickback rate of 60% means a frontend's users would receive 60% of their earned LQTY rewards while the frontend receives the remaining 40%.`} />
            <ItemInfo title={`List Disclaimer`} description={`The list of Frontend Operators is provided for informational purposes only. Neither is the list conclusive, nor has DEUS AG conducted any due diligence on these operators. Accordingly, Liquity AG does not make any statement regarding technical functionality and/or the trustworthiness of the Frontend Operators listed below. Descriptions are provided by Frontend Operators, not Liquity AG.`} />
        </RowCenter>
        <List />
    </MainWrap>);
}

export default UseDeus;