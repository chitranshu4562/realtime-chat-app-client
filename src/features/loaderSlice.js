import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    show: false
};

const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        display: (state) => {
            state.show = true;
        },
        hide: (state) => {
            state.show = false
        }
    }
});

export const { display, hide } = loaderSlice.actions;
export default loaderSlice.reducer;
