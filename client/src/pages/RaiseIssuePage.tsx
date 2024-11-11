/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect } from 'react';
import { Emailvalidate, Phonenumbervalidate } from '../helper/FormValidations';
import { useProjectMutation } from '../helper/ReactQuaryhelper';
import { useQueryClient } from 'react-query';
import axios, { AxiosError } from 'axios';
import { debounce } from '../utils/debounc';
import { AddnewIssueApi } from '../Apis/RaiseIssueApi';
import LoaderComponent from '../component/LoaderComponent';
import { setEmpty } from '../helper/clearState';


interface ApiResponse {
  message?: string; // Marked as optional to handle cases where 'message' may be missing
}

const RaiseIssuePage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedProblem, setSelectedProblem] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [loaderflag, setLoaderflag] = useState<boolean>(false);
  const [resultofapis, setResultofapis] = useState<string | null>(null); // Updated to allow null
  const [detailederror, setDetailedError] = useState<{ api?: string; email?: string; name?: string; problem?: string; description?: string }>({});
  const [showApiError, setShowApiError] = useState(false);

  // UseEffect to hide API error message after successful submission
  useEffect(() => {
    if (detailederror.api) {
      setShowApiError(true); // Show the error message
      const timer = setTimeout(() => setShowApiError(false), 3000); // Hide after 3 seconds
      return () => clearTimeout(timer); // Clear timeout on component unmount
    }
  }, [detailederror.api, resultofapis]);

  const queryClient = useQueryClient();
  const { mutate: RaiseIssueMutate, isLoading, isError, error: mutationError, isSuccess } = useProjectMutation(AddnewIssueApi);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handleProblemChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedProblem(e.target.value);
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setIssueDescription(e.target.value);

  const validateForm = () => {
    let errors: { email?: string; name?: string; problem?: string; description?: string } = {};

    if (!name) errors.name = "Name is required.";
    else if (Phonenumbervalidate(name)) errors.name = "Invalid name format.";

    if (!email) errors.email = "Email is required.";
    else if (!Emailvalidate(email)) errors.email = "Invalid email format.";

    if (!selectedProblem) errors.problem = "Please select a problem type.";
    if (!issueDescription) errors.description = "Issue description is required.";

    setDetailedError(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    // Clear errors when typing in any input field
    if (!loaderflag) {
      setDetailedError({});
      setResultofapis('');
    }
  }, [name, email, issueDescription]);

  const handleSubmitIssue = useCallback(() => {
    if (validateForm()) {
      setLoaderflag(true);
      RaiseIssueMutate(
        { name, email, selectedProblem, issueDescription },
        {
          onSuccess: (data: unknown) => {
            const response = data as ApiResponse;
            console.log(response);

            setEmpty(setName,setEmail,setIssueDescription);
  
            // Only set the message from the response, not the entire object
            if (response.message) {
              console.log('Issue successfully raised:', response.message);
              setResultofapis('Issue is raised sucessfully'); // Set only the message, not the entire object
            } else {
              console.warn('Unexpected response format:', data);
              setResultofapis("Issue raised successfully, but no message returned.");
            }
  
            queryClient.invalidateQueries(['projects']);
            setTimeout(() => {
              setLoaderflag(false);
            }, 1000);
          },
          onError: (err: AxiosError | unknown) => {
            setLoaderflag(false);
            if (axios.isAxiosError(err)) {
              setDetailedError((prev) => ({ ...prev, api: err.response?.data || "Error occurred" }));
              console.error('Error:', err.response?.data || err.message);
            } else {
              console.error('An unexpected error occurred:', err);
            }
          },
        }
      );
    } else {
      setLoaderflag(false);
    }
  }, [name, email, selectedProblem, issueDescription]);

  const debouncedSubmit = useCallback(debounce(handleSubmitIssue, 500), [handleSubmitIssue]);

  if (loaderflag) {
    return <LoaderComponent />;
  }

  return (
    <div className="flex flex-col items-start p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Raise an Issue</h1>

      {/* API Error Message */}
      {showApiError && (
        <span
          style={{
            // color: "red",
            // opacity: showApiError ? 1 : 0,
            transition: "opacity 1s ease-in-out", // Smooth fade-out effect
          }}
        >
          {detailederror.api}
        </span>
      )}

      {/* Success Message */}
      {resultofapis && (
        <span
          style={{
           color: "green",
            //opacity: showApiError ? 1 : 0,
            transition: "opacity 1s ease-in-out", // Smooth fade-out effect
          }}
        >
          {resultofapis}
        </span>
      )}

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
      {detailederror.problem && <p className="text-red-500 mb-4">{detailederror.problem}</p>}

      {/* Issue Description */}
      <label className="mb-2 font-medium">Describe the Issue:</label>
      <textarea
        value={issueDescription}
        onChange={handleDescriptionChange}
        placeholder="Describe your issue in detail..."
        className="w-full p-2 min-h-[150px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
        style={{ resize: "vertical" }}
      />
      {detailederror.description && <p className="text-red-500 mt-1">{detailederror.description}</p>}

      {/* Submit Button */}
      <button
        onClick={debouncedSubmit}
        className={`mt-6 px-6 py-2 ${isLoading ? 'bg-gray-500' : 'bg-blue-500'} text-white rounded-md`}
        disabled={isLoading}
      >
        {isLoading ? 'Submitting...' : 'Submit Issue'}
      </button>
    </div>
  );
};

export default RaiseIssuePage;
