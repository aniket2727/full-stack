import { useMutation, useQueryClient } from 'react-query';

interface ApiResponse {
  data: any;
}

export const useProjectMutation = (apiCall: (data: any) => Promise<ApiResponse>) => {
  const queryClient = useQueryClient();

  return useMutation(apiCall, {
    onSuccess: () => {
      // Refetch or invalidate any queries related to projects after a successful mutation
      queryClient.invalidateQueries('projects'); // Adjust this query key as necessary
    },
    onError: (error: any) => {
      // Handle errors here
      console.error('Error adding project details:', error);
      // Optionally, display a toast or notification
    },
  });
};
