import { atom } from "recoil";

export const popupAtom = atom({
    key: 'popupAtom',
    default: {
        show: false
    }
});