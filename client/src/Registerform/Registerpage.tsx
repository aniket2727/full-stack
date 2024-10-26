import React, { useState } from 'react';
import FirstStageRegisterpage from './FirstStageRegisterpage';
import SecondStageRegisterpage from './SecondStageRegisterpage';
import ThirdStageRegisterpage from './ThirdStageRegisterpage';

const Registerpage = () => {
  const [counter, setCounter] = useState(0);

  // State to store all form data
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    aadharCard: '',
    mobile: '',
    age: '',
    address: '',
    blockNumber: '',
    village: '',
    gender: '',
    birthDate: ''
  });

  const handleCounterValue = (item: number) => {
    setCounter(prev => Math.max(0, Math.min(prev + item, 2)));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    // Here, you can send the formData to the server via an API call
  };

  return (
    <>
      <div className="flex justify-center space-x-4 mb-4 mt-10">
        {Array(3).fill(null).map((_, item) => (
          <button
            key={item}
            className={`px-4 py-2 text-white font-semibold rounded-lg ${item === counter ||item<=counter? 'bg-green-500' : 'bg-red-500'}`}
            onClick={() => setCounter(item)}
          >
            {item + 1}
          </button>
        ))}
      </div>
      <div className="p-4 border border-gray-300 rounded-md shadow-md">
        {counter === 0 && (
          <FirstStageRegisterpage formData={formData} handleInputChange={handleInputChange} handleCounter={handleCounterValue} />
        )}
        {counter === 1 && (
          <SecondStageRegisterpage formData={formData} handleInputChange={handleInputChange} handleCounter={handleCounterValue} />
        )}
        {counter === 2 && (
          <ThirdStageRegisterpage formData={formData} handleInputChange={handleInputChange} handleCounter={handleCounterValue} handleSubmit={handleSubmit} />
        )}
      </div>
    </>
  );
};

export default Registerpage;
