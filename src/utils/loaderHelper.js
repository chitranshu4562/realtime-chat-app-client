import {dispatch} from "../store.js";
import {display, hide} from "../features/loaderSlice.js";

export const displayLoader = () => {
    dispatch(display());
}

export const hideLoader = () => {
    dispatch(hide());
}
