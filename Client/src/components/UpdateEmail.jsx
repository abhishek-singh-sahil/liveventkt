import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { Mail, ShieldCheck, Loader2, AlertCircle, ArrowLeft, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const UpdateEmail = () => {
  const { user, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [newEmail, setNewEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("email"); // email → otp
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", text: "" }); // Replaced alert()

  // 🔥 SEND OTP
  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    if (!newEmail) return;

    try {
      setLoading(true);
      setStatus({ type: "", text: "" });

      await api.post("/auth/sendotp", {
        email: newEmail,
        action: "change_email",
      });

      setStep("otp");
    } catch (err) {
      setStatus({ type: "error", text: err.response?.data?.message || "Failed to send verification code." });
    } finally {
      setLoading(false);
    }
  };

  // 🔥 VERIFY OTP + UPDATE EMAIL
  const handleVerify = async (e) => {
    if (e) e.preventDefault();
    if (otp.length !== 6) return;

    try {
      setLoading(true);
      setStatus({ type: "", text: "" });

      // Assuming your API returns the updated user data or a success flag
      await api.post("/auth/update-email", {
        email: newEmail,
        otp,
      });

      await updateUser({ email: newEmail });

      setStatus({ type: "success", text: "Email updated successfully!" });
      
      // Delay navigation so they can see the success message
      setTimeout(() => {
        navigate("/my-profile");
      }, 1500);

    } catch (err) {
      setStatus({ type: "error", text: err.response?.data?.message || "Invalid verification code." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-104px)] flex items-center justify-center bg-[#eef1f5] px-4 py-12">
      
      <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden">
        
        {/* Back Button (Only show on step 2) */}
        {step === "otp" && (
          <button 
            onClick={() => {
              setStep("email");
              setOtp("");
              setStatus({ type: "", text: "" });
            }}
            className="absolute top-6 left-6 text-gray-400 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
        )}

        <div className="flex flex-col items-center text-center mb-8 mt-2">
          <div className="w-14 h-14 bg-purple-50 rounded-full flex items-center justify-center mb-4">
            {step === "email" ? (
              <Mail size={28} className="text-purple-600" />
            ) : (
              <ShieldCheck size={28} className="text-purple-600" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            {step === "email" ? "Change Email Address" : "Verify New Email"}
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            {step === "email" 
              ? "Enter your new email address below. We'll send a code to verify it." 
              : <>Enter the 6-digit code sent to <br/><span className="font-semibold text-gray-900">{newEmail}</span></>}
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
          {step === "email" && (
            <motion.form 
              key="email-step"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSendOtp} 
              className="space-y-4"
            >
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center mb-6">
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider block mb-0.5">Current Email</span>
                <span className="text-sm font-semibold text-gray-700">{user?.email}</span>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">New Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. new@company.com"
                  value={newEmail}
                  onChange={(e) => {
                    setNewEmail(e.target.value);
                    setStatus({ type: "", text: "" });
                  }}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all text-gray-900"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={!newEmail || loading}
                className="w-full bg-black text-white py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-gray-800 active:scale-[0.98] transition-all duration-200 shadow-md disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending Code...
                  </>
                ) : (
                  "Send Verification Code"
                )}
              </button>
            </motion.form>
          )}

          {/* 🔥 STEP 2: OTP */}
          {step === "otp" && (
            <motion.form 
              key="otp-step"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleVerify} 
              className="space-y-4"
            >
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 block text-center">Secure Code</label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, ''); // Only allow numbers
                    setOtp(val);
                    setStatus({ type: "", text: "" });
                  }}
                  className="w-full px-4 py-4 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all text-gray-900 text-center text-3xl tracking-[0.5em] font-mono placeholder:tracking-normal placeholder:text-xl placeholder:font-sans placeholder:font-medium"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={otp.length !== 6 || loading}
                className="w-full bg-black text-white py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-gray-800 active:scale-[0.98] transition-all duration-200 shadow-md disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify & Update Email"
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* CANCEL */}
        {step === "email" && (
          <button
            onClick={() => navigate(-1)}
            className="w-full mt-5 text-sm font-medium text-gray-400 hover:text-gray-900 transition-colors"
          >
            Cancel and Return
          </button>
        )}

      </div>
    </div>
  );
};

export default UpdateEmail;