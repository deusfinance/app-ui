import React from 'react';
import { notify, formatBalance } from '../../utils/utils';
import { useTranslation } from 'react-i18next'

const Title = ({ claimable_amount, web3, isStock, isSPCx, isCoinbase, isBakkt, isDEA, isMigrator }) => {
    const isClaimBtn = web3 && claimable_amount && claimable_amount !== "" && claimable_amount !== "0" && formatBalance(claimable_amount) !== 0
    const isMobile = window.innerWidth < 670
    const { t } = useTranslation()
    // const { chainId } = useWeb3React()
    const handleClaim = async () => {
        try {
            await web3.withdrawPayment(notify())
        } catch (error) {

        }
    }

    return (<>


        {isClaimBtn && isMobile && <div className="grad-wrap claimable-btn" onClick={handleClaim}>
            <div className={`grad `}>
                <div> {formatBalance(claimable_amount)} ETH</div>
                <div>{t("claim")}</div>
            </div>
        </div>
        }
        <div className="swap-title">
            {!(isStock || isSPCx || isDEA || isMigrator) && <> <img src={process.env.PUBLIC_URL + "/img/DEUSName.svg"} alt="DEUS" />
                <div className="swap-wrap">
                    <div className="swap">
                        {t("swap")}
                    </div>
                </div>
            </>}

            {isStock && <> <img src={process.env.PUBLIC_URL + "/img/sync-logo.svg"} alt="DEUS" />
                <div className="sync-wrap" >
                    <div className="sync" style={{ textTransform: "uppercase" }}>
                        {t("synchronizer")}
                    </div>
                </div>
            </>}

        </div>
        {isMigrator && <div className="swap-title">
            <div className="swap-wrap">
                <div className="swap">
                    {t("swap")}
                </div>
            </div>
        </div>}

        {isCoinbase && <div className="coinbase-wrap">
            <div className="top">coinbase</div>
            <img src={process.env.PUBLIC_URL + "/img/futures.svg"} alt="CoinBase" />
        </div>}
        {isMigrator && <div className="coinbase-wrap migrator-wrap">
            <div className="top">coinbase</div>
            <img src={process.env.PUBLIC_URL + "/img/migrator.svg"} alt="migrator" />
        </div>}

        {isBakkt && <div className="bakkt-wrap" style={{ textAlign: "center", marginBottom: "20px" }}>
            <img src={process.env.PUBLIC_URL + "/img/bakkt.svg"} alt="bakkt" />
        </div>}

        {isSPCx && <div className="spcx-wrap" style={{ textAlign: "center", marginBottom: "20px" }}>
            <img src={process.env.PUBLIC_URL + "/img/musk-logo.svg"} alt="spcx" />
            <div className="main-title"> {t("spaceX")}</div>
            <div className="desc">
                <div >{t("spaceX2")}</div>
            </div>
        </div>}

        {isDEA && <div className="spcx-wrap" style={{ textAlign: "center", marginBottom: "40px" }}>
            <img src={process.env.PUBLIC_URL + "/tokens/usdc.svg"} style={{ width: "90px", height: "90px", marginRight: "-30px" }} alt="spcx" />
            <img src={process.env.PUBLIC_URL + "/tokens/dea.svg"} style={{ width: "100px", height: "100px" }} alt="spcx" />
            {/* <div className="main-title">DEA OTC counter</div> */}
            {/* <div className="desc">
                <div >Trade SPACEX futures before anyone else.</div>
            </div> */}
        </div>}
    </>);
}

export default Title;