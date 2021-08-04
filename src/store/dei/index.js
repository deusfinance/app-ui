import { atom, selector } from 'recoil';


export const collatRatioState = atom({
    key: 'collatRatio',
    default: null,
});

export const collatRatioPercent = selector({
    key: 'collatRatioPercent',
    default: null,
});