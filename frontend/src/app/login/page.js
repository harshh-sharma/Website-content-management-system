"use client";

import { useRouter } from "next/navigation";
import { login } from "../../store/slices/authSlice";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();

  const isUserLoggedIn = useSelector((store) => store?.auth?.isLoggedIn);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const formValidation = (email, password) => {
    if (!email || !password) {
      toast.error("Please, fill all the details");
      return false;
    }

    if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      toast.error("Invalid email");
      return false;
    }
    if (password.length < 8) {
      toast.error("Password must contain at least 8 characters");
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (formValidation(email, password)) {
      const response = await dispatch(login({ email, password }));
      if (response?.payload?.success) {
        setEmail("");
        setPassword("");
        router.push("/");
      }
    }
  };

  if (isUserLoggedIn) {
    router.push("/");
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
        <div className="mb-6 relative">
          <label className="block text-sm font-medium mb-2 text-gray-300">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-200 mt-[20px]"
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223a10.478 10.478 0 011.5-1.797C7.597 4.972 9.724 4 12 4c2.276 0 4.403.972 6.52 2.426a10.478 10.478 0 011.5 1.797M21 21l-3-3m0 0a10.478 10.478 0 01-1.5 1.797C16.403 19.028 14.276 20 12 20c-2.276 0-4.403-.972-6.52-2.426a10.478 10.478 0 01-1.5-1.797M12 12c1.105 0 2-.895 2-2m0 0c0-1.105-.895-2-2-2m0 4c-1.105 0-2-.895-2-2m0 0c0-1.105.895-2 2-2"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223a10.478 10.478 0 011.5-1.797C7.597 4.972 9.724 4 12 4c2.276 0 4.403.972 6.52 2.426a10.478 10.478 0 011.5 1.797M12 12c1.105 0 2-.895 2-2m0 0c0-1.105-.895-2-2-2m0 4c-1.105 0-2-.895-2-2"
                />
              </svg>
            )}
          </button>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-gray-900 font-bold rounded-lg hover:from-purple-500 hover:to-indigo-500 transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
}
