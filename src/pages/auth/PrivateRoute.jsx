import React from "react";
import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { isBG } = useAuth();
  if (!isBG) return <Navigate to="/login" replace />;
  return children;
};
