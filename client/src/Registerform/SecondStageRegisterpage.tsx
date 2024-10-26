import React from 'react';

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
  return (
    <div className="p-6 bg-white rounded-md shadow-lg max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Second Stage</h1>

      <div className="space-y-4">
        <input
          type="text"
          name="aadharCard"
          placeholder="Aadhar Card"
          value={formData.aadharCard}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="tel"
          name="mobile"
          placeholder="Mobile"
          value={formData.mobile}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => handleCounter(-1)}
          className="w-full bg-gray-500 text-white py-2 rounded-md mr-2 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Previous
        </button>

        <button
          onClick={() => handleCounter(1)}
          className="w-full bg-blue-500 text-white py-2 rounded-md ml-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SecondStageRegisterpage;
