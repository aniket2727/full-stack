import {FETCH_ISSUE_START,FETCH_ISSUE_SUCCESS,FETCH_ISSUE_FAILURE} from '../action/IssueAction'
const initialState = {
    issue: [],  // This is the slice you're selecting
    loading: false,
    error: null,
};

const issueReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ISSUE_START:
            return { ...state, loading: true };
        case FETCH_ISSUE_SUCCESS:
            return { ...state, loading: false, issue: action.payload };
        case FETCH_ISSUE_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default issueReducer;
