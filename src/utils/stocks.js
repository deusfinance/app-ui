// import { useWeb3React } from '@web3-react/core';
// import assets from './constituents.json'
// import output from './../services/output.json'
// import { TokenType } from '../config';
// import { useMemo } from 'react';
// import _ from "lodash"


// const isThereLogos = ["A", "AAL", "AAP", "AAPL", "ABBV", "ABMD", "ACN", "ADBE", "ADI", "ADM", "ADP", "ADSK", "AEE", "AEP", "AFL", "AIG", "AIV", "AIZ", "AJG", "ALK", "ALL", "AMAT", "AMD", "AME", "AMP", "AMT", "AMZN", "ANET", "ANSS", "ANTM", "AON", "AOS", "APA", "APD", "APH", "APTV", "ATO", "ATVI", "AVB", "AVGO", "AVY", "AWK", "AXP", "AZO", "BA", "BAC", "BAX", "BBY", "BDX", "BEN", "BIIB", "BIO", "BK", "BKNG", "BMY", "BR", "BSX", "BWA", "BXP", "C", "CB", "CBOE", "CBRE", "CCI", "CCL", "CDNS", "CE", "CERN", "CF", "CFG", "CHRW", "CHTR", "CI", "CINF", "CL", "CLX", "CMCSA", "CME", "CMG", "CMI", "CMS", "CNC", "CNP", "COF", "COG", "COO", "COP", "CPRT", "CSCO", "CSX", "CTAS", "CTL", "CTLT", "CTSH", "CTVA", "CTXS", "CVX", "D", "DE", "DFS", "DG", "DGX", "DISCA", "DISH", "DLR", "DLTR", "DOV", "DPZ", "DRE", "DRI", "DTE", "DUK", "DVA", "DVN", "DXC", "DXCM", "EA", "EBAY", "ED", "EFX", "EIX", "EMN", "EOG", "EQIX", "EQR", "ES", "ESS", "ETN", "ETR", "ETSY", "EVRG", "EW", "EXC", "EXPD", "EXPE", "F", "FANG", "FAST", "FB", "FCX", "FDX", "FE", "FFIV", "FIS", "FISV", "FITB", "FLT", "FMC", "FOXA", "FRC", "FTI", "FTNT", "FTV", "GE", "GILD", "GIS", "GL", "GLW", "GM", "GOOGL", "GPC", "GPN", "GRMN", "GWW", "HBAN", "HBI", "HCA", "HD", "HIG", "HLT", "HOLX", "HPE", "HRL", "HSIC", "HST", "HUM", "IBM", "IDXX", "IEX", "ILMN", "INCY", "INFO", "INTC", "INTU", "IP", "IPG", "IPGP", "IQV", "IRM", "ISRG", "IT", "ITW", "IVZ", "JBHT", "JKHY", "JNJ", "JNPR", "JPM", "K", "KEY", "KIM", "KLAC", "KMB", "KMI", "KO", "KR", "L", "LB", "LDOS", "LEG", "LEN", "LH", "LHX", "LIN", "LLY", "LMT", "LNC", "LNT", "LOW", "LRCX", "LVS", "LYB", "LYV", "MAA", "MAR", "MCHP", "MCK", "MCO", "MDLZ", "MDT", "MET", "MGM", "MHK", "MKC", "MKTX", "MLM", "MMM", "MNST", "MOS", "MPC", "MRK", "MRO", "MS", "MSCI", "MSI", "MTB", "MU", "MXIM", "MYL", "NEM", "NFLX", "NI", "NLOK", "NLSN", "NOC", "NOV", "NOW", "NRG", "NSC", "NTAP", "NVR", "NWL", "NWSA", "OKE", "OMC", "ORCL", "ORLY", "OXY", "PAYC", "PAYX", "PBCT", "PFE", "PFG", "PGR", "PH", "PHM", "PKG", "PKI", "PLD", "PM", "PNC", "PNW", "POOL", "PPG", "PPL", "PRGO", "PRU", "PSA", "PVH", "PWR", "PXD", "PYPL", "QCOM", "QRVO", "RE", "REG", "REGN", "RF", "RHI", "RJF", "RL", "RMD", "ROK", "ROL", "ROP", "ROST", "RSG", "RTX", "SBUX", "SCHW", "SEE", "SHW", "SIVB", "SLB", "SLG", "SNA", "SNPS", "SO", "SPG", "SPGI", "SRE", "STT", "STX", "STZ", "SYK", "SYY", "T", "TAP", "TDG", "TDY", "TEL", "TER", "TFC", "TGT", "TIF", "TJX", "TMO", "TMUS", "TROW", "TRV", "TSCO", "TSN", "TTWO", "TWTR", "TXN", "TXT", "TYL", "UAA", "UAL", "UDR", "UHS", "ULTA", "UNH", "UNP", "UPS", "URI", "USB", "V", "VAR", "VFC", "VLO", "VMC", "VNO", "VRSK", "VRTX", "VTR", "VZ", "WAB", "WBA", "WEC", "WELL", "WFC", "WM", "WRB", "WRK", "WST", "WU", "WY", "XEL", "XLNX", "XOM", "XRAY", "ZBH", "ZBRA", "ZION", "ZTS"]
// export const daiToken = {
//     symbol: "DAI",
//     name: "DAI",
//     title: "DAI",
//     "conducted": true,
//     chainId: 4,
//     address: "0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735",
//     logo: "/tokens/dai.png"
// }



// export const useAllStocks = () => {
//     const { chainId } = useWeb3React()
//     return useMemo(() => {
//         let temp = []
//         assets.constituents.map((asset, i) => {
//             let logo = "/img/n-conduct.svg"
//             if (isThereLogos.includes(asset)) {
//                 logo = "/img/ticker/" + asset + ".png"
//             }
//             temp.push({
//                 symbol: asset,
//                 chainId: 4,
//                 title: "w" + asset,
//                 type: TokenType.Wrapped,
//                 long: {
//                     balance: "0"
//                 },
//                 short: {
//                     balance: "0"
//                 },
//                 logo: logo,
//                 isDeployed: false
//                 // name: "wrap_" + asset.toLocaleLowerCase(),
//             })
//         })
//         const index = _.findIndex(temp, { symbol: "AAPL", type: TokenType.Wrapped });
//         const item = temp[index]
//         temp.splice(index, 1, { ...item, isDeployed: true, long: { address: "0x0abc3423424caa2" }, short: { address: "0x0as23bcaddda" } })

//         return temp
//     }, [chainId])
// }

// export const newStocksTokens = output


