import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use localStorage for persistence
import projectReducer from './reducers/projectReducer';
import issueReducer from './reducers/issueReducre'; // Corrected typo
import userReducer from './userSlice'; // Assuming this is a slice created with Redux Toolkit

// Persist config for redux-persist
const persistConfig = {
  key: 'root', // Key for the root of the state tree
  storage, // Use localStorage
};

// Combine reducers into a root reducer
const rootReducer = combineReducers({
  projects: projectReducer,
  issue: issueReducer,
  user: userReducer,
});

// Apply persistReducer to the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store with configureStore
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }), // Disable serializableCheck for redux-persist
});

// Infer RootState from the store
//export type RootState = ReturnType<typeof store.getState>; // Add this line to export RootState

export const persistor = persistStore(store);
export default store;
