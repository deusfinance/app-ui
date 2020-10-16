import React, { Component } from 'react'
class MigrationPopup extends Component {
    state = {}
    render() {
        const { isMigPopup, handleMigPupop } = this.props
        return (<> { isMigPopup && <div div div className="migration-pools-wrp" >
            <div className="btn-close" onClick={() => handleMigPupop(false)}>x</div>
            <div className="title"> Staking pool maintenance</div>
            <div className="p1">
                Ok the votes are closed we will start on cutting emission rate in next hours.<br /><br />
                Following Pools are affected by maintenence: <br />
                <b> SNX , UNI , AMPL-ETH</b><br />

                <br />You will not able to do the following actions on those Pools for 30 minutes

               <br /> <b> Stake more
                Claim DEA ,
                Withdraw & Claim DEA
                </b><br />
                <br />Maintenance Time:
                🧲🧲 2:30 PM UTC until 3:00 PM UTC 🧲🧲
                <br />
                <br />  If you try to withdraw during migration you will get a transaction error, dont panic funds are safu.
                    </div>
            <div className="mig-btn-wrp">
                <a href="https://t.me/deusfinance" className="mig-btn" target="_blank" rel="noopener noreferrer">Telegram</a>
            </div>
        </div >}
        </>);
    }
}

export default MigrationPopup;