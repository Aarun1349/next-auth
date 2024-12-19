"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const VerifyEmail = () => {
  
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const verifyUserEmail = async () => {
    try {
      await axios.post(`/api/users/verifyemail/`, { token });
      setVerified(true);
      // console.log(response.data);
    } catch (error: any) {
      setError(true);
      toast.error(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    console.log("URL TOKEN", urlToken);
    setToken(urlToken||"");
  }, []);
  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);
  return (
    <div className="flex flex-col bg-gray-800 text-white justify-center items-center min-h-screen">
      <h1 className="text-4xl capitalize">Verify Page</h1>
      <h2 className="p-2 mt-2 bg-orange-500 text-black">
        {token ? `${token}` : "No token"}
      </h2>
      {verified && (
        <div>
          <h2 className="text-2xl">Email Verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl">error</h2>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
