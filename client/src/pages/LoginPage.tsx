import React, { ChangeEvent, useState, FormEvent } from 'react';
import { useQueryClient } from 'react-query';
import axios from 'axios'; // Import AxiosError
import useLogin from '../Apis/CustomApis/LoginApis';
import LoginPageValidations from '../helper/Loginpageheleper/LoginPageValidations'; // Your validation helper
import { useNavigate } from 'react-router-dom';
// Type for login details
type LoginDetails = {
  email: string;
  password: string;
};

// Type for error messages
type ErrorMessages = {
  email?: string;
  password?: string;
};



const LoginPage: React.FC = () => {
  const [loginDetails, setLoginDetails] = useState<LoginDetails>({ email: '', password: '' });
  const [errorState, setErrorState] = useState<ErrorMessages>({});
  const queryClient = useQueryClient();
  
  //navigtion
  const navigate=useNavigate()

  // Using the custom useLogin hook
  const { mutate: loginMutate, isLoading, isError, error, isSuccess } = useLogin();

  // Handle input change
  const handleGetData = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // Prevent form reload

    // Validate login details
    const errorResponse = LoginPageValidations(loginDetails);
    setErrorState(errorResponse);

    // If there are no validation errors, proceed with the login API call
    if (Object.keys(errorResponse).length === 0) {
      loginMutate(loginDetails, {
        onSuccess: (data) => {
          // Handle successful login
          console.log('Login successful', data);
          navigate('/')
          queryClient.invalidateQueries(['user']); // Optionally refresh user-related queries
        },
        onError: (err: unknown) => {
          // Safely cast error to AxiosError
          if (axios.isAxiosError(err)) {
            // Log the specific Axios error message
            console.error('Login failed:', err.response?.data || err.message);
          } else {
            // Handle unexpected errors
            console.error('An unexpected error occurred:', err);
          }
        },
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Welcome Back</h1>
        <h2 className="text-lg text-gray-600 mb-6 text-center">Please login with your credentials</h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Enter Email</label>
            <input
              className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${
                errorState.email ? 'border-red-500' : 'focus:ring-blue-500'
              }`}
              name="email"
              type="email"
              value={loginDetails.email}
              onChange={handleGetData}
              placeholder="Enter your email"
            />
            {/* Show email error */}
            {errorState.email && <p className="text-red-500 text-sm">{errorState.email}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Enter Password</label>
            <input
              className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${
                errorState.password ? 'border-red-500' : 'focus:ring-blue-500'
              }`}
              name="password"
              type="password"
              value={loginDetails.password}
              onChange={handleGetData}
              placeholder="Enter your password"
            />
            {/* Show password error */}
            {errorState.password && <p className="text-red-500 text-sm">{errorState.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          {/* Display error message */}
          {isError && (
            <p className="text-red-500 mt-2">
              {axios.isAxiosError(error)
                ? error.response?.data?.message || error.message
                : 'An unexpected error occurred'}
            </p>
          )}

          {isSuccess && <p className="text-green-500 mt-2">Login successful!</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
