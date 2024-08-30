import {configureStore} from "@reduxjs/toolkit";
import loaderReducer from "./features/loaderSlice.js";
import authDataReducer from "./features/authDataSlice.js";
import socketReducer from "./features/socketSlice.js";

const store = configureStore({
    reducer: {
        loader: loaderReducer,
        authData: authDataReducer,
        socket: socketReducer
    }
});

export const dispatch = store.dispatch;
export default store;
