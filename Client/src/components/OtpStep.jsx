import React, { useState, useRef, useEffect } from "react";
import api from "../utils/axios";

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

  const inputsRef = useRef([]);

  // 🔥 HANDLE OTP INPUT
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

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

  const otpValue = otp.join("");

  // 🔥 VERIFY OTP
  const handleVerify = async () => {
    try {
      setLoading(true);

      const { data } = await api.post("/booking/bookEvent", {
        eventId,
        otp: otpValue,
        contact,
        attendees
      });

      setBookingId(data.booking._id);
      setStep("payment");

    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
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
      await api.post("/booking/sendotp", {
        email: contact.email
      });

      setTimer(30);
      setOtp(["", "", "", "", "", ""]);
      inputsRef.current[0].focus();

    } catch {
      alert("Failed to resend OTP");
    }
  };

  return (
    <div className="w-full">

      {/* HEADER */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold">Verify OTP 🔐</h2>
        <p className="text-sm text-gray-500 mt-1">
          Sent to <span className="font-medium">{contact.email}</span>
        </p>
      </div>

      {/* OTP INPUT BOXES */}
      <div className="flex justify-center gap-3 mb-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-12 h-12 text-center text-lg font-semibold 
                       border border-gray-300 rounded-xl 
                       focus:ring-2 focus:ring-purple-500 outline-none 
                       transition"
          />
        ))}
      </div>

      {/* VERIFY BUTTON */}
      <button
        type="submit"
        onClick={handleVerify}
        disabled={otpValue.length !== 6 || loading}
        className={`cursor-pointer w-full py-3 rounded-xl font-medium text-white 
        ${
          otpValue.length === 6
            ? "bg-black cursor-pointer hover:opacity-90 shadow-lg"
            : "bg-gray-300 text-gray-500"
        }`}
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>

      {/* RESEND + CANCEL */}
      <div className="flex justify-between items-center mt-5 text-sm">

        {/* RESEND */}
        {timer > 0 ? (
          <span className="text-gray-400">
            Resend in {timer}s
          </span>
        ) : (
          <button
            onClick={handleResend}
            className="text-purple-600 hover:underline"
          >
            Resend OTP
          </button>
        )}

        {/* CANCEL */}
        <button
          onClick={() => setPaymentOpen(false)}
          className="text-red-500 hover:underline"
        >
          Cancel
        </button>

      </div>
    </div>
  );
};

export default OtpStep;