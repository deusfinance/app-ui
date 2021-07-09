import React, { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useTranslation } from 'react-i18next'
import Wallets from '../common/Navbar/Wallets';

const SwapButton = ({ approved, token, handleSwap, isMobile }) => {
    const web3React = useWeb3React()
    const { account, chainId } = web3React
    const [showWallets, setShowWallets] = useState(false)

    const { t } = useTranslation()

    useEffect(() => {
        setShowWallets(false)
    }, [account])

    const amount = typeof (token.amount) === "string" ? parseFloat(token.amount) : token.amount


    if (chainId && (chainId !== 1 && chainId !== 4)) {
        return (<>
            <div className="swap-btn-wrap grad-wrap Insufficient ">
                <div className="swap-btn grad Insufficient" style={{ backgroundColor: "#111111" }} >
                    {t("wrongNetwork")}
                </div>
            </div>
        </>)
    }

    return (<>

        {showWallets && <Wallets showWallets={showWallets} setShowWallets={setShowWallets} />}
        { account && <>{(token.balance < amount) ? <div className="swap-btn-wrap grad-wrap Insufficient ">
            <div className="swap-btn grad Insufficient">
                {t("insufficientBalance")}
            </div>
        </div> :
            <div className="swap-btn-wrap grad-wrap" onClick={handleSwap}>
                <div className="swap-btn grad">
                    {approved ? t("swap") : t("approve")}
                </div>
            </div>}
        </>}
        {
            !account && <div className="swap-btn-wrap grad-wrap dapp-link" onClick={() => setShowWallets(true)}>
                <div className="swap-btn grad">{t("ConnectWallet")}</div>
            </div>
        }

    </>);
}

export default SwapButton;
