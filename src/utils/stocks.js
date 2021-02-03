import { useWeb3React } from '@web3-react/core';
import assets from './constituents.json'
import output from './../services/output.json'
import { TokenType } from '../config';
import { Token } from './tokens';
import { useMemo } from 'react';
import _ from "lodash"


const isThereLogos = ["A", "AAL", "AAP", "AAPL", "ABBV", "ABMD", "ACN", "ADBE", "ADI", "ADM", "ADP", "ADSK", "AEE", "AEP", "AFL", "AIG", "AIV", "AIZ", "AJG", "ALK", "ALL", "AMAT", "AMD", "AME", "AMP", "AMT", "AMZN", "ANET", "ANSS", "ANTM", "AON", "AOS", "APA", "APD", "APH", "APTV", "ATO", "ATVI", "AVB", "AVGO", "AVY", "AWK", "AXP", "AZO", "BA", "BAC", "BAX", "BBY", "BDX", "BEN", "BIIB", "BIO", "BK", "BKNG", "BMY", "BR", "BSX", "BWA", "BXP", "C", "CB", "CBOE", "CBRE", "CCI", "CCL", "CDNS", "CE", "CERN", "CF", "CFG", "CHRW", "CHTR", "CI", "CINF", "CL", "CLX", "CMCSA", "CME", "CMG", "CMI", "CMS", "CNC", "CNP", "COF", "COG", "COO", "COP", "CPRT", "CSCO", "CSX", "CTAS", "CTL", "CTLT", "CTSH", "CTVA", "CTXS", "CVX", "D", "DE", "DFS", "DG", "DGX", "DISCA", "DISH", "DLR", "DLTR", "DOV", "DPZ", "DRE", "DRI", "DTE", "DUK", "DVA", "DVN", "DXC", "DXCM", "EA", "EBAY", "ED", "EFX", "EIX", "EMN", "EOG", "EQIX", "EQR", "ES", "ESS", "ETN", "ETR", "ETSY", "EVRG", "EW", "EXC", "EXPD", "EXPE", "F", "FANG", "FAST", "FB", "FCX", "FDX", "FE", "FFIV", "FIS", "FISV", "FITB", "FLT", "FMC", "FOXA", "FRC", "FTI", "FTNT", "FTV", "GE", "GILD", "GIS", "GL", "GLW", "GM", "GOOGL", "GPC", "GPN", "GRMN", "GWW", "HBAN", "HBI", "HCA", "HD", "HIG", "HLT", "HOLX", "HPE", "HRL", "HSIC", "HST", "HUM", "IBM", "IDXX", "IEX", "ILMN", "INCY", "INFO", "INTC", "INTU", "IP", "IPG", "IPGP", "IQV", "IRM", "ISRG", "IT", "ITW", "IVZ", "JBHT", "JKHY", "JNJ", "JNPR", "JPM", "K", "KEY", "KIM", "KLAC", "KMB", "KMI", "KO", "KR", "L", "LB", "LDOS", "LEG", "LEN", "LH", "LHX", "LIN", "LLY", "LMT", "LNC", "LNT", "LOW", "LRCX", "LVS", "LYB", "LYV", "MAA", "MAR", "MCHP", "MCK", "MCO", "MDLZ", "MDT", "MET", "MGM", "MHK", "MKC", "MKTX", "MLM", "MMM", "MNST", "MOS", "MPC", "MRK", "MRO", "MS", "MSCI", "MSI", "MTB", "MU", "MXIM", "MYL", "NEM", "NFLX", "NI", "NLOK", "NLSN", "NOC", "NOV", "NOW", "NRG", "NSC", "NTAP", "NVR", "NWL", "NWSA", "OKE", "OMC", "ORCL", "ORLY", "OXY", "PAYC", "PAYX", "PBCT", "PFE", "PFG", "PGR", "PH", "PHM", "PKG", "PKI", "PLD", "PM", "PNC", "PNW", "POOL", "PPG", "PPL", "PRGO", "PRU", "PSA", "PVH", "PWR", "PXD", "PYPL", "QCOM", "QRVO", "RE", "REG", "REGN", "RF", "RHI", "RJF", "RL", "RMD", "ROK", "ROL", "ROP", "ROST", "RSG", "RTX", "SBUX", "SCHW", "SEE", "SHW", "SIVB", "SLB", "SLG", "SNA", "SNPS", "SO", "SPG", "SPGI", "SRE", "STT", "STX", "STZ", "SYK", "SYY", "T", "TAP", "TDG", "TDY", "TEL", "TER", "TFC", "TGT", "TIF", "TJX", "TMO", "TMUS", "TROW", "TRV", "TSCO", "TSN", "TTWO", "TWTR", "TXN", "TXT", "TYL", "UAA", "UAL", "UDR", "UHS", "ULTA", "UNH", "UNP", "UPS", "URI", "USB", "V", "VAR", "VFC", "VLO", "VMC", "VNO", "VRSK", "VRTX", "VTR", "VZ", "WAB", "WBA", "WEC", "WELL", "WFC", "WM", "WRB", "WRK", "WST", "WU", "WY", "XEL", "XLNX", "XOM", "XRAY", "ZBH", "ZBRA", "ZION", "ZTS"]
export const daiToken = {
    symbol: "DAI",
    name: "DAI",
    title: "DAI",
    "conducted": true,
    chainId: 4,
    address: "0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735",
    logo: "/tokens/dai.png"
}



