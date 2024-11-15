// src/hooks/useProjectDetails.js
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchIssue = async (page, limit) => {
    // Use dynamic page and limit values passed to the function
    const { data } = await axios.get(`http://localhost:9009/api/all_issue?page=${page}&limit=${limit}`);
    console.log(data.data)
    return data.data;
};

const useIssueDetails = (page = 1, limit = 10) => {
    return useQuery(['projects', page, limit], () => fetchIssue(page, limit), {
        keepPreviousData: true,
        staleTime: 30000, // Cache for 30 seconds
    });
};

export default useIssueDetails;
