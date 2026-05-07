import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import Login from "../pages/Login";
import Register from "../pages/Register";
import VerifyOtp from "../pages/VerifyOtp";
import ForgotPassword from "../pages/ForgotPassword";

const AuthModal = () => {
  const {
    openAuth,
    setOpenAuth,
    authView,
  } = useContext(AuthContext);

  // 🔥 UX UPGRADE: Prevent background scrolling when modal is open
  useEffect(() => {
    if (openAuth) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [openAuth]);

  return (
    // 🔥 AnimatePresence allows the exit animation to play before removing from DOM
    <AnimatePresence>
      {openAuth && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4">
          
          {/* 🔥 CLICKABLE BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpenAuth(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          {/* 🔥 MODAL BOX */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="relative z-10 w-full sm:w-[440px] bg-white rounded-t-3xl sm:rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto hide-scrollbar flex flex-col"
          >
            
            {/* 📱 Mobile Drag Handle (Only visible on small screens to mimic iOS sheets) */}
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 sm:hidden shrink-0" />

            {/* 🔥 PREMIUM CLOSE BUTTON */}
            <button
              onClick={() => setOpenAuth(false)}
              className="absolute top-4 sm:top-5 right-4 sm:right-5 p-2 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-colors shrink-0"
              aria-label="Close"
            >
              <X size={20} strokeWidth={2.5} />
            </button>

            {/* 🔥 DYNAMIC RENDERING */}
            <div className="w-full">
              {authView === "login" && <Login />}
              {authView === "register" && <Register />}
              {authView === "otp" && <VerifyOtp />}
              {authView === "forgot-password" && <ForgotPassword />}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;