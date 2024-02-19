import { atom } from "recoil";

const isEnteredAtom = atom({
    key:"isEnteredAtom",
    default:false
});

export {isEnteredAtom};