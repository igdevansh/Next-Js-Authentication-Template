"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import React, { useState, useEffect } from "react";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onLogin = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/login", user);
      toast.success("Login successful! Redirecting...");
      router.push("/profile");
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Login failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-900">
      <Toaster position="top-right" />
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-center text-white text-3xl font-bold mb-6">
          Login
        </h1>
        <hr className="border-gray-700 mb-6" />

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-300 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
            id="email"
            value={user.email}
            type="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-300 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-200 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
            id="password"
            value={user.password}
            type="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
          />
        </div>

        <button
          onClick={onLogin}
          disabled={buttonDisabled || loading}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {loading ? "Processing..." : "Login"}
        </button>

        <p className="text-center text-gray-400 text-sm mt-4">
          Want to sign up?{" "}
          <Link href="/signup" className="text-blue-400 hover:text-blue-600">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
