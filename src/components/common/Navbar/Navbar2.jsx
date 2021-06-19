import React, { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { formatAddress } from '../../../utils/utils';
import { useTranslation } from 'react-i18next'
import { getCorrectChains } from '../../../constant/correctChain';
import { NameChainMap } from '../../../constant/web3';
import { NavLink, useLocation } from 'react-router-dom';
import Wallets from './Wallets';
import { addRPC } from '../../../services/addRPC';

import {
    NavbarContentWrap,
    NavbarWrap,
    NavButton,
    NavbarSideWrap,
    NavWarningButton,
    SubNavbarContentWrap,
    NavbarMobileContent
} from '../../App/Navbar';
import LanguageSelector from './LanguageSelector';
import { ExternalLink } from '../../App/Link';


const Navbar = () => {

    const { chainId, account, activate } = useWeb3React()
    const location = useLocation()
    const [showWallets, setShowWallets] = useState(false)
    const [open, setOpen] = useState(false)
    const [tvl, setTvl] = useState(null)
    const { t } = useTranslation()

    useEffect(() => {
        if (account)
            setShowWallets(false)
    }, [account])

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
    }, [])

    const handleConnect = async () => {
        setShowWallets(true)
    }
    const validChains = getCorrectChains(location.pathname)

    return (<>
        {showWallets && <Wallets setShow={setShowWallets} />}
        <NavbarWrap>
            <NavbarSideWrap className="deus-logo">
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
                {tvl && <NavButton className="tvl" active={false} >
                    {t("tvl")}: {tvl}
                </NavButton>}
            </NavbarSideWrap>

            <NavbarContentWrap>
                <li>
                    <ExternalLink href="https://discord.com/invite/xfeYT6acha">
                        <svg width={22} height={20} viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <rect width="21.0356" height={20} fill="url(#pattern0)" />
                            <defs>
                                <pattern id="pattern0" patternContentUnits="objectBoundingBox" width={1} height={1}>
                                    <use xlinkHref="#image0" transform="translate(0 -0.02589) scale(0.00390625 0.00410852)" />
                                </pattern>
                                <image id="image0" width={256} height={256} xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAADAFBMVEX///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/LkhhAAAA/3RSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGRobHB0eHyAhIiMkJSYnKCkqKywtLi8wMTIzNDU2Nzg5Ojs8PT4/QEFCQ0RFRkdISUpLTE1O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" />
                            </defs>
                        </svg>
                    </ExternalLink>
                </li>
                <li>
                    <ExternalLink href="https://twitter.com/DeusDao">
                        <svg width={19} height={15} viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.0548 3.73421C17.0664 3.89695 17.0664 4.05969 17.0664 4.22393C17.0664 9.22836 13.1452 15 5.97518 15V14.997C3.85712 15 1.78306 14.4105 0 13.2991C0.307983 13.3351 0.61751 13.3531 0.927808 13.3539C2.68308 13.3554 4.38818 12.7831 5.76908 11.7295C4.10104 11.6987 2.63831 10.642 2.12732 9.09937C2.71164 9.20887 3.31371 9.18637 3.88722 9.03413C2.06866 8.67715 0.760309 7.12475 0.760309 5.32186C0.760309 5.30536 0.760309 5.28961 0.760309 5.27386C1.30217 5.5671 1.90888 5.72984 2.52947 5.74783C0.816657 4.63565 0.288686 2.42179 1.32301 0.690903C3.30213 3.057 6.22218 4.49541 9.35682 4.64765C9.04266 3.33224 9.47183 1.95382 10.4845 1.02913C12.0546 -0.404778 14.5238 -0.331282 15.9997 1.19337C16.8727 1.02613 17.7094 0.714902 18.4751 0.27393C18.1841 1.15062 17.5751 1.89533 16.7615 2.36855C17.5342 2.28005 18.2891 2.07907 19 1.77234C18.4767 2.53429 17.8175 3.198 17.0548 3.73421Z" fill="white" />
                        </svg>
                    </ExternalLink>
                </li>
                <li>
                    <ExternalLink href="https://t.me/deusfinance">
                        <svg style={{ marginBottom: "2px" }} height={16} viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.6601 0.219953C17.3531 -0.0344475 16.8708 -0.0708476 16.3722 0.124753H16.3713C15.8469 0.330354 1.52653 6.33197 0.943561 6.57717C0.837529 6.61317 -0.088506 6.95077 0.00688135 7.70278C0.092034 8.38078 0.836301 8.66158 0.927185 8.69398L4.56787 9.91198C4.80941 10.6976 5.69983 13.596 5.89674 14.2152C6.01956 14.6012 6.21975 15.1084 6.5706 15.2128C6.87846 15.3288 7.18468 15.2228 7.38282 15.0708L9.60866 13.0536L13.2019 15.7916L13.2874 15.8416C13.5314 15.9472 13.7652 16 13.9883 16C14.1606 16 14.326 15.9684 14.4841 15.9052C15.0224 15.6892 15.2377 15.188 15.2603 15.1312L17.9442 1.50036C18.108 0.772355 17.8803 0.401954 17.6601 0.219953ZM7.7787 10.3992L6.55054 13.5992L5.32237 9.59918L14.7383 2.79916L7.7787 10.3992Z" fill="white" />
                        </svg>
                    </ExternalLink>
                    <img className="polygon" src="/img/navbar/polygon.png" width="13px" alt="polygon" />
                    <SubNavbarContentWrap>
                        <li>
                            <ExternalLink href="https://t.me/deusfinance_news" textDecoration="none">Announcment Channel</ExternalLink>
                        </li>
                        <li>
                            <ExternalLink href="https://t.me/deusfinance" textDecoration="none">Community Channel</ExternalLink>
                        </li>
                    </SubNavbarContentWrap>

                </li>
                <li>
                    <p>{t("learn")}</p>
                    <img className="polygon" src="/img/navbar/polygon.png" width="13px" alt="polygon" />

                    <SubNavbarContentWrap>
                        <li>
                            <ExternalLink href="https://wiki.deus.finance" textDecoration="none">{t("deusWiki")} </ExternalLink>
                        </li>
                    </SubNavbarContentWrap>
                </li>
                <li>
                    <p>{t("tools")}</p>
                    <img className="polygon" src="/img/navbar/polygon.png" width="13px" alt="polygon" />
                    <SubNavbarContentWrap>
                        <li>  <ExternalLink href="https://play.google.com/store/apps/details?id=finance.deus.deus_mobile&hl=en_US" textDecoration="none"> DEUS android</ExternalLink></li>
                        <li>  <ExternalLink href="https://simulate.deus.finance" textDecoration="none"> {t("simulator")}</ExternalLink></li>
                        <li>  <ExternalLink href="https://chart.deus.finance" textDecoration="none"> {t("tradingview")}</ExternalLink></li>
                        <li>  <ExternalLink href="https://vote.deus.finance" textDecoration="none"> {t("vote")}</ExternalLink></li>
                    </SubNavbarContentWrap>
                </li>
                <li>
                    <NavLink to="/swap" >{t("swap")} </NavLink>
                </li>
                <li>
                    <p>{t("buyStocks")} </p>
                    <img className="polygon" src="/img/navbar/polygon.png" width="13px" alt="polygon" />
                    <SubNavbarContentWrap>
                        <li> <NavLink to="/synchronizer" >ETH </NavLink> </li>
                        <li> <NavLink to="/crosschain/xdai/synchronizer/" >xDAI </NavLink></li>
                        <li> <NavLink to="/crosschain/bsc/synchronizer/" >BSC </NavLink></li>
                        <li> <NavLink to="/crosschain/heco/synchronizer/" >HECO </NavLink></li>
                    </SubNavbarContentWrap>
                </li>
                <li>
                    <NavLink to="/stake-and-yield"> {t("staking")}</NavLink>
                    <img className="polygon" src="/img/navbar/polygon.png" width="13px" alt="polygon" />
                    <SubNavbarContentWrap>
                        <li><NavLink to="/stake-and-yield"> STAKE & YIELD </NavLink></li>
                        <li><NavLink to="/vaults" exact>  {t("vaultsL")} </NavLink></li>
                        <li><NavLink to="/staking" > {t("stakingL")} </NavLink></li>
                    </SubNavbarContentWrap>

                </li>
                <li style={{ cursor: "default" }}>
                    <LanguageSelector />
                </li>
            </NavbarContentWrap>

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
                        <NavButton className="network-label" active={true} onClick={() => addRPC(account, activate, validChains[0])}>
                            {t("changeTo")} {NameChainMap[validChains[0]] || "ETH"}
                        </NavButton>
                        :
                        <NavButton className="network-label" active={false} >
                            <span style={{ opacity: "0.5", marginRight: "5px" }}>Network: </span> {NameChainMap[chainId]}
                            {/* {NameChainMap[chainId]} */}
                        </NavButton>
                    :
                    <NavButton active={true} onClick={handleConnect}>
                        {t("connectWallet")}
                    </NavButton>
                }

                <svg className="hamb" onClick={() => setOpen(!open)} width={22} height={16} viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 15H1" stroke="white" strokeWidth={2} strokeLinecap="round" /><path d="M21 8H1" stroke="white" strokeWidth={2} strokeLinecap="round" /><path d="M21 1H1" stroke="white" strokeWidth={2} strokeLinecap="round" /></svg>
            </NavbarSideWrap>


            <NavbarMobileContent open={open}>

                <ul>
                    <li className="icon-close"><div className="menu-title">{t("menu")}</div><svg onClick={() => setOpen(!open)} viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="Page-1" stroke="white" strokeWidth={1} fill="white" fillRule="evenodd"><g id="icon-shape"><polygon id="Combined-Shape" points="10 8.58578644 2.92893219 1.51471863 1.51471863 2.92893219 8.58578644 10 1.51471863 17.0710678 2.92893219 18.4852814 10 11.4142136 17.0710678 18.4852814 18.4852814 17.0710678 11.4142136 10 18.4852814 2.92893219 17.0710678 1.51471863 10 8.58578644" /></g></g></svg></li>

                    <li className="nav-item " style={{ marginLeft: "20px" }} >
                        <LanguageSelector />
                    </li>

                    <li className="nav-item ">
                        <a href="/"><div className="nav-title"> APP</div></a>
                        <ul className="sub-nav" onClick={() => setOpen(false)}>
                            <li className="sub-nav-item">
                                <NavLink to="/swap" >{t("swap")} </NavLink>
                            </li>
                            <li className="sub-nav-item">
                                <NavLink to="/stake-and-yield" > STAKE &amp; YIELD </NavLink>
                            </li>
                            <li className="sub-nav-item">
                                <NavLink to="/vaults" > {t("vaultsL")} </NavLink>
                            </li>
                            <li className="sub-nav-item">
                                <NavLink to="/staking" >  {t("stakingL")}</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item ">
                        <a href="/"><div className="nav-title"> {t("buyStocks")}</div></a>
                        <ul className="sub-nav" onClick={() => setOpen(false)}>
                            <li className="sub-nav-item"> <NavLink to="/synchronizer" >ETH </NavLink> </li>
                            <li className="sub-nav-item"> <NavLink to="/crosschain/xdai/synchronizer/" >xDAI </NavLink></li>
                            <li className="sub-nav-item"> <NavLink to="/crosschain/bsc/synchronizer/" >BSC </NavLink></li>
                            <li> <NavLink to="/crosschain/heco/synchronizer/" >HECO </NavLink></li>
                        </ul>
                    </li>
                    <li className="nav-item ">
                        <a href="/"><div className="nav-title"> {t("learn")}</div></a>
                        <ul className="sub-nav" onClick={() => setOpen(false)}>
                            <li className="sub-nav-item">  <ExternalLink href="https://wiki.deus.finance" textDecoration="none"> {t("deusWiki")} </ExternalLink></li>
                        </ul>
                    </li>
                    <li className="nav-item ">
                        <a href="/"><div className="nav-title"> {t("tools")}</div></a>
                        <ul className="sub-nav" onClick={() => setOpen(false)}>
                            <li className="sub-nav-item">  <ExternalLink href="https://play.google.com/store/apps/details?id=finance.deus.deus_mobile&hl=en_US" textDecoration="none"> DEUS android</ExternalLink></li>
                            <li className="sub-nav-item">  <ExternalLink href="https://simulate.deus.finance" textDecoration="none"> {t("simulator")}</ExternalLink></li>
                            <li className="sub-nav-item">  <ExternalLink href="https://chart.deus.finance" textDecoration="none">  {t("tradingview")}</ExternalLink></li>
                            <li className="sub-nav-item">  <ExternalLink href="https://vote.deus.finance" textDecoration="none"> {t("vote")}</ExternalLink></li>
                        </ul>
                    </li>

                </ul>
            </NavbarMobileContent>

        </NavbarWrap>
    </>);
}

export default Navbar;