import React, { useState } from 'react';
import { Phonenumbervalidate } from '../helper/FormValidations';

type PropsData = {
  formData: {
    aadharCard: string;
    mobile: string;
    age: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCounter: (item: number) => void;
};

const SecondStageRegisterpage: React.FC<PropsData> = ({ formData, handleInputChange, handleCounter }) => {
  const [errors, setErrors] = useState({
    aadharCard: '',
    mobile: '',
    age: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { aadharCard: '', mobile: '', age: '' };

    // Aadhar Card validation (should be 12 digits)
    if (!/^\d{12}$/.test(formData.aadharCard)) {
      newErrors.aadharCard = 'Aadhar card must be a 12-digit number';
      isValid = false;
    }

    // Phone number validation using existing function
    const mobileResult = Phonenumbervalidate(formData.mobile);
    if (!mobileResult) {
      newErrors.mobile = 'Phone number is not valid';
      isValid = false;
    }

    // Age validation (must be a number between 18 and 100)
    const age = Number(formData.age);
    if (!age || age < 18 || age > 100) {
      newErrors.age = 'Age must be a valid number between 18 and 100';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateForm()) {
      handleCounter(1);
    }
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-lg max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Second Stage</h1>

      <div className="space-y-4">
        <div>
          <input
            type="text"
            name="aadharCard"
            placeholder="Aadhar Card"
            value={formData.aadharCard}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.aadharCard && <span className="text-red-500 text-sm">{errors.aadharCard}</span>}
        </div>

        <div>
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.mobile && <span className="text-red-500 text-sm">{errors.mobile}</span>}
        </div>

        <div>
          <input
            type="text"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.age && <span className="text-red-500 text-sm">{errors.age}</span>}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => handleCounter(-1)}
          className="w-full bg-gray-500 text-white py-2 rounded-md mr-2 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Previous
        </button>

        <button
          onClick={handleNext}
          className="w-full bg-blue-500 text-white py-2 rounded-md ml-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SecondStageRegisterpage;
