import React, { Component } from 'react'
import Footer from './common/Footer';
import { Link } from 'react-router-dom'
import '../styles/scss/style.css';

class Home extends Component {
    state = {}

    componentDidMount() {
        document.title = "DEUS finance"
    }


    render() {
        let footerClass = ""
        if (window.innerHeight > 1024) {
            footerClass = "footer-wrp"
        }
        return (<div>
            <div className="home-wrapper">
                <div className="home-content">
                    <div className="deus">DEUS <span className="finance">finance</span></div>
                    <div className="asset">
                        <div className="tokenization">next generation asset tokenization</div>
                        <div className="trasnpose">
                            transpose any verifiable digital or non-digital asset securely onto the
                            blockchain
                        </div>
                    </div>
                    <ul className="features">
                        <li> DAO-governed</li>
                        <li>oracle-validated</li>
                        <li>algorithmically backed</li>
                        <li>economically incentivized</li>
                    </ul>
                    <div className="btns">
                        {<Link to="/swap" className="private" >Get DEUS</Link>}
                        <a href="https://deus.finance/litepaper.pdf" target="_blank" className="learn" rel="noopener noreferrer">Learn More</a>
                    </div>

                    <div className="cbtns">
                        <a className="ethereum" href="https://ethereum.org/en/" target="_blank" rel="noopener noreferrer">
                            <img src="img/Ethereum.svg" alt="Ethereum" />
                        </a>
                        <a className="solidity" href="https://github.com/ethereum/solidity" target="_blank" rel="noopener noreferrer">
                            <img src="img/Solidity.svg" alt="Solidity" />
                        </a>
                    </div>
                </div>
                <div className="giphy">
                    <img src="img/ez.gif" alt="giphy" />
                </div>
            </div>
            <Footer classes="social" footerClass={footerClass} />
        </div>
        );
    }
}

export default Home;