// src/components/Navbar/NavbarComponent.tsx
import React from 'react';
import './NavbarComponent.css'; 
import Nabarbuttons from './Nabarbuttons'; // Import Nabarbuttons component

interface NavbarProps {
  isAuthenticated: boolean; // Define the type for isAuthenticated
  dispatch: React.Dispatch<any>; // Define the type for dispatch
}

const NavbarComponent: React.FC<NavbarProps> = ({ isAuthenticated, dispatch }) => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center flex-wrap">
        <h1 className="text-white text-xl font-bold">Village Development Programme</h1>
        {/* Pass isAuthenticated and dispatch to Nabarbuttons */}
        <Nabarbuttons isAuthenticated={isAuthenticated} dispatch={dispatch} />
      </div>
    </nav>
  );
};

export default NavbarComponent;
