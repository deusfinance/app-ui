import styled from 'styled-components'
import { Base } from '../Button'
import { RowBetween, RowCenter } from '../Row'



export const NavbarWrap = styled(RowBetween)`
    position: relative;
    height: 55px;
    font-size: 15px;
    font-weight:300;
    border: 1px solid #1C1C1C;
    padding: 0 5px;
    background: ${({ theme }) => theme.bg1};
`


export const NavButton = styled(Base)`
    color:${({ theme }) => theme.text1};
    background: ${({ theme, active }) => active ? "rgba(97, 192, 191, 0.5)" : theme.grad5};
    border: 0.5px solid #61C0BF;
    border-radius: 6px;
    font-size: 15px;
    font-weight:300;
    padding:7px 14px;
`

export const NavWarningButton = styled(NavButton).attrs({
    active: false
})`
    background: ${({ theme }) => theme.bg_warning};
    color: ${({ theme }) => theme.label_warning};
    border: 0.5px solid ${({ theme }) => theme.bg_warning};
`
export const NavbarSideWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    >*{
        margin: 0 7.5px;
    }
`
export const NavbarContentWrap = styled.ul`
    list-style:none;
    display: flex;
    justify-content: center;
    /* align-items: center; */
    position: absolute;
    height: 100%;
    z-index: 0;
    left:0;
    right:0;
    margin:auto;
    >li{
        height: 100%;
        position:relative;
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding: 0 15px;
        cursor:pointer;
        .polygon{
            display: none;
            position: absolute;
            right: 15px;
            top: 46px;
        }
        &:hover{
            >a,p,svg{
                filter:brightness(0.8)
            }
            .polygon{
                display: block;
            }
            ul{
                display: block;
            }
        }

    }
`
export const SubNavbarContentWrap = styled.ul`
    display:  none;
    padding:18px 0 12px 18px;
    background: #FFFFFF;
    border-radius: 10px;
    list-style: none;
    width: 200px;
    >li{
        display:block;
        white-space: nowrap;
        color:${({ theme }) => theme.text1_2};
        margin-bottom: 10px;
        &:hover{
            a{
                color:#5a5a5a;
            }
        }
    }
    position: absolute;
    right: 0;
    /* left: 0; */
    top: 53px;
    z-index: 10;
`
