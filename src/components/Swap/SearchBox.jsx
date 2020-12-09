import React, { Component } from 'react';

class SearchBox extends Component {
    state = {}
    render() {
        const { showSearchBox, handleSearchBox, handleFilterToken, handleChangeToken } = this.props
        return (<>
            { showSearchBox && <div className="search-box-wrap">
                <div className="search-box">
                    <div className="label">
                        <p>Select a token</p>
                        <div onClick={() => handleSearchBox(false)}>close</div>
                    </div>
                    {/* <input type="text" placeholder="Search name or paste address" spellCheck="false" autoComplete="off" /> */}
                    <div className="token-items-wrap">
                        <p>Token</p>
                        <div className="token-items">
                            {
                                Object.entries(handleFilterToken).map((t, i) => {
                                    return <div key={i} className="token-item" onClick={() => handleChangeToken(t[1].name)}>
                                        <div>
                                            <img src={process.env.PUBLIC_URL + `/tokens/${t[1].pic_name}.svg`} alt={t[1].name} />
                                            <p>{t[1].name}</p>
                                        </div>
                                        <p >{t[1].balance}</p>
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