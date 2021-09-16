import styled from 'styled-components'
import { Base } from '../Button'
import { RowBetween } from '../Row'

export const NavbarWrap = styled(RowBetween)`
    position: relative;
    height: 55px;
    font-size: 16px;
    font-weight:300;
    border-bottom: 1px solid #1C1C1C;
    padding: 0 5px;
    background: ${({ theme }) => theme.bg1};
    .hamb{
        margin-top: 0px;
        display: none;
    }

    ${({ theme }) => theme.mediaWidth.upToLarge`
        font-size: 12px;
    `}

    ${({ theme }) => theme.mediaWidth.upToExtraSmall`
        .network-label{
            display: none;
        }
        .hamb{
            margin-left:10px;
        }
    `}

    @media screen and (max-width: 1400px) {
        font-size: 12px;
    }
    
    @media screen and (max-width: 1150px) {
        font-size: 11px;
        .tvl{
            display:none;
        }
     }
    @media screen and (max-width: 1050px) {
          .hamb{
            display: block;
        }
     }
`

export const NavbarMobileContent = styled.div`
    display: block;
    position: fixed;
    right: 0;
    top: 0;
    width: 300px;
    transition: all .2s;
    padding-bottom: 30px;
    height: 100%;
    min-height: 100vh;
    font-size: 20px;
    font-weight:300;
    background-color: #0c0c0c;
    border-left: 1px solid #1c1c1c;
    overflow-y: auto;
    background: ${({ theme }) => theme.bg1};
    margin-right: ${({ open }) => open ? "0" : "-300px"};
    z-index: 10;
    > ul{
        display: flex;
        flex-direction: column-reverse;
        justify-content: flex-start;
        list-style:none;
        .icon-close{
            width: 100%;
            height: 55px;
            display: flex;
            padding: 0px 15px;
            align-items: center;
            flex-direction: row;
            justify-content: space-between;
            svg{
                height: 20px;
            }
        }
        .nav-item-lg{
            margin-left: 20px;
        }
        .nav-item-wrap-img{
            margin-top: 20px;
            display: flex;
            margin-bottom: 0;
        }
        .nav-item-img{
            margin-left: 20px;
        }
        .nav-title{
            opacity: 0.5;
            cursor: default;
            display: block;
            padding: 5px 20px;
            color: #fff;
            text-decoration: none;
            margin-top: 0;
        }
        .nav-item-text {
            margin-left: 20px;
            margin-bottom: 12px;
        }
        .nav-item-box {
            margin-bottom: 10px;
            &:hover{
                background:#0a0a0acf;
                color:#ffffff;
            }
        }
        .nav-item-ln {
            display: block;
            margin-top: 10;
            padding-bottom: 10px;
            margin-bottom: -10px;
        }
        .nav-item {
            text-align: left;
            display: block;
            font-family: Monument Grotesk;
            font-weight: 300;
            font-size: 19px;
            border: none;
            margin-top: 15px;
            >a{
                opacity: .5;
                cursor:default;
            }
            a{
                display: block;
                padding: 5px 20px;
                color: #fff;
                text-decoration: none;
            }
            ul{
                a{
                    text-align: left;
                    display: block;
                    font-size: 19px;
                    padding-left: 30px;
                    white-space: normal;
                    &:hover{
                        color:#000000;
                        background: #fff;
                    }
                }
            }
        }
    }
`

export const NavButton = styled(Base)`
    color:${({ theme }) => theme.text1};
    background: ${({ theme, active }) => active ? "rgba(97, 192, 191, 0.5)" : theme.grad5};
    border: 0.5px solid #61C0BF;
    border-radius: 6px;
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
    /* margin-top: 17px; */
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
    position: absolute;
    height: 100%;
    /* z-index: 2; */
    left:0;
    right:0;
    margin:auto;
    @media screen and (max-width: 1050px) {
        display:none;
    }
    >li{
        padding: 0 15px;
        position:relative;
        display: flex;
        justify-content: center;
        flex-direction: column;
        >a{
            height: 100%;
            display: flex;
            justify-content: center;
            flex-direction: column;
        }
        cursor:pointer;
        ${({ theme }) => theme.mediaWidth.upToLarge`
            padding: 0 10px;
        `}
        .polygon{
            display: none;
            position: absolute;
            right: 15px;
            top: 46px;
        }
        .lang-warp{
               .active{
                color :#ffffff;
        }
        }
        .active{
                /* color :rgb(0, 153, 255); */
                color:#b6e693;
        }
        &:hover{
            >a,p,svg{
                filter:brightness(0.8);
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
    padding:12px 0 12px 0px;
    background: #FFFFFF;
    border-radius: 10px;
    list-style: none;
    width: 200px;
    >li{
        display:block;
        white-space: nowrap;
        color:${({ theme }) => theme.text1_2};
        a{
            display: inline-block;
            width:100%;
            padding-top: 5px;
            padding-bottom: 5px;
            padding-left: 18px;
        }
        &:hover{
            a{
            color :rgb(0, 153, 255);
            }
        }
        .active{
            color :rgb(0, 153, 255);
        }
    }
    position: absolute;
    right: 0;
    top: 53px;
    z-index: 1000;
`
