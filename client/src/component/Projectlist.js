/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../redux/action/projectAction';
import useProjectDetails from '../hooks/useGetProjectdeatils';

const ProjectList = () => {
    const [page, setPage] = useState(1);
    const limit = 3; // Number of projects per page

    const dispatch = useDispatch();

    // React Query Hook (for cached data and pagination)
    const { data, totalCount, isLoading, error } = useProjectDetails(page, limit);

    // Redux State for the projects
    const { projects, loading, error: reduxError } = useSelector((state) => state.projects);

    // Fetch data using Redux (if you want to store data in Redux as well)
    const fetchDataFromRedux = () => {
        dispatch(fetchProjects(page, limit));
    };

    // Trigger the Redux action on component mount and whenever page changes
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


    // Loading and Error States
    if (isLoading || loading) return <div className="text-center text-xl text-gray-500">Loading...</div>;
    if (error || reduxError) return <div className="text-center text-xl text-red-500">Error: {error || reduxError}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Project Details</h2>

            {/* Project Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 cursor-pointer">
                {data?.map((project) => (
                    <div
                        key={project._id}
                        className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
                    >
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">{project.projectname}</h3>
                        <div className="space-y-2">
                            <p className="text-gray-600 text-sm">Project Manager: <span className="font-semibold">{project.projectmanagername}</span></p>
                            <p className="text-gray-600 text-sm">Area Name: <span className="font-semibold">{project.areaname}</span></p>
                            <p className="text-gray-600 text-sm">Project Cost: <span className="font-semibold">{project.projectcost}</span></p>
                            <p className="text-gray-600 text-sm">Project Type: <span className="font-semibold">{project.projecttype}</span></p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
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

export default ProjectList;
