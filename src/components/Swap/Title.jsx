import React from 'react';
import { notify, formatBalance } from '../../utils/utils';
// import ChainPupop from '../common/Popup/ChainPopup';
// import { useWeb3React } from '@web3-react/core';

const Title = ({ claimable_amount, web3, isStock, isSPCx, isCoinbase, isBakkt, isDEA }) => {
    const isClaimBtn = web3 && claimable_amount && claimable_amount !== "" && claimable_amount !== "0" && formatBalance(claimable_amount) !== 0
    const isMobile = window.innerWidth < 670
    // const { chainId } = useWeb3React()
    const handleClaim = async () => {
        try {
            await web3.withdrawPayment(notify())
        } catch (error) {

        }
    }

    return (<>

        {/*         <ChainPupop
            title={"ARE YOU IN THE RIGHT PLACE?"}
            show={chainId && (chainId !== 1 && chainId !== 4)}
            close={false}
            handlePopup={() => console.log()}
            popBody={<div className="description" style={{ padding: "30px  10px", textAlign: "center" }}>
                <div>
                    This page is specific for Ethereum mainnet and it seems like you are connected to another network.
                </div>
                <div style={{ marginTop: "20px" }}>
                    1) Change your wallets network to Ethereum <br />
                        2) Go to  <a href="/crosschain/xdai/tutorial" style={{ marginTop: "10px" }}>Crosschain</a>
                </div>

                <div style={{ marginTop: "20px" }}>
                    Need more help?<br />
                    <a href="https://wiki.deus.finance" target="_blank" style={{ marginTop: "10px" }}>Visit our wiki ↗</a>
                </div>

            </div>}
        /> */}

        {isClaimBtn && isMobile && <div className="grad-wrap claimable-btn" onClick={handleClaim}>
            <div className={`grad `}>
                <div> {formatBalance(claimable_amount)} ETH</div>
                <div>claim</div>
            </div>
        </div>
        }
        <div className="swap-title">
            {!(isStock || isSPCx || isDEA) && <> <img src={process.env.PUBLIC_URL + "/img/DEUSName.svg"} alt="DEUS" />
                <div className="swap-wrap">
                    <div className="swap">
                        Swap
                    </div>
                </div>
            </>}

            {isStock && <> <img src={process.env.PUBLIC_URL + "/img/sync-logo.svg"} alt="DEUS" />
                <div className="sync-wrap" >
                    <div className="sync" style={{ textTransform: "uppercase" }}>
                        synchronizer
                    </div>
                </div>
            </>}

        </div>
        {isCoinbase && <div className="coinbase-wrap">
            <div className="top">coinbase</div>
            <img src={process.env.PUBLIC_URL + "/img/futures.svg"} alt="CoinBase" />
        </div>}

        {isBakkt && <div className="bakkt-wrap" style={{ textAlign: "center", marginBottom: "20px" }}>
            <img src={process.env.PUBLIC_URL + "/img/bakkt.svg"} alt="bakkt" />
        </div>}

        {isSPCx && <div className="spcx-wrap" style={{ textAlign: "center", marginBottom: "20px" }}>
            <img src={process.env.PUBLIC_URL + "/img/musk-logo.svg"} alt="spcx" />
            <div className="main-title">SPACEX FUTURE, ...</div>
            <div className="desc">
                <div >Trade SPACEX futures before anyone else.</div>
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