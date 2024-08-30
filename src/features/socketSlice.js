import {createSlice} from "@reduxjs/toolkit";

const socketSlice = createSlice({
    name: 'socket',
    initialState: {
        socketInstance: null
    },
    reducers: {
        setSocketInstance: (state, action) => {
            state.socketInstance = action.payload;
        }
    }
});

export const {setSocketInstance} = socketSlice.actions;
export default socketSlice.reducer;
