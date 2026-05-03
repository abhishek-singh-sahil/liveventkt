import React, { useState, useRef, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

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

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const finalOtp = otp.join("");

    if (!authEmail) {
      setError("Session expired. Please try again.");
      setAuthView("login"); // 🔥 fallback
      return;
    }

    if (finalOtp.length !== 6) {
      setError("Please enter complete OTP");
      return;
    }

    setLoading(true);

    try {
      const data = await verifyOtp(authEmail, finalOtp);

      if (data.token) {
        setOpenAuth(false);   // 🔥 CLOSE MODAL
      } else {
        setError(data.message || "Invalid OTP");
      }

    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">

      <h2 className="text-xl text-black font-semibold text-center mb-2">
        Verify OTP 🔐
      </h2>

      <p className="text-sm text-gray-500 text-center mb-5">
        Enter OTP sent to <br />
        <span className="font-medium text-gray-700">{authEmail}</span>
      </p>

      {error && (
        <p className="text-red-500 text-sm text-center mb-3">
          {error}
        </p>
      )}

      {/* OTP Inputs */}
      <div className="flex justify-center gap-2 mb-5">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            ref={(el) => (inputsRef.current[index] = el)}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-10 h-12 text-center text-lg border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        ))}
      </div>

      <button
        type="submit"
        className="w-full py-2.5 rounded-lg text-white font-medium
                   bg-gray-900 hover:opacity-90 transition"
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>

      <p className="text-sm text-center text-gray-600 mt-4">
        Didn’t receive OTP?{" "}
        <span className="text-purple-600 cursor-pointer hover:underline">
          Resend
        </span>
      </p>

      <p className="text-sm text-center text-gray-600 mt-2">
        <span
          onClick={() => setAuthView("login")}   // 🔥 FIXED
          className="text-purple-600 cursor-pointer hover:underline"
        >
          ← Back to Login
        </span>
      </p>

    </form>
  );
};

export default VerifyOtp;