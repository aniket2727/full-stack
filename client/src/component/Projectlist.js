/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../redux/action/projectAction';
import useProjectDetails from '../hooks/useGetProjectdeatils';

const ProjectList = () => {
    const [page, setPage] = useState(1);
    const limit = 3; // You can adjust this limit as required

    const dispatch = useDispatch();

    // React Query Hook (for cached data and pagination)
    const { data, isLoading, error } = useProjectDetails(page, limit);

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

    const handleNextPage = () => {
        setPage((prev) => prev + 1);
    };

    const handlePrevPage = () => {
        setPage((prev) => (prev > 1 ? prev - 1 : prev));
    };

    if (isLoading || loading) return <div className="text-center text-xl text-gray-500">Loading...</div>;
    if (error || reduxError) return <div className="text-center text-xl text-red-500">Error: {error || reduxError}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Project Details</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 cursor-pointer">
                {data?.map((project) => (
                    <div key={project._id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
                        <h3 className="text-xl font-semibold text-gray-800">Project Name : {project.projectname}</h3>
                        <p className="text-gray-600">Project manager name : {project.projectmanagername}</p>
                        <p className="text-gray-600">Area name : {project.areaname}</p>
                        <p className="text-gray-600">Project cost : {project.projectcost}</p>
                        <p className="text-gray-600">Project Type : {project.projecttype}</p>
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center mt-6">
                <button 
                    onClick={handlePrevPage} 
                    disabled={page === 1}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous
                </button>
                <button 
                    onClick={handleNextPage}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ProjectList;
