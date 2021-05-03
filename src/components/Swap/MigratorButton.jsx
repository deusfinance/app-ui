import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { ButtonSyncDeactive } from '../App/Button';
import { useTranslation } from 'react-i18next';

const MigratorButton = ({ approved, token, handleMigrate, isMobile }) => {
    const web3React = useWeb3React()
    const { account, chainId } = web3React
    const { t } = useTranslation()
    const amount = typeof (token.amount) === "string" ? parseFloat(token.amount) : token.amount

    if (chainId && (chainId !== 1 && chainId !== 4)) {
        return (<>
            <ButtonSyncDeactive>
                {t("wrongNetwork")}
            </ButtonSyncDeactive>

        </>)
    }

    return (<>
        { account && <>{(token.balance < amount) ? <ButtonSyncDeactive style={{ animation: "scale-up 0.3s forwards" }}>
            {t("wrongNetwork")}
        </ButtonSyncDeactive> :
            <div className="swap-btn-wrap grad-wrap xdai-button" style={{ background: "linear-gradient(90deg, #DFF4FE 0%, #8EB5FF 100%)", animation: "scale-up 0.3s forwards" }} onClick={handleMigrate}>
                <div className="swap-btn grad" >
                    {approved ? t("migrate") : t("approve")}
                </div>
            </div>}
        </>}
        {
            !account && <ButtonSyncDeactive>
                {t("connectWallet")}
            </ButtonSyncDeactive>
        }
    </>);
}

export default MigratorButton;