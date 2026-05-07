import React, { useState, useRef, useEffect } from "react";
import api from "../utils/axios";
import { ShieldCheck, Loader2, AlertCircle, ArrowRight } from "lucide-react";

const OtpStep = ({
  setStep,
  eventId,
  setBookingId,
  contact,
  attendees,
  setPaymentOpen
}) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState(""); // 🔥 Replaced alert() with state

  const inputsRef = useRef([]);

  // 🔥 HANDLE OTP INPUT
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    setError(""); // Clear error when typing

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  // 🔙 BACKSPACE NAVIGATION
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // 🔥 NEW: HANDLE PASTE FUNCTIONALITY
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6).replace(/\D/g, "");
    
    if (pastedData) {
      const newOtp = [...otp];
      for (let i = 0; i < pastedData.length; i++) {
        newOtp[i] = pastedData[i];
      }
      setOtp(newOtp);
      setError("");
      
      // Auto-focus the next empty input, or the last one if full
      const focusIndex = pastedData.length < 6 ? pastedData.length : 5;
      inputsRef.current[focusIndex]?.focus();
    }
  };

  const otpValue = otp.join("");

  // 🔥 VERIFY OTP
  const handleVerify = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await api.post("/booking/bookEvent", {
        eventId,
        otp: otpValue,
        contact,
        attendees
      });

      setBookingId(data.booking._id);
      setStep("payment");

    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP code. Please try again.");
      // Optional: Clear OTP on failure
      // setOtp(["", "", "", "", "", ""]);
      // inputsRef.current[0].focus();
    } finally {
      setLoading(false);
    }
  };

  // 🔁 RESEND TIMER
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // 🔁 RESEND OTP
  const handleResend = async () => {
    try {
      setError("");
      await api.post("/booking/sendotp", {
        email: contact.email
      });

      setTimer(30);
      setOtp(["", "", "", "", "", ""]);
      inputsRef.current[0].focus();

    } catch {
      setError("Failed to resend OTP. Please try again later.");
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">

      {/* HEADER */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-14 h-14 bg-purple-50 rounded-full flex items-center justify-center mb-4">
          <ShieldCheck size={28} className="text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Check your email</h2>
        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
          We sent a 6-digit verification code to <br/>
          <span className="font-semibold text-gray-900">{contact.email}</span>
        </p>
      </div>

      {/* 🔥 INLINE ERROR BANNER */}
      {error && (
        <div className="mb-6 bg-rose-50 border border-rose-100 text-rose-600 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <AlertCircle size={16} className="shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* OTP INPUT BOXES */}
      <div className="flex justify-between gap-2 sm:gap-3 mb-8">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={index === 0 ? handlePaste : undefined} // Only need paste listener on first box
            className="w-11 h-14 sm:w-12 sm:h-16 text-center text-xl sm:text-2xl font-bold text-gray-900 
                       bg-gray-50 border border-gray-200 rounded-xl 
                       focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 
                       outline-none transition-all"
          />
        ))}
      </div>

      {/* VERIFY BUTTON */}
      <button
        type="button"
        onClick={handleVerify}
        disabled={otpValue.length !== 6 || loading}
        className={`w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300
        ${
          otpValue.length === 6
            ? "bg-black text-white hover:bg-gray-800 hover:shadow-lg active:scale-[0.98]"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        }`}
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Verifying...
          </>
        ) : (
          <>
            Verify Code
            <ArrowRight size={18} />
          </>
        )}
      </button>

      {/* RESEND + CANCEL */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4 sm:gap-0 text-sm">
        
        {/* RESEND */}
        <div className="text-gray-500">
          Didn't receive it?{" "}
          {timer > 0 ? (
            <span className="font-medium text-gray-900">00:{timer < 10 ? `0${timer}` : timer}</span>
          ) : (
            <button
              onClick={handleResend}
              className="font-bold text-purple-600 hover:text-purple-700 hover:underline transition-colors"
            >
              Resend now
            </button>
          )}
        </div>

        {/* CANCEL */}
        <button
          onClick={() => setPaymentOpen(false)}
          className="font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          Cancel
        </button>

      </div>
    </div>
  );
};

export default OtpStep;