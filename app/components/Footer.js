/*
Author: Gabriel Siwa
Date: 30/03/2025

Description:
This React component renders the footer section for the MovieDB platform.
It provides a brief description, quick navigation links, and contact details.

Inputs:
- None

Processing:
- Displays static content including:
  - MovieDB description
  - Navigation links
  - Contact details (address, phone, email)

Outputs:
- A styled footer section containing the platform’s information.
*/

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-12 px-6 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">Entertainment Database</h2>
            <p className="text-gray-600">
              Entertainment Database is a comprehensive platform that provides
              information about movies, TV Shows, music, artist, and
              celebrities. My goal is to create a user-friendly interface that
              allows users to easily search and discover my favorite
              entertainment.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-800">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-gray-800"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Contact Us</h2>
            <div className="space-y-2">
              <div className="flex items-start">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 mt-0.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <span className="text-gray-600">
                  1317 27TH SE, Calgary, Canada
                </span>
              </div>
              <div className="flex items-start">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 mt-0.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
                <span className="text-gray-600">+1 825-558-0898</span>
              </div>
              <div className="flex items-start">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 mt-0.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
                <span className="text-gray-600">siwagabrielira8@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
          <p>© 2025 Taro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
