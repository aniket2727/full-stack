import React, { useState, FormEvent } from 'react';

const AdminProjectTractAddProjectDetails: React.FC = () => {
    const [projectname, setProjectname] = useState<string>('');
    const [areaname, setAreaName] = useState<string>('');
    const [projecttype, setProjectType] = useState<string>('');
    const [projectcost, setProjectCost] = useState<string>('');

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        // Add logic here for form submission if needed
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Enter Project Name</label>
                <input 
                    placeholder="Enter project name" 
                    value={projectname} 
                    onChange={(e) => setProjectname(e.target.value)} 
                />

                <label>Enter Area Name</label>
                <input 
                    placeholder="Enter area name" 
                    value={areaname} 
                    onChange={(e) => setAreaName(e.target.value)} 
                />

                <label>Select Project Type</label>
                <select 
                    value={projecttype} 
                    onChange={(e) => setProjectType(e.target.value)}
                >
                    <option value="construction">Construction</option>
                    <option value="electricity">Electricity</option>
                    <option value="roads_and_transport">Roads and Transport</option>
                    <option value="healthcare">Healthcare</option>
                </select>

                <label>Enter Project Cost</label>
                <input 
                    placeholder="Enter project cost" 
                    value={projectcost} 
                    onChange={(e) => setProjectCost(e.target.value)} 
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AdminProjectTractAddProjectDetails;
