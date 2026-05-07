import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";
import { ShieldCheck, Loader2, AlertCircle, QrCode, Clock, CheckCircle2 } from "lucide-react";

const PaymentStep = ({ setPaymentOpen, bookingId }) => {
  const [utr, setUtr] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ UTR validation
  const isValidUTR = (utr) => {
    return /^[A-Za-z0-9]{12,16}$/.test(utr);
  };

  const handleChange = (e) => {
    setUtr(e.target.value.toUpperCase()); // UTRs usually look better capitalized
    setError(""); // Clear error when typing
  };

  // ✅ Submit payment (UTR)
  const handleConfirm = async () => {
    if (!isValidUTR(utr)) {
      setError("Please enter a valid 12–16 character UTR number.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await api.put(`/booking/${bookingId}/submit-payment`, {
        utr,
      });

      setPaymentOpen(false);
      navigate("/booking-pending");

    } catch (err) {
      setError(err.response?.data?.message || "Payment submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Pay Later
  const handlePayLater = () => {
    setPaymentOpen(false);
    navigate("/my-profile/my-bookings");
  };

  return (
    <div className="w-full max-w-sm mx-auto">

      {/* 🔹 HEADER */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="flex items-center justify-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-100">
          <ShieldCheck size={14} />
          100% Secure Payment
        </div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Complete Payment</h2>
        <p className="text-sm text-gray-500 mt-2">
          Scan the QR code below with any UPI app to secure your tickets.
        </p>
      </div>

      {/* 🔥 INLINE ERROR BANNER */}
      {error && (
        <div className="mb-6 bg-rose-50 border border-rose-100 text-rose-600 px-4 py-3 rounded-xl text-sm font-medium flex items-start gap-2 animate-in fade-in slide-in-from-top-2">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <p className="leading-snug">{error}</p>
        </div>
      )}

      {/* 🔹 CARD CONTENT */}
      <div className="bg-white">

        {/* 🔥 PREMIUM QR SECTION */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative p-3 bg-white border-2 border-dashed border-purple-200 rounded-2xl shadow-sm group hover:border-purple-400 transition-colors duration-300">
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-purple-500 rounded-tl-xl -mt-0.5 -ml-0.5"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-purple-500 rounded-tr-xl -mt-0.5 -mr-0.5"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-purple-500 rounded-bl-xl -mb-0.5 -ml-0.5"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-purple-500 rounded-br-xl -mb-0.5 -mr-0.5"></div>
            
            <img
              src="/upi-qr.png"   // 👉 Make sure this exists in your public folder!
              alt="UPI QR"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
              className="w-48 h-48 object-contain rounded-xl relative z-10"
            />
            {/* Fallback if image fails to load */}
            <div className="w-48 h-48 bg-gray-50 rounded-xl flex-col items-center justify-center text-gray-400 hidden">
               <QrCode size={40} className="mb-2 opacity-50" />
               <span className="text-xs">QR Code Missing</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
             <span>Supports GPay, PhonePe, Paytm</span>
          </div>
        </div>

        {/* 🔹 UTR INPUT */}
        <div className="mb-6">
          <label className="text-sm font-semibold text-gray-700 mb-1.5 flex items-center justify-between">
            <span>UTR Reference Number</span>
            <span className="text-[10px] text-gray-400 font-normal uppercase">12-16 Digits</span>
          </label>

          <input
            type="text"
            placeholder="e.g. 312456789012"
            value={utr}
            onChange={handleChange}
            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 
                       bg-gray-50 text-gray-900 font-medium placeholder-gray-400
                       focus:bg-white focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10
                       transition-all"
          />
        </div>

        {/* 🔹 BUTTONS ALIGNMENT */}
        <div className="flex flex-col gap-3">
          {/* CONFIRM BUTTON */}
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!isValidUTR(utr) || loading}
            className={`w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300
            ${
              isValidUTR(utr)
                ? "bg-black text-white hover:bg-gray-800 hover:shadow-lg active:scale-[0.98]"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Verifying Payment...
              </>
            ) : (
              <>
                <CheckCircle2 size={18} />
                Confirm Payment
              </>
            )}
          </button>

          {/* PAY LATER */}
          <button
            type="button"
            onClick={handlePayLater}
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-700 
                       bg-white hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2"
          >
            <Clock size={16} className="text-gray-400" />
            I'll Pay Later
          </button>
        </div>

        {/* 🔹 CANCEL */}
        <button
          onClick={() => setPaymentOpen(false)}
          className="w-full mt-4 py-2 text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors"
        >
          Cancel & Close
        </button>

      </div>
    </div>
  );
};

export default PaymentStep;