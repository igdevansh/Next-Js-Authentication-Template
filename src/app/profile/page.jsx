"use client";
import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const logout = async () => {
    try {
      setLoading(true);
      await axios.get("/api/users/logout");
      toast.success("Logout successful!");
      router.push("/login");
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Logout failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      setData(res.data.data._id);
    } catch (error) {
      toast.error(error.message || "Failed to fetch user details");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-900">
      <Toaster position="top-right" />
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center">
          <img
            className="mx-auto h-24 w-24 rounded-full object-cover border-4 border-blue-500 shadow-md"
            src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${
              data || "default"
            }`} // Generates a generic adventurer-style avatar
            alt="User Avatar"
          />
          <h1 className="mt-6 text-4xl font-extrabold text-white break-words">
            {data === null ? (
              "Nothing"
            ) : (
              <Link href={`/profile/${data}`}>{data}</Link>
            )}
          </h1>
          <p className="mt-4 text-md text-gray-300">
            Welcome to your personalized profile page! Here you can manage your
            account settings and view your activity.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-lg"
            onClick={getUserDetails}
          >
            Get User Details
          </button>

          <button
            onClick={logout}
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-lg transition-colors duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
}
