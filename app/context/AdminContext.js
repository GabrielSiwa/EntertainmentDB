"use client";

import { createContext, useState, useContext } from "react";

// Create a context with a default value of false for adminView
const AdminContext = createContext({
  adminView: false,
  toggleAdminView: () => {},
});

// Provider component that will wrap the app
export function AdminProvider({ children }) {
  const [adminView, setAdminView] = useState(false);

  const toggleAdminView = () => {
    setAdminView((prev) => !prev);
  };

  return (
    <AdminContext.Provider value={{ adminView, toggleAdminView }}>
      {children}
    </AdminContext.Provider>
  );
}

// Custom hook to use the admin context
export function useAdmin() {
  return useContext(AdminContext);
}
