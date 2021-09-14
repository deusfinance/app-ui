import React, { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { formatAddress } from '../../../utils/utils';
import { useTranslation } from 'react-i18next'
import { getCorrectChains } from '../../../constant/correctChain';
import { NameChainId } from '../../../constant/web3';
import { NavLink, useLocation } from 'react-router-dom';
import Wallets from './Wallets';
import { addRPC } from '../../../services/addRPC';
import OutsideClickHandler from 'react-outside-click-handler';
import {
    NavbarContentWrap,
    NavbarWrap,
    NavButton,
    NavbarSideWrap,
    NavWarningButton,
    SubNavbarContentWrap,
    NavbarMobileContent,
} from '../../App/Navbar';
import LanguageSelector from './LanguageSelector';
import { ExternalLink } from '../../App/Link';
import useRefresh from '../../../hooks/useRefresh';
import useWeb3 from '../../../hooks/useWeb3';
import routes from '../../../config/routes.json'

const Navbar = () => {
    const web3 = useWeb3()
    const { chainId, account } = useWeb3React()
    const location = useLocation()
    const [showWallets, setShowWallets] = useState(false)
    const [open, setOpen] = useState(false)
    const [tvl, setTvl] = useState(null)
    const { t } = useTranslation()

    useEffect(() => {
        if (account)
            setShowWallets(false)
    }, [account])

    const { slowRefresh } = useRefresh()

    useEffect(() => {
        const getTVL = async () => {
            const url = "https://app.deus.finance/tvl.json"
            try {
                const resp = await fetch(url)
                const result = await resp.json()
                const intResult = parseInt(result.stakingLockedValue + result.vaultLockedValue + result.uniswapLockedValue + result.balancerLockedValue + result.etherLockedInMarketMaker + result.stakingV2LockedValue)
                var formatter = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0
                });
                setTvl(formatter.format(intResult))
            } catch (error) {
                console.log("fetch " + url + " had some error", error);
            }
        }
        getTVL()
    }, [slowRefresh])

    const handleConnect = async () => {
        setShowWallets(true)
    }
    const validChains = getCorrectChains(location.pathname)

    useEffect(() => {
        const blurPop = "blured"
        if (typeof document === undefined) return
        if (!(open)) {
            document.getElementById("blur-pop").classList.remove(blurPop)
        } else {
            document.getElementById("blur-pop").classList.add(blurPop)
        }
    }, [open])



    return (<>
        <Wallets showWallets={showWallets} setShowWallets={setShowWallets} />
        <NavbarWrap>
            <NavbarSideWrap className="deus-logo" style={{ zIndex: 1 }}>
                <ExternalLink href="https://deus.finance">
                    <svg width={137} height={31} viewBox="0 0 137 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M60 5.08609C60 4.9605 60.084 4.87677 60.2099 4.87677H67.2417C69.3617 4.87677 71.1879 5.31635 72.6992 6.19551C74.2105 7.07468 75.3649 8.30969 76.1626 9.90055C76.9602 11.4914 77.359 13.3544 77.359 15.4895C77.359 17.6874 76.9602 19.5923 76.1626 21.1831C75.3649 22.774 74.2105 24.009 72.6782 24.8463C71.1669 25.6836 69.3617 26.1232 67.2627 26.1232H60.2099C60.084 26.1232 60 26.0395 60 25.9139V5.08609ZM66.9478 23.7578C68.3332 23.7578 69.5086 23.5694 70.5162 23.1717C71.5027 22.774 72.2584 22.2298 72.7411 21.5181C73.2659 20.7436 73.6647 19.9063 73.8956 18.9643C74.1265 18.0433 74.2525 16.8711 74.2525 15.4895C74.2525 14.108 74.1265 12.9776 73.8746 12.0566C73.6227 11.1356 73.2449 10.2983 72.7202 9.5447C72.1954 8.81207 71.4397 8.24689 70.4532 7.84918C69.4457 7.45146 68.2702 7.24214 66.9478 7.24214H62.9386C62.8127 7.24214 62.7287 7.32586 62.7287 7.45146V23.5485C62.7287 23.6741 62.8127 23.7578 62.9386 23.7578H66.9478Z" fill="white" />
                        <path d="M80.9484 4.87677H95.6207C95.7466 4.87677 95.8306 4.9605 95.8306 5.08609V7.11654C95.8306 7.24214 95.7466 7.32587 95.6207 7.32587H83.6772C83.5512 7.32587 83.4673 7.4096 83.4673 7.53519V12.0775C83.4673 12.2031 83.5512 12.2869 83.6772 12.2869H94.4872C94.6131 12.2869 94.6971 12.3706 94.6971 12.4962V14.5266C94.6971 14.6522 94.6131 14.7359 94.4872 14.7359H83.4673H80.9484C80.8225 14.7359 80.7385 14.6522 80.7385 14.5266V5.08609C80.7385 4.9605 80.8225 4.87677 80.9484 4.87677Z" fill="white" />
                        <path d="M80.7385 16.8502C80.7385 16.7246 80.8225 16.6409 80.9484 16.6409H83.4673H94.4872C94.6131 16.6409 94.6971 16.7246 94.6971 16.8502V18.8806C94.6971 19.0062 94.6131 19.09 94.4872 19.09H83.6772C83.5512 19.09 83.4673 19.1737 83.4673 19.2993V23.4648C83.4673 23.5904 83.5512 23.6742 83.6772 23.6742H95.6207C95.7466 23.6742 95.8306 23.7579 95.8306 23.8835V25.9139C95.8306 26.0395 95.7466 26.1233 95.6207 26.1233H80.9484C80.8225 26.1233 80.7385 26.0395 80.7385 25.9139V16.8502Z" fill="white" />
                        <path d="M101.351 24.5951C99.9236 23.3392 99.231 21.4971 99.231 19.1108V5.08609C99.231 4.9605 99.3149 4.87677 99.4409 4.87677H101.771C101.897 4.87677 101.981 4.9605 101.981 5.08609V19.1108C101.981 20.1784 102.233 21.0994 102.736 21.853C103.24 22.6065 103.912 23.1508 104.751 23.5276C105.591 23.8834 106.515 24.0718 107.543 24.0718C108.551 24.0718 109.474 23.8834 110.335 23.5276C111.174 23.1717 111.867 22.6065 112.371 21.853C112.875 21.0994 113.127 20.1993 113.127 19.1108V5.08609C113.127 4.9605 113.211 4.87677 113.336 4.87677H115.687C115.813 4.87677 115.897 4.9605 115.897 5.08609V19.1108C115.897 21.4971 115.184 23.3182 113.756 24.5951C112.329 25.872 110.272 26.5 107.564 26.5C104.856 26.5 102.757 25.872 101.351 24.5951Z" fill="white" />
                        <path d="M123.181 25.6836C121.859 25.1394 120.788 24.323 119.99 23.2345C119.235 22.1879 118.836 20.911 118.794 19.4039C118.794 19.2992 118.878 19.1946 118.983 19.1946L121.481 18.9434C121.607 18.9224 121.712 19.0271 121.712 19.1527C121.754 20.1575 121.984 21.0366 122.467 21.7693C122.971 22.5647 123.664 23.1717 124.524 23.5694C125.406 23.9881 126.392 24.1974 127.505 24.1974C129.247 24.1974 130.653 23.8834 131.724 23.2555C132.795 22.6275 133.319 21.6018 133.319 20.1575C133.319 19.4248 133.088 18.8387 132.648 18.4201C132.207 18.0014 131.64 17.6874 130.989 17.4781C130.318 17.2897 129.436 17.0804 128.303 16.892C127.421 16.7245 126.791 16.5989 126.35 16.5152C124.965 16.1803 123.79 15.8244 122.803 15.4058C121.838 14.9872 121.019 14.3801 120.368 13.5847C119.718 12.7892 119.382 11.7636 119.382 10.4867C119.382 9.12607 119.76 7.99572 120.494 7.09562C121.229 6.19553 122.173 5.54662 123.328 5.12797C124.482 4.70932 125.679 4.5 126.917 4.5C129.31 4.5 131.283 5.04424 132.795 6.1118C134.285 7.15842 135.145 8.81208 135.397 11.0728C135.418 11.1774 135.334 11.2821 135.229 11.303L132.795 11.7217C132.669 11.7426 132.564 11.6589 132.543 11.5333C132.501 10.5704 132.249 9.75404 131.829 9.06327C131.367 8.3097 130.716 7.74453 129.877 7.34681C129.037 6.9491 128.03 6.7607 126.854 6.7607C126.12 6.7607 125.385 6.8863 124.671 7.15842C123.958 7.43054 123.37 7.82826 122.887 8.3725C122.446 8.89581 122.215 9.52378 122.194 10.2564C122.173 11.01 122.509 11.7426 123.097 12.2241C123.664 12.6846 124.377 13.0404 125.238 13.2916C126.12 13.5428 127.127 13.7731 128.324 13.9615C130.087 14.2336 131.493 14.5476 132.543 14.9034C133.613 15.2593 134.474 15.8244 135.145 16.5989C135.817 17.3944 136.174 18.4829 136.174 19.9063C136.174 21.5181 135.775 22.8159 134.957 23.7997C134.138 24.7626 133.088 25.4534 131.808 25.872C130.528 26.2697 129.121 26.4791 127.61 26.4791C125.994 26.5 124.524 26.2279 123.181 25.6836Z" fill="white" />
                        <path d="M47.9936 8.30174C48.1929 7.98914 48.3068 7.60549 48.3068 7.22184C48.3068 7.12238 48.2926 7.0087 48.2926 6.92345C48.1502 5.9288 47.2961 5.17571 46.2854 5.17571H46.2711C45.4597 5.17571 44.7479 5.65883 44.4205 6.35508C40.5911 5.90038 37.929 4.13844 36.4627 2.85961C36.5766 2.60384 36.6478 2.31966 36.6478 2.03547C36.6478 1.18292 36.1068 0.401411 35.2954 0.117226C34.8541 -0.0390754 34.3416 -0.0390754 33.9145 0.117226C33.1031 0.401411 32.5621 1.18292 32.5621 2.03547C32.5621 2.31966 32.6191 2.60384 32.7472 2.85961C31.2667 4.13844 28.6046 5.91459 24.761 6.35508C24.4336 5.65883 23.736 5.18992 22.9246 5.17571C22.9246 5.17571 22.9246 5.17571 22.9103 5.17571C21.9565 5.17571 21.1166 5.84355 20.9173 6.78136C20.8889 6.90924 20.8746 7.05133 20.8746 7.19342C20.8746 7.59128 20.9885 7.97493 21.202 8.30174C20.533 9.38165 19.7927 10.9162 19.4795 12.7208C18.8105 16.5999 19.992 22.2268 29.5015 27.0863C30.441 27.5695 31.466 28.0384 32.5479 28.4931V28.5073C32.5479 29.6298 33.459 30.5392 34.5836 30.5392C35.7082 30.5392 36.6193 29.6298 36.6193 28.5073V28.4931C37.6443 28.0668 38.6408 27.6121 39.5519 27.1432C45.1607 24.3013 48.5204 20.8911 49.5311 16.9978C50.5134 13.3318 49.1183 10.1205 47.9936 8.30174ZM35.8363 21.5447C35.5232 21.2321 35.0819 21.0474 34.5978 21.0474C34.1138 21.0474 33.6868 21.2321 33.3593 21.5447C32.8611 21.3032 32.2917 20.9906 31.7222 20.5643C29.7719 19.1008 28.7897 17.1683 28.7897 14.7954C28.7897 14.2128 28.8751 13.6586 29.0317 13.1329C29.3022 13.1329 29.5584 13.0618 29.7862 12.9482V13.1329V12.9482C30.3841 12.664 30.7827 12.053 30.7827 11.3567C30.7827 11.0725 30.7115 10.8168 30.5976 10.5752C31.6368 9.59478 33.0319 8.998 34.5836 8.998C36.1211 8.998 37.5304 9.60899 38.5696 10.5894C38.4557 10.831 38.3845 11.0868 38.3845 11.3709C38.3845 12.3372 39.1675 13.1329 40.1355 13.1471C40.2921 13.6728 40.3775 14.227 40.3775 14.8096C40.3775 17.1825 39.3953 19.115 37.445 20.5785C36.904 20.9906 36.3204 21.3174 35.8363 21.5447ZM34.5978 4.05318C34.6121 4.05318 34.6263 4.05318 34.6406 4.05318C34.9537 5.33201 35.4662 6.56822 36.1495 7.69075C35.6513 7.57707 35.1246 7.52024 34.5978 7.52024C34.0711 7.52024 33.5444 7.57707 33.0462 7.69075C33.7295 6.56822 34.242 5.33201 34.5551 4.05318C34.5694 4.05318 34.5836 4.05318 34.5978 4.05318ZM29.7862 9.32481C29.7719 9.33902 29.7577 9.35323 29.7577 9.35323C29.7435 9.36744 29.715 9.38165 29.7008 9.39585C29.6011 9.48111 29.5157 9.55216 29.4303 9.6232C29.3022 9.59478 29.174 9.58057 29.0317 9.58057C28.8466 9.58057 28.6616 9.60899 28.4907 9.66583C27.6793 8.89853 26.7824 8.2307 25.8144 7.67654C28.9036 7.1508 31.2525 5.84355 32.8184 4.66418C32.2062 6.45454 31.167 8.06019 29.7862 9.32481ZM40.7334 9.68004C40.5626 9.6232 40.3633 9.59478 40.1782 9.59478C40.0359 9.59478 39.9078 9.60899 39.7796 9.63741C39.6942 9.56636 39.6088 9.49532 39.5376 9.42427L39.3383 9.25376C38.0002 7.98914 36.9752 6.41192 36.3915 4.6926C37.9717 5.88617 40.3491 7.19342 43.4809 7.71917C42.4844 8.24491 41.5591 8.91274 40.7334 9.68004ZM30.1848 25.7791C23.2947 22.2552 20.1059 17.8361 20.9458 12.9908C21.2163 11.4562 21.8284 10.1347 22.3978 9.19692C22.5544 9.23955 22.7253 9.25376 22.8819 9.25376H22.8961C23.4655 9.25376 23.9922 9.02641 24.3624 8.62856C25.4728 9.1543 26.4693 9.85055 27.3803 10.7031C27.2949 10.9162 27.2522 11.1294 27.2522 11.3709C27.2522 11.8114 27.4088 12.2093 27.6793 12.5219C27.4373 13.2466 27.3092 14.0139 27.3092 14.8096C27.3092 17.6514 28.5477 20.067 30.8823 21.8005C31.5656 22.312 32.249 22.6815 32.8326 22.9515C32.8753 23.6051 33.2882 24.1735 33.8576 24.4292V26.6317C33.5729 26.7453 33.3166 26.9158 33.1173 27.129C32.0781 26.6885 31.0959 26.2338 30.1848 25.7791ZM48.1075 16.6426C47.2107 20.0954 44.1073 23.193 38.897 25.8359C38.0144 26.2764 37.0749 26.7169 36.0784 27.129C35.8791 26.9158 35.6228 26.7453 35.3381 26.6317V24.4292C35.9075 24.1592 36.3204 23.6051 36.3631 22.9515C36.9467 22.6815 37.63 22.2978 38.3134 21.8005C40.648 20.067 41.8865 17.6514 41.8865 14.8096C41.8865 14.0139 41.7584 13.2466 41.5164 12.5219C41.7869 12.2093 41.9435 11.8114 41.9435 11.3709C41.9435 11.1436 41.9008 10.9162 41.8153 10.7173C42.7264 9.87897 43.7372 9.19693 44.8476 8.68539C45.2177 9.04062 45.7159 9.25376 46.2569 9.25376H46.2711C46.4419 9.25376 46.6128 9.22534 46.7836 9.18272C47.7659 10.8026 48.919 13.5449 48.1075 16.6426Z" fill="url(#paint0_linear)" />
                        <path d="M28.4069 13.1338C28.1057 13.1338 27.8166 13.2001 27.5576 13.3146L17.2212 2.98223C17.3357 2.72316 17.4019 2.43398 17.4019 2.13274C17.4019 0.957927 16.4442 0 15.2696 0C14.095 0 13.1373 0.957927 13.1373 2.13274C13.1373 2.43398 13.2035 2.72316 13.318 2.98223L2.98164 13.3146C2.72263 13.2001 2.4335 13.1338 2.13232 13.1338C0.957738 13.1338 0 14.0918 0 15.2666C0 16.4414 0.957738 17.3993 2.13232 17.3993C2.4335 17.3993 2.72263 17.3331 2.98164 17.2186L13.318 27.557C13.2035 27.816 13.1373 28.1052 13.1373 28.4064C13.1373 29.5813 14.095 30.5392 15.2696 30.5392C16.4442 30.5392 17.4019 29.5813 17.4019 28.4064C17.4019 28.1052 17.3357 27.816 17.2212 27.557L27.5576 17.2186C27.8166 17.3331 28.1057 17.3993 28.4069 17.3993C29.5814 17.3993 30.5392 16.4414 30.5392 15.2666C30.5392 14.0918 29.5875 13.1338 28.4069 13.1338ZM26.4191 14.5075L22.4135 15.4835C22.0762 15.0135 21.528 14.7063 20.9076 14.7063C20.4558 14.7063 20.0462 14.869 19.721 15.134L17.1188 13.911C17.1188 13.893 17.1188 13.8749 17.1188 13.8508C17.1188 13.1037 16.6791 12.4651 16.0406 12.1699V4.10884C16.0647 4.09679 16.0888 4.09077 16.1129 4.07872L26.4492 14.4171C26.4432 14.4472 26.4312 14.4773 26.4191 14.5075ZM15.2696 26.2797C15.2214 26.2797 15.1732 26.2858 15.119 26.2858L11.0592 17.7427C11.3242 17.4234 11.4808 17.0137 11.4808 16.5679C11.4808 16.5619 11.4808 16.5619 11.4808 16.5559L14.1191 15.3148C14.4323 15.5618 14.8359 15.7124 15.2636 15.7124C15.6973 15.7124 16.1008 15.5618 16.4141 15.3088L19.0524 16.5498C19.0524 16.5559 19.0524 16.5619 19.0524 16.5679C19.0524 17.0137 19.209 17.4234 19.474 17.7427L15.4142 26.2858C15.366 26.2797 15.3178 26.2797 15.2696 26.2797ZM14.4926 4.10884V12.1759C13.8601 12.4711 13.4144 13.1097 13.4144 13.8568C13.4144 13.8809 13.4144 13.899 13.4204 13.9231L10.8182 15.1461C10.493 14.875 10.0834 14.7123 9.62557 14.7123C9.00515 14.7123 8.45701 15.0196 8.11969 15.4895L4.12008 14.5075C4.10803 14.4773 4.09599 14.4472 4.08394 14.4111L14.4203 4.0727C14.4444 4.09077 14.4685 4.10282 14.4926 4.10884ZM4.08996 16.11L7.83056 17.0258C8.03536 17.8271 8.75818 18.4235 9.62557 18.4235C9.63761 18.4235 9.64364 18.4235 9.65568 18.4235L12.6253 24.6711L4.08394 16.1221C4.08394 16.1161 4.08996 16.11 4.08996 16.11ZM20.8775 18.4235C20.8895 18.4235 20.9016 18.4235 20.9136 18.4235C21.781 18.4235 22.5099 17.8271 22.7086 17.0198L26.4492 16.104C26.4492 16.11 26.4553 16.1161 26.4553 16.1221L17.9079 24.6711L20.8775 18.4235Z" fill="url(#paint1_linear)" />
                        <defs>
                            <linearGradient id="paint0_linear" x1="19.3229" y1="15.2665" x2="49.8746" y2="15.2665" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#0FA2F5" />
                                <stop offset="0.9341" stopColor="#F34692" />
                            </linearGradient>
                            <linearGradient id="paint1_linear" x1="-0.00238531" y1="15.2692" x2="30.5416" y2="15.2692" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#0BADF4" />
                                <stop offset="0.9341" stopColor="#30EFE4" />
                            </linearGradient>
                        </defs>
                    </svg>
                </ExternalLink>
                {tvl && <NavButton className="tvl" active={false} >
                    {t("tvl")}: {tvl}
                </NavButton>}
            </NavbarSideWrap>

            <NavbarContentWrap>
                {routes.reverse().map((nav, index) => {
                    let res = null
                    if (nav.path) {
                        if (nav.path.charAt(0) === "/") {
                            res = <NavLink key={"desk" + index} to={nav.path} > {t(nav.id)} </NavLink>
                        } else {
                            if (nav.image) {
                                res = <ExternalLink href={nav.path} >
                                    {/* height="20%" width="20%" */}
                                    <img src={`/img/navbar/${nav.id}.svg`} alt="" />
                                </ExternalLink>
                            } else {
                                res = <ExternalLink href={nav.path} >
                                    <span> {t(nav.id)} </span>
                                </ExternalLink>
                            }
                        }
                    } else {
                        res = <p>{t(nav.id)}</p>
                    }

                    if (nav.children) {
                        res = <>
                            {res}
                            <img className="polygon" src="/img/navbar/polygon.png" height="13px" width="13px" alt="polygon" />
                            <SubNavbarContentWrap>
                                {nav.children.map(subnav => {
                                    if (subnav.path.charAt(0) === "/")
                                        return <li key={subnav.id + "_desktop"}><NavLink to={subnav.path} > {t(subnav.id)} </NavLink></li>
                                    if (subnav.image) {
                                        return <li key={subnav.id + "_desktop"}><ExternalLink href={subnav.path} textDecoration="none">
                                            <img src={`/img/navbar/${subnav.id}.svg`} alt="" height="20%" width="20%" />
                                        </ExternalLink></li>
                                    }
                                    return <li key={subnav.id + "_desktop"}><ExternalLink href={subnav.path} textDecoration="none">
                                        <span>{t(subnav.id)}</span>
                                    </ExternalLink></li>
                                })}
                            </SubNavbarContentWrap>
                        </>
                    }
                    return <li key={nav.id + "_desktop"}>{res}</li>
                })}
                <li>
                    <LanguageSelector />
                </li>
            </NavbarContentWrap>

            <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
                <NavbarMobileContent open={open}>
                    <ul onClick={() => setOpen(false)}>
                        <li className="icon-close">
                            <div className="menu-title">{t("menu")}</div><svg onClick={() => setOpen(!open)} viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="Page-1" stroke="white" strokeWidth={1} fill="white" fillRule="evenodd"><g id="icon-shape"><polygon id="Combined-Shape" points="10 8.58578644 2.92893219 1.51471863 1.51471863 2.92893219 8.58578644 10 1.51471863 17.0710678 2.92893219 18.4852814 10 11.4142136 17.0710678 18.4852814 18.4852814 17.0710678 11.4142136 10 18.4852814 2.92893219 17.0710678 1.51471863 10 8.58578644" /></g></g></svg>
                        </li>

                        <li className="nav-item-lg" >
                            <LanguageSelector />
                        </li>

                        {<div className="nav-item-wrap-img" >
                            {routes.filter(nav => nav.image).map((nav, index) => {
                                let res = null
                                res = <ExternalLink href={nav.path}  >
                                    <img width='20px' height="20px" src={`/img/navbar/${nav.id}.svg`} alt="" />
                                </ExternalLink>
                                return <li key={nav.id + index} className="nav-item-img">{res}</li>
                            })}
                        </div>}

                        {routes.map((nav, index) => {
                            let res = null
                            if (nav.path) {
                                if (nav.path.charAt(0) === "/") {
                                    res = <li key={index} className="nav-item-box" >
                                        <NavLink className="nav-item-text nav-item-ln" to={nav.path} >
                                            {t(nav.id)}
                                        </NavLink> </li>
                                } else if (!nav.image) {
                                    res = <div key={index} className="nav-item-box">
                                        <li> <ExternalLink href={nav.path} className="nav-item-text" >{t(nav.id)}</ExternalLink> </li>
                                    </div>
                                }
                            } else {
                                res = <div key={index} className="nav-item-wrap-img"  >
                                    <li> <p className="nav-title">{t(nav.id)}</p> </li>
                                </div>
                            }

                            if (nav.children && !nav.image) {
                                res = <div key={index} > {res}
                                    {nav.children.map((subnav, index) => {
                                        if (subnav.path.charAt(0) === "/")
                                            return <li key={subnav.id + "_mobile" + index} className="nav-item-box"><NavLink className="nav-item-text" to={subnav.path} > {t(subnav.id)} </NavLink></li>
                                        return <li key={subnav.id + "_mobile" + index} className="nav-item-box"><ExternalLink className="nav-item-text" href={subnav.path} textDecoration="none">
                                            <span>{t(subnav.id)}</span>
                                        </ExternalLink></li>
                                    })}
                                </div>
                            }
                            return res
                        })}
                    </ul>
                </NavbarMobileContent>
            </OutsideClickHandler>

            <NavbarSideWrap >
                {account && <>
                    {chainId && validChains.indexOf(chainId) === -1 ?
                        <NavWarningButton active={false} >
                            {t("WrongNetwork")}
                        </NavWarningButton>
                        :
                        <NavButton active={false} >
                            <svg width={8} height={8} style={{ marginRight: "5px" }} viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx={4} cy={4} r={4} fill="#00E376" />
                            </svg>
                            {formatAddress(account)}
                        </NavButton>
                    }
                </>}
                {account ?
                    (chainId && validChains.indexOf(chainId) === -1)
                        ?
                        <NavButton className="network-label" active={true} onClick={() => addRPC(account, validChains[0], web3)}>
                            {t("changeTo")} {NameChainId[validChains[0]] || "ETH"}
                        </NavButton>
                        :
                        <NavButton className="network-label" active={false} >
                            <span style={{ opacity: "0.5", marginRight: "5px" }}>Network: </span> {NameChainId[chainId]}
                            {/* {NameChainId[chainId]} */}
                        </NavButton>
                    :
                    <NavButton active={true} onClick={handleConnect}>
                        {t("connectWallet")}
                    </NavButton>
                }

                <svg className="hamb" onClick={() => setOpen(!open)} width={22} height={16} viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 15H1" stroke="white" strokeWidth={2} strokeLinecap="round" /><path d="M21 8H1" stroke="white" strokeWidth={2} strokeLinecap="round" /><path d="M21 1H1" stroke="white" strokeWidth={2} strokeLinecap="round" /></svg>
            </NavbarSideWrap>
        </NavbarWrap>
    </>);
}

export default Navbar;



