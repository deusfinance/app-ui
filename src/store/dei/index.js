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
    default: {},
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

export const buyBackFeeState = atom({
    key: 'buyBackFee',
    default: null,
});

export const recollatFeeState = atom({
    key: 'recollatFee',
    default: null,
});

export const husdPoolDataState = atom({
    key: 'husdPoolData',
    default: {},
});

export const redeemBalances = atom({
    key: 'redeemBalances',
    default: null,
});
