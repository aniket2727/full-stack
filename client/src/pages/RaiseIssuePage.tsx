import React, { useState } from 'react';
import { Emailvalidate } from '../helper/FormValidations';
import { Phonenumbervalidate } from '../helper/FormValidations';

const RaiseIssuePage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedProblem, setSelectedProblem] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [error, setError] = useState("");
  const [detailederror, setDetailedError] = useState<{ email?: string; name?: string }>({});

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
    setError("");
  };

  const handleSubmitIssue = () => {
    let errors: { email?: string; name?: string } = {};

    // Validate name
    if (!name) errors.name = "Name is required.";

    // Validate email
    if (!email) errors.email = "Email is required.";
    else if (!Emailvalidate(email)) errors.email = "Invalid email format.";

    // Validate problem selection
    if (!selectedProblem) setError("Please select a problem type.");

    // Validate description
    if (!issueDescription) setError("Issue description is required.");

    const nameIsInvalid = Phonenumbervalidate(name);
    if (nameIsInvalid) errors.name = "Invalid name format.";

    setDetailedError(errors); // Update error state

    // If there are no errors, submit the form
    if (Object.keys(errors).length === 0) {
      console.log("Form submitted successfully");
      // You can proceed with your form submission logic here (e.g., sending data to the server)
    }
  };

  return (
    <div className="flex flex-col items-start p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Raise an Issue</h1>

      {/* Name Input */}
      <label className="mb-2 font-medium">Name:</label>
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Enter your name"
        className="mb-2 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {detailederror.name && <p className="text-red-500 mb-4">{detailederror.name}</p>}

      {/* Email Input */}
      <label className="mb-2 font-medium">Email:</label>
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Enter your email"
        className="mb-2 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {detailederror.email && <p className="text-red-500 mb-4">{detailederror.email}</p>}

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
      {error && selectedProblem === "" && <p className="text-red-500 mb-4">Please select a problem type.</p>}

      {/* Issue Description */}
      <label className="mb-2 font-medium">Describe the Issue:</label>
      <textarea
        value={issueDescription}
        onChange={handleDescriptionChange}
        placeholder="Describe your issue in detail..."
        className="w-full p-2 min-h-[150px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
        style={{ resize: "vertical" }}
      />
      {error && issueDescription === "" && (
        <p className="text-red-500 mt-1">Issue description is required.</p>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmitIssue}
        className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
      >
        Submit Issue
      </button>
    </div>
  );
};

export default RaiseIssuePage;
