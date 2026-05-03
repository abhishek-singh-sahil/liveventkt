import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrRouteWraper = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;

  // ❌ NOT LOGGED IN → REDIRECT TO LOGIN
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ LOGGED IN → ALLOW
  return children;
};

export default PrRouteWraper;