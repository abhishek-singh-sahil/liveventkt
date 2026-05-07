import React, { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, setOpenAuth, setAuthView } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If the user is not authenticated, trigger the login flow
    if (!user) {
      setAuthView("login");
      setOpenAuth(true);

      // 🔥 UX UPGRADE: Redirect to home, but securely save where they WERE trying to go.
      // Your Login.jsx can now use `location.state.returnTo` to send them back here after a successful login!
      navigate("/", { 
        replace: true, 
        state: { returnTo: location.pathname } 
      });
    }
  }, [user, navigate, setAuthView, setOpenAuth, location.pathname]); // 🔥 FIXED: Added missing dependencies

  // Prevent any flashing or accidental rendering of protected content
  if (!user) return null;

  // If securely authenticated, render the page
  return <>{children}</>;
};

export default ProtectedRoute;