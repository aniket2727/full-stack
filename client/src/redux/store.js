import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import projectReducer from './reducers/projectReducer';

// Create the Redux store with middleware (thunk)
const store = createStore(projectReducer, applyMiddleware(thunk));

export default store;
