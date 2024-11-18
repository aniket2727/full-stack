// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    email: '',
    token: '',
    id: '',
    userDetails: {}, // Additional field to store detailed user data
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.name = action.payload.userdata.name;
            state.email = action.payload.userdata.email;
            state.token = action.payload.token;
            state.id = action.payload.userId;
            state.userDetails = action.payload.userdata; // Store full user details
        },
        clearUser: (state) => {
            state.name = '';
            state.email = '';
            state.token = '';
            state.id = '';
            state.userDetails = {}; // Clear user details
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
