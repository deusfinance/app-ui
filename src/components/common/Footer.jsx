import React from 'react'
import { Link } from 'react-router-dom';
import "./footer.scss"

const Footer = ({ classes, items, footerClass }) => {

    return (
        <footer>
            <div className="container">
                <div className="group">
                    <h4>COMMUNITY</h4>
                    <ul>
                        <li><a href="https://discord.com/invite/xfeYT6acha" target="_blank">Discord</a></li>
                        <li><a href="https://t.me/deusfinance" target="_blank">Telegram</a></li>
                    </ul>
                </div>
                <div className="group">
                    <h4>CONTRACTS</h4>
                    <ul>
                        <li>
                            <a href="https://etherscan.io/token/0x3b62f3820e0b035cc4ad602dece6d796bc325325" target="_blank">
                                DEUS
          </a>
                        </li>
                        <li><a href="https://etherscan.io/token/0x80ab141f324c3d6f2b18b030f1c4e95d4d658778" target="_blank">
                            DEA
          </a>
                        </li>
                    </ul>
                </div>
                <div className="group">
                    <h4>RESOURCES</h4>
                    <ul>
                        <li><a href="https://wiki.deus.finance" target="_blank">WIKI</a></li>
                        <li><a href="https://github.com/deusfinance" target="_blank">Github</a></li>
                        <li><a href="https://www.youtube.com/channel/UCEVRMEr1Kt-n6ycQSEYBScQ" target="_blank">Youtube</a>
                        </li>
                        <li><a href="https://medium.com/@deusfinance" target="_blank">Medium</a></li>
                        <li><a href="https://www.twitch.tv/deus_finance" target="_blank">Twitch</a></li>
                    </ul>
                </div>
                <div className="group">
                    <h4>APP </h4>
                    <ul>
                        <li> <Link to={"/swap"} > SWAP</Link></li>
                        <li> <Link to={"/synchronizer"} > SYNCHRONIZER (new)</Link></li>
                        <li> <Link to={"/coinbase"} > COINBASE</Link></li>
                        <li> <Link to={"/bakkt"} > BAKKT</Link></li>
                        <li> <Link to={"/staking"} > STAKING</Link></li>
                        <li> <Link to={"/vaults"} > VAULTS</Link></li>
                    </ul>
                </div>
            </div>
        </footer>

    );

}

export default Footer;
