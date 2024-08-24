import {configureStore} from "@reduxjs/toolkit";
import loaderReducer from "./features/loaderSlice.js";
import authDataReducer from "./features/authDataSlice.js";

const store = configureStore({
    reducer: {
        loader: loaderReducer,
        authData: authDataReducer
    }
});

export const dispatch = store.dispatch;
export default store;
