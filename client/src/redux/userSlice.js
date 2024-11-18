// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    email: '',
    token: '',
    id: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.id = action.payload.id;
        },
        clearUser: (state) => {
            state.name = '';
            state.email = '';
            state.token = '';
            state.id = '';
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
