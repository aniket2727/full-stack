// src/hooks/useAdminProjectDetails.ts
import { useMutation, useQueryClient } from 'react-query';
import { addNewProjectApi } from '../Apis/AdminAddNewProjectApi';

export const useAdminProjectDetails = () => {
  const queryClient = useQueryClient();

  return useMutation(addNewProjectApi, {
    onSuccess: () => {
      // Invalidate or refetch queries here if necessary
      queryClient.invalidateQueries('projects'); // Adjust query key as needed
    },
    onError: (error) => {
      // Log or handle error
      console.error('Error adding project details:', error);
    },
  });
};

export const setempty = (
  setProjectname: React.Dispatch<React.SetStateAction<string>>, 
  setProjectManager: React.Dispatch<React.SetStateAction<string>>, 
  setAreaName: React.Dispatch<React.SetStateAction<string>>, 
  setProjectType: React.Dispatch<React.SetStateAction<string>>, 
  setProjectCost: React.Dispatch<React.SetStateAction<string>>
) => {
  setAreaName('');
  setProjectManager('');
  setProjectCost('');
  setProjectType('');
  setProjectname('');
};
