import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Info, Mail, KeyRound, Loader2, AlertCircle, CheckCircle2, ArrowLeft, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ForgotPassword = () => {
  const { forgotPassword, resetPassword, setAuthView } = useContext(AuthContext);

  const [step, setStep] = useState(1); // 1: Email, 2: OTP & New Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  
  // 🔥 Password strength state
  const [strength, setStrength] = useState(0);

  const [status, setStatus] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  // ==============================
  // 🔥 PASSWORD STRENGTH LOGIC
  // ==============================
  const getPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[!@#$%^&*]/.test(password)) score += 1;
    return score;
  };

  const getStrengthColor = () => {
    const hue = (strength / 5) * 120;
    return `hsl(${hue}, 90%, 45%)`;
  };

  // STEP 1: Handle Email Submission
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setStatus({ type: "", text: "" });
    setLoading(true);

    try {
      await forgotPassword(email);
      setStatus({ type: "success", text: "Secure code sent to your email!" });
      setTimeout(() => {
        setStep(2);
        setStatus({ type: "", text: "" });
      }, 1500);
    } catch (err) {
      setStatus({ type: "error", text: err.message || "We couldn't find an account with that email." });
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: Handle Password Reset
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setStatus({ type: "", text: "" });

    // 🔥 PREVENT SUBMISSION IF PASSWORD IS WEAK
    if (strength < 4) {
      setStatus({ type: "error", text: "Please use a stronger password." });
      return;
    }

    setLoading(true);

    try {
      await resetPassword(email, otp, newPassword);
      setStatus({ type: "success", text: "Password reset successfully! Redirecting..." });
      
      // Auto-redirect back to login after 2 seconds
      setTimeout(() => {
        setAuthView("login");
      }, 2000);
    } catch (err) {
      setStatus({ type: "error", text: err.message || "Invalid or expired verification code." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      
      {/* Back Button (Only show on step 2) */}
      {step === 2 && (
        <button 
          onClick={() => {
            setStep(1);
            setOtp("");
            setNewPassword("");
            setStrength(0);
            setStatus({ type: "", text: "" });
          }}
          className="absolute top-0 left-0 text-gray-400 hover:text-gray-900 transition-colors z-10"
        >
          <ArrowLeft size={20} />
        </button>
      )}

      {/* Header */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mb-4 border border-purple-100 shadow-sm">
          {step === 1 ? (
            <KeyRound size={24} className="text-purple-600" />
          ) : (
            <ShieldCheck size={24} className="text-purple-600" />
          )}
        </div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-1.5">
          Reset Password
        </h2>
        <p className="text-sm text-gray-500">
          {step === 1 ? "Enter your email to receive a secure reset code." : "Enter the verification code and your new password."}
        </p>
      </div>

      {/* 🔥 INLINE STATUS BANNER */}
      <AnimatePresence mode="wait">
        {status.text && (
          <motion.div 
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: "auto", marginBottom: 20 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            className={`px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 overflow-hidden
              ${status.type === "success" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-rose-50 text-rose-600 border border-rose-100"}`}
          >
            {status.type === "success" ? <CheckCircle2 size={16} className="shrink-0" /> : <AlertCircle size={16} className="shrink-0" />}
            <p>{status.text}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {/* 🔥 STEP 1: EMAIL */}
        {step === 1 && (
          <motion.form 
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSendOtp} 
            className="space-y-4"
          >
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Email Address</label>
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setStatus({ type: "", text: "" });
                }}
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all text-gray-900"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading || !email}
              className="w-full bg-black text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-800 active:scale-[0.98] transition-all duration-200 shadow-md disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <><Loader2 size={18} className="animate-spin" /> Sending...</>
              ) : (
                <><Mail size={18} /> Send Reset Code</>
              )}
            </button>
          </motion.form>
        )}

        {/* 🔥 STEP 2: OTP & NEW PASSWORD */}
        {step === 2 && (
          <motion.form 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleResetPassword} 
            className="space-y-5"
          >
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Secure Code</label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="000000"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value.replace(/\D/g, ''));
                  setStatus({ type: "", text: "" });
                }}
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all text-gray-900 text-center text-2xl tracking-[0.5em] font-mono placeholder:tracking-normal placeholder:text-base placeholder:font-sans placeholder:font-medium"
                required
              />
            </div>

            {/* 🔥 PASSWORD INPUT WITH STRENGTH METER */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-1.5 block">New Password</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Create a strong password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setStrength(getPasswordStrength(e.target.value));
                    setStatus({ type: "", text: "" });
                  }}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all text-gray-900 pr-10"
                  required
                />

                <div className="absolute right-3 top-3.5 group cursor-help">
                  <Info size={18} className="text-gray-400 hover:text-purple-500 transition-colors" />
                  
                  <div className="absolute right-0 bottom-8 mb-2 w-56 p-3 bg-gray-900 text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 shadow-xl translate-y-1 group-hover:translate-y-0">
                    <p className="font-semibold mb-1 text-gray-300">Password must include:</p>
                    <ul className="space-y-1 text-gray-400">
                      <li className={strength > 0 && newPassword.length >= 8 ? "text-emerald-400" : ""}>• At least 8 characters</li>
                      <li className={/[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword) ? "text-emerald-400" : ""}>• Uppercase & lowercase</li>
                      <li className={/[0-9]/.test(newPassword) ? "text-emerald-400" : ""}>• A number</li>
                      <li className={/[!@#$%^&*]/.test(newPassword) ? "text-emerald-400" : ""}>• A special character</li>
                    </ul>
                  </div>
                </div>

                {/* Strength Bar */}
                <div className="mt-2.5 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-500 ease-out rounded-full"
                    style={{
                      width: `${(strength / 5) * 100}%`,
                      background: strength === 0 ? "transparent" : getStrengthColor(),
                      boxShadow: strength > 0 ? `0 0 10px ${getStrengthColor()}` : "none",
                    }}
                  />
                </div>

                <div className="flex justify-between items-center mt-1.5">
                  <p className="text-xs text-gray-500 font-medium">
                    Strength:{" "}
                    <span className="font-bold transition-colors duration-300" style={{ color: strength === 0 ? "inherit" : getStrengthColor() }}>
                      {strength === 0 ? "None" : strength <= 2 ? "Weak" : strength === 3 ? "Medium" : "Strong"}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || otp.length !== 6 || strength < 4}
              className="w-full bg-black text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-800 active:scale-[0.98] transition-all duration-200 shadow-md disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <><Loader2 size={18} className="animate-spin" /> Saving...</>
              ) : (
                "Save New Password"
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="mt-6 flex items-center justify-center gap-2">
        <p className="text-sm text-gray-500">
          Remembered your password?{" "}
          <button
            onClick={() => setAuthView("login")}
            className="text-purple-600 font-bold hover:text-purple-700 hover:underline transition-colors"
          >
            Back to Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;