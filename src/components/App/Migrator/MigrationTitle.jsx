import React from 'react';
import { Type } from '../Text';
import styled from 'styled-components'

const TitleWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 12px;
    height: 70px;
    border-bottom: 2px solid #000000;
    svg{
        margin: 0 10px;
    }
    ${({ theme }) => theme.mediaWidth.upToExtraSmall`
        svg{
            width:12px;
            margin:0;
            margin-right:3px;

        }
    `}

`

const TLG = styled(Type.LG)`
    font-size: 20px;
    white-space: nowrap;
    ${({ theme }) => theme.mediaWidth.upToSmall`
        font-size: 15px;
    `}
    ${({ theme }) => theme.mediaWidth.upToExtraSmall`
        font-size: 13px;
    `}
`

const MigrationTitle = ({ config, toggleId, active }) => {
    const { title, id } = config
    return (<TitleWrap>
        <div style={{ display: 'flex', justifyContent: "flex-start", alignItems: "center", cursor: "pointer" }} onClick={() => toggleId(id, active, null, null)}>
            {active ? <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width={20} height={20} rx={3} fill="#0FB4F4" />
                <path d="M7 10.5L8.63082 12.7832C9.04487 13.3628 9.915 13.336 10.2926 12.7319L14.5 6" stroke="white" strokeWidth={2} strokeLinecap="round" />
            </svg>
                :
                <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width={20} height={20} rx={3} fill="#CECECE" />
                </svg>

            }
            <TLG color={'secondary'} fontWeight="300">Migrate From: </TLG>
            <TLG style={{ marginLeft: "5px" }} fontWeight="300"> {title.from} </TLG>
        </div>

        <div style={{ display: 'flex', justifyContent: "center", width: "315px", textAlign: "center" }}>
            <TLG color={'secondary'} fontWeight="300">To: </TLG>
            <TLG fontWeight="300" style={{ marginLeft: "5px" }}> {title.to} </TLG>
        </div>
    </TitleWrap>);
}

export default MigrationTitle;