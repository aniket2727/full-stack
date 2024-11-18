// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  token: '',
  id: '',
  userDetails: {}, // Additional field to store detailed user data
  isAuthenticated: false, // Field to track if user is authenticated
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Action to set user data on login
    setUser: (state, action) => {
      state.name = action.payload.userdata.name;
      state.email = action.payload.userdata.email;
      state.token = action.payload.token;
      state.id = action.payload.userId;
      state.userDetails = action.payload.userdata; // Store full user details
      state.isAuthenticated = true; // Mark the user as authenticated
    },
    
    // Action to clear user data on logout
    clearUser: (state) => {
      state.name = '';
      state.email = '';
      state.token = '';
      state.id = '';
      state.userDetails = {}; // Clear user details
      state.isAuthenticated = false; // Mark the user as not authenticated
    },

    // Optional: Action to update user details if needed
    updateUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

export const { setUser, clearUser, updateUserDetails } = userSlice.actions;

export default userSlice.reducer;
