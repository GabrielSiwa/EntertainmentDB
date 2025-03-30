/*
Author: Alessandra Nicole Claur
Date: 30/03/2025
Description:
This file defines a React context for managing admin view state in the application.
It includes a context provider that wraps the app and a custom hook for accessing the admin state.

Inputs:
- `children`: Components that will be wrapped by the `AdminProvider`.

Processing:
- It provides a function `toggleAdminView` to toggle the admin mode on or off.
- Components wrapped by `AdminProvider` can access this state via the `useAdmin` hook.

Outputs:
- A context provider that allows components to check and toggle the admin view.
*/

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
