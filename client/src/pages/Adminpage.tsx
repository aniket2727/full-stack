// this is admin page


import React from "react";
import { useNavigate } from "react-router-dom";
const Adminpage: React.FC = () => {
    const navigate=useNavigate();
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Left-aligned column for buttons */}
            <div className="flex flex-col items-start ml-8 mt-4 space-y-4">
                {/* Button styles */}
                <button  onClick={()=>navigate('/adminissue')} className="w-48 py-3 px-5 text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-lg focus:outline-none">
                    Admin Issue
                </button>
                <button  onClick={()=>navigate('/adminproject')} className="w-48 py-3 px-5 text-white bg-green-500 hover:bg-green-600 rounded-lg shadow-lg focus:outline-none">
                    Admin project
                </button>
            </div>
        </div>
    );
};

export default Adminpage;
