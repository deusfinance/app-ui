import React, { useState } from 'react';
import { getStayledNumber } from '../../utils/utils';
import { TokenType } from '../../config';


const SearchAssets = (props) => {
    const height = useState("500px")
    const { searchBoxType, fromTokens, toTokens, showSearchBox, handleSearchBox, choosedToken, allTokens, tokens, handleChangeToken, version } = props
    let sortedList = tokens.sort((a, b) => allTokens[b]?.balance - allTokens[a]?.balance)
    let currentTokens = {}

    if (searchBoxType === "to") {
        sortedList = toTokens
        currentTokens = allTokens
    } else {
        sortedList = fromTokens
    }


    return (<>
        { showSearchBox && <div className="search-box-wrap">
            <div className="search-box">
                <div className="label">
                    <p> </p>
                    <div onClick={() => handleSearchBox(false)}>close</div>
                </div>
                <input type="text" placeholder="Search name" spellCheck="false" autoComplete="off" onChange={(e) => console.log(e.currentTarget.value)} />
                <div className="token-items-wrap">
                    <div className="titles">
                        <p>Token</p>
                        <p>Balance</p>
                    </div>
                    <div className="token-items" style={{ height: height }}  >
                        {
                            sortedList.map((token, i) => {
                                if (token.symbol === choosedToken) return <></>
                                return <div key={i} className="token-item" onClick={() => handleChangeToken(token)}>
                                    <div>
                                        {token.type !== TokenType.Wrapped && <img src={process.env.PUBLIC_URL + `${token?.logo}`} alt={token?.name} />}
                                        {token.type === TokenType.Wrapped && <div className={`wrap-stock-${token.isDeployed ? "" : "none-"}conduct`}><img src={process.env.PUBLIC_URL + `${token?.logo}`} style={{ marginLeft: "0px", marginRight: "0px" }} alt={token?.name} /></div>}
                                        <p >{token?.symbol}</p>
                                    </div>
                                    {<p >{getStayledNumber(token?.balance)}</p>}
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>

        </div>}
    </>);
}

export default SearchAssets;