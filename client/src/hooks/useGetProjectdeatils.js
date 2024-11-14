// src/hooks/useProjectDetails.js
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchProjects = async (page, limit) => {
    // Use dynamic page and limit values passed to the function
    const { data } = await axios.get(`http://localhost:9009/api/getprojectdetails?page=${page}&limit=${limit}`);
  //  console.log(data.data)
    return data.data;
};

const useProjectDetails = (page = 1, limit = 10) => {
    return useQuery(['projects', page, limit], () => fetchProjects(page, limit), {
        keepPreviousData: true,
        staleTime: 30000, // Cache for 30 seconds
    });
};

export default useProjectDetails;
