"use client";

import { useRouter } from "next/navigation";
import { login } from "../../store/slices/authSlice";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();

  const isUserLoggedIn = useSelector(store => store?.auth?.isLoggedIn);
  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formValidation = (email,password) => {
    if(!email || !password ){
        toast.error("Please,fill all the details");
        return false;
    }

    if(!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
)){
    toast.error("Invalid email");
    return false;
}
if(password.length < 8){
    toast.error("Password must be contain 8 character");
    return false;
}
return true;
}

  const handleLogin = async (e) => {
    e.preventDefault();
   if(formValidation(email,password)){
    const response = await dispatch(login({email,password}));
            if(response?.payload?.success){
                setEmail('');
                setPassword('');
                router.push('/');
            }
   }

  };

  if(isUserLoggedIn){
    router.push('/');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        <h1 className="text-3xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
          Login to CMS
        </h1>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-300">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-300">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-gray-900 font-bold rounded-lg hover:from-purple-500 hover:to-indigo-500 transition duration-300"
        >
          Login
        </button>
        {/* <p className="mt-4 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <a href="/signup" className="text-indigo-400 hover:underline">
            Sign up
          </a>
        </p> */}
      </form>
    </div>
  );
}
