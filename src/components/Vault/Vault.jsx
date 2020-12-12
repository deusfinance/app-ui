import React, { Component } from 'react';
import CloseBox from './CloseBox';
import LockPopup from './LockPupop';
import OpenBox from './OpenBox';
import { vaultsTokens2, vaultsTokens, sandTokens, timeToken, AllStakings } from '../../config'

import './vaults.scss'
import GonbadBox from './GonbadBox';
import UnLockPupop from './UnLockPupop';
import GonbadOpen from './GonbadOpen';

class Vault extends Component {
    state = {
        unlocked: false,
        locked: false,
        typeTransaction: "",
        tokens: {},
        vaultsList: ["uni_lp_dea_usdc", "uni_lp_dea_usdc", "dea", "deus", "wbtc", "dai", "eth"],
        vaults: AllStakings.vaults,
    }



    methods = {
        onStart: () => {
            console.log("onStart")
        },
        onSuccess: () => {
            console.log("onSuccess")
            const { currToken, typeTransaction } = this.state
            if (typeTransaction === "approve") {
                this.getSingleAllowances(currToken, true)
                this.setState({ typeTransaction: "" })
            } else {
                this.getSingleBalance(currToken, true)
                this.getSingleBalance(currToken, true)
            }
        },
        onError: () => console.log("onError"),
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        //initial sandToken
        //initial valults token
        //initial time token
        // this.setState({  })
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
        this.setState({ tokens: all_tokens, allTokens: this.props.allTokens })
    }

    handleLock = (vault) => {
        const { allTokens } = this.state

        document.getElementById("blur-pop").classList.add("blured")

        console.log(vault.name);

        this.setState({
            unlocked: false,
            locked: true,
            currToken: allTokens[vault.name],
            currSand: allTokens["sand_" + vault.name],
            currVault: vault,
        })

        this.handleInitialTokens()
    }

    getSingleAllowances = (token) => {
        const currToken = token

    }

    handleUnLock = () => {
        document.getElementById("blur-pop").classList.add("blured")
        this.setState({ unlocked: true, locked: false })
    }

    handleClose = () => {
        document.getElementById("blur-pop").classList.remove("blured")
        this.setState({ unlocked: false, locked: false })
    }

    handleSwap = (from) => (amount) => {
        console.log(from.name + "\t" + amount + "\t handleSwap ");
        const { allTokens, vaults } = this.state
        const prevBalance = allTokens[from.name].balance ? allTokens[from.name].balance : 0
        allTokens[from.name].balance = prevBalance - amount
        allTokens["sand_" + from.name].balance = amount / 2
        allTokens["timetoken"].balance = amount / 1.5
        vaults[from.name].locked = amount
        this.setState({ allTokens, vaults })
        this.handleClose()
    }

    handleApprove = (from) => (amount) => {
        console.log(from.name + "\t" + amount + "\t handleApprove ");
        // const { currToken } = this.state
        // currToken.allowances = 5
        // this.setState({ currToken })
        const { allTokens } = this.state
        allTokens.dea.allowances = 10
        this.setState({ allTokens })
    }


    handleInitialTokens = () => {
        const tokens = this.state.tokens
        const aa = ["uni_lp_dea_usdc", "dea", "deus", "wbtc", "dai", "eth"]
        aa.map((name, i) => {
            console.log(tokens[name]);
            tokens[name].deposited = 1
        })
        this.setState({ tokens })
    }


    render() {
        const { unlocked, locked, tokens, currToken, currVault, currSand, vaults, vaultsList, allTokens } = this.state

        // const sandToken = currToken ? sandTokens["s_" + currToken.name] : null

        // if (sandToken) sandToken.title = sandToken.name.toUpperCase().replaceAll("_", "-")

        const timetoken = allTokens.timetoken

        return (<div>

            <div style={{ position: "relative" }}>

                {/* {unlocked && <UnLockPupop
                    token={currToken}
                    handleLock={this.handleLock}
                    handleClose={this.handleClose}
                    sandToken={sandToken}
                    handleSwap={this.handleSwap}
                    handleToggle={this.handleLock}
                    locked={unlocked}
                />} */}


                {locked && <UnLockPupop
                    token={currToken}
                    sandToken={currSand}
                    timeToken={timetoken}
                    vault={currVault}
                    handleLock={this.handleLock}
                    handleClose={this.handleClose}
                    handleApprove={this.handleApprove(currToken)}
                    handleSwap={this.handleSwap(currToken)}
                    handleToggle={this.handleUnLock}
                    locked={locked}
                    approved={currToken.allowances > 0}
                />}

                <div className={`vaults-wrap`}>
                    {vaults.uni_lp_deus_dea.locked > 0 ? <GonbadOpen token={tokens.uni_lp_deus_dea} handleLock={this.handleLock} />
                        : <GonbadBox token={tokens.uni_lp_deus_dea} handleLock={this.handleLock} />}
                    <div className="doors-wrap">

                        <div className="doors">

                            {
                                vaultsList.slice(1).map((name, i) => {
                                    const vault = vaults[name]
                                    const token = allTokens["sand_" + name]
                                    if (vault.locked && vault.locked > 0) {
                                        return <OpenBox
                                            key={i}
                                            vault={vault}
                                            token={token}
                                            handleLock={this.handleLock}
                                        />
                                    } else {
                                        return <CloseBox
                                            key={i}
                                            vault={vault}
                                            token={token}
                                            handleLock={this.handleLock}
                                        />
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

export default Vault;