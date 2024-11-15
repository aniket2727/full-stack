/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIssue } from '../redux/action/IssueAction';
import useIssueDetails from '../hooks/useGetIssuedetails';
import LoaderComponent from './LoaderComponent';

const IssueListComponent = () => {
    const [page, setPage] = useState(1);
    const limit = 10;

    const dispatch = useDispatch();

    // React Query Hook for fetching data
    const { data, isLoading, isError } = useIssueDetails(page, limit);

    // Redux State
    const { issue, loading, error } = useSelector((state) => state.issue);

    // Fetch data with Redux action
    const fetchDataFromRedux = () => {
        dispatch(fetchIssue(page, limit));
    };

    // Trigger Redux action on mount or page change
    useEffect(() => {
        fetchDataFromRedux();
    }, [dispatch, page, limit]);

    // Disable "Next" button if no more data is available
    const isNextDisabled = data?.length < limit;

    const handleNextPage = () => {
        if (!isNextDisabled) {
            setPage((prev) => prev + 1);
        }
    };

    const handlePrevPage = () => {
        setPage((prev) => (prev > 1 ? prev - 1 : prev));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Issue List</h2>

            {loading || isLoading ? (
                <LoaderComponent />
            ) : isError || error ? (
                <div className="text-center text-xl text-red-500">Error: {error || 'Failed to fetch issue details'}</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data?.map((issue) => (
                        <div
                            key={issue.id}
                            className="bg-white border-l-4 border-blue-400 shadow-md rounded-lg p-6 hover:bg-blue-50 hover:border-blue-500 transition-all duration-300 ease-in-out"
                        >
                            <h3 className="text-xl font-semibold text-blue-700 mb-1">{issue.email}</h3>
                            <p className="text-lg text-gray-800 font-medium">
                                <span className="text-blue-500 font-semibold">Name:</span> {issue.name}
                            </p>
                            <p className="text-sm text-gray-700 mt-3">
                                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                                    Problem: {issue.selectedProblem}
                                </span>
                            </p>
                        </div>
                    ))}
                </div>

            )}

            <div className="flex justify-between items-center mt-6">
                <button
                    onClick={handlePrevPage}
                    disabled={page === 1}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous
                </button>
                <span className="text-gray-700">Page {page}</span>
                <button
                    onClick={handleNextPage}
                    disabled={isNextDisabled}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default IssueListComponent;
