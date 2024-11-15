import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import projectReducer from './reducers/projectReducer';
import issueReducer from './reducers/issueReducre'; // Corrected typo here

// Combine reducers into a root reducer
const rootReducer = combineReducers({
    projects: projectReducer,
    issue: issueReducer,
});

// Create the Redux store with middleware (thunk)
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
