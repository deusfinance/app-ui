import BigNumber from "bignumber.js";
import { isZero } from "../constant/number";

export const getSwapVsType = (t) => (t === "from" ? "to" : "from");

export const isDesktop = () => {
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  return (
    (typeof window.orientation === "undefined" ||
      navigator.userAgent.indexOf("IEMobile") === -1) &&
    !isMobile
  );
};

export const fetcher = async function (url, init) {
  try {
    const resp = await fetch(url, init);
    return await resp.json();
  } catch (error) {
    console.log("fetch " + url + " had some error", error);
  }
};

export const formatUnitAmount = (amount, fixed = 3) => {
  const bigAmount = new BigNumber(amount);
  if (bigAmount.gte(1000000)) {
    return (
      bigAmount
        .div(1000000)
        .toFixed(fixed)
        .replace(/\.?0+$/, "") + "M"
    );
  } else if (bigAmount.gte(1000)) {
    return (
      bigAmount
        .div(1000)
        .toFixed(fixed)
        .replace(/\.?0+$/, "") + "K"
    );
  } else if (bigAmount.lt(0)) {
    return `-${formatUnitAmount(-1 * amount, fixed)}`;
  } else if (bigAmount.eq(0)) {
    return "0";
  } else return bigAmount.toFixed(fixed);
};

export const formatBalance3 = (balance = null, fixed = 5) => {
  if (!balance) return "0";
  if (isZero(balance)) return 0;

  BigNumber.config({ EXPONENTIAL_AT: 30 });
  const bigBalance = new BigNumber(balance);
  if (new BigNumber(10).pow(fixed - 1).lte(bigBalance)) {
    return bigBalance.toFixed(0, BigNumber.ROUND_DOWN);
  }
  return bigBalance
    .toPrecision(fixed, BigNumber.ROUND_DOWN)
    .replace(/\.?0+$/, "");
};

//deprecated. should replace with formatBalance3
export const getStayledNumber = (number, space = 9, flag = true) => {
  if (!number && flag) return "0";
  if (number < 0) return "";
  const strNumber = number.toString();
  if (parseFloat(strNumber) < 0.0000000001) return 0;
  if (strNumber.length < space) return strNumber;
  const indexDot = strNumber.indexOf(".");
  if (indexDot === -1) return strNumber;
  if (indexDot > space - 2) return strNumber.substring(0, indexDot);
  return strNumber
    .substring(0, indexDot)
    .concat(strNumber.substring(indexDot, space));
};

export const formatAddress = (address) => {
  return address
    ? address.substring(0, 6) +
        "..." +
        address.substring(address.length - 4, address.length)
    : "0x";
};

export function getLibrary(provider) {
  return provider;
}

export const getCurrentTimeStamp = () => Math.floor(Date.now() / 1000);

export const validateKeyPress = (e) => {
  var ev = e || window.event;
  var key = ev.keyCode || ev.which;
  key = String.fromCharCode(key);
  var regex = /[0-9\\.]/;
  if (!regex.test(key)) {
    ev.returnValue = false;
    if (ev.preventDefault) ev.preventDefault();
  }
};

export const toTwoDigitNumber = (num) => {
  let numStr = String(num)
  if (numStr.length >= 2) {
    return numStr
  } else return `0${numStr}`
}

export const handleSmallBalance = (balance, fixed, currencyStr="") => {
  let balanceFloat = parseFloat(balance)
  const smallAmount = Math.pow(10, -fixed)
  return balanceFloat < smallAmount ?
      `<${currencyStr}${smallAmount}` : `${currencyStr}${balanceFloat.toFixed(fixed)}`
}