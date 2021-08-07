import { atom, selector } from 'recoil';


export const collatRatioState = atom({
    key: 'collatRatio',
    default: null,
});

export const collatRatioPercent = selector({
    key: 'collatRatioPercent',
    default: null,
});


export const deiPricesState = atom({
    key: 'deiPrices',
    default: null,
});

export const availableRecollatState = atom({
    key: 'availableRecollat',
    default: null,
});

export const availableBuybackState = atom({
    key: 'availableBuyback',
    default: null,
});

export const mintingFeeState = atom({
    key: 'mintingFee',
    default: null,
});

export const redemptionFeeState = atom({
    key: 'redemptionFee',
    default: null,
});

export const husdPoolDataState = atom({
    key: 'husdPoolData',
    default: null,
});

export const redeemDEUSBalancesState = atom({
    key: 'redeemDEUSBalances',
    default: null,
});

export const redeemCollateralBalancesState = atom({
    key: 'redeemCollateralBalances',
    default: null,
});
