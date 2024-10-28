// src/hooks/useLogin.ts
import { useMutation } from 'react-query';
import axios from 'axios';

// Type for login details
type LoginDetails = {
  email: string;
  password: string;
};

// API call for login
const loginApi = async (loginDetails: LoginDetails) => {
  const response = await axios.post('http://localhost:9009/api/login', loginDetails); // Replace with your API endpoint
  return response.data;
};

// Custom hook
const useLogin = () => {
  return useMutation(loginApi);
};

export default useLogin;
