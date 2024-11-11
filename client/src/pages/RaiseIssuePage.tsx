/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useCallback } from 'react';
import { Emailvalidate, Phonenumbervalidate } from '../helper/FormValidations';
import { useProjectMutation } from '../helper/ReactQuaryhelper';
import { useQueryClient } from 'react-query';
import axios, { AxiosError } from 'axios';
import { debounce } from '../utils/debounc';
import { AddnewIssueApi } from '../Apis/RaiseIssueApi';

const RaiseIssuePage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedProblem, setSelectedProblem] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoaderFlag] = useState(false);
  const [detailederror, setDetailedError] = useState<{ email?: string; name?: string }>({});

  const queryClient = useQueryClient();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { mutate: RaiseIssueMutate, isLoading, isError, error: mutationError, isSuccess } = useProjectMutation(AddnewIssueApi);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handleProblemChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedProblem(e.target.value);
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIssueDescription(e.target.value);
    setError("");
  };

  const validateForm = () => {
    let errors: { email?: string; name?: string } = {};

    if (!name) errors.name = "Name is required.";
    if (!email) errors.email = "Email is required.";
    else if (!Emailvalidate(email)) errors.email = "Invalid email format.";

    if (!selectedProblem) setError("Please select a problem type.");
    if (!issueDescription) setError("Issue description is required.");

    const nameIsInvalid = Phonenumbervalidate(name);
    if (nameIsInvalid) errors.name = "Invalid name format.";

    setDetailedError(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmitIssue = useCallback(() => {
    if (validateForm()) {
      console.log("Form submitted successfully");

      if (!Object.keys(error).length) {
        setLoaderFlag(true);

        RaiseIssueMutate({ name, email, selectedProblem, issueDescription }, {
          onSuccess: (data) => {
            console.log('Issue successfully raised:', data);
            queryClient.invalidateQueries(['projects']);
            setTimeout(() => {
              setLoaderFlag(false);
            }, 1000);
          },
          onError: (err: AxiosError | unknown) => {
            setLoaderFlag(false);
            if (axios.isAxiosError(err)) {
              console.error('Error:', err.response?.data || err.message);
            } else {
              console.error('An unexpected error occurred:', err);
            }
          },
        });
      }
    }
  }, [name, email, selectedProblem, issueDescription]);

  const debouncedSubmit = useCallback(() => {
    const handler = setTimeout(() => {
      handleSubmitIssue();
    }, 500);

    return () => clearTimeout(handler);
  }, [handleSubmitIssue]);

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
      {error && issueDescription === "" && <p className="text-red-500 mt-1">Issue description is required.</p>}

      {/* Submit Button */}
      <button
        onClick={debouncedSubmit}
        className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
      >
        Submit Issue
      </button>
    </div>
  );
};

export default RaiseIssuePage;
