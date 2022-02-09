import React from 'react';
import { Header, BigTitle, FrontEndImage, MainWrap, MiniDescription } from '../../components/App/Frontend';
import BecameOperator from '../../components/App/Frontend/BecameOperator';
import frontendText from '../../config/frontends.json'
import Items from '../../components/App/Frontend/Items';

const RunAFrontend = () => {
    const data = frontendText["run_a_frontend"]

    return (<MainWrap>
        <Header>
            <BigTitle>{data["header"]["title"]}</BigTitle>
            <MiniDescription>{data["header"]["description"]}</MiniDescription>
            {false && <FrontEndImage />}
        </Header>
        <Items data={data} />
        <BecameOperator data={data["operator"]} />

    </MainWrap>);
}

export default RunAFrontend;