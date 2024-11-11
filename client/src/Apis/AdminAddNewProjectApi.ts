

// src/Apis/AdminAddNewProjectApi.ts
import axios from 'axios';

type AdminNewProjectDetails = {
  projectname: string;
  projectmanager: string;
  areaname: string;
  projecttype: string;
  projectcost: string;
};

// API call function
export const addNewProjectApi = async (projectDetails: AdminNewProjectDetails) => {
  const response = await axios.post('http://localhost:9009/api/projectdetails', projectDetails);
  return response.data;
};
