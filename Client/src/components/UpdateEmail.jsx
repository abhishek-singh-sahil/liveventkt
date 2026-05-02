import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";

const UpdateEmail = () => {
  const { user, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [newEmail, setNewEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("email"); // email → otp
  const [loading, setLoading] = useState(false);

  // 🔥 SEND OTP
  const handleSendOtp = async () => {
    try {
      setLoading(true);

      await api.post("/auth/sendotp", {
        email: newEmail,
        action: "change_email",
      });

      setStep("otp");

    } catch (err) {
      alert("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 VERIFY OTP + UPDATE EMAIL
  const handleVerify = async () => {
    try {
      setLoading(true);

      const { data } = await api.post("/auth/update-email", {
        email: newEmail,
        otp,
      });

      await updateUser({ email: newEmail });

      alert("Email updated successfully");
      navigate("/my-profile");

    } catch (err) {
      alert("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] px-4">

      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg">

        <h2 className="text-xl font-semibold mb-6 text-center">
          Update Email
        </h2>

        {/* STEP 1 */}
        {step === "email" && (
          <>
            <p className="text-sm text-gray-500 mb-3">
              Current email: <b>{user?.email}</b>
            </p>

            <input
              placeholder="Enter new email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl mb-4 focus:ring-2 focus:ring-black/10"
            />

            <button
              onClick={handleSendOtp}
              disabled={!newEmail || loading}
              className="w-full bg-black text-white py-3 rounded-xl"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === "otp" && (
          <>
            <input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl mb-4"
            />

            <button
              onClick={handleVerify}
              disabled={otp.length !== 6 || loading}
              className="w-full bg-black text-white py-3 rounded-xl"
            >
              {loading ? "Verifying..." : "Verify & Update"}
            </button>
          </>
        )}

        {/* CANCEL */}
        <button
          onClick={() => navigate(-1)}
          className="mt-4 w-full text-gray-500 hover:text-black"
        >
          Cancel
        </button>

      </div>
    </div>
  );
};

export default UpdateEmail;