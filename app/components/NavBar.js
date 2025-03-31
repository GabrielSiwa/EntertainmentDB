/*

Author: Gabriel Siwa 
Date: 30/03/2025  

Description:  
This React component renders the navigation bar for the MovieDB platform. It includes navigation links and an admin view toggle button.

Inputs:  
- None  

Processing:  
- Displays navigation links for "Home" and "About" pages.
- Shows a greeting message that changes based on admin or regular user view.
- Allows toggling between admin and regular view using a button.

Outputs:  
- A styled navigation bar with links and an admin toggle button.

*/

"use client";

import Link from "next/link";
import { useAdmin } from "../context/AdminContext";

const Navbar = () => {
  const { adminView, toggleAdminView } = useAdmin();

  return (
    <nav className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
      <div className="flex items-center text-xl font-bold">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2"
        >
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="2"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="7"
            y1="3"
            x2="7"
            y2="21"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="12"
            y1="3"
            x2="12"
            y2="21"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="17"
            y1="3"
            x2="17"
            y2="21"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="3"
            y1="7"
            x2="21"
            y2="7"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="3"
            y1="12"
            x2="21"
            y2="12"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="3"
            y1="17"
            x2="21"
            y2="17"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
        <Link href="/">
          Hello {adminView ? "Gabby!" : "WHO ARE YOU?!!?!?"}!
        </Link>
        <Link href="/movie" className="hover:text-gray-600 px-5">
          Movies
        </Link>
        <Link href="/tvshow" className="hover:text-gray-600 px-5">
          Tv Shows
        </Link>
        <Link href="/music" className="hover:text-gray-600 px-5">
          Music
        </Link>
      </div>
      <div className="flex gap-6 sm:gap-6">
        <Link href="/" className="hover:text-gray-600">
          Home
        </Link>
        <Link href="/about" className="hover:text-gray-600">
          About
        </Link>

        <button
          onClick={toggleAdminView}
          className={`flex items-center px-3 py-1.5 rounded text-sm font-medium ml-4 sm:ml-2 transition-all duration-200 ${
            adminView
              ? "bg-red-500 text-white border border-red-500"
              : "bg-blue-500 text-white border border-blue-500"
          } hover:opacity-90`}
        >
          Switch to {adminView ? "Regular View" : "Admin View"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
