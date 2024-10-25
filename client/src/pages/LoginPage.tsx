import React, { ChangeEvent, useState, FormEvent } from 'react';
import BaseButton from '../component/button/BaseButton';
import { debounce } from '../utils/debounc';

// Type for login details
type LoginDetails = {
    email: string;
    password: string;
};

const LoginPage: React.FC = () => {
    const [loginDetails, setLoginDetails] = useState<LoginDetails>({ email: '', password: '' });

    // Handle input change
    const handleGetData = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginDetails((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('The login data is:', loginDetails);
    };

    // Debounced version of handleSubmit (300ms delay)
    const debouncedHandleSubmit = debounce(handleSubmit, 300);

    const handleRegister = () => {
        console.log("Register button clicked");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-semibold mb-6 text-center">Welcome Back</h1>
                <h2 className="text-lg text-gray-600 mb-6 text-center">Please login with your credentials</h2>

                {/* Login Form */}
                <form onSubmit={debouncedHandleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Enter Email</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="email"
                            type="email"
                            value={loginDetails.email}
                            onChange={handleGetData}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Enter Password</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="password"
                            type="password"
                            value={loginDetails.password}
                            onChange={handleGetData}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Login
                    </button>
                </form>

                <h1 className="text-center mt-6 text-gray-700">Don't have an account?</h1>

                {/* Register Button */}
                <div className="flex justify-center mt-4">
                    <BaseButton
                        text="Register"
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
