import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: null,
    authToken: null
};

const authDataSlice = createSlice({
    name: 'authData',
    initialState,
    reducers: {
        storeAuthData: (state, action) => {
            state.user = action.payload.user;
            state.authToken = action.payload.authToken;
        },
        removeAuthData: (state) => {
            state.user = null;
            state.authToken = null;
        }
    }
});

export const { storeAuthData, removeAuthData } = authDataSlice.actions;
export default authDataSlice.reducer;
