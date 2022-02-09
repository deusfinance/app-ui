import React from 'react';
import { Header, BigTitle, FrontEndImage, MainWrap, MiniDescription } from '../../components/App/Frontend';
import FrontendList from '../../components/App/Frontend/FrontendList';
import frontendText from '../../config/frontends.json'
import Items from '../../components/App/Frontend/Items';

const UseDeus = () => {
    const data = frontendText["use_deus"]
    return (<MainWrap>
        <Header>
            <BigTitle>{data["header"]["title"]}</BigTitle>
            <MiniDescription>{data["header"]["description"]}</MiniDescription>
            {false && <FrontEndImage />}
        </Header>
        <Items data={data} />
        <FrontendList data={data["list"]} />
    </MainWrap>);
}

export default UseDeus;