import { useMutation } from 'react-query';
import axios from 'axios';

interface RegisterFormData {
  email: string;
  name: string;
  password: string;
  aadharCard: string;
  mobile: string;
  age: string;
  address?: string;
  blockNumber?: string;
  gender?: string;
  birthDate?: string;
}

const useRegister = () => {
  return useMutation((formData: RegisterFormData) => {
    return axios.post('http://localhost:9009/api/register', formData); // Adjust the URL according to your backend
  });
};



export default useRegister;
