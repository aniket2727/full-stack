import React, { useState } from 'react';

type PropsData = {
  formData: {
    address: string;
    blockNumber: string;
    gender: string;
    birthDate: string;
   
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleCounter: (item: number) => void;
  handleSubmit: () => void;
  errorMessage :string
};

const ThirdStageRegisterpage: React.FC<PropsData> = ({ formData, handleInputChange, handleCounter, handleSubmit,errorMessage }) => {
  const [errors, setErrors] = useState({
    address: '',
    blockNumber: '',
    gender: '',
    birthDate: '',
  });

  const validate = () => {
    const newErrors = { address: '', blockNumber: '', gender: '', birthDate: '' };

    // Validate Address
    const addressRegex = /^[A-Za-z0-9\s]*$/; // Allow only letters, numbers, and spaces
    if (!formData.address) {
      newErrors.address = 'Address is required';
    } else if (!addressRegex.test(formData.address)) {
      newErrors.address = 'Address cannot contain special characters';
    }

    // Validate Block Number
    const blockNumberRegex = /^[0-9]*$/; // Only allow numeric values
    if (!formData.blockNumber) {
      newErrors.blockNumber = 'Block Number is required';
    } else if (!blockNumberRegex.test(formData.blockNumber)) {
      newErrors.blockNumber = 'Block Number must be a number';
    }

    // Validate Gender
    if (!formData.gender) newErrors.gender = 'Gender is required';

    // Validate Birth Date
    if (!formData.birthDate) newErrors.birthDate = 'Birth Date is required';

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleFormSubmit = () => {
    if (validate()) {
      handleSubmit();
    }
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-lg max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Third Stage</h1>
      {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}

      <div className="space-y-4">
        <div>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
        </div>

        <div>
          <input
            type="text"
            name="blockNumber"
            placeholder="Block Number"
            value={formData.blockNumber}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.blockNumber && <p className="text-red-500 text-sm">{errors.blockNumber}</p>}
        </div>

        <div>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
        </div>

        <div>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.birthDate && <p className="text-red-500 text-sm">{errors.birthDate}</p>}
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
          onClick={handleFormSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded-md ml-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ThirdStageRegisterpage;
