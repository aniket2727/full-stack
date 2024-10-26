import React, { useState } from 'react';
import { Emailvalidate, Namevalidate, Passwordvalidate } from '../helper/FormValidations';

type PropsData = {
  formData: {
    email: string;
    name: string;
    password: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCounter: (item: number) => void;
};

const FirstStageRegisterpage: React.FC<PropsData> = ({ formData, handleInputChange, handleCounter }) => {
  const [errors, setErrors] = useState({
    email: '',
    name: '',
    password: '',
  });

  const handleValidationsForFirstForm = () => {
    let isValid = true;
    const newErrors = { email: '', name: '', password: '' };

    // Validate name
    const nameResult = Namevalidate(formData.name);
    if (!nameResult) {
      newErrors.name = 'Name is not valid';
      isValid = false;
    }

    // Validate email
    const emailResult = Emailvalidate(formData.email);
    if (!emailResult) {
      newErrors.email = 'Email is not valid';
      isValid = false;
    }

    // Validate password
    const passwordResult = Passwordvalidate(formData.password);
    if (!passwordResult) {
      newErrors.password = 'Password is not valid';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (handleValidationsForFirstForm()) {
      handleCounter(1);
    }
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-lg max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">First Stage</h1>

      <div className="space-y-4">
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
        </div>

        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
        </div>
      </div>

      <button
        onClick={handleNext}
        className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Next
      </button>
    </div>
  );
};

export default FirstStageRegisterpage;
