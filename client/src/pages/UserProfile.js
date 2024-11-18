import React from 'react';
import { useSelector } from 'react-redux';

const UserProfile = () => {
  // Access user state from Redux store
  const user = useSelector((state) => state.user);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">User Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>User ID: {user.id}</p>
    
      {/* Access additional user details */}
      <div>
        <h2 className="mt-4 text-lg font-semibold">Additional Details</h2>
        <p>Address: {user.userDetails.address}</p>
        <p>Age: {user.userDetails.age}</p>
        <p>Mobile: {user.userDetails.mobile}</p>
        <p>Gender: {user.userDetails.gender}</p>
      </div>
    </div>
  );
};

export default UserProfile;
