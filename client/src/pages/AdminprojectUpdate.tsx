/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, FormEvent, useCallback } from 'react';
import { AdminprojectUpdateValidations } from '../helper/AdminProjectUpdateHelper/Validations';
import { StringtoNumber } from '../helper/AdminProjectUpdateHelper/Validations';
import { debounce } from '../utils/debounc';
import LoaderComponent from '../component/LoaderComponent';

interface ErrorState {
    projectnameandmanager?: string;
    projectcost?: string;
}

const AdminProjectTractAddProjectDetails: React.FC = () => {
    const [projectname, setProjectname] = useState<string>('');
    const [projectmanager, setProjectManager] = useState<string>('');
    const [areaname, setAreaName] = useState<string>('');
    const [projecttype, setProjectType] = useState<string>('');
    const [projectcost, setProjectCost] = useState<string>('');
    const [error, setError] = useState<ErrorState>({});
    const [loaderflag, setLoaderFlag] = useState<boolean>(false);

    const validateAndSubmit = () => {
        const newErrors: ErrorState = {};

        const projectnameAndManagerValidations = AdminprojectUpdateValidations({ projectname, projectmanager });
        const projectCostNumber = StringtoNumber({ projectcost });

        if (!projectnameAndManagerValidations) {
            newErrors.projectnameandmanager = 'Enter correct project name and project manager name';
        }

        if (isNaN(projectCostNumber)) {
            newErrors.projectcost = 'Enter a valid numeric cost';
        }

        setError(newErrors);
    };

    const debouncedSubmit = useCallback(debounce(validateAndSubmit, 500), [projectname, projectmanager, projectcost]);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        debouncedSubmit(); // Call the debounced function

        // Check if there are no errors
        if (Object.keys(error).length === 0) {
            console.log("Successfully submitted");
            setLoaderFlag(true);
            setTimeout(() => {
                setLoaderFlag(false);
            }, 1000);
        }
    };

    if (loaderflag) {
        return <LoaderComponent />;
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="w-full max-w-md mt-10 bg-white shadow-md rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Project Details</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Project Name</label>
                    <input
                        placeholder="Enter project name"
                        value={projectname}
                        onChange={(e) => setProjectname(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                    />
                    {error.projectnameandmanager && <span className="text-red-500 text-sm">{error.projectnameandmanager}</span>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Project Manager Name</label>
                    <input
                        placeholder="Enter project manager name"
                        value={projectmanager}
                        onChange={(e) => setProjectManager(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Area Name</label>
                    <input
                        placeholder="Enter area name"
                        value={areaname}
                        onChange={(e) => setAreaName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Project Type</label>
                    <select
                        value={projecttype}
                        onChange={(e) => setProjectType(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                    >
                        <option value="construction">Construction</option>
                        <option value="electricity">Electricity</option>
                        <option value="roads_and_transport">Roads and Transport</option>
                        <option value="healthcare">Healthcare</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Project Cost</label>
                    <input
                        placeholder="Enter project cost"
                        value={projectcost}
                        onChange={(e) => setProjectCost(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
                    />
                    {error.projectcost && <span className="text-red-500 text-sm">{error.projectcost}</span>}
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AdminProjectTractAddProjectDetails;
