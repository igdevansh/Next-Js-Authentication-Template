"use client";

import React, { useEffect, useState, Suspense } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

// A simple spinner for the loading state
function Spinner() {
  return (
    <svg
      className="animate-spin h-12 w-12 text-blue-500 mx-auto"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}

// --- Start of new icon components ---
function CheckCircleIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.06-1.06l-3.103 3.104-1.59-1.59a.75.75 0 00-1.06 1.06l2.12 2.12a.75.T5 0 001.06 0l3.624-3.624z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function XCircleIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
        clipRule="evenodd"
      />
    </svg>
  );
}
// --- End of new icon components ---

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const urlToken = searchParams.get("token");

    if (urlToken) {
      const verifyUserEmail = async () => {
        try {
          await axios.post("/api/users/verifyemail", { token: urlToken });
          setVerified(true);
        } catch (error) {
          setError(error.response?.data?.error || "Verification failed.");
        } finally {
          setLoading(false);
        }
      };
      verifyUserEmail();
    } else {
      setLoading(false);
      setError("Verification token is missing or invalid.");
    }
  }, [searchParams]);

  if (loading) {
    return (
      <>
        <Spinner />
        <h1 className="mt-6 text-3xl font-bold text-white">Verifying...</h1>
        <p className="mt-2 text-gray-300">
          Please wait while we verify your email.
        </p>
      </>
    );
  }

  if (error) {
    return (
      <>
        <XCircleIcon className="h-20 w-20 text-red-500 mx-auto" />
        <h1 className="mt-6 text-3xl font-bold text-white">
          Verification Failed
        </h1>
        <p className="mt-2 text-gray-300">{error}</p>
      </>
    );
  }

  return (
    <>
      <CheckCircleIcon className="h-20 w-20 text-green-500 mx-auto" />
      <h1 className="mt-6 text-3xl font-bold text-white">Email Verified!</h1>
      <p className="mt-4 text-gray-300">You can now log in to your account.</p>
      <Link
        href="/login"
        className="mt-6 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
      >
        Go to Login
      </Link>
    </>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <Suspense fallback={null}>
          <VerifyEmailContent />
        </Suspense>
      </div>
    </div>
  );
}
