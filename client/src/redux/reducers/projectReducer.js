// src/reducers/projectReducer.js
import {
    FETCH_PROJECTS_REQUEST,
    FETCH_PROJECTS_SUCCESS,
    FETCH_PROJECTS_FAILURE,
} from '../action/projectAction';

const initialState = {
    loading: false,
    projects: [],
    error: '',
};

const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PROJECTS_REQUEST:
            return { ...state, loading: true };
        case FETCH_PROJECTS_SUCCESS:
            return { ...state, loading: false, projects: action.payload };
        case FETCH_PROJECTS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default projectReducer;