export const useAllStocks = () => {
    const { chainId } = useWeb3React()
    return useMemo(() => {
        let temp = []
        assets.constituents.map((asset, i) => {
            let logo = "/img/n-conduct.svg"
            if (isThereLogos.includes(asset)) {
                logo = "/img/ticker/" + asset + ".png"
            }
            temp.push({
                symbol: asset,
                chainId: 4,
                title: "w" + asset,
                type: TokenType.Wrapped,
                long: {
                    balance: "0"
                },
                short: {
                    balance: "0"
                },
                logo: logo,
                isDeployed: false
                // name: "wrap_" + asset.toLocaleLowerCase(),
            })
        })
        const index = _.findIndex(temp, { symbol: "AAPL", type: TokenType.Wrapped });
        const item = temp[index]
        temp.splice(index, 1, { ...item, isDeployed: true, long: { address: "0x0abc3423424caa2" }, short: { address: "0x0as23bcaddda" } })

        return temp
    }, [chainId])
}

export const newStocksTokens = output

export const conducted = { "count": 1, "tokens": [{ "id": "ABT", "long": "0xdB82e2Abf8dC45C43D220342941c3a4Bd670d991", "short": "0x2C466Ed8619Eb92C0AB9F51D2A43573A41EAb53c" }] }

export const makerBuySell = { "0x2C466Ed8619Eb92C0AB9F51D2A43573A41EAb53c": { "signs": [{ "v": 28, "r": "0xfea4ee0aa8320184c7cfd0189c40e4441bb49b3e4eb8bbe142e66d31db979391", "s": "0x0848096c22548cead7f9277eff7905cf40a38a4e7ce583338bcb7c0dcad94c25" }], "price": 112890000000000000000, "fee": 10000000000000000, "blockNo": 7940319 }, "0xdB82e2Abf8dC45C43D220342941c3a4Bd670d991": { "signs": [{ "v": 27, "r": "0xd428aba04136e0a68528a5a6907f5c80e197b3d5f558262f68b620cc61a7a414", "s": "0x2b331bbf8fec64dd2f0ca1d0500cdf904acae133a50c3ec8591f04c9b5bf0c83" }], "price": 112890000000000000000, "fee": 10000000000000000, "blockNo": 7940319 } }

// export const conducted = {
//     "count": 2,
//     "tokens": [
//         { "id": "AOS", "long": "0xe83CCb25d373bae3f5a5c6E33314Fa567E7F20eC", "short": "0x7A921758C615EC13Eb8716F531B5cA2058BcCAFb" },
//         { "id": "MMM", "long": "0xe83CCb25d373bae3f5a5c6E33314Fa567E7F20eC", "short": "0x7A921758C615EC13Eb8716F531B5cA2058BcCAFb" }]
// }

// export const deployedStocks = () => {
//     const ticker_path = "/img/ticker/"

//     const dstocks = [
//         new Token("dai", "DAI", 18, "0x00000000000abcd0ef000", 4, "/tokens/" + "dai.png"),
//         new Token("long_aapl", "Long Apple", 18, "0x000000000000000", 4, ticker_path + "AAPL.png"),
//         new Token("short_aapl", "Short Apple", 18, "0x000000000000000", 4, ticker_path + "AAPL.png")
//     ]
//     let mStock = {}
//     for (let i = 0; i < dstocks.length; i++) {
//         mStock[dstocks[i].symbol] = dstocks[i]
//     }

//     return mStock;
// }

// export const deployed = [
//     { symbol: "APPL", chainId: 4, long: "0x00000000000abcd0ef000", short: "0x000000000000000" }
// ]