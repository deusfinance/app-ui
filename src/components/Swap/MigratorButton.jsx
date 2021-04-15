import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../../connectors';
import { ButtonSyncDeactive } from '../App/Button';

const MigratorButton = ({ approved, token, handleMigrate, isMobile }) => {
    const web3React = useWeb3React()
    const { account, activate, chainId } = web3React

    const handleConnect = async () => {
        try {
            const data = await activate(injected)
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const amount = typeof (token.amount) === "string" ? parseFloat(token.amount) : token.amount


    if (chainId && (chainId !== 1 && chainId !== 4)) {
        return (<>
            <ButtonSyncDeactive>
                WRONG NETWORK
            </ButtonSyncDeactive>

        </>)
    }

    return (<>
        { account && <>{(token.balance < amount) ? <ButtonSyncDeactive style={{ animation: "scale-up 0.3s forwards" }}>
            INSUFFICIENT BALANCE
            </ButtonSyncDeactive> :
            <div className="swap-btn-wrap grad-wrap xdai-button" style={{ background: "linear-gradient(90deg, #DFF4FE 0%, #8EB5FF 100%)", animation: "scale-up 0.3s forwards" }} onClick={handleMigrate}>
                <div className="swap-btn grad" >
                    {approved ? "MIGRATE" : "APPROVE"}
                </div>
            </div>}
        </>}
        {
            !account && <ButtonSyncDeactive>
                CONNECT WALLET
            </ButtonSyncDeactive>
        }

    </>);
}

export default MigratorButton;