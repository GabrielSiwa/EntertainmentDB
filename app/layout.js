import "./globals.css";
import Navbar from "./components/Navbar";
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
