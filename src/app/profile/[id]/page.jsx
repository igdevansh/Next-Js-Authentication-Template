import React from "react";

export default function UserProfile({ params }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center">
          <img
            className="mx-auto h-24 w-24 rounded-full object-cover border-4 border-blue-500 shadow-md"
            src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${params.id}`} // Generates a generic adventurer-style avatar
            alt="User Avatar"
          />
          <h1 className="mt-6 text-4xl font-extrabold text-white">
            User Profile
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Viewing profile for user:{" "}
            <span className="font-bold text-blue-400">{params.id}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
