import React from 'react';

type PropsData = {
  formData: {
    address: string;
    blockNumber: string;
    village: string;
    gender: string;
    birthDate: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCounter: (item: number) => void;
  handleSubmit: () => void;
};

const ThirdStageRegisterpage: React.FC<PropsData> = ({ formData, handleInputChange, handleCounter, handleSubmit }) => {
  return (
    <div className="p-6 bg-white rounded-md shadow-lg max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Third Stage</h1>

      <div className="space-y-4">
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <input
          type="text"
          name="blockNumber"
          placeholder="Block Number"
          value={formData.blockNumber}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="village"
          placeholder="Village"
          value={formData.village}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="gender"
          placeholder="Gender"
          value={formData.gender}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="date"
          name="birthDate"
          placeholder="Birth Date"
          value={formData.birthDate}
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
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded-md ml-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ThirdStageRegisterpage;
