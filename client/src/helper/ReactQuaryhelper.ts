import { useMutation, useQueryClient } from 'react-query';

interface ApiResponse {
  // Define the structure of the API response
  data: any;
}

export const useProjectMutation = (apiCall: (data: any) => Promise<ApiResponse>) => {
  const queryClient = useQueryClient();

  return useMutation(apiCall, {
    onSuccess: () => {
      // Invalidate or refetch queries here if necessary
      queryClient.invalidateQueries('projects'); // Adjust query key as needed
    },
    onError: (error: any) => {
      // Handle error: log or show a message
      console.error('Error adding project details:', error);
      // Optionally, show a toast or other notification
    },
  });
};
