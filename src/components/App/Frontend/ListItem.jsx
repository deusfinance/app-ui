import React from 'react';
import styled from 'styled-components'
import { ExternalLink } from '../Link/index';
import { Image } from 'rebass/styled-components';


const Wrap = styled.div`
    margin:auto;
    font-weight:300;
    padding:20px;
`
const Container = styled.div`
    display:flex;
    justify-content:space-between;
    color:#000;
    align-items:center;
    height:100%;
`

const InnerItem = styled.div`
    display:flex;
    align-items:center;
`
const KickbackWrap = styled.div`
    display: flex;
    margin-left: 0px;
    align-items: center;
`
const ImageWrap = styled.div`
    display: flex;
    width: 145px;
    height: 80px;
    margin-right: 24px;
    align-items: center;
`
const SiteName = styled.div`
    color:#19339c;
    width: 130px;
    margin-right: 40px;
    font-size:20px;
`
const Rate = styled.div`
    font-size:20px;
    font-weight:600;
`
const Details = styled.div`
    max-width: none;
    margin-bottom: 0px;
    flex: 0 auto;
    color: #545a6c;
    font-size: 14px;
    line-height: 1.4;
    letter-spacing: 0.3px;
    margin-right: 70px;
    margin-left: auto;
`
const VisitButton = styled.p`
    padding: 5px 20px;
    border: 1px solid #293147;
    border-radius: 8px;
    background-color: #fff;
    transition: all 200ms ease;
    color: #293147;
    font-size: 18px;
    line-height: 1.4;
    margin-left: 48px;
    cursor:pointer;
`

const ListItem = ({ data }) => {
    return (<Wrap>
        <Container>
            <InnerItem>
                <ImageWrap >
                    <Image src={data["image_url"]} />
                </ImageWrap>
                <SiteName>{data["name"]}</SiteName>
            </InnerItem>
            <Details>
                {data["description"]}
            </Details>
            <KickbackWrap>
                <Rate>{data["kickback"]}</Rate>
                <ExternalLink href={data["link"]}>
                    <VisitButton>Visit</VisitButton>
                </ExternalLink>
            </KickbackWrap>
        </Container>
    </Wrap>);
}

export default ListItem;