// src/hooks/useLogin.ts
import { useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';

// Type for login details
type LoginDetails = {
  email: string;
  password: string;
};

// Type for the API response
type LoginResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

// Error type for API responses
type ApiError = {
  message: string;
};

axios.defaults.withCredentials = true; // Include cookies with requests

// API call for login
const loginApi = async (loginDetails: LoginDetails): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>('http://localhost:9009/api/login', loginDetails);
  return response.data;
};

// Custom hook
const useLogin = () => {
  return useMutation<LoginResponse, AxiosError<ApiError>, LoginDetails>(loginApi, {
    onSuccess: (data) => {
      console.log('Login successful:', data);
      // Perform additional actions after a successful login
    },
    onError: (error) => {
      console.error('Login failed:', error.response?.data.message || error.message);
      // Handle the error (e.g., show a toast notification)
    },
  });
};

export default useLogin;
