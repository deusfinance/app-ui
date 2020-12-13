import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class MigrationPopup extends Component {
    state = {}
    render() {
        const { isMigPopup, handleMigPupop } = this.props
        return (<> { isMigPopup && <div className="migration-pools-wrp" >
            <div className="btn-close" onClick={() => handleMigPupop(false)}>x</div>
            <div className="title">
                Staking pool maintenance <br />
                we are migrating to new pools!
</div>
            <div className="p1">
                FUNDS ARE SAFU<br />  <br />
                planned migration time is about 1 hour. <br />
                 All Pools are affected during that time.<br />

                You will not be able to do following actions

                <br /><b>Stake more,claim DEA ,withdraw & claim DEA. </b><br />
                <br />   there will be a new site that contains the new pools  and a site that contains the old pools.
                 you are able to withdraw your tokens after migration, any time.
                <br /> Maintenance Time is planned at <b> 8 PM UTC+0 until 9 PM UTC +0 </b><br />
                 If you try to withdraw or perfom any action during migration you will get an transaction error, do not panic
                <br /> Chief over
                    </div>
            {/* <div className="mig-btn-wrp">
                <a href="https://t.me/deusfinance" className="mig-btn" target="_blank" rel="noopener noreferrer">Telegram</a>
            </div> */}
            <div className="btns-wrap">

                <a className="btns" href="https://t.me/deusfinance" target="_blank" rel="noopener noreferrer">discuss this in telegram</a>
                <Link to="/staking" className="btns">show me the new pools</Link>
            </div>

        </div >}
        </>);
    }
}

export default MigrationPopup;