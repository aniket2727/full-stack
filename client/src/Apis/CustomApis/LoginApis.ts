// src/hooks/useLogin.ts
import { useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice'; // Import Redux action

// Type for login details
type LoginDetails = {
  email: string;
  password: string;
};

// Type for the API response
type LoginResponse = {
  message: string;
  token: string;
  userId: string;
  userdata: {
    name: string;
    email: string;
    aadharCard?: string;
    address?: string;
    age?: number;
    gender?: string;
    mobile?: string;
    birthDate?: string;
    createdAt?: string;
    updatedAt?: string;
    // Add other fields as needed
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
  const dispatch = useDispatch(); // Redux dispatcher

  return useMutation<LoginResponse, AxiosError<ApiError>, LoginDetails>(loginApi, {
    onSuccess: (data) => {
      console.log('Login successful:', data);
      // Dispatch data to Redux store
      dispatch(setUser(data));
    },
    onError: (error) => {
      console.error('Login failed:', error.response?.data.message || error.message);
      // Handle the error (e.g., show a toast notification)
    },
  });
};

export default useLogin;
