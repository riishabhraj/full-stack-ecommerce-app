// src/components/Seller/Profile.js
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.seller);

  if (!currentUser) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-5 border rounded shadow-md">
        <h1 className="text-2xl font-bold mb-5">Profile</h1>
        <p className="text-red-500">No user logged in.</p>
        <Link to="/seller/sign-in" className="text-blue-500 underline">
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-5 border rounded shadow-md">
      <h1 className="text-2xl font-bold mb-5">Profile</h1>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Name</label>
        <p className="p-2 border rounded">
          {currentUser.firstName} {currentUser.lastName}
        </p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Email</label>
        <p className="p-2 border rounded">{currentUser.email}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Joined</label>
        <p className="p-2 border rounded">
          {new Date(currentUser.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="mt-5">
        <Link
          to={`/seller/dashboard/${currentUser._id}`}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Profile;
