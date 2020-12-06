import React, { Component } from 'react';
import CloseBox from './CloseBox';
import LockPopup from './LockPupop';
import OpenBox from './OpenBox';
import { vaultsTokens, sandTokens, timeToken } from '../../config'

import './vaults.scss'
import GonbadBox from './GonbadBox';
import UnLockPupop from './UnLockPupop';

class Vault extends Component {
    state = {
        unlocked: false,
        locked: false,
        tokens: {},
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    componentWillMount() {
        let all_tokens = {}
        vaultsTokens.map(token => {
            all_tokens[token.name] = {
                ...token,
                title: token.name.toUpperCase().replaceAll("_", "-"),
                coin: token.coin.toUpperCase(),
                apy: 20,
                deposited: token.deposited ? token.deposited : 0,
                claimable_amount: 10,
                claimable_unit: "DEA",
                pool: 10.25,
                balance: token.balance ? token.balance : 0,
                allowances: token.allowances ? token.allowances : 0,
            }
        })
        this.setState({ tokens: all_tokens })
    }

    handleLock = (token) => {
        document.getElementById("blur-pop").classList.add("blured")
        this.setState({ unlocked: false, locked: true, currToken: token })
    }
    handleUnLock = () => {
        document.getElementById("blur-pop").classList.add("blured")

        this.setState({ unlocked: true, locked: false })
    }

    handleClose = () => {
        document.getElementById("blur-pop").classList.remove("blured")
        this.setState({ unlocked: false, locked: false })
    }

    handleSwap = (from, amount) => {
        console.log(from + "\t" + amount + "\t token ");
    }


    render() {
        const { unlocked, locked, tokens, currToken } = this.state
        const sandToken = currToken ? sandTokens.find(({ name }) => name === currToken.name) : null
        console.log(currToken);
        return (<div>

            <div style={{ position: "relative" }}>

                {unlocked && <UnLockPupop
                    token={currToken}
                    handleLock={this.handleLock}
                    handleClose={this.handleClose}
                    sandToken={sandToken}
                    handleSwap={this.handleSwap}
                    handleToggle={this.handleLock}
                    locked={unlocked}
                />}


                {locked && <UnLockPupop
                    token={currToken}
                    handleLock={this.handleLock}
                    handleClose={this.handleClose}
                    sandToken={sandToken}
                    timeToken={timeToken}
                    handleToggle={this.handleUnLock}
                    handleSwap={this.handleSwap}
                    locked={locked}
                />}

                <div className={`vaults-wrap`}>

                    <div className="top-buttons">
                        <div className="grad-wrap explain-wrap">
                            <div className="grad explain">Vaults Explainantion</div>
                        </div>
                        <div className="grad-wrap beta-wrap">
                            <div className="grad beta">DEUS is still in BETA (codes not audited)</div>
                        </div>
                    </div>
                    <GonbadBox token={tokens.uni_lp_deus_dea} handleLock={this.handleLock} />
                    <div className="doors-wrap">

                        <div className="doors">

                            <CloseBox
                                token={tokens.uni_lp_dea_usdc}
                                handleLock={this.handleLock}
                            />

                            <OpenBox
                                token={tokens.dea}
                                handleLock={this.handleLock}
                            />

                            <CloseBox
                                token={tokens.deus}
                                handleLock={this.handleLock}
                            />
                            <CloseBox
                                token={tokens.wbtc}
                                handleLock={this.handleLock}
                            />

                            <CloseBox
                                token={tokens.dai}
                                handleLock={this.handleLock}
                            />
                            <CloseBox
                                token={tokens.eth}
                                handleLock={this.handleLock}
                            />

                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default Vault;