
import axios from 'axios';

export const FETCH_ISSUE_START = 'FETCH_ISSUE_START';
export const FETCH_ISSUE_SUCCESS = 'FETCH_ISSUE_SUCCESS';
export const FETCH_ISSUE_FAILURE = 'FETCH_ISSUE_FAILURE';

// Action to fetch ISSUE
export const fetchIssue = (page, limit) => async (dispatch) => {
    try {
        dispatch({ type: FETCH_ISSUE_START});
        const { data } = await axios.get(`http://localhost:9009/api/all_issue?page=${page}&limit=${limit}`);
        dispatch({
            type: FETCH_ISSUE_SUCCESS ,
            payload: data.data,
        });
    } catch (error) {
        dispatch({
            type: FETCH_ISSUE_FAILURE ,
            payload: error.message,
        });
    }
};