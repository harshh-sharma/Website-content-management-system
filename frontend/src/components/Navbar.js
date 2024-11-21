"use client";

import { logout } from "../store/slices/authSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();

  // for checking user is logged in or not
  const isUserLoggedIn = useSelector(store => store?.auth?.isLoggedIn);
  // console.log(isUserLoggedIn);

  // for checking the role of the user
  const userRole = useSelector(store => store?.auth?.role);

  const handleLogout = async(e) => {
      e.preventDefault();
      const res = dispatch(logout());
      console.log('res',await res);
      router.push("/");
      
      if (res?.payload?.success) {
          router.push("/");
      }
  }


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
          {isUserLoggedIn && <>
            <li>
            <Link
              href="/websites"
              className="hover:text-purple-400 transition duration-300"
            >
              Websites
            </Link>
           
          </li>
          <li>
          <Link
              href="/create/domain"
              className="hover:text-purple-400 transition duration-300"
            >
              Add Website
            </Link>
          </li>
          </>}
        </ul>

        {/* Call to Action */}
        <div>
          {isUserLoggedIn ? <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-gray-900 px-4 py-2 rounded-md font-semibold hover:from-purple-500 hover:to-indigo-500 transition duration-300"
          >
            Logout
          </button> :
          <Link
            href="/login"
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-gray-900 px-4 py-2 rounded-md font-semibold hover:from-purple-500 hover:to-indigo-500 transition duration-300"
          >
            Login
          </Link>}
        </div>
      </div>
    </nav>
  );
}
