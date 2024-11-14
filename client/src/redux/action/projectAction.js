import axios from 'axios';

export const FETCH_PROJECTS_START = 'FETCH_PROJECTS_START';
export const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS';
export const FETCH_PROJECTS_FAILURE = 'FETCH_PROJECTS_FAILURE';

// Action to fetch projects
export const fetchProjects = (page, limit) => async (dispatch) => {
    try {
        dispatch({ type: FETCH_PROJECTS_START });
        const { data } = await axios.get(`http://localhost:9009/api/getprojectdetails?page=${page}&limit=${limit}`);
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
