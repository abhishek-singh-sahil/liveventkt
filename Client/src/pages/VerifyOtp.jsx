import React, { useState, useRef, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ShieldCheck, Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const VerifyOtp = () => {
  const {
    verifyOtp,
    setOpenAuth,
    authEmail,
    setAuthView
  } = useContext(AuthContext);

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputsRef = useRef([]);

  // 🔥 HANDLE INPUT & AUTO-FOCUS
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    if (error) setError("");

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  // 🔥 BACKSPACE NAVIGATION
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // 🔥 SMART PASTE (Fills all 6 boxes at once)
  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
    if (pastedData.every((char) => /^[0-9]$/.test(char))) {
      const newOtp = [...otp];
      pastedData.forEach((char, i) => {
        newOtp[i] = char;
      });
      setOtp(newOtp);
      inputsRef.current[pastedData.length - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const finalOtp = otp.join("");

    if (!authEmail) {
      setError("Session expired. Please start over.");
      setTimeout(() => setAuthView("login"), 2000);
      return;
    }

    if (finalOtp.length !== 6) {
      setError("Please enter the full 6-digit code.");
      return;
    }

    setLoading(true);

    try {
      const data = await verifyOtp(authEmail, finalOtp);

      if (data.token) {
        setOpenAuth(false); // Close the modal on success
      } else {
        setError(data.message || "The code you entered is incorrect.");
      }
    } catch (err) {
      setError(err.message || "Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      
      {/* HEADER */}
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-100">
          <ShieldCheck size={24} className="text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Verify your email
        </h2>
        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
          We've sent a 6-digit code to <br />
          <span className="font-semibold text-gray-900">{authEmail || "your email"}</span>
        </p>
      </div>

      {/* 🔥 INLINE ERROR BANNER */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-rose-50 border border-rose-100 text-rose-600 px-4 py-3 rounded-xl text-sm font-medium flex items-start gap-2"
          >
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <p>{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="w-full">
        {/* OTP Inputs */}
        <div className="flex justify-between gap-2 mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={index === 0 ? handlePaste : undefined}
              className="w-11 h-14 sm:w-12 sm:h-16 text-center text-2xl font-bold bg-gray-50/50 border border-gray-200 rounded-xl 
                         focus:bg-white focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={loading || otp.join("").length < 6}
          className="w-full bg-black text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-800 active:scale-[0.98] transition-all duration-200 shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Verifying...
            </>
          ) : (
            "Confirm Verification"
          )}
        </button>
      </form>

      {/* FOOTER ACTIONS */}
      <div className="mt-8 flex flex-col items-center gap-4">
        <p className="text-sm text-gray-500 font-medium">
          Didn’t receive the code?{" "}
          <button className="text-purple-600 font-bold hover:text-purple-700 hover:underline transition-colors">
            Resend
          </button>
        </p>

        <button
          onClick={() => setAuthView("login")}
          className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default VerifyOtp;