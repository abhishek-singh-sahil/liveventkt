import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";

const PaymentStep = ({ setPaymentOpen, bookingId }) => {
  const [utr, setUtr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ UTR validation
  const isValidUTR = (utr) => {
    return /^[A-Za-z0-9]{12,16}$/.test(utr);
  };

  // ✅ Submit payment (UTR)
  const handleConfirm = async () => {
    if (!isValidUTR(utr)) {
      alert("Enter valid UTR (12–16 characters)");
      return;
    }

    try {
      setLoading(true);

      await api.put(`/booking/${bookingId}/submit-payment`, {
        utr,
      });

      setPaymentOpen(false);
      navigate("/booking-pending");

    } catch (err) {
      alert(err.response?.data?.message || "Payment submission failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Pay Later
  const handlePayLater = () => {
    setPaymentOpen(false);
    navigate("/my-bookings");
  };

  return (
    <div className="w-full">

      {/* 🔹 HEADER */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold">Complete Payment</h2>
        <p className="text-sm text-gray-500 mt-1">
          Secure your booking by completing the payment
        </p>
      </div>

      {/* 🔹 CARD */}
      <div className="border border-gray-200 rounded-2xl p-6 md:p-7 bg-white shadow-sm">

        {/* 🔥 QR SECTION */}
        <div className="flex flex-col items-center mb-5">
          <div className="bg-gray-100 p-3 rounded-xl">
            <img
              src="/upi-qr.png"   // 👉 Put your QR in /public folder
              alt="UPI QR"
              className="w-52 h-52 object-contain"
            />
          </div>

          <p className="text-sm text-gray-600 mt-3 text-center leading-relaxed">
            Pay by scanning the QR code using any UPI app and submit the UTR below.
          </p>
        </div>

        {/* 🔹 UTR INPUT */}
        <div>
          <label className="text-sm text-gray-600 mb-1 block">
            UTR Number
          </label>

          <input
            placeholder="Enter 12–16 digit UTR"
            value={utr}
            onChange={(e) => setUtr(e.target.value)}
            className="w-full px-5 py-3 rounded-full border border-gray-300 
                       bg-gray-50 text-sm placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-black/20
                       transition"
          />
        </div>

        {/* 🔹 CONFIRM BUTTON */}
        <button
          onClick={handleConfirm}
          disabled={!isValidUTR(utr) || loading}
          className={`w-full mt-5 py-3 rounded-full text-sm font-medium transition
          ${
            isValidUTR(utr)
              ? "bg-black text-white hover:opacity-90"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          {loading ? "Submitting..." : "Confirm Payment"}
        </button>

        {/* 🔹 PAY LATER */}
        <button
          onClick={handlePayLater}
          className="w-full mt-3 py-3 rounded-full text-sm font-medium 
                     border border-gray-300 text-gray-700 
                     hover:bg-gray-100 transition"
        >
          Pay Later
        </button>

        {/* 🔹 CANCEL */}
        <button
          onClick={() => setPaymentOpen(false)}
          className="w-full mt-2 text-sm text-gray-500 hover:text-black transition"
        >
          Close
        </button>

      </div>
    </div>
  );
};

export default PaymentStep;