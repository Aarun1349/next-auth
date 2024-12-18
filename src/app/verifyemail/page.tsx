"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import  axios  from "axios";
import toast from "react-hot-toast";
const VerifyEmail = () => {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup",user);
      console.log(response.data);
      router.push("/login");

    } catch (error:any) {
      setLoading(false);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col bg-gray-800 text-white justify-center items-center min-h-screen">
      <h1 className="text-2xl capitalize">
        {" "}
        {loading ? "Processing" : "Sign Up"}
      </h1>
      {/* <label htmlFor="username">Username</label> */}
      <input
        type="text"
        id="username"
        placeholder="Full Name"
        aria-label="full name"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="focus:outline-none focus:border-gray-600 text-gray-800 capitalize rounded-md p-3 m-2"
      />
      {/* <label htmlFor="email">Email</label> */}
      <input
        type="email"
        id="email"
        placeholder="Email Id"
        aria-label="Email Id"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className=" focus:outline-none focus:border-gray-600 text-gray-800 lowercase rounded-md p-3 m-2"
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
        onClick={(e) => handleSignUp()}
        className="mt-2 bg-white text-gray-900 rounded-md py-3 px-8  m-2 capitalize hover:bg-gray-600 hover-text-white hover:font-bold"
      >
        {buttonDisabled ? "Fill all Fields" : "Sign up"}
      </button>
      <p className="italic mt-3">
        Already have an account?
        <Link
          className="bg-white mx-2 font-semibold capitalize text-gray-900 p-1 rounded-sm"
          href="/login"
        >
          login
        </Link>{" "}
        here{" "}
      </p>
    </div>
  );
};

export default VerifyEmail;
