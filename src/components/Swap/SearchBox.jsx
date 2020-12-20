import React, { Component } from 'react';
import { getStayledNumber } from '../../utils/utils';

class SearchBox extends Component {
    state = {}
    render() {
        const { showSearchBox, handleSearchBox, handleFilterToken, choosedToken, allTokens, tokens, handleChangeToken } = this.props
        return (<>
            { showSearchBox && <div className="search-box-wrap">
                <div className="search-box">
                    <div className="label">
                        <p>Select a token</p>
                        <div onClick={() => handleSearchBox(false)}>close</div>
                    </div>
                    {/* <input type="text" placeholder="Search name or paste address" spellCheck="false" autoComplete="off" /> */}
                    <div className="token-items-wrap">
                        <div className="titles">
                            <p>Token</p>
                            <p>Balance</p>
                        </div>
                        <div className="token-items">
                            {
                                (tokens.sort((a, b) => allTokens[a].balance ? allTokens[a].balance > allTokens[b].balance : false)).map((tokenName, i) => {
                                    if (tokenName === choosedToken) return
                                    const token = allTokens[tokenName]
                                    return <div key={i} className="token-item" onClick={() => handleChangeToken(token.name)}>
                                        <div>
                                            <img src={process.env.PUBLIC_URL + `/tokens/${token.pic_name}.svg`} alt={token.name} />
                                            <p style={{ textTransform: "uppercase" }}>{token.name}</p>
                                            {token.isFutures && <img className="futures" src={process.env.PUBLIC_URL + "/img/futures.svg"} />}
                                        </div>
                                        <p >{getStayledNumber(token.balance)}</p>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
                {/* <div className="msg">
                    <p>There will be 500+ Stocks added until 31.12.2020</p>
                </div> */}
            </div>}
        </>);
    }
}

export default SearchBox;