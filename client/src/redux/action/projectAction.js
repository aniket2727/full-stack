// src/actions/projectActions.js
import axios from 'axios';

export const FETCH_PROJECTS_REQUEST = 'FETCH_PROJECTS_REQUEST';
export const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS';
export const FETCH_PROJECTS_FAILURE = 'FETCH_PROJECTS_FAILURE';

export const fetchProjects = (page, limit) => async (dispatch) => {
    dispatch({ type: FETCH_PROJECTS_REQUEST });
    try {
        const { data } = await axios.get(`/api/getprojectdetails?page=${page}&limit=${limit}`);
        dispatch({
            type: FETCH_PROJECTS_SUCCESS,
            payload: data.data,
        });
    } catch (error) {
        dispatch({
            type: FETCH_PROJECTS_FAILURE,
            payload: error.message,
        });
    }
};
