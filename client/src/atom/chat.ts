import { atom } from "recoil";

export const chatAtom = atom({
    key: 'chatAtom',
    default: {
        show: false
    }
});