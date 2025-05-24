"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define types for the alert system
export type AlertType = "success" | "error" | "info" | "warning";

interface AlertContextProps {
  showAlert: (message: string, type: AlertType) => void; // Function to show alerts
}

// Define the structure for the alert state
interface AlertState {
  message: string;
  type: AlertType;
}

// Initialize the context
const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [alert, setAlert] = useState<AlertState | null>(null);

  // Function to show the alert
  const showAlert = (message: string, type: AlertType) => {
    setAlert({ message, type });

    // Auto-dismiss the alert after 3 seconds
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}

      {/* Global alert display */}
      {alert && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-2 rounded-lg shadow-lg text-white ${
            alert.type === "success"
              ? "bg-green-500"
              : alert.type === "error"
                ? "bg-red-500"
                : alert.type === "info"
                  ? "bg-blue-500"
                  : "bg-yellow-500"
          }`}
        >
          {alert.message}
        </div>
      )}
    </AlertContext.Provider>
  );
};

// Custom hook to use the alert context
export const useAlert = (): AlertContextProps => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
