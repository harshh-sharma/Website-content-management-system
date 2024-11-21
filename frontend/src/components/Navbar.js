"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar() {
  
  const dispatch = useDispatch();

  // for checking user is logged in or not
  const isUserLoggedIn = useSelector(store => store?.auth?.isLoggedIn);
  // console.log(isUserLoggedIn);

  // for checking the role of the user
  const userRole = useSelector(store => store?.auth?.role);

  // const handleLogout = (e) => {
  //     e.preventDefault();
  //     const res = dispatch(logout());
  //     if (res?.payload?.success) {
  //         navigate("/");
  //     }
  // }


  return (
    <nav className="bg-gray-800 text-gray-100 p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand */}
        <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
          <Link href="/">CMS</Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <Link
              href="/"
              className="hover:text-indigo-400 transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard"
              className="hover:text-purple-400 transition duration-300"
            >
              Dashboard
            </Link>
          </li>
          <li>
            {isUserLoggedIn ? <Link
              href="/login"
              className="hover:text-teal-400 transition duration-300"
            >
              Logout
            </Link> :<Link
              href="/login"
              className="hover:text-teal-400 transition duration-300"
            >
              Login
            </Link>}
          </li>
        </ul>

        {/* Call to Action */}
        <div>
          <Link
            href="/signup"
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-gray-900 px-4 py-2 rounded-md font-semibold hover:from-purple-500 hover:to-indigo-500 transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
