"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast/headless";
const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const handleLogin = async () => {
    try {
      setLoading(true);
       await axios.post("/api/users/login",user);
      toast.success("login success")
      // router.push(`/profile/${response.data.data.email}`);
      router.push(`/profile`);
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col bg-gray-800 text-white justify-center items-center min-h-screen">
      <h1 className="text-2xl capitalize">
        {loading ? "Processing" : "Login"}
      </h1>
      {/* <label htmlFor="email">Email</label> */}
      <input
        type="email"
        id="email"
        placeholder="Email Id"
        aria-label="Email Id"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="text-gray-800  rounded-md p-3 m-2 focus:outline-none focus:border-gray-600"
      />
      {/* <label htmlFor="password">Password</label> */}
      <input
        type="password"
        id="password"
        placeholder="password"
        aria-label="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="focus:outline-none focus:border-gray-600 text-gray-800 capitalize rounded-md p-3 m-2"
      />
      <button
        className="ease-in-out  mt-2 bg-white text-gray-900 rounded-md py-3 px-8 w-auto
      m-2 capitalize hover:bg-gray-600
       hover-text-white hover:font-bold"
        onClick={() => handleLogin()}
      >
        {buttonDisabled ? "Fill all Fields" : "Login"}
      </button>
      <p className="italic mt-3">
        Don't have an account?
        <Link
          className="bg-white mx-2 font-semibold capitalize text-gray-900 p-1 rounded-sm"
          href="/signup"
        >
          Sign up
        </Link>
        here
      </p>
    </div>
  );
};

export default LoginPage;
