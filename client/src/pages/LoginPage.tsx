import React, { ChangeEvent, useState, FormEvent } from 'react';
import BaseButton from '../component/button/BaseButton';
import LoginPageValidations from '../helper/Loginpageheleper/LoginPageValidations';


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
  

  // Handle input change
  const handleGetData = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // Prevent form reload
    const errorResponse = LoginPageValidations(loginDetails);
    setErrorState(errorResponse);

  };

  const handleRegister = () => {
    console.log("Register button clicked");
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
            Login
          </button>
        </form>

        <h1 className="text-center mt-6 text-green-700">Don't have an account?  please register and build profile</h1>

        {/* Register Button */}
        <div className="flex justify-center mt-4">
          <BaseButton
            text="register"
            onClick={handleRegister}
            color="blue"
            textColor="white"
            borderRadius="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
