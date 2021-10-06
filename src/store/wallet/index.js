import { atom, selector } from 'recoil';

export const blockState = atom({
    key: 'blockState',
    default: null,
});
export const blockNumberState = selector({
    key: 'blockNumberState',
    get: ({ get }) => {
        const block = get(blockState);
        if (!block) return 0
        return block.number;
    },
});
