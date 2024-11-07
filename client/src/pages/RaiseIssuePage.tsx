import React, { useState } from 'react';


const RaiseIssuePage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedProblem, setSelectedProblem] = useState("");
  const [issueDescription, setIssueDescription] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleProblemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProblem(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIssueDescription(e.target.value);
  };

  const  handleSubmitIssue=()=>{
    console.log("submitted")
  }

  return (
    <div className="flex flex-col items-start p-8 bg-gray-100 h-screen">
      <h1 className="text-2xl font-bold mb-6">Raise an Issue</h1>
      
      {/* Name Input */}
      <label className="mb-2 font-medium">Name:</label>
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Enter your name"
        className="mb-6 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Email Input */}
      <label className="mb-2 font-medium">Email:</label>
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Enter your email"
        className="mb-6 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Problem Selector */}
      <label className="mb-2 font-medium">Select Issue Type:</label>
      <select
        value={selectedProblem}
        onChange={handleProblemChange}
        className="mb-6 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>Select a problem type</option>
        <option value="water">Water Problem</option>
        <option value="violence">Violence</option>
        <option value="construction">Construction Problem</option>
        <option value="light">Light Problem</option>
        <option value="payment">Payment Issue</option>
        <option value="other">Other</option>
      </select>

      {/* Issue Description */}
      <label className="mb-2 font-medium">Describe the Issue:</label>
      <textarea
        value={issueDescription}
        onChange={handleDescriptionChange}
        placeholder="Describe your issue in detail..."
        className="w-full p-2 h-32 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Submit Button */}
      <button  onClick={()=>handleSubmitIssue()} className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none">
        Submit Issue
      </button>
    </div>
  );
};

export default RaiseIssuePage;
