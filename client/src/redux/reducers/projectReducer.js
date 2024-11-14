import {
    FETCH_PROJECTS_START,
    FETCH_PROJECTS_SUCCESS,
    FETCH_PROJECTS_FAILURE,
} from '../action/projectAction';

const initialState = {
    projects: [],
    loading: false,
    error: null,
};

const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PROJECTS_START:
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
