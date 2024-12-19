"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast/headless";
export default function ProfilePage() {
  const router = useRouter();
  interface userType {
    _id: string;
    username: string;
    email: string;
    isVerified: boolean;
  }
  const handleLogout = async () => {
    try {
       await axios.get("/api/users/logout");
      toast.success("Logout Successful");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
      console.log(error.message);
    }
  };
  const [user, setUser] = useState<userType | null>(null);
  const getUserDetails = async () => {
    try {
      console.log('Inside get user details')
      const response = await axios.get("/api/users/user");
      console.log(response.data.data);
      setUser(response.data.data);
    } catch (error: any) {
      toast.error(error.message);
      console.log(error.message);
    }
  };
  useEffect(() => {
    console.log('Inside UseEffect')
    getUserDetails();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl capitalize">Profile for user:{user?.username}</p>
      <button
        className="ease-in-out  mt-2 bg-gray-900 text-white border-white border rounded-md py-3 px-10 w-auto
      m-2 capitalize hover:bg-gray-600
       hover-text-white hover:font-bold"
        onClick={() => handleLogout()}
      >
        Logout
      </button>
    </div>
  );
}
