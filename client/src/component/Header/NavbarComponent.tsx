import React from 'react';
import './NavbarComponent.css'; // Import the normal CSS
import Nabarbuttons from './Nabarbuttons';
const NavbarComponent: React.FC = () => {
   
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center flex-wrap"> {/* Added flex-wrap for responsiveness */}
                <h1 className="text-white text-xl font-bold">Village Development Programme</h1>
                 <Nabarbuttons/>
            </div>
        </nav>
    );
};

export default NavbarComponent;
