/*
Author: Gabriel Siwa
Date: 30/03/2025

Description:

This React component defines the root layout structure for the application.
It includes global styles, a navigation bar, and a footer while managing
admin-related context for the entire application.

Inputs:

- children: The main content of the page that will be rendered between the Navbar and Footer.

Processing:

- Wraps the application with global styles and layout structure.
- Provides an admin context (`AdminProvider`) to the entire application.
- Ensures that the Navbar appears at the top and Footer at the bottom.
- Uses `flex-grow` to ensure the main content expands to fill the available space.

Outputs:

- A structured layout containing a navbar, main content, and footer.
*/

import "./globals.css";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer.js";
import { AdminProvider } from "./context/AdminContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800 min-h-screen flex flex-col">
        <AdminProvider>
          <Navbar />
          <div className="flex-grow">{children}</div>
          <Footer />
        </AdminProvider>
      </body>
    </html>
  );
}
